const pdpBase = "https://leappremonitiondev.azurewebsites.net/";
const fetch = require("node-fetch");
const { zip, COMPRESSION_LEVEL } = require("zip-a-folder");
const fs = require("fs");
const path = require("path");
const os = require("os");
const fsp = require("fs/promises");
const RouterUtils = require("../../common/routers/Utils");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);
const DownloadFile = require("./DownloadFile");

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
        async (process) => await this.getLatestObservation(process.processId)
      )
    );

    return processObservations.flat();
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
      //headers: {
      //"Content-Type":'application/json-patch+json'
      //},
      //body: '["string"]'
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

    const observations = await Promise.all(
      range(1, obsInfo.numObservations).map((i) =>
        this._fetchJson(
          "v2/Process/GetObservation?processId=" + pid + "&obsIndex=" + i
        )
      )
    );

    return observations;
  }

  async createArtifact(type, metadata) {
    const newProc = await this._createProcess(type);
    await this._appendObservation(newProc.processId, type, metadata);
    return newProc;
    // TODO: upload the data file
  }

  async getDownloadPath(processId, obsIndex, version) {
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

  async getUploadUrls(type, processId, index, version, metadata, files) {
    const result = await this._appendObservationWithFiles(
      processId,
      index,
      version,
      type,
      metadata,
      files
    );
    return result.uploadDataFiles.files;
  }

  async _downloadFile(filePath, url) {
    const dirPath = path.dirname(filePath) + path.sep;
    await fsp.mkdir(dirPath, { recursive: true });

    const writeStream = fs.createWriteStream(filePath);
    const response = await fetch(url);
    await streamPipeline(response.body, writeStream);
  }

  static async _prepareDownloadDir() {
    return await fsp.mkdtemp(path.join(os.tmpdir(), "webgme-taxonomy-"));
  }

  static _correctFilePath(downloadDir, filename, index) {
    return path.join(downloadDir, filename.replace("dat/" + index, ""));
  }

  async _appendObservation(processId, type, data) {
    const observation = {
      isFunction: false,
      processType: type,
      processId,
      observerId: RouterUtils.getObserverIdFromToken(this.token),
      isMeasure: false,
      index: 0,
      version: 0,
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
    //const token = require("./token");
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

async function sleep(duration) {
  return new Promise((res) => setTimeout(res, duration));
}

function range(start, end) {
  const len = end - start;
  return [...new Array(len)].map((v, index) => start + index);
}

module.exports = PDP;
