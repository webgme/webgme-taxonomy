/**
 * This is a storage adapter for MongoDB which stores artifact sets
 * in documents along with any contained artifacts.
 */
import fs from "fs";
import type { Request } from "express";
import stream from "stream";
import _ from "underscore";
import { Option } from "oxide.ts";
import path from "path";
import fsp from "fs/promises";
import type {
  Adapter,
  Artifact,
  ArtifactMetadata,
  ArtifactMetadatav2,
  ContentReservation,
  DisabledInfo,
  DisableResult,
  DownloadInfo,
  FileStreamDict,
  Metadata,
  RepoReservation,
  Repository,
  TaxonomyVersion,
  UpdateReservation,
  UpdateResult,
} from "../common/types";
import type TagFormatter from "../../../../common/TagFormatter";
import { MissingAttributeError } from "../common/ModelError";
import { GridFSBucket, MongoClient, ObjectId } from "mongodb";
import type { Collection, Document } from "mongodb";
import gmeConfig from "../../../../../config/index";
import {
  AppendResult,
  UploadParams,
  UploadRequest,
} from "../common/AppendResult";
import { AzureGmeConfig, GmeContentContext } from "../../../../common/types";
import { toArtifactMetadatav2 } from "../common/Helpers";
import { filterMap, filterMapOpt, findIndex } from "../../../../common/Utils";
import { fromResult, Pattern, range, zip } from "../../Utils";
import ScopedFnQueue from "../../ScopedFnQueue";
import { RepositoryNotFound } from "../common/StorageError";
import {
  ContentNotFoundError,
  DeletedContentError,
} from "../../../../common/UserError";

const hostPattern = `mongoDoc://${Pattern.URL}/([a-zA-Z0-9_]+/)?[a-zA-Z_]+`;
const repoPattern = hostPattern + "/[a-f0-9]{24}";
const contentPattern = repoPattern + "/[0-9]+";

const defaultMongoUri = gmeConfig.mongo.uri;
const defaultClient = new MongoClient(defaultMongoUri);

type FileId = string;
type ArtifactVersions = ArtifactDoc[];
interface RepositoryDoc {
  _id: ObjectId;
  displayName: string;
  taxonomyVersion: TaxonomyVersion;
  tags: any;
  artifacts: ArtifactVersions[];
}

interface ArtifactDoc extends ArtifactMetadatav2 {
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyVersion;
  time: string;
  files: FileId[];
  disabled?: DisabledInfo;
}

export default class MongoAdapter implements Adapter {
  private _client: MongoClient;
  private _files: GridFSBucket;
  private _collection: Collection<Document>;
  private _hostUri: string;
  private _repoLocks: ScopedFnQueue;
  private _contentLocks: ScopedFnQueue;

  constructor(client: MongoClient, collectionName: string, hostUri: string) {
    this._client = client;
    const db = this._client.db();
    const name = `taxonomy_data_${collectionName}`;
    this._collection = db.collection(name);
    this._files = new GridFSBucket(db, { bucketName: name });
    this._hostUri = hostUri;
    this._repoLocks = new ScopedFnQueue();
    this._contentLocks = new ScopedFnQueue();
  }

  async listPreviousFileNames(res: UpdateReservation): Promise<string[]> {
    const prevDoc = fromResult(
      (await this.getArtifactDoc(res.repoId, res.targetContentId))
        .okOrElse(() => new ContentNotFoundError()),
    );

    const result: string[] = [];

    for (const fileId of prevDoc.files) {
      const metadata = await this._files.find({ _id: new ObjectId(fileId) })
        .next();
      if (metadata) {
        result.push(metadata?.filename);
      }
    }

    return result;
  }

  async disableArtifact(
    repoId: string,
    contentId: string,
  ): Promise<DisableResult> {
    const [index, version] = this.parseContentId(contentId);
    const artifactKey = `artifacts.${index}.${version}`;
    const query: { [key: string]: any } = {
      _id: new ObjectId(repoId),
    };
    query[artifactKey] = { "$exists": true };
    const partial: any = {};
    partial[`${artifactKey}.disabled`] = { time: new Date().toString() };
    const update = { $set: partial };

    const result = await this._collection.updateOne(query, update);
    if (result.matchedCount === 0) {
      throw new ContentNotFoundError();
    }
  }

