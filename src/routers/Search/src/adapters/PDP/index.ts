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
import { Result } from "oxide.ts";
import type {
  AppendObservationResponse,
  GetObservationFilesResponse,
  Observation,
  Process,
  ProcessID,
} from "./types";
import RouterUtils from "../../../../../common/routers/Utils";
import withTokens from "./tokens";
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
import {
  InvalidAttributeError,
  MissingAttributeError,
} from "../common/ModelError";
import type {
  Adapter,
  Artifact,
  ArtifactMetadata,
  DownloadInfo,
  Repository,
  UploadReservation,
} from "../common/types";
import { filterMap, intervals, Pattern, retry, sleep } from "../../Utils";
import CreateRequestLogger from "./CreateRequestLogger";
const logFilePath = process.env.CREATE_LOG_PATH || "./CreateProcesses.jsonl";
const reqLogger = new CreateRequestLogger(logFilePath);
import {
  AppendResult,
  UploadParams,
  UploadRequest,
} from "../common/AppendResult";
import { CreateResult, Status } from "../common/CreateResult";
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

function setAuthToken(opts: FetchOpts, token: string): FetchOpts {
  opts.headers = opts.headers || {};
  opts.headers.Authorization = opts.headers.Authorization ||
    "Bearer " + token;

  return opts;
}

export default class PDP implements Adapter {
  private _baseUrl: string;
  private _token: string;
  private _readToken: string;
  private _hostUri: string;
  processType: string;

  constructor(
    baseUrl: string,
    processType: string,
    hostUri: string,
    token: string,
    readToken: string | undefined,
  ) {
    this._baseUrl = baseUrl;
    this._token = token;
    this.processType = processType;
    this._hostUri = hostUri;
    this._readToken = readToken || token;
  }

  async listRepos(): Promise<Repository[]> {
    const allProcesses: Process[] = await this._fetchJson(
      "v2/Process/ListProcesses?permission=read",
      setAuthToken(DefaultFetchOpts(), this._readToken),
    );

    // fetch the first observation for each to get the repo metadata
    const processMetadata = await Promise.all(
      allProcesses
        .filter(({ processType }) => processType === this.processType)
        .map(({ processId }) =>
          this.getObservation(processId, 0, 1, this._readToken)
        ),
    );

    const repos: Repository[] = filterMap(
      processMetadata,
      parseRepository,
    );

    return repos;
  }

  async listArtifacts(repoId: string): Promise<Artifact[]> {
    const processId = newtype<ProcessID>(repoId);
    const observations = await this.getProcessObservations(processId);
    const artifacts: Artifact[] = filterMap(
      observations,
      parseArtifact,
    );

    return artifacts;
  }

  private async getProcessObservations(pid: ProcessID): Promise<Observation[]> {
    const obsInfo = await this._fetchJson(
      `v2/Process/GetProcessState?processId=${pid}`,
      setAuthToken(DefaultFetchOpts(), this._readToken),
    );

    if (obsInfo.numObservations === 0) {
      return [];
    }

    // skip the first one since it contains repo metadata
    const start = 1;
    const observations = await Promise.all(
      intervals(start, obsInfo.numObservations, 20)
        .map(([start, len]) =>
          this.getObservations(
            pid,
            start,
            len,
            this._readToken,
          )
        ),
    );

    return observations.flat();
  }

  private async getObservations(
    processId: ProcessID,
    startIndex: number,
    limit: number = 20,
    token: string = this._token,
  ): Promise<Observation[]> {
    const observations: Observation[] = await this._fetchJson(
      `v2/Process/PeekObservations?processId=${processId}&obsIndex=${startIndex}` +
        `&maxReturn=${limit}`,
      setAuthToken(DefaultFetchOpts(), token),
    );

    return observations;
  }

