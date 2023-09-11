/**
 * This is a storage adapter for MongoDB which stores artifact sets
 * in documents along with any contained artifacts.
 */
import fs from "fs";
import stream from "stream";
import _ from "underscore";
import path from "path";
import fsp from "fs/promises";
import type {
  Adapter,
  Artifact,
  ArtifactMetadata,
  ArtifactMetadatav2,
  DownloadInfo,
  Metadata,
  Repository,
  TaxonomyVersion,
  UploadReservation,
} from "../common/types";
import type TagFormatter from "../../../../../common/TagFormatter";
import { FormatError } from "../../../../../common/TagFormatter";
import { MissingAttributeError } from "../common/ModelError";
import { GridFSBucket, MongoClient, ObjectId } from "mongodb";
import type { Collection, Document } from "mongodb";
import gmeConfig from "../../../../../../config";
import {
  AppendResult,
  UploadParams,
  UploadRequest,
} from "../common/AppendResult";
import { WebgmeContext } from "../../../../../common/types";
import { toArtifactMetadatav2 } from "../common/Helpers";
import { Pattern } from "../../Utils";
import ScopedFnQueue from "../../ScopedFnQueue";

const defaultMongoUri = gmeConfig.mongo.uri;
const defaultClient = new MongoClient(defaultMongoUri);

type FileId = string;
interface RepositoryDoc {
  displayName: string;
  taxonomyVersion: TaxonomyVersion;
  tags: any;
  artifacts: ArtifactDoc[];
}

interface ArtifactDoc {
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyVersion;
  time: string;
  files: FileId[];
}

export default class MongoAdapter implements Adapter {
  private _client: MongoClient;
  private _files: GridFSBucket;
  private _collection: Collection<Document>;
  private _hostUri: string;
  private _repoLocks: ScopedFnQueue;

  constructor(client: MongoClient, collectionName: string, hostUri: string) {
    this._client = client;
    const db = this._client.db();
    const name = `taxonomy_data_${collectionName}`;
    this._collection = db.collection(name);
    this._files = new GridFSBucket(db, { bucketName: name });
    this._hostUri = hostUri;
    this._repoLocks = new ScopedFnQueue();
  }

  async getMetadata(
    repoId: string,
    contentId: string,
    formatter: TagFormatter,
  ): Promise<any> {
    const repo = await this.getRepository(repoId);
    return this.getMetadataFor(repo, contentId, formatter);
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
    const documents = await this._collection.find({}).toArray();
    const repos: Repository[] = documents.map((doc) => {
      const docId = doc._id.toString();

      return {
        id: docId,
        displayName: doc.displayName,
        tags: doc.tags,
        taxonomyVersion: doc.taxonomyVersion,
      };
    });

    return repos;
  }

  async listArtifacts(repoId: string): Promise<Artifact[]> {
    const repo = await this.getRepository(repoId);
    const artifacts = repo.artifacts
      .map(toArtifactMetadatav2)
      .map(
        (data: ArtifactMetadatav2, index: number) => ({
          parentId: repoId,
          id: index.toString(),
          displayName: data.displayName,
          tags: data.tags,
          taxonomyVersion: data.taxonomyVersion,
          time: data.time,
        }),
      );
    return artifacts;
  }

  async withRepoReservation<T>(
    fn: (res: RepoReservation) => Promise<T>,
  ): Promise<T> {
    const reservation = new RepoReservation(this._hostUri);

    try {
      return await fn(reservation);
    } catch (err) {
      throw err;
    }
  }