  async updateArtifact(
    res: UpdateReservation,
    metadata: ArtifactMetadatav2,
    filenames: string[] = [],
  ): Promise<UpdateResult> {
    const [index, version] = this.parseContentId(res.contentId);
    const repoId = res.repoId;
    const reuseFiles = filenames.length === 0;

    let fileIds = _.range(filenames.length).map(() => new ObjectId());
    let usedFileIds: string[];

    if (reuseFiles) {
      const prevDoc = fromResult(
        (await this.getArtifactDoc(res.repoId, res.targetContentId))
          .okOrElse(() => new ContentNotFoundError()),
      );
      usedFileIds = prevDoc.files;
    } else {
      usedFileIds = fileIds.map((id) => id.toString());
    }

    const artifact: Artifact = {
      displayName: metadata.displayName,
      tags: metadata.tags,
      taxonomyVersion: metadata.taxonomyVersion,
      time: (new Date()).toString(),
      files: usedFileIds,
    };
    const artifactKey = `artifacts.${index}`;
    const query: { [key: string]: any } = {
      _id: new ObjectId(res.repoId),
    };
    query[artifactKey] = { "$exists": true };
    const pushData: any = {};
    pushData[artifactKey] = artifact;
    const update = { $push: pushData };

    const result = await this._collection.updateOne(query, update);

    if (result.matchedCount == 0) {
      throw new ContentNotFoundError();
    }

    const contentId = `${index}_${version}`;
    let uploadFileRequests: UploadRequest[] = [];

    if (!reuseFiles) {
      uploadFileRequests = this.getFileUploadReqs(
        repoId,
        contentId,
        zip(filenames, fileIds),
      );
    }

    return {
      contentId,
      files: uploadFileRequests,
    };
  }

  async withUpdateReservation<T>(
    fn: (res: UpdateReservation) => Promise<T>,
    repoId: string,
    contentId: string,
  ): Promise<T> {
    const [index /*version*/] = this.parseContentId(contentId);
    const lockId = repoId + "/" + index;
    return await this._contentLocks.run(lockId, async () => {
      const versions = fromResult(
        (await this.getRepository(repoId))
          .okOrElse(() => new RepositoryNotFound(repoId))
          .andThen((repo) =>
            Option.from(repo.artifacts[index])
              .okOrElse(() => new ContentNotFoundError())
          ),
      );

      const nextVersion = versions.length;
      const reservation = new ContentUpdateReservation(
        this._hostUri,
        repoId,
        index,
        nextVersion,
      );

      try {
        const result = await fn(reservation);
        return result;
      } catch (err) {
        throw err;
      } finally {
        // TODO: disable the reservation
        // TODO: probably should make it a generic
      }
    });
  }

  async getBulkMetadata(
    repoId: string,
    contentIds: string[],
    formatter: TagFormatter,
  ): Promise<any[]> {
    const repo = await this.getRepository(repoId);
    const metadata = contentIds.map((id) =>
      this.getMetadataFor(repo, id, formatter)
    );
    return metadata;
  }

  private getMetadataFor(
    repo: any,
    contentId: string,
    formatter: TagFormatter,
  ): any {
    const metadata = repo.artifacts[contentId];
    if (metadata) {
      metadata.tags = formatter.toHumanFormat(
        metadata.tags ?? {},
      );
    }
    return metadata;
  }

  async downloadFileURLs(
    repoId: string,
    contentIds: string[],
  ): Promise<DownloadInfo[]> {
    throw new Error("Method not implemented.");
  }

  async listRepos(): Promise<Repository[]> {
    try {
      const documents = (await this._collection.find({})
        .toArray()) as RepositoryDoc[];
      const repos: Repository[] = documents.map(toRepository);
      return repos;
    } catch (err) {
      console.error("Failed to list repos at mongoUri:", this._hostUri);
      throw err;
    }
  }

