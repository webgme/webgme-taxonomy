/**
 * This is a storage adapter for PDP which maps concepts from PDP to concepts
 * used by the taxonomy & data dashboard. Here is the basic mapping:
 *
 *    Process -> ArtifactSet
 *    Observation -> Artifact
 */
import fetch from "node-fetch";
import fs from "fs";
import _ from "underscore";
import path from "path";
import fsp from "fs/promises";
import { newtype } from "./types";
import type {
  AppendObservationResponse,
  GetObservationFilesResponse,
  Observation,
  Process,
  ProcessID,
} from "./types";
import RouterUtils from "../../../../../common/routers/Utils";
import type { AuthenticatedRequest } from "../../../../../common/routers/Utils";
import type TagFormatter from "../../../../../common/TagFormatter";
import { FormatError } from "../../../../../common/TagFormatter";
import type {
  AzureGmeConfig,
  WebgmeContext,
} from "../../../../../common/types";
import { pipeline } from "stream";
import { promisify } from "util";
const streamPipeline = promisify(pipeline);
import { MissingAttributeError } from "../common/ModelError";
import type {
  Adapter,
  Artifact,
  ArtifactMetadata,
  Repository,
} from "../common/types";
import { filterMap, range, sleep } from "../../Utils";
import CreateRequestLogger from "./CreateRequestLogger";
const logFilePath = process.env.CREATE_LOG_PATH || "./CreateProcesses.jsonl";
const reqLogger = new CreateRequestLogger(logFilePath);
import {
  AppendResult,
  UploadParams,
  UploadRequest,
} from "../common/AppendResult";
const UPLOAD_HEADERS = {
  Accept: "application/xml",
  "Content-Type": "application/octet-stream",
  "x-ms-blob-type": "BlockBlob",
  "x-ms-encryption-algorithm": "AES256",
};

interface FetchOpts {
  headers?: { [key: string]: string };
  method?: string;
  body?: string;
}

const DefaultFetchOpts = () => ({
  headers: {},
  method: "GET",
});

export default class PDP implements Adapter {
  private _baseUrl: string;
  private _token: string;
  processType: string;

  constructor(baseUrl: string, token: string, processType: string) {
    this._baseUrl = baseUrl;
    this._token = token;
    this.processType = processType;
  }

  async listArtifacts(): Promise<Repository[]> {
    const allProcesses: Process[] = await this._fetchJson(
      "v2/Process/ListProcesses?permission=read",
    );

    const processObservations = await Promise.all(
      allProcesses
        .filter(({ processType }) => processType === this.processType)
        .map(({ processId }) => this.getProcessObservations(processId)),
    );

    const artifacts: Artifact[] = filterMap(
      processObservations.flat(),
      parseArtifact,
    );
    const repos: Repository[] = Object.entries(
      _.groupBy(artifacts, (artifact) => artifact.parentId ?? ""),
    ).map(([parentId, artifacts]) => {
      artifacts.sort((a1, a2) => (a1.time < a2.time ? -1 : 1));
      const { displayName } = artifacts[0];
      const lastIndex = artifacts.length - 1;
      const { taxonomyTags, taxonomyVersion } = artifacts[lastIndex];
      return {
        id: parentId,
        displayName,
        taxonomyTags,
        taxonomyVersion,
        children: artifacts,
      };
    });
    return repos;
  }

  async getProcessObservations(pid: ProcessID): Promise<Observation[]> {
    const obsInfo = await this._fetchJson(
      `v2/Process/GetProcessState?processId=${pid}`,
    );

    if (obsInfo.numObservations === 0) {
      return [];
    }

    const observations = await Promise.all(
      range(0, obsInfo.numObservations).map((i) =>
        this._fetchJson(
          "v2/Process/GetObservation?processId=" + pid + "&obsIndex=" + i,
        )
      ),
    );

    return observations;
  }

  async _getObsFiles(
    processId: ProcessID,
    obsIndex: number,
    version: number,
  ): Promise<GetObservationFilesResponse> {
    const queryDict = {
      processId: processId.toString(),
      obsIndex: obsIndex.toString(),
      version: version.toString(),
      endObsIndex: obsIndex.toString(),
      filePattern: "**/*",
    };
    const url = PDP._addQueryParams("v3/Files/GetObservationFiles", queryDict);
    const opts = {
      method: "put",
    };
    return await this._fetchJson(url, opts);
  }

