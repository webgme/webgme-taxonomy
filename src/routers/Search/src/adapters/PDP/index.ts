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
import { newtype, TransferStatus } from "./types";
import { Result } from "oxide.ts";
import type {
  AppendObservationResponse,
  GetObservationFilesResponse,
  Observation,
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
import { filterMap, fromResult, intervals, Pattern, sleep } from "../../Utils";
import {
  AppendResult,
  UploadParams,
  UploadRequest,
} from "../common/AppendResult";
import PdpApi, { InMemoryPdp, PdpProvider } from "./api";
import { toArtifactMetadatav2 } from "../common/Helpers";
import ScopedFnQueue from "../../ScopedFnQueue";
const UPLOAD_HEADERS = {
  Accept: "application/xml",
  "Content-Type": "application/octet-stream",
  "x-ms-blob-type": "BlockBlob",
  "x-ms-encryption-algorithm": "AES256",
};

export default class PDP implements Adapter {
  private observerId: string;
  private _readToken: string;
  private _hostUri: string;
  private _repoLocks: ScopedFnQueue;
  processType: string;
  private api: PdpProvider;

  constructor(
    api: PdpProvider,
    processType: string,
    hostUri: string,
    observerId: string,
    readToken: string,
  ) {
    this.observerId = observerId;
    this.processType = processType;
    this._hostUri = hostUri;
    this._readToken = readToken;
    this.api = api;
    this._repoLocks = new ScopedFnQueue();
  }

  async listRepos(): Promise<Repository[]> {
    const processes = (await this.api.listProcesses({ token: this._readToken }))
      .map((allProcesses) =>
        allProcesses.filter(({ processType }) =>
          processType === this.processType
        )
      );
    const processMetadata = Result.all(
      ...await processes
        // fetch the first observation for each to get the repo metadata
        .map((processes): Promise<Result<Observation, Error>[]> =>
          Promise.all(
            processes.map(({ processId }) =>
              this.api.getObservation(processId, 0, 0, {
                token: this._readToken,
              })
            ),
          )
        ).unwrap(),
    )
      .unwrap();

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
    const obsInfo = fromResult(
      await this.api.getProcessState(pid, {
        token: this._readToken,
      }),
    );

    if (obsInfo.numObservations === 0) {
      return [];
    }

    // skip the first one since it contains repo metadata
    const start = 1;
    const observations = await Promise.all(
      intervals(start, obsInfo.numObservations, 20)
        .map(([start, len]) =>
          this.api.getObservations(
            pid,
            start,
            len,
            { token: this._readToken },
          )
        ),
    );

    return Result.all(...observations).unwrap().flat();
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
    return await this._repoLocks.run(repoId, async () => {
      const processId = newtype<ProcessID>(repoId);
      const procInfo = fromResult(await this.api.getProcessState(processId));
      const index = procInfo.numObservations;
      const version = 0;
      const reservation = new ObservationReservation(
        this._hostUri,
        processId,
        index,
        version,
      );

      try {
        const result = await fn(reservation);
        return result;
      } catch (err) {
        throw err;
      } finally {
        // TODO: disable the reservation
        // TODO: probably should make it a generic
      }
    });
  }

  async createArtifact(
    _res: ProcessReservation,
    metadata: ArtifactMetadata,
  ): Promise<string> {
    // TODO: we should set the ID based on the reservation
    return await this.api.createProcess(
      this.observerId,
      this.processType,
      metadata,
    );
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
        const response = (await this.api.getObservationFiles(
          processId,
          index,
          version,
        )).unwrap();
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
        await this.waitForTransfer(response);

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
    const response = fromResult(
      await this.api.getObservationFiles(
        processId,
        obsIndex,
        version,
      ),
    );
    if (response.files.length === 0) {
      return;
    }

    // wait for the transfer to complete and the files to be available
    await this.waitForTransfer(response);

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

  private async waitForTransfer(
    response: GetObservationFilesResponse,
  ): Promise<void> {
    if (response.transferId != null) {
      // TODO: refactor this
      let status = (await this.api.getTransferState(
        response.processId,
        response.directoryId,
        response.transferId,
      ))
        .map((state) => state.status)
        .unwrapOr(TransferStatus.Pending);

      while (status !== TransferStatus.Success) {
        console.log("Ctx: About to wait for the download...");
        await sleep(1000);
        status = (await this.api.getTransferState(
          response.processId,
          response.directoryId,
          response.transferId,
        ))
          .map((state) => state.status)
          .unwrapOr(TransferStatus.Pending);
      }
    }
  }

  private async getObsMetadata(
    processId: ProcessID,
    obsIndex: number,
    version: number,
    formatter: TagFormatter,
  ): Promise<any> {
    const responseObservation = (await this.api.getObservation(
      processId,
      obsIndex,
      version,
    )).unwrap();
    const metadata = toArtifactMetadatav2(responseObservation.data[0]);
    metadata.tags = formatter.toHumanFormat(
      metadata.tags ?? {},
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
    const responseObservation = (await this.api.getObservation(
      processId,
      obsIndex,
      version,
    )).unwrap();
    try {
      const metadata = toArtifactMetadatav2(responseObservation.data[0]);
      metadata.tags = formatter.toHumanFormat(
        metadata.tags ?? {},
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
    const procInfo = fromResult(await this.api.getProcessState(processId));
    const index = procInfo.numObservations;
    const version = 0;
    const result = fromResult(
      await this._appendObservationWithFiles(
        processId,
        index,
        version,
        this.processType,
        metadata,
        filenames,
      ),
    );

    console.log(JSON.stringify(result));
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
      observerId: this.observerId,
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
  ): Promise<Result<AppendObservationResponse, Error>> {
    const observation = this._createObservationData(processId, type, data);
    observation.index = index;
    observation.version = version;

    // All files for a process share the same directory so we need to scope them
    // to an index/version
    const uploadDir = `${index}/${version}/`;
    observation.dataFiles = files
      .map((filename: string) => uploadDir + filename);

    return await this.api.appendObservation(processId, observation);
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

    // This doesn't yet work (doesn't support file uploads)
    const isInMemorySandbox =
      baseUrl.toString().toLowerCase().trim() === "memory";

    let api, observerId;
    if (isInMemorySandbox) {
      api = new InMemoryPdp();
      observerId = "testUsername";
    } else {
      api = new PdpApi(baseUrl.toString(), processType.toString());
      observerId = RouterUtils.getObserverIdFromToken(userToken);
    }

    return new PDP(
      api,
      processType.toString(),
      hostUri,
      observerId,
      readToken || userToken,
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
    const md = toArtifactMetadatav2(metadata);
    return {
      id: obs.processId.toString(),
      displayName: md.displayName,
      tags: md.tags,
      taxonomyVersion: md.taxonomyVersion,
    };
  }
}

function parseArtifact(obs: Observation): Artifact | undefined {
  const metadata = obs.data && obs.data[0];
  if (metadata && metadata.displayName) {
    const md = toArtifactMetadatav2(metadata);
    return {
      parentId: obs.processId.toString(),
      id: obs.index + "_" + obs.version,
      displayName: md.displayName,
      tags: md.tags,
      taxonomyVersion: md.taxonomyVersion,
      time: obs.startTime,
    };
  }
}

function isFormatError(err: any): err is FormatError {
  return err instanceof FormatError;
}