  async getRepoMetadata(id: string): Promise<Repository> {
    const doc = await this.getRepository(id);
    return fromResult(doc.map(toRepository).okOr(new RepositoryNotFound(id)));
  }

  async listArtifacts(repoId: string): Promise<Artifact[]> {
    const artifacts: Artifact[] = (await this.getRepository(repoId))
      .map((repo) =>
        filterMapOpt(
          zip(repo.artifacts, range(0, repo.artifacts.length)),
          (versionTuple: [ArtifactDoc[], number]) => {
            const [versions, index] = versionTuple;
            const validIndex = findIndex(
              versions.slice().reverse(),
              (v) => !v.disabled,
            );
            return validIndex.map((inverseIdx) => {
              const lastIndex = versions.length - 1;
              const versionIndex = lastIndex - inverseIdx;
              const latestValid = versions[versionIndex];

              return ({
                parentId: repoId,
                id: `${index}_${versionIndex}`,
                displayName: latestValid.displayName,
                tags: latestValid.tags,
                taxonomyVersion: latestValid.taxonomyVersion,
                time: latestValid.time,
              });
            });
          },
        )
      ).unwrapOr([]); // TODO: convert to an error instead?

    return artifacts;
  }

  async withRepoReservation<T>(
    fn: (res: DocReservation) => Promise<T>,
  ): Promise<T> {
    const reservation = new DocReservation(this._hostUri);

    try {
      return await fn(reservation);
    } catch (err) {
      throw err;
    }
  }

  async withContentReservation<T>(
    fn: (res: IndexReservation) => Promise<T>,
    repoId: string,
  ): Promise<T> {
    return await this._repoLocks.run(repoId, async () => {
      const repo = await this.getRepository(repoId);
      const index: number = repo
        .map((repo) => repo.artifacts.length)
        .unwrapOr(0);
      const reservation = new IndexReservation(this._hostUri, repoId, index);

      try {
        const result = await fn(reservation);
        // TODO: disable the reservation
        // reservation.active = false;
        return result;
      } catch (err) {
        throw err;
      }
    });
  }

  async createArtifact(res: DocReservation, metadata: ArtifactMetadatav2) {
    const repo = {
      _id: new ObjectId(res.repoId),
      displayName: metadata.displayName,
      taxonomyVersion: metadata.taxonomyVersion,
      tags: metadata.tags,
      artifacts: [],
    };
    const result = await this._collection.insertOne(repo);
    if (!result.acknowledged) {
      throw new Error("Unable to save repository.");
    }

    return "Created!";
  }

  private async getRepository(repoId: string): Promise<Option<RepositoryDoc>> {
    return Option.from(
      await this._collection.findOne({
        _id: new ObjectId(repoId),
      }),
    )
      .map((doc) => { // update to versioned data structure
        doc.artifacts = doc.artifacts.map(
          (versions: ArtifactDoc | ArtifactDoc[]) => {
            if (!Array.isArray(versions)) {
              versions = [versions];
            }
            return versions;
          },
        );

        return doc;
      }) as Option<RepositoryDoc>;
  }

  private parseContentId(id: string): [number, number] {
    const [index, version = 0] = id.split("_").map((num) => parseInt(num));
    return [index, version];
  }

  private async getArtifactDoc(
    repoId: string,
    id: string,
  ): Promise<Option<ArtifactDoc>> {
    const [index, version] = this.parseContentId(id);

    return (await this.getRepository(repoId))
      .andThen((repo) => Option.from(repo.artifacts[index]))
      .andThen((versions) => Option.from(versions[version]));
  }

  async getContentIds(repoId: string): Promise<Option<string[]>> {
    const repo = await this.getRepository(repoId);
    return repo.map((repo) => Object.keys(repo.artifacts));
  }