  async _getObs(processId: ProcessID, obsIndex: number, version: number) {
    const queryDict = {
      processId: processId.toString(),
      obsIndex: obsIndex.toString(),
      version: version.toString(),
    };
    const url = PDP._addQueryParams("v2/Process/GetObservation", queryDict);
    const opts = {
      method: "get",
    };
    return await this._fetchJson(url, opts);
  }

  async _getFileTransferStatus(
    processId: ProcessID,
    directoryId: string,
    transferId: string,
  ) {
    const queryDict = {
      processId: processId.toString(),
      directoryId: directoryId.toString(),
      transferId: transferId.toString(),
    };
    const url = PDP._addQueryParams("v2/Files/GetTransferState", queryDict);
    return await this._fetchJson(url);
  }

  async _getProcessState(pid: ProcessID) {
    return await this._fetchJson(`v2/Process/GetProcessState?processId=${pid}`);
  }

  _getObserverId(): string {
    return RouterUtils.getObserverIdFromToken(this._token);
  }

  async createArtifact(metadata: ArtifactMetadata): Promise<string> {
    reqLogger.log(this._getObserverId(), metadata);

    // TODO: update this to actually create the processes
    //const newProc = await this._createProcess(type);
    //await this._appendObservation(newProc.processId, type, metadata);

    //return newProc;
    // TODO: upload the data file
    return "Submitted create request!";
  }

