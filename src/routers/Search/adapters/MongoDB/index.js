/**
 * This is a storage adapter for PDP which maps concepts from PDP to concepts
 * used by the taxonomy & data dashboard. Here is the basic mapping:
 *
 *    Process -> ArtifactSet
 *    Observation -> Artifact
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
const DownloadFile = require("../../DownloadFile");
const { Artifact, ArtifactSet } = require("../../Artifact");

const mongoUri = require("../../../../../config").mongo.uri;
const { MongoClient } = require("mongodb");
const defaultClient = new MongoClient(mongoUri);

class MongoAdapter {
  constructor(mongoUri, collectionName) {
    this._client = mongoUri ? new MongoClient(mongoUri) : defaultClient;
    const db = this._client.db();
    collectionName = `taxonomy_data_${collectionName}`;
    this._collection = db.collection(collectionName);
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
    const observerId = RouterUtils.getObserverIdFromToken(this._token);
    reqLogger.log(observerId, metadata);

    // TODO: update this to actually create the processes
    //const newProc = await this._createProcess(type);
    //await this._appendObservation(newProc.processId, type, metadata);

    //return newProc;
    // TODO: upload the data file
  }

  // TODO: update method signature to be more generic
  async getDownloadPath(processId, ids, formatter) {
    const obsIdxAndVersions = ids.map((idString) =>
      idString.split("_").map((n) => +n)
    );
    // obsIdxAndVersions is now a list of tuples (index, version) for each observation
    // to download
    const tmpDir = await PDP._prepareDownloadDir();
    const downloadDir = path.join(tmpDir, "download");
    const zipPath = path.join(tmpDir, `${processId}.zip`);

    await Promise.all(
      obsIdxAndVersions.map(([index, version]) =>
        this._downloadObservation(
          processId,
          index,
          version,
          downloadDir,
          formatter
        )
      )
    );

    await zip(downloadDir, zipPath, { compression: COMPRESSION_LEVEL.medium });
    await fsp.rm(downloadDir, { recursive: true });
    return new ObservationFilesArchive(zipPath, tmpDir);
  }

  async getUploadUrls(processId, lastId, metadata, files) {
    const procInfo = await this._getProcessState(processId);
    const index = procInfo.numObservations;
    const version = 0;
    const result = await this._appendObservationWithFiles(
      processId,
      index,
      version,
      this.processType,
      metadata,
      files
    );
    return result.uploadDataFiles.files;
  }

  static from(core, storageNode) {
    const baseUrl = core.getAttribute(storageNode, "URI");
    const collection = core.getAttribute(storageNode, "collection");
    return new MongoStorage(collection);
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