  private async getObservation(
    processId: ProcessID,
    obsIndex: number,
    version: number,
    token: string = this._token,
  ): Promise<Observation> {
    const queryDict = {
      processId: processId.toString(),
      obsIndex: obsIndex.toString(),
      version: version.toString(),
    };
    const url = PDP._addQueryParams("v2/Process/GetObservation", queryDict);
    const opts = setAuthToken(DefaultFetchOpts(), token);
    return await this._fetchJson(url, opts);
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

  async withRepoReservation<T>(
    fn: (res: ProcessReservation) => Promise<T>,
  ): Promise<T> {
    const reservation = new ProcessReservation(this._hostUri, "PROCESS_ID");

    try {
      return await fn(reservation);
    } catch (err) {
      // TODO: clean up the reservation?
      throw err;
      // TODO: release the reservation
    }
  }

  async withContentReservation<T>(
    fn: (res: ObservationReservation) => Promise<T>,
    repoId: string,
  ): Promise<T> {
    const processId = newtype<ProcessID>(repoId);
    const procInfo = await this._getProcessState(processId);
    const index = procInfo.numObservations;
    const version = 0;
    const reservation = new ObservationReservation(
      this._hostUri,
      processId,
      index,
      version,
    );

    try {
      return await fn(reservation);
    } catch (err) {
      // TODO: clean up the reservation?
      throw err;
      // TODO: release the reservation
    }
  }

  async createArtifact(
    _res: ProcessReservation,
    metadata: ArtifactMetadata,
  ): Promise<CreateResult> {
    reqLogger.log(this._getObserverId(), metadata);
    return new CreateResult(Status.Submitted);
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

  async getMetadata(
    repoId: string,
    contentId: string,
    formatter: TagFormatter,
  ): Promise<any> {
    const processId = newtype<ProcessID>(repoId);
    const [index, version] = contentId.split("_").map((n) => +n);
    return await this.getObsMetadata(
      processId,
      index,
      version,
      formatter,
    );
  }

  async getBulkMetadata(
    repoId: string,
    contentIds: string[],
    formatter: TagFormatter,
  ): Promise<any> {
    return await Promise.all(
      contentIds.map((id) => this.getMetadata(repoId, id, formatter)),
    );
  }

  async downloadFileURLs(
    repoId: string,
    contentIds: string[],
  ): Promise<DownloadInfo[]> {
    const processId = newtype<ProcessID>(repoId);
    const obsIdxAndVersions = contentIds.map((idString) =>
      idString.split("_").map((n) => +n)
    );
    // obsIdxAndVersions is now a list of tuples (index, version) for each observation
    // to download

    const response = await Promise.all(
      obsIdxAndVersions.map(async ([index, version]) => {
        // Lets download the actual files associated with this observation,index
        const response = await this._getObsFiles(processId, index, version);
        if (response.files.length === 0) {
          return {
            repoId: processId.toString(),
            obsIndex: index,
            version: version,
            files: [],
          };
        }
        // return the file name and urls
        console.log(response.files);
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
        return {
          repoId: processId.toString(),
          id: `${index}_${version}`,
          files: response.files.map((file) => ({
            name: file.name,
            url: file.sasUrl,
          })),
        };
      }),
    );
    // Here we return the object array containing ObservationFile objects
    if (response.length === 0) {
      return [];
    }
    return response as unknown as DownloadInfo[];
  }

  async _downloadObservation(
    processId: ProcessID,
    obsIndex: number,
    version: number,
    downloadDir: string,
    formatter: TagFormatter,
  ) {
    // Let's first get the observation metadata
    await this.writeObsMetadata(
      processId,
      obsIndex,
      version,
      formatter,
      downloadDir,
    );

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

  private async getObsMetadata(
    processId: ProcessID,
    obsIndex: number,
    version: number,
    formatter: TagFormatter,
  ): Promise<any> {
    const responseObservation = await this.getObservation(
      processId,
      obsIndex,
      version,
    );
    const metadata = responseObservation.data[0];
    metadata.taxonomyTags = formatter.toHumanFormat(
      metadata.taxonomyTags ?? [],
    );

    return metadata;
  }

  private async writeObsMetadata(
    processId: ProcessID,
    obsIndex: number,
    version: number,
    formatter: TagFormatter,
    downloadDir: string,
  ) {
    const responseObservation = await this.getObservation(
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
        await this._writeData(
          logPath,
          `An error occurred when converting the taxonomy tags: ${err.message}\n\nThe internal format has been saved in metadata.json.`,
        );
      } else {
        let msg = err instanceof Error ? err.message : err;
        await this._writeData(
          logPath,
          `An error occurred when generating metadata.json: ${msg}`,
        );
      }
    }
  }

  async appendArtifact(
    res: ObservationReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<AppendResult> {
    const processId = res.processId;
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
    console.log(`Ctx: Wrote data to ${filePath}`);
  }

  async _writeJsonData(filePath: string, metadata: ArtifactMetadata) {
    await this._writeData(filePath, JSON.stringify(metadata));
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

  private async _createProcess(type: string): Promise<ProcessOwnerPermissions> {
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
    opts.headers.Authorization = opts.headers.Authorization ||
      "Bearer " + this._token;
    opts.headers.accept = opts.headers.accept || "application/json";
    return await retry(async () => {
      const response = await fetch(url, opts);
      if (response.status > 399) {
        const msg = `${opts.method || "GET"} ${url} failed: ${await response
          .text()} (${response.status})`;
        throw new Error(msg);
      }
      return response;
    });
  }

  async _fetchJson(url: string, opts: FetchOpts = DefaultFetchOpts()) {
    const response = await this._fetch(url, opts);
    return await response.json();
  }

  static async from(
    gmeContext: WebgmeContext,
    storageNode: Core.Node,
    req: AuthenticatedRequest,
    gmeConfig: AzureGmeConfig,
  ) {
    const { core } = gmeContext;
    const baseUrl = core.getAttribute(storageNode, "URL");
    const processType = core.getAttribute(storageNode, "processType");

    if (!baseUrl) {
      throw new MissingAttributeError(gmeContext, storageNode, "URL");
    }
    if (!processType) {
      throw new MissingAttributeError(gmeContext, storageNode, "processType");
    }

    const userToken =
      req.cookies[gmeConfig.authentication.azureActiveDirectory.cookieId];

    // We currently allow setting a different token used only for read operations.
    // This is a temporary workaround for the lack of read-only permissions in PDP.
    const projectId = gmeContext.project.projectId;
    const readToken = await withTokens(
      gmeConfig,
      (tokens) => tokens.get(projectId),
    );

    const hostUri = Result.safe(
      PDP.getHostUri,
      baseUrl.toString(),
      processType.toString(),
    )
      .mapErr((err) =>
        new InvalidAttributeError(gmeContext, storageNode, "URL", err.message)
      )
      .unwrap();

    return new PDP(
      baseUrl.toString(),
      processType.toString(),
      hostUri,
      userToken,
      readToken,
    );
  }

  static getHostUri(baseUrl: string, processType: string): string {
    if (baseUrl.startsWith("http://")) {
      throw new Error("URL must use https");
    }

    const hostAddr = baseUrl
      .replace(/^(https:\/\/)?/, "")
      .replace(/\/$/, "");
    return `pdp://${hostAddr}/${processType}`;
  }

  static getUriPatterns(): string[] {
    const hexSeq = "[0-9a-f]+";
    const idPattern = [hexSeq, hexSeq, hexSeq, hexSeq, hexSeq].join("-");
    const indexPattern = "[0-9]+";
    const versionPattern = "[0-9]+";

    const typePattern = "[a-zA-Z]+";
    const hostPattern = `pdp://${Pattern.URL}/${typePattern}/`;

    const newProcessPattern = `PROCESS_ID`;
    const processPattern = Pattern.anyIn(idPattern, newProcessPattern);

    const repoPattern = hostPattern + processPattern;
    return [
      repoPattern,
      repoPattern + "/" + indexPattern + "/" + versionPattern,
    ];
  }
}

interface PdpReservation extends UploadReservation {
  uri: string;
  repoId: string;
}

class ProcessReservation implements PdpReservation {
  uri: string;
  repoId: string;

  constructor(hostUri: string, repoId: string) {
    this.uri = hostUri + "/" + repoId;
    this.repoId = repoId;
  }
}

class ObservationReservation implements PdpReservation {
  uri: string;
  repoId: string;
  index: number;
  version: number;
  processId: ProcessID;

  constructor(
    hostUri: string,
    processId: ProcessID,
    index: number,
    version: number,
  ) {
    const uri = [processId.toString(), index, version].join("/");
    this.uri = `${hostUri}/${uri}`;
    this.repoId = processId.toString();
    this.processId = processId;
    this.index = index;
    this.version = version;
  }
}

function parseRepository(
  obs: Observation,
): Repository | undefined {
  const metadata = obs.data && obs.data[0];
  if (metadata) {
    return {
      id: obs.processId.toString(),
      displayName: metadata.displayName,
      taxonomyTags: metadata.taxonomyTags,
      taxonomyVersion: metadata.taxonomyVersion,
    };
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

interface ProcessOwnerPermissions {
  isFunction: boolean;
  processType: string;
  processId: ProcessID;
  principalId: string;
  permission: string;
}

function isFormatError(err: any): err is FormatError {
  return err instanceof FormatError;
}
