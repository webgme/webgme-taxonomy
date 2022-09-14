const pdpBase = "https://leappremonitiondev.azurewebsites.net/";
const fetch = require("node-fetch");
const { zip, COMPRESSION_LEVEL } = require("zip-a-folder");
const fs = require("fs");
const _ = require("underscore");
const path = require("path");
const os = require("os");
const fsp = require("fs/promises");
const RouterUtils = require("../../../../common/routers/Utils");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);
const DownloadFile = require("../../DownloadFile");
const { Artifact, ArtifactSet } = require("../../Artifact");
const CreateRequestLogger = require("./CreateRequestLogger");
const logFilePath = process.env.CREATE_LOG_PATH || "./CreateProcesses.jsonl";
const reqLogger = new CreateRequestLogger(logFilePath);

class PDP {
  constructor(token) {
    this.token = token;
  }

  async listArtifacts(type) {
    const allProcesses = await this._fetchJson(
      "v2/Process/ListProcesses?permission=read"
    );
    const processList = allProcesses.filter(
      (element) => element.processType === type
    );

    const processObservations = await Promise.all(
      processList.map(
        async (process) => await this.getProcessObservations(process.processId)
      )
    );

    const artifacts = filterMap(processObservations.flat(), parseArtifact);
    const artifactSets = Object.entries(
      _.groupBy(artifacts, (artifact) => artifact.parentId)
    ).map(([parentId, artifacts]) => {
      const latestArtifact = artifacts
        .sort((a1, a2) => (a1.time < a2.time ? -1 : 1))
        .pop();
      const { displayName, taxonomyTags } = latestArtifact;
      return new ArtifactSet(parentId, displayName, taxonomyTags, artifacts);
    });
    return artifactSets;
  }

  async getDownloadUrls(processId, obsIndex, version) {
    const result = await this._getObsFiles(processId, obsIndex, version);
    await sleep(5000); // FIXME: check for it to be ready. Not very pretty currently...
    return result.files.map((file) => file.sasUrl);
  }

  async _getObsFiles(processId, obsIndex, version) {
    const queryDict = {
      processId,
      obsIndex,
      version,
      endObsIndex: obsIndex,
    };
    const url = PDP._addQueryParams("v3/Files/GetObservationFiles", queryDict);
    const opts = {
      method: "put",
    };
    return await this._fetchJson(url, opts);
  }

  async _getObs(processId, obsIndex, version) {
    const queryDict = {
      processId,
      obsIndex,
      version,
    };
    const url = PDP._addQueryParams("v2/Process/GetObservation", queryDict);
    const opts = {
      method: "get",
    };
    return await this._fetchJson(url, opts);
  }

  async _getFileTransferStatus(processId, directoryId, transferId) {
    const queryDict = {
      processId,
      directoryId,
      transferId,
    };
    const url = PDP._addQueryParams("v2/Files/GetTransferState", queryDict);
    const opts = {
      method: "get",
    };
    return await this._fetchJson(url, opts);
  }

  async getLatestObservation(pid) {
    const obsInfo = await this._fetchJson(
      `v2/Process/GetProcessState?processId=${pid}`
    );

    const observations = await this._fetchJson(
      "v2/Process/GetObservation?processId=" +
        pid +
        "&obsIndex=" +
        (obsInfo.numObservations - 1)
    );

    return observations;
  }

  async getProcessObservations(pid) {
    const obsInfo = await this._fetchJson(
      `v2/Process/GetProcessState?processId=${pid}`
    );

    if (obsInfo.numObservations === 0) {
      return [];
    }

    const observations = await Promise.all(
      range(1, obsInfo.numObservations).map((i) =>
        this._fetchJson(
          "v2/Process/GetObservation?processId=" + pid + "&obsIndex=" + i
        )
      )
    );

    console.log(observations[0]);
    return observations;
  }

  async createArtifact(type, metadata) {
    const observerId = RouterUtils.getObserverIdFromToken(this.token);
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
    const responseObservation = await this._getObs(
      processId,
      obsIndex,
      version
    );
    const response = await this._getObsFiles(processId, obsIndex, version);
    if (response.files.length === 0) {
      return;
    }

    // wait for the transfer to complete and the files to be available
    if (response.transferId != null) {
      let transferStatus = await this._getFileTransferStatus(
        response.processId,
        response.directoryId,
        response.transferId
      );
      while (transferStatus && transferStatus.status != "Succeeded") {
        console.log("Ctx: About to wait for the download...");
        await sleep(1000);
        transferStatus = await this._getFileTransferStatus(
          response.processId,
          response.directoryId,
          response.transferId
        );
      }
    }

    const tmpDir = await PDP._prepareDownloadDir();
    const downloadDir = path.join(tmpDir, "download");
    const zipPath = path.join(tmpDir, `${processId}.zip`);

    const metadataPath = path.join(downloadDir, `metadata.json`);

    const metadata = responseObservation.data[0];
    metadata.taxonomyTags = await formatter.toHumanFormat(
      metadata.taxonomyTags
    );
    await this._downloadMetadataFile(metadataPath, metadata);
    await Promise.all(
      response.files.map((file) =>
        this._downloadFile(
          PDP._correctFilePath(downloadDir, file.name, obsIndex),
          file.sasUrl
        )
      )
    );

    await zip(downloadDir, zipPath, { compression: COMPRESSION_LEVEL.medium });
    await fsp.rm(downloadDir, { recursive: true });

    return new ObservationFilesArchive(zipPath, tmpDir);
  }