  // TODO: update method signature to be more generic
  async download(
    repoId: string,
    ids: string[],
    formatter: TagFormatter,
    downloadDir: string,
  ) {
    const processId = newtype<ProcessID>(repoId);
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
          formatter,
        )
      ),
    );
  }

  async _downloadObservation(
    processId: ProcessID,
    obsIndex: number,
    version: number,
    downloadDir: string,
    formatter: TagFormatter,
  ) {
    // Let's first get the observation metadata
    const responseObservation = await this._getObs(
      processId,
      obsIndex,
      version,
    );
    try {
      const metadata = responseObservation.data[0];
      metadata.taxonomyTags = formatter.toHumanFormat(
        metadata.taxonomyTags ?? [],
      );
      const metadataPath = path.join(
        downloadDir,
        `${obsIndex}`,
        `${version}`,
        `metadata.json`,
      );
      //let's save the observation metadata to a file metada.json
      await this._writeJsonData(metadataPath, metadata);
    } catch (err) {
      const logPath = path.join(
        downloadDir,
        `${obsIndex}`,
        `${version}`,
        `warnings.txt`,
      );
      if (isFormatError(err)) {
        const metadata = responseObservation.data[0];
        const metadataPath = path.join(
          downloadDir,
          `${obsIndex}`,
          `${version}`,
          `metadata.json`,
        );
        await this._writeJsonData(metadataPath, metadata);
        this._writeData(
          logPath,
          `An error occurred when converting the taxonomy tags: ${err.message}\n\nThe internal format has been saved in metadata.json.`,
        );
      } else {
        let msg = err instanceof Error ? err.message : err;
        this._writeData(
          logPath,
          `An error occurred when generating metadata.json: ${msg}`,
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
        response.transferId,
      );
      while (transferStatus && transferStatus.status != "Succeeded") {
        console.log("Ctx: About to wait for the download...");
        await sleep(1000);
        transferStatus = await this._getFileTransferStatus(
          response.processId,
          response.directoryId,
          response.transferId,
        );
      }
    }

    await Promise.all(
      response.files.map((file) =>
        this._downloadFile(
          PDP._correctFilePath(
            downloadDir,
            file.name,
            obsIndex,
            version,
          ),
          file.sasUrl,
        )
      ),
    );
  }

  async appendArtifact(
    repoId: string,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<AppendResult> {
    const processId = newtype<ProcessID>(repoId);
    const procInfo = await this._getProcessState(processId);
    const index = procInfo.numObservations;
    const version = 0;
    const result = await this._appendObservationWithFiles(
      processId,
      index,
      version,
      this.processType,
      metadata,
      filenames,
    );

    const files = result.uploadDataFiles.files.map((file) => {
      // name is prefixed with dat/index/version/<rest of path>
      const name = file.name.split("/").slice(3).join("/");
      const params = new UploadParams(file.sasUrl, "PUT", UPLOAD_HEADERS);
      return new UploadRequest(name, params);
    });

    return new AppendResult(index, files);
  }

  async _downloadFile(filePath: string, url: string) {
    const dirPath = path.dirname(filePath) + path.sep;
    await fsp.mkdir(dirPath, { recursive: true });

    const writeStream = fs.createWriteStream(filePath);
    const response = await fetch(url);
    await streamPipeline(response.body, writeStream);
  }

  async _writeData(filePath: string, data: string) {
    const dirPath = path.dirname(filePath) + path.sep;
    await fsp.mkdir(dirPath, { recursive: true });
    await fsp.writeFile(filePath, data);
  }

  async _writeJsonData(filePath: string, metadata: ArtifactMetadata) {
    this._writeData(filePath, JSON.stringify(metadata));
  }

  static _correctFilePath(
    downloadDir: string,
    filename: string,
    index: number,
    version: number,
  ) {
    return path.join(
      downloadDir,
      index.toString(),
      version.toString(),
      filename.replace("dat/" + index, ""),
    );
  }

  _createObservationData(
    processId: ProcessID,
    type: string,
    data: ArtifactMetadata,
  ): Observation {
    const timestamp = new Date().toISOString();
    return {
      isFunction: false,
      processType: type,
      processId,
      observerId: this._getObserverId(),
      isMeasure: true,
      index: 0,
      version: 0,
      startTime: timestamp,
      endTime: timestamp,
      applicationDependencies: [],
      processDependencies: [],
      data: [data],
      dataFiles: [],
    };
  }

  async _appendObservationWithFiles(
    processId: ProcessID,
    index: number,
    version: number,
    type: string,
    data: ArtifactMetadata,
    files: string[],
  ): Promise<AppendObservationResponse> {
    const observation = this._createObservationData(processId, type, data);
    observation.index = index;
    observation.version = version;

    // All files for a process share the same directory so we need to scope them
    // to an index/version
    const uploadDir = `${index}/${version}/`;
    observation.dataFiles = files
      .map((filename: string) => uploadDir + filename);

    return await this._appendObservation(processId, observation);
  }

  async _appendObservation(
    processId: ProcessID,
    observation: Observation,
  ): Promise<AppendObservationResponse> {
    return await this._fetchJson(
      `v3/Process/AppendObservation?processId=${processId}&uploadExpiresInMins=180`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(observation),
      },
    );
  }

  async _createProcess(type: string) {
    //TODO we probably need description field
    const queryDict = {
      isFunction: false.toString(),
      isVirtual: false.toString(),
      processType: encodeURIComponent(type),
      processDescription: encodeURIComponent(
        "A process created from webgme-taxonomy",
      ),
    };
    const url = PDP._addQueryParams("v2/Process/CreateProcess", queryDict);
    return await this._fetchJson(url, { headers: {}, method: "put" });
  }

  static _addQueryParams(
    baseUrl: string,
    queryDict: { [key: string]: string },
  ): string {
    const queryString = Object.entries(queryDict)
      .map((part) => part.join("="))
      .join("&");
    return baseUrl.replace(/\??$/, "?") + queryString;
  }

  async _fetch(url: string, opts: FetchOpts = DefaultFetchOpts()) {
    url = this._baseUrl + url;
    opts.headers = opts.headers || {};
    opts.headers.Authorization = "Bearer " + this._token;
    opts.headers.accept = opts.headers.accept || "application/json";
    // TODO: Check response status code
    return await fetch(url, opts);
  }

  async _fetchJson(url: string, opts: FetchOpts = DefaultFetchOpts()) {
    const response = await this._fetch(url, opts);
    return await response.json();
  }

  static from(
    gmeContext: WebgmeContext,
    storageNode: Core.Node,
    req: AuthenticatedRequest,
    gmeConfig: AzureGmeConfig,
  ) {
    const { core } = gmeContext;
    // TODO: create the storage adapter from the content type
    // const token = require("./token");
    const token =
      req.cookies[gmeConfig.authentication.azureActiveDirectory.cookieId];

    const baseUrl = core.getAttribute(storageNode, "URL");
    const processType = core.getAttribute(storageNode, "processType");

    if (!baseUrl) {
      throw new MissingAttributeError(gmeContext, storageNode, "URL");
    }
    if (!processType) {
      throw new MissingAttributeError(gmeContext, storageNode, "processType");
    }
    return new PDP(baseUrl.toString(), token, processType.toString());
  }
}

function parseArtifact(obs: Observation): Artifact | undefined {
  const metadata = obs.data && obs.data[0];
  if (metadata && metadata.displayName) {
    return {
      parentId: obs.processId.toString(),
      id: obs.index + "_" + obs.version,
      displayName: metadata.displayName,
      taxonomyTags: metadata.taxonomyTags,
      taxonomyVersion: metadata.taxonomyVersion,
      time: obs.startTime,
    };
  }
}

function isFormatError(err: any): err is FormatError {
  return err instanceof FormatError;
}
