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
const { MongoClient, GridFSBucket } = require("mongodb");
const defaultClient = new MongoClient(mongoUri);
const Adapter = require("../common/Adapter");

class MongoAdapter extends Adapter {
  constructor(mongoUri, collectionName) {
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

  async getUploadUrls(artifactSetId, artifactId, metadata, files) {
    const set = await this._collection.findOne({
      _id: ObjectId(artifactSetId),
    });
    if (set.artifacts[artifactId]) {
      throw new Error("Artifact ID already exists"); // FIXME: handle this case better
    } // TODO: check that the index is the next one in the list?

    // TODO: create the artifact
    const fileIds = _.range(files.length).map(() => new ObjectId());
    const artifact = {
      // FIXME: is this the same as the metadata?
      time: new Date(),
      files: fileIds,
    };

    const query = { _id: ObjectId(artifactSetId) };
    const result = await this._collection.updateOne(query, {
      $push: { artifacts: artifact },
    });

    // TODO: create the artifact and return tokens to the client
    return _.zip(files, fileIds);
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
