/**
 * This is a storage adapter for MongoDB which stores artifact sets
 * in documents along with any contained artifacts.
 */
import fs from "fs";
import _ from "underscore";
import path from "path";
import fsp from "fs/promises";
import type { Adapter, ArtifactMetadata, Artifact, Repository } from "../common/types";
import type TagFormatter from "../../../../../common/TagFormatter";
import { FormatError } from "../../../../../common/TagFormatter";
import { MissingAttributeError } from "../common/ModelError";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import type { Collection, Document } from 'mongodb';
import gmeConfig from "../../../../../../config";
import {
  AppendResult,
  UploadRequest,
  UploadParams,
} from "../common/AppendResult";
import { WebgmeContext } from "../../../../../common/types";

const mongoUri = gmeConfig.mongo.uri;
const defaultClient = new MongoClient(mongoUri);

class MongoAdapter implements Adapter {
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
      const artifacts = doc.artifacts.map(
        (data: ArtifactMetadata, index: number) => ({
          parentId: docId,
          id: index.toString(),
          displayName: data.displayName,
          taxonomyTags: data.taxonomyTags,
          taxonomy: data.taxonomyVersion,
          time: data.time
        })
      );

      return {
        id: docId,
        displayName: doc.displayName,
        taxonomyTags: doc.taxonomyTags,
        taxonomy: doc.taxonomyVersion,
        children: artifacts
      };
    });

    return repos;
  }

  async createArtifact(metadata: ArtifactMetadata) {
    const artifactSet = {
      displayName: metadata.displayName,
      taxonomyVersion: metadata.taxonomy,
      taxonomyTags: [],
      artifacts: [],
    };
    const result = await this._collection.insertOne(artifactSet);

    return "Created!";
  }

  async appendArtifact(repoId: string, metadata: ArtifactMetadata, filenames: string[]) {
    const repo = await this._collection.findOne({
      _id: new ObjectId(repoId),
    });

    const fileIds = _.range(filenames.length).map(() => new ObjectId());
    const artifact: Artifact = {
      displayName: metadata.displayName,
      taxonomyTags: metadata.taxonomyTags,
      taxonomy: metadata.taxonomyVersion,
      time: (new Date()).toString(),
      files: fileIds.map(id => id.toString()),
    };

    const query = { _id: ObjectId(repoId) };
    const result = await this._collection.findOneAndUpdate(
      query,
      {
        $push: { artifacts: artifact },
      },
      { returnDocument: "after" }
    );

    // TODO: handle artifact not found case
    const index = result.value.artifacts.length;
    const files = _.zip(filenames, fileIds).map(([name, id]) => {
      const extendedId = encodeURIComponent(id + "_" + name);
      const url = `./artifacts/${repoId}/${index}/${extendedId}/upload`;
      // TODO: add an authorization header
      const params = new UploadParams(url, "POST");
      return new UploadRequest(name, params);
    });
    return new AppendResult(index, files);
  }

  async uploadFile(repoId: string, index, extendedId, fileStream) {
    const [fileId, ...nameChunks] = extendedId.split("_");
    const filename = nameChunks.join("_");
    const writeStream = this._files.openUploadStreamWithId(fileId, filename);
    const stream = fileStream.pipe(writeStream);
    await streamClose(stream);
  }

  // TODO: update method signature to be more generic
  async download(repoId: string, ids: string[], formatter: TagFormatter, targetDir: string): Promise<void> {
    const set = await this._collection.findOne({
      _id: new ObjectId(repoId),
    });
    if (!set) {
      // TODO: throw an error
      return;
    }

    await Promise.all(
      ids.map(async (idx) => {
        const metadata = set.artifacts[idx];
        const artifactPath = path.join(targetDir, idx.toString());
        if (metadata) {
          const metadataPath = path.join(artifactPath, "metadata.json");
          try {
            metadata.taxonomyTags = formatter.toHumanFormat(
              metadata.taxonomyTags ?? []
            );
            await writeJsonData(metadataPath, metadata);
          } catch (err) {
            const logPath = path.join(artifactPath, `warnings.txt`);
            if (err instanceof FormatError) {
              await writeJsonData(metadataPath, metadata);
              writeData(
                logPath,
                `An error occurred when converting the taxonomy tags: ${err.message}\n\nThe internal format has been saved in metadata.json.`
              );
            } else {
              writeData(
                logPath,
                `An error occurred when generating metadata.json: ${err.message}`
              );
            }
          }
          await Promise.all(
            metadata.files.map((fileId) =>
              this._downloadFile(fileId, artifactPath)
            )
          );
        }
      })
    );
  }

  async _downloadFile(fileId: ObjectId, targetDir: string) {
    fileId = fileId.toString();
    const metadata = await this._files.find({ _id: fileId }).next();
    if (metadata) {
      const filepath = path.join(targetDir, metadata.filename);
      const fileStream = fs.createWriteStream(filepath);
      const stream = this._files.openDownloadStream(fileId).pipe(fileStream);

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
    const client = mongoUri ? new MongoClient(mongoUri.toString()) : defaultClient;
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

async function streamClose(stream): Promise<void> {
  return new Promise((res, rej) => stream.on("close", res));
}

module.exports = MongoAdapter;