  async appendArtifact(
    res: IndexReservation,
    metadata: ArtifactMetadatav2,
    filenames: string[],
  ) {
    const repoId = res.repoId;
    const fileIds = _.range(filenames.length).map(() => new ObjectId());
    const artifact: Artifact = {
      displayName: metadata.displayName,
      tags: metadata.tags,
      taxonomyVersion: metadata.taxonomyVersion,
      time: (new Date()).toString(),
      files: fileIds.map((id) => id.toString()),
    };

    const query = { _id: new ObjectId(repoId) };
    const result = await this._collection.findOneAndUpdate(
      query,
      {
        $push: { artifacts: [artifact] } as Document,
      },
      { returnDocument: "after" },
    );

    if (!result.value) {
      throw new RepositoryNotFound(res.repoId);
    }

    const contentId = `${res.index}_0`;
    const files = this.getFileUploadReqs(
      repoId,
      contentId,
      zip(filenames, fileIds),
    );
    return new AppendResult(contentId, files, res.index);
  }

  private getFileUploadReqs(
    repoId: string,
    contentId: string,
    files: [string, ObjectId][],
  ): UploadRequest[] {
    return files.map(([name, id]) => {
      const extendedId = encodeURIComponent(id + "_" + name);
      const url = `./artifacts/${repoId}/${contentId}/${extendedId}/upload`;
      // TODO: add an authorization header
      const params = new UploadParams(url, "POST");
      return new UploadRequest(name, params);
    });
  }

  async uploadFile(
    _repoId: string,
    _id: string,
    extendedId: string,
    fileStream: stream.Readable,
  ) {
    const [fileId, ...nameChunks] = extendedId.split("_");
    const filename = nameChunks.join("_");
    const objId = new ObjectId(fileId);
    const writeStream = this._files.openUploadStreamWithId(objId, filename);
    const stream = fileStream.pipe(writeStream);
    await streamClose(stream);
  }

  async getMetadata(
    repoId: string,
    contentId: string,
  ): Promise<Option<ArtifactMetadatav2>> {
    return (await this.getArtifactDoc(repoId, contentId))
      .map(toArtifactMetadatav2);
  }

  private async getFileIds(repoId: string, id: string): Promise<ObjectId[]> {
    const artifactDoc = fromResult((await this.getArtifactDoc(repoId, id))
      .okOrElse(() => new ContentNotFoundError()));

    if (artifactDoc.disabled) {
      throw new DeletedContentError();
    }
    return artifactDoc.files.map((fileIdStr: string) =>
      new ObjectId(fileIdStr)
    );
  }

  async getFileStreams(
    repoId: string,
    id: string,
  ): Promise<FileStreamDict> {
    const fileIds = await this.getFileIds(repoId, id);
    const metadataPromise = fileIds
      .map((id) => this._files.find({ _id: id }).next());

    const metadata = await Promise.all(metadataPromise);
    const entries = filterMap(metadata, (fileMd) => {
      if (fileMd) {
        return [
          fileMd.filename,
          this._files.openDownloadStream(fileMd._id),
        ];
      }
    });

    return Object.fromEntries(entries);
  }

  async _downloadFile(fileId: ObjectId, targetDir: string) {
    const id = new ObjectId(fileId.toString());
    const metadata = await this._files.find({ _id: id }).next();
    if (metadata) {
      const filepath = path.join(targetDir, metadata.filename);
      await fsp.mkdir(path.dirname(filepath), { recursive: true });

      const fileStream = fs.createWriteStream(filepath);
      const stream = this._files.openDownloadStream(id).pipe(fileStream);

      await streamClose(stream);
    } else {
      // TODO: what if the file isn't found?
    }
  }

  static async from(
    gmeContext: GmeContentContext,
    storageNode: Core.Node,
    _req: Request,
    _config: any,
  ) {
    const { core } = gmeContext;
    const collection = core.getAttribute(storageNode, "collection");
    if (!collection) {
      throw new MissingAttributeError(gmeContext, storageNode, "collection");
    }

    const mongoUri = core.getAttribute(storageNode, "URI");
    return MongoAdapter.fromUriAndCollection(
      mongoUri ? mongoUri.toString() : defaultMongoUri,
      collection.toString(),
    );
  }

