/**
 * This is a storage adapter for MongoDB which stores artifact sets
 * in documents along with any contained artifacts.
 */
const fetch = require("node-fetch");
const { zip, COMPRESSION_LEVEL } = require("zip-a-folder");
const fs = require("fs");
const _ = require("underscore");
const path = require("path");
const os = require("os");
const fsp = require("fs/promises");
const RouterUtils = require("../../../../common/routers/Utils");
const { FormatError } = require("../../../../common/TagFormatter");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);
const DownloadFile = require("../common/DownloadFile");
const { Artifact, ArtifactSet } = require("../common/Artifact");
const ModelError = require('../common/ModelError');

const mongoUri = require("../../../../../config").mongo.uri;
const { MongoClient, GridFSBucket, ObjectId } = require("mongodb");
const defaultClient = new MongoClient(mongoUri);
const Adapter = require("../common/Adapter");
const {
  AppendResult,
  UploadRequest,
  UploadParams,
} = require("../common/AppendResult");

class MongoAdapter extends Adapter {
  constructor(mongoUri, collectionName) {
    super();
    this._client = mongoUri ? new MongoClient(mongoUri) : defaultClient;
    const db = this._client.db();
    const name = `taxonomy_data_${collectionName}`;
    this._collection = db.collection(name);
    this._files = new GridFSBucket(db, { bucketName: name });
  }

  async listArtifacts() {
    const documents = await this._collection.find({}).toArray();
    return documents.map((doc) => {
      const artifacts = doc.artifacts.map(
        (data, index) =>
          new Artifact(
            doc._id,
            index,
            data.displayName,
            data.taxonomyTags,
            data.taxonomyVersion,
            data.time
          )
      );

      return new ArtifactSet(
        doc._id,
        doc.displayName,
        doc.taxonomyTags,
        doc.taxonomyVersion,
        artifacts
      );
    });
  }

  async createArtifact(metadata) {
    const artifactSet = {
      displayName: metadata.displayName,
      taxonomyVersion: metadata.taxonomy,
      taxonomyTags: [],
      artifacts: [],
    };
    const result = await this._collection.insertOne(artifactSet);

    return "Created!";
  }

  async appendArtifact(artifactSetId, metadata, filenames) {
    const set = await this._collection.findOne({
      _id: ObjectId(artifactSetId),
    });

    const fileIds = _.range(filenames.length).map(() => new ObjectId());
    const artifact = Object.assign({}, metadata);
    artifact.time = new Date();
    artifact.files = fileIds;

    const query = { _id: ObjectId(artifactSetId) };
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
      const url = `./artifacts/${artifactSetId}/${index}/${extendedId}/upload`;
      // TODO: add an authorization header
      const params = new UploadParams(url, "POST");
      return new UploadRequest(name, params);
    });
    return new AppendResult(index, files);
  }

  async uploadFile(artifactSetId, index, extendedId, fileStream) {
    const set = await this._collection.findOne({
      _id: ObjectId(artifactSetId),
    });
    const [fileId, ...nameChunks] = extendedId.split("_");
    const filename = nameChunks.join("_");
    const writeStream = this._files.openUploadStreamWithId(fileId, filename);
    const stream = fileStream.pipe(writeStream);
    await streamClose(stream);
  }

  // TODO: update method signature to be more generic
  async download(artifactSetId, ids, formatter, targetDir) {
    const set = await this._collection.findOne({
      _id: ObjectId(artifactSetId),
    });
    await Promise.all(
      ids.map(async (idx) => {
        const metadata = set.artifacts[idx];
        const artifactPath = path.join(targetDir, idx.toString());
        if (metadata) {
          const metadataPath = path.join(artifactPath, "metadata.json");
          try {
            metadata.taxonomyTags = await formatter.toHumanFormat(
              metadata.taxonomyTags
            );
            await writeJsonData(metadataPath, metadata);
          } catch (err) {
            const logPath = path.join(artifactPath, `warnings.txt`);
            if (err instanceof FormatError) {
              const metadata = responseObservation.data[0];
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

  async _downloadFile(fileId, targetDir) {
    fileId = fileId.toString();
    const metadata = await this._files.find({ _id: fileId }).next();
    const filepath = path.join(targetDir, metadata.filename);
    const fileStream = await fs.createWriteStream(filepath);
    const stream = this._files.openDownloadStream(fileId).pipe(fileStream);

    await streamClose(stream);
  }

  static from(core, storageNode) {
    const baseUrl = core.getAttribute(storageNode, "URI");
    const collection = core.getAttribute(storageNode, "collection");
    if (!collection) {
      const msg = 'No MongoDB collection specified';
      throw new ModelError(core.getPath(storageNode), msg);
    }
    return new MongoAdapter(baseUrl, collection);
  }
}

async function writeData(filePath, data) {
  const dirPath = path.dirname(filePath) + path.sep;
  await fsp.mkdir(dirPath, { recursive: true });
  await fsp.writeFile(filePath, data);
}

async function writeJsonData(filePath, metadata) {
  writeData(filePath, JSON.stringify(metadata));
}

async function streamClose(stream) {
  return new Promise((res, rej) => stream.on("close", res));
}

module.exports = MongoAdapter;
