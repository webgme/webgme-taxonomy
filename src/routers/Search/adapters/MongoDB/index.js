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
    console.log({ fileId, filename, fileStream });
    fileStream.pipe(writeStream);
  }

  // TODO: update method signature to be more generic
  async getDownloadPath(artifactSetId, ids, formatter) {}

  static from(core, storageNode) {
    const baseUrl = core.getAttribute(storageNode, "URI");
    const collection = core.getAttribute(storageNode, "collection");
    // TODO: throw an error if the collection is not provided
    return new MongoAdapter(baseUrl, collection);
  }
}

class ObservationFilesArchive extends DownloadFile {
  constructor(archivePath, tmpDir) {
    super(archivePath);
    this.tmpDir = tmpDir;
  }

  async cleanUp() {
    await fsp.rm(this.tmpDir, { recursive: true });
  }
}

module.exports = MongoAdapter;