  static async fromUri(
    _config: AzureGmeConfig,
    _req: Request,
    uri: string,
  ): Promise<MongoAdapter> {
    // TODO: How can we handle repo IDs?
    // TODO: they are ambiguous if we don't know if they are for a repo or individual content item
    // TODO: for now, we will assume they are content IDs
    const chunks = uri.split("/");
    chunks.pop(); // content ID
    chunks.pop(); // document ID
    const collection = chunks.pop() as string;
    const mongoUri = chunks.join("/").replace(/^mongoDoc/, "mongodb");
    return MongoAdapter.fromUriAndCollection(mongoUri, collection);
  }

  static fromUriAndCollection(
    mongoUri: string,
    collection: string,
  ): MongoAdapter {
    let hostUri, client;
    if (mongoUri === defaultMongoUri) {
      client = defaultClient;
      hostUri = MongoAdapter.getHostUri(defaultMongoUri, collection.toString());
    } else {
      client = new MongoClient(mongoUri.toString());
      hostUri = MongoAdapter.getHostUri(
        mongoUri.toString(),
        collection.toString(),
      );
    }

    return new MongoAdapter(client, collection.toString(), hostUri);
  }

  static getHostUri(mongoUri: string, collection: string): string {
    const hostAddr = mongoUri
      .replace(/^(mongodb:\/\/)?/, "")
      .replace(/\/$/, "");
    return `mongoDoc://${hostAddr}/${collection}`;
  }

  resolveUri(uri: string): [string, string, string] {
    return MongoAdapter.resolveUri(uri);
  }

  static resolveUri(uri: string): [string, string, string] {
    const chunks = uri.split("/");
    let host: string;
    let repo: string = "";
    let content: string = "";

    if (RegExp(contentPattern).test(uri)) {
      content = chunks.pop() as string;
      if (!content.includes("_")) {
        // Fix for first versions that only includes the index and no version
        content += "_0";
      }
      repo = chunks.pop() as string;
    } else if (RegExp(repoPattern).test(uri)) {
      repo = chunks.pop() as string;
    } else if (!RegExp(hostPattern).test(uri)) {
      throw new Error(`No valid uri provided: ${uri}`);
    }

    host = chunks.join("/");

    return [host, repo, content];
  }

  static getUriPatterns(): string[] {
    return [
      hostPattern,
      repoPattern,
      contentPattern,
    ];
  }
}

class DocReservation implements RepoReservation {
  readonly repoId: string;
  readonly uri: string;

  constructor(hostUri: string) {
    this.repoId = new ObjectId().toString();
    this.uri = hostUri + "/" + this.repoId;
  }
}

class IndexReservation implements ContentReservation {
  readonly repoId: string;
  readonly uri: string;
  readonly index: number;
  readonly contentId: string;

  constructor(hostUri: string, repoId: string, index: number) {
    this.repoId = repoId;
    this.index = index;
    this.uri = `${hostUri}/${this.repoId}/${index}`;
    this.contentId = `${index}_0`;
  }
}

class ContentUpdateReservation implements UpdateReservation {
  readonly repoId: string;
  readonly contentId: string;
  readonly targetContentId: string;
  readonly uri: string;

  constructor(hostUri: string, repoId: string, index: number, version: number) {
    this.repoId = repoId;
    this.contentId = `${index}_${version}`;
    this.targetContentId = `${index}_${version - 1}`;
    this.uri = `${hostUri}/${this.repoId}/${this.contentId}`;
  }
}

async function writeData(filePath: string, data: string) {
  const dirPath = path.dirname(filePath) + path.sep;
  await fsp.mkdir(dirPath, { recursive: true });
  await fsp.writeFile(filePath, data);
}

async function writeMetadata(filePath: string, metadata: Metadata) {
  writeData(filePath, JSON.stringify(metadata));
}

async function writeJsonData(filePath: string, metadata: ArtifactMetadata) {
  writeData(filePath, JSON.stringify(metadata));
}

async function streamClose(stream: stream.Stream): Promise<void> {
  return new Promise((res, _rej) => stream.on("close", res));
}

function toRepository(doc: RepositoryDoc): Repository {
  const docId = doc._id.toString();

  return {
    id: docId,
    displayName: doc.displayName,
    tags: doc.tags,
    taxonomyVersion: doc.taxonomyVersion,
  };
}