  async withContentReservation<T>(
    fn: (res: ContentReservation) => Promise<T>,
    repoId: string,
  ): Promise<T> {
    return await this._repoLocks.run(repoId, async () => {
      const repo = await this.getRepository(repoId);
      const index: number = repo?.artifacts.length ?? 0;
      const reservation = new ContentReservation(this._hostUri, repoId, index);

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

  async createArtifact(res: RepoReservation, metadata: ArtifactMetadatav2) {
    const artifactSet = {
      _id: new ObjectId(res.repoId),
      displayName: metadata.displayName,
      taxonomyVersion: metadata.taxonomyVersion,
      tags: metadata.tags,
      artifacts: [],
    };
    const result = await this._collection.insertOne(artifactSet);

    return "Created!";
  }

  private async getRepository(repoId: string): Promise<any> {
    // TODO: throw error if not found? Or use option type?
    return await this._collection.findOne({
      _id: new ObjectId(repoId),
    });
  }

  async getContentIds(repoId: string): Promise<string[]> {
    const repo = await this.getRepository(repoId);

    if (!repo) {
      // TODO: throw an error
      return [];
    }

    return Object.keys(repo.artifacts);
  }

  async appendArtifact(
    res: ContentReservation,
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
        $push: { artifacts: artifact } as Document,
      },
      { returnDocument: "after" },
    );

    if (!result.value) {
      // TODO: handle artifact not found case
    }

    const index = res.index;
    const files = _.zip(filenames, fileIds).map(([name, id]) => {
      const extendedId = encodeURIComponent(id + "_" + name);
      const url = `./artifacts/${repoId}/${index}/${extendedId}/upload`;
      // TODO: add an authorization header
      const params = new UploadParams(url, "POST");
      return new UploadRequest(name, params);
    });
    return new AppendResult(index, files);
  }

  async uploadFile(
    repoId: string,
    index: unknown,
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

  // TODO: update method signature to be more generic
  async download(
    repoId: string,
    ids: string[],
    formatter: TagFormatter,
    targetDir: string,
  ): Promise<void> {
    const repoDoc = await this._collection.findOne({
      _id: new ObjectId(repoId),
    });
    if (!repoDoc) {
      // TODO: throw an error
      return;
    }

    const repo: RepositoryDoc = {
      displayName: repoDoc.displayName,
      taxonomyVersion: repoDoc.taxonomyVersion,
      tags: repoDoc.tags,
      artifacts: repoDoc.artifacts,
    };

    await Promise.all(
      ids.map(async (id) => {
        const idx = parseInt(id);
        const artifact = repo.artifacts[idx];
        const artifactPath = path.join(targetDir, idx.toString());
        if (artifact) {
          const metadataPath = path.join(artifactPath, "metadata.json");
          const amd = toArtifactMetadatav2(artifact);
          try {
            amd.tags = formatter.toHumanFormat(
              amd.tags ?? {},
            );
            const metadata = {
              tags: amd.tags,
              taxonomyVersion: amd.taxonomyVersion,
            };
            await writeMetadata(metadataPath, metadata);
          } catch (err) {
            const logPath = path.join(artifactPath, `warnings.txt`);
            if (err instanceof FormatError) {
              const metadata = {
                tags: amd.tags,
                taxonomyVersion: amd.taxonomyVersion,
              };
              await writeMetadata(metadataPath, metadata);
              writeData(
                logPath,
                `An error occurred when converting the taxonomy tags: ${err.message}\n\nThe internal format has been saved in artifact.json.`,
              );
            } else {
              const message = (err instanceof Error)
                ? err.message
                : err?.toString();
              writeData(
                logPath,
                `An error occurred when generating artifact.json: ${message}`,
              );
            }
          }
          await Promise.all(
            artifact.files.map((fileIdStr: string) => {
              const fileId = new ObjectId(fileIdStr);
              return this._downloadFile(fileId, artifactPath);
            }),
          );
        }
      }),
    );
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

  static from(gmeContext: WebgmeContext, storageNode: Core.Node) {
    const { core } = gmeContext;
    const collection = core.getAttribute(storageNode, "collection");
    if (!collection) {
      throw new MissingAttributeError(gmeContext, storageNode, "collection");
    }

    const mongoUri = core.getAttribute(storageNode, "URI");
    let hostUri, client;
    if (mongoUri) {
      client = new MongoClient(mongoUri.toString());
      hostUri = MongoAdapter.getHostUri(
        mongoUri.toString(),
        collection.toString(),
      );
    } else {
      client = defaultClient;
      hostUri = MongoAdapter.getHostUri(defaultMongoUri, collection.toString());
    }

    return new MongoAdapter(client, collection.toString(), hostUri);
  }

  static getHostUri(mongoUri: string, collection: string): string {
    const hostAddr = mongoUri
      .replace(/^(mongodb:\/\/)?/, "")
      .replace(/\/$/, "");
    return `mongoDoc://${hostAddr}/${collection}`;
  }

  static getUriPatterns(): string[] {
    const hostPattern = `mongoDoc://${Pattern.URL}/[a-zA-Z_]+/`;
    const repoPattern = "[a-f0-9]{24}";
    const contentPattern = "[0-9]+";
    return [
      hostPattern + repoPattern,
      hostPattern + repoPattern + "/" + contentPattern,
    ];
  }
}

interface MongoReservation extends UploadReservation {
  uri: string;
  repoId: string;
}

class RepoReservation implements MongoReservation {
  repoId: string;
  uri: string;

  constructor(hostUri: string) {
    this.repoId = new ObjectId().toString();
    this.uri = hostUri + "/" + this.repoId;
  }
}

class ContentReservation implements UploadReservation {
  repoId: string;
  uri: string;
  index: number;

  constructor(hostUri: string, repoId: string, index: number) {
    this.repoId = repoId;
    this.index = index;
    this.uri = `${hostUri}/${this.repoId}/${index}`;
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
