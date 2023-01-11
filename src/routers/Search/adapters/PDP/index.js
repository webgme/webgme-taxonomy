/**
 * This is a storage adapter for PDP which maps concepts from PDP to concepts
 * used by the taxonomy & data dashboard. Here is the basic mapping:
 *
 *    Process -> ArtifactSet
 *    Observation -> Artifact
 */
const fetch = require("node-fetch");
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
const { MissingAttributeError } = require("../common/ModelError");
const { Artifact, ArtifactSet } = require("../common/Artifact");
const CreateRequestLogger = require("./CreateRequestLogger");
const logFilePath = process.env.CREATE_LOG_PATH || "./CreateProcesses.jsonl";
const reqLogger = new CreateRequestLogger(logFilePath);
const {
  AppendResult,
  UploadRequest,
  UploadParams,
} = require("../common/AppendResult");
const UPLOAD_HEADERS = {
  Accept: "application/xml",
  "Content-Type": "application/octet-stream",
  "x-ms-blob-type": "BlockBlob",
  "x-ms-encryption-algorithm": "AES256",
};

class PDP {
  constructor(baseUrl, token, processType) {
    this._baseUrl = baseUrl;
    this._token = token;
    this.processType = processType;
  }

  async listArtifacts() {
    const allProcesses = await this._fetchJson(
      "v2/Process/ListProcesses?permission=read"
    );

    const processObservations = await Promise.all(
      allProcesses
        .filter(({ processType }) => processType === this.processType)
        .map(({ processId }) => this.getProcessObservations(processId))
    );

    const artifacts = filterMap(processObservations.flat(), parseArtifact);
    const artifactSets = Object.entries(
      _.groupBy(artifacts, (artifact) => artifact.parentId)
    ).map(([parentId, artifacts]) => {
      artifacts.sort((a1, a2) => (a1.time < a2.time ? -1 : 1));
      const { displayName } = _.first(artifacts);
      const { taxonomyTags, taxonomyVersion } = _.last(artifacts);
      return new ArtifactSet(
        parentId,
        displayName,
        taxonomyTags,
        taxonomyVersion,
        artifacts
      );
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
    const procInfo = await this._getProcessState(pid);

    const observations = await this._fetchJson(
      "v2/Process/GetObservation?processId=" +
        pid +
        "&obsIndex=" +
        (procInfo.numObservations - 1)
    );

    return observations;
  }

  async _getProcessState(pid) {
    return await this._fetchJson(`v2/Process/GetProcessState?processId=${pid}`);
  }

  async getProcessObservations(pid) {
    const obsInfo = await this._fetchJson(
      `v2/Process/GetProcessState?processId=${pid}`
    );

    if (obsInfo.numObservations === 0) {
      return [];
    }

    const observations = await Promise.all(
      range(0, obsInfo.numObservations).map((i) =>
        this._fetchJson(
          "v2/Process/GetObservation?processId=" + pid + "&obsIndex=" + i
        )
      )
    );

    return observations;
  }

  async createArtifact(metadata) {
    const observerId = RouterUtils.getObserverIdFromToken(this._token);
    reqLogger.log(observerId, metadata);

    // TODO: update this to actually create the processes
    //const newProc = await this._createProcess(type);
    //await this._appendObservation(newProc.processId, type, metadata);

    //return newProc;
    // TODO: upload the data file
    return "Submitted create request!";
  }

  // TODO: update method signature to be more generic
  async download(processId, ids, formatter, downloadDir) {
    const obsIdxAndVersions = ids.map((idString) =>
      idString.split("_").map((n) => +n)
    );
    // obsIdxAndVersions is now a list of tuples (index, version) for each observation
    // to download
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
  }

  async _downloadObservation(
    processId,
    obsIndex,
    version,
    downloadDir,
    formatter
  ) {
    console.log(obsIndex, version);
    // Let's first get the observation metadata
    const responseObservation = await this._getObs(
      processId,
      obsIndex,
      version
    );
    try {
      const metadata = responseObservation.data[0];
      metadata.taxonomyTags = await formatter.toHumanFormat(
        metadata.taxonomyTags
      );
      const metadataPath = path.join(
        downloadDir,
        `${obsIndex}`,
        `${version}`,
        `metadata.json`
      );
      //let's save the observation metadata to a file metada.json
      await this._writeJsonData(metadataPath, metadata);
    } catch (err) {
      const logPath = path.join(
        downloadDir,
        `${obsIndex}`,
        `${version}`,
        `warnings.txt`
      );
      if (err instanceof FormatError) {
        const metadata = responseObservation.data[0];
        const metadataPath = path.join(
          downloadDir,
          `${obsIndex}`,
          `${version}`,
          `metadata.json`
        );
        await this._writeJsonData(metadataPath, metadata);
        this._writeData(
          logPath,
          `An error occurred when converting the taxonomy tags: ${err.message}\n\nThe internal format has been saved in metadata.json.`
        );
      } else {
        this._writeData(
          logPath,
          `An error occurred when generating metadata.json: ${err.message}`
        );
      }
    }

    // Lets download the actual files associated with this observation,index
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

    await Promise.all(
      response.files.map((file) =>
        this._downloadFile(
          PDP._correctFilePath(
            downloadDir,
            file.name,
            obsIndex.toString(),
            version.toString()
          ),
          file.sasUrl
        )
      )
    );
  }

  async appendArtifact(processId, metadata, filenames) {
    const procInfo = await this._getProcessState(processId);
    const index = procInfo.numObservations;
    const version = 0;
    const result = await this._appendObservationWithFiles(
      processId,
      index,
      version,
      this.processType,
      metadata,
      filenames
    );

    const files = result.uploadDataFiles.files.map((file) => {
      const name = file.name.substring(4);
      const params = new UploadParams(file.sasUrl, "PUT", UPLOAD_HEADERS);
      return new UploadRequest(name, params);
    });

    return new AppendResult(index, files);
  }

  async _downloadFile(filePath, url) {
    const dirPath = path.dirname(filePath) + path.sep;
    await fsp.mkdir(dirPath, { recursive: true });

    const writeStream = fs.createWriteStream(filePath);
    const response = await fetch(url);
    await streamPipeline(response.body, writeStream);
  }

  async _writeData(filePath, data) {
    const dirPath = path.dirname(filePath) + path.sep;
    await fsp.mkdir(dirPath, { recursive: true });
    await fsp.writeFile(filePath, data);
  }

  async _writeJsonData(filePath, metadata) {
    this._writeData(filePath, JSON.stringify(metadata));
  }

  static _correctFilePath(downloadDir, filename, index, version) {
    return path.join(
      downloadDir,
      index,
      version,
      filename.replace("dat/" + index, "")
    );
  }

  _createObservationData(processId, type, data) {
    const timestamp = new Date().toISOString();
    return {
      isFunction: false,
      processType: type,
      processId,
      observerId: RouterUtils.getObserverIdFromToken(this._token),
      isMeasure: true,
      index: 0,
      version: 0,
      startTime: timestamp,
      applicationDependencies: [],
      processDependencies: [],
      data: [data],
      dataFiles: [],
    };
  }

  async _appendObservation(processId, type, data) {
    const observation = this._createObservationData(processId, type, data);
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
    const observation = this._createObservationData(processId, type, data);
    observation.index = index;
    observation.version = version;
    observation.dataFiles = files;

    console.log(observation);
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
    url = this._baseUrl + url;
    opts.headers = opts.headers || {};
    opts.headers.Authorization = "Bearer " + this._token;
    opts.headers.accept = opts.headers.accept || "application/json";
    // TODO: Check response status code
    return await fetch(url, opts);
  }

  async _fetchJson(url, opts = {}) {
    const response = await this._fetch(url, opts);
    console.log(response);
    return await response.json();
  }

  static from(core, storageNode, req, gmeConfig) {
    // TODO: create the storage adapter from the content type
    // const token = require("./token");
    const token =
      req.cookies[gmeConfig.authentication.azureActiveDirectory.cookieId];

    const baseUrl = core.getAttribute(storageNode, "URL");
    const processType = core.getAttribute(storageNode, "processType");

    if (!baseUrl) {
      throw new MissingAttributeError(core, storageNode, "URL");
    }
    if (!processType) {
      throw new MissingAttributeError(core, storageNode, "processType");
    }
    return new PDP(baseUrl, token, processType);
  }
}

function parseArtifact(obs) {
  const metadata = obs.data && obs.data[0];
  if (metadata && metadata.displayName) {
    return new Artifact(
      obs.processId,
      obs.index + "_" + obs.version,
      metadata.displayName,
      metadata.taxonomyTags,
      metadata.taxonomyVersion,
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