  async getUploadUrls(type, processId, lastId, metadata, files) {
    let index = 1;
    const version = 1;
    if (lastId) {
      const chunks = lastId.split("_");
      index = +chunks[0] + 1;
    }
    console.log(
      "getUploadUrls",
      type,
      processId,
      index,
      version,
      metadata,
      files
    );
    const result = await this._appendObservationWithFiles(
      processId,
      index,
      version,
      type,
      metadata,
      files
    );
    console.log({ result });
    return result.uploadDataFiles.files;
  }

  async _downloadFile(filePath, url) {
    const dirPath = path.dirname(filePath) + path.sep;
    await fsp.mkdir(dirPath, { recursive: true });

    const writeStream = fs.createWriteStream(filePath);
    const response = await fetch(url);
    await streamPipeline(response.body, writeStream);
  }

  async _downloadMetadataFile(filePath, metadata) {
    const dirPath = path.dirname(filePath) + path.sep;
    await fsp.mkdir(dirPath, { recursive: true });
    await fsp.writeFile(filePath, JSON.stringify(metadata));
  }

  static async _prepareDownloadDir() {
    return await fsp.mkdtemp(path.join(os.tmpdir(), "webgme-taxonomy-"));
  }

  static _correctFilePath(downloadDir, filename, index) {
    return path.join(downloadDir, filename.replace("dat/" + index, ""));
  }

  async _appendObservation(processId, type, data) {
    const timestamp = new Date().toISOString();
    const observation = {
      isFunction: false,
      processType: type,
      processId,
      observerId: RouterUtils.getObserverIdFromToken(this.token),
      isMeasure: false,
      index: 0,
      version: 0,
      startTime: timestamp,
      applicationDependencies: [],
      processDependencies: [],
      data: [data],
      dataFiles: [],
    };

    const response = await this._fetchJson(
      `v3/Process/AppendObservation?processId=${processId}`,
      {
        method: "post",
        body: observation,
      }
    );
  }

  async _appendObservationWithFiles(
    processId,
    index,
    version,
    type,
    data,
    files
  ) {
    const observation = {
      isFunction: false,
      processType: type,
      processId,
      observerId: RouterUtils.getObserverIdFromToken(this.token),
      isMeasure: true,
      index,
      version,
      data: [data],
      dataFiles: files,
    };

    return await this._fetchJson(
      `v3/Process/AppendObservation?processId=${processId}&uploadExpiresInMins=180`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(observation),
      }
    );
  }

  async _createProcess(type) {
    //TODO we probably need description field
    const queryDict = {
      isFunction: false,
      isVirtual: false,
      processType: encodeURIComponent(type),
      processDescription: encodeURIComponent(
        "A process created from webgme-taxonomy"
      ),
    };
    const url = PDP._addQueryParams("v2/Process/CreateProcess", queryDict);
    return await this._fetchJson(url, { method: "put" });
  }

  static _addQueryParams(baseUrl, queryDict) {
    const queryString = Object.entries(queryDict)
      .map((part) => part.join("="))
      .join("&");
    return baseUrl.replace(/\??$/, "?") + queryString;
  }

  async _fetch(url, opts = {}) {
    url = pdpBase + url;
    opts.headers = opts.headers || {};
    opts.headers.Authorization = "Bearer " + this.token;
    opts.headers.accept = opts.headers.accept || "application/json";
    // TODO: Check response status code
    return await fetch(url, opts);
  }

  async _fetchJson(url, opts = {}) {
    const response = await this._fetch(url, opts);
    console.log(response);
    return await response.json();
  }

  static from(req, gmeConfig) {
    // const token = require("./token");
    const token =
      req.cookies[gmeConfig.authentication.azureActiveDirectory.cookieId];
    return new PDP(token);
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

function parseArtifact(obs) {
  console.log("parse", obs);
  const metadata = obs.data && obs.data[0];
  if (metadata && metadata.displayName) {
    return new Artifact(
      obs.processId,
      obs.index + "_" + obs.version,
      metadata.displayName,
      metadata.taxonomyTags,
      obs.startTime
    );
  }
}

async function sleep(duration) {
  return new Promise((res) => setTimeout(res, duration));
}

function range(start, end) {
  const len = end - start;
  return [...new Array(len)].map((v, index) => start + index);
}

function filterMap(list, fn) {
  return list.reduce((keep, next) => {
    const result = fn(next);
    if (result !== undefined) {
      keep.push(result);
    }
    return keep;
  }, []);
}

module.exports = PDP;
