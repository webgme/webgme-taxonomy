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
  Repository,
  TaxonomyVersion,
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

const mongoUri = gmeConfig.mongo.uri;
const defaultClient = new MongoClient(mongoUri);

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

  constructor(client: MongoClient, collectionName: string) {
    this._client = client;
    const db = this._client.db();
    const name = `taxonomy_data_${collectionName}`;
    this._collection = db.collection(name);
    this._files = new GridFSBucket(db, { bucketName: name });
  }

  async listArtifacts(): Promise<Repository[]> {
    const documents = await this._collection.find({}).toArray();
    const repos: Repository[] = documents.map((doc) => {
      const docId = doc._id.toString();
      const artifacts = doc.artifacts
        .map(toArtifactMetadatav2)
        .map(
          (data: ArtifactMetadatav2, index: number) => ({
            parentId: docId,
            id: index.toString(),
            displayName: data.displayName,
            tags: data.tags,
            taxonomyVersion: data.taxonomyVersion,
            time: data.time,
          }),
        );

      return {
        id: docId,
        displayName: doc.displayName,
        tags: doc.tags,
        taxonomyVersion: doc.taxonomyVersion,
        children: artifacts,
      };
    });

    return repos;
  }

  async createArtifact(metadata: ArtifactMetadatav2) {
    const artifactSet: RepositoryDoc = {
      displayName: metadata.displayName,
      taxonomyVersion: metadata.taxonomyVersion,
      tags: metadata.tags,
      artifacts: [],
    };
    const result = await this._collection.insertOne(artifactSet);

    return "Created!";
  }

  async appendArtifact(
    repoId: string,
    metadata: ArtifactMetadatav2,
    filenames: string[],
  ) {
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

    // TODO: handle artifact not found case
    const index = result.value?.artifacts.length ?? 0;
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
          const metadataPath = path.join(artifactPath, "artifact.json");
          try {
            artifact.tags = formatter.toHumanFormat(
              artifact.tags ?? {},
            );
            await writeJsonData(metadataPath, artifact);
          } catch (err) {
            const logPath = path.join(artifactPath, `warnings.txt`);
            if (err instanceof FormatError) {
              await writeJsonData(metadataPath, artifact);
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
    const client = mongoUri
      ? new MongoClient(mongoUri.toString())
      : defaultClient;
    return new MongoAdapter(client, collection.toString());
  }
}

async function writeData(filePath: string, data: string) {
  const dirPath = path.dirname(filePath) + path.sep;
  await fsp.mkdir(dirPath, { recursive: true });
  await fsp.writeFile(filePath, data);
}

async function writeJsonData(filePath: string, metadata: ArtifactMetadata) {
  writeData(filePath, JSON.stringify(metadata));
}

async function streamClose(stream: stream.Stream): Promise<void> {
  return new Promise((res, rej) => stream.on("close", res));
}
