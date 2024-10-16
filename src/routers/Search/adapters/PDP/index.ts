/**
 * This is a storage adapter for PDP which maps concepts from PDP to concepts
 * used by the taxonomy & data dashboard. Here is the basic mapping:
 *
 *    Process -> ArtifactSet
 *    Observation -> Artifact
 */
import type { Request } from "express";
import fetch from "node-fetch";
import fs from "fs";
import _, { without } from "underscore";
import path from "path";
import fsp from "fs/promises";
import {
  ContentDeletion,
  ContentUpdate,
  LatestMetadata,
  newtype,
  ObservationData,
  TransferStatus,
} from "./types";
import { Option, Result } from "oxide.ts";
import type {
  GetObservationFilesResponse,
  Observation,
  ProcessID,
} from "./types";
import RouterUtils from "../../../../common/routers/Utils";
import withTokens from "./tokens";
import type {
  AzureGmeConfig,
  GmeContentContext,
} from "../../../../common/types";
import { pipeline } from "stream";
import { promisify } from "util";
const streamPipeline = promisify(pipeline);
import {
  InvalidAttributeError,
  MissingAttributeError,
} from "../common/ModelError";
import { RepositoryNotFound } from "../common/StorageError";
import type {
  Adapter,
  Artifact,
  ArtifactMetadata,
  ArtifactMetadatav2,
  ContentReservation,
  DisableResult,
  DownloadInfo,
  FileStreamDict,
  RepoReservation,
  Repository,
  UpdateReservation,
  UpdateResult,
} from "../common/types";
import { fromResult, intervals, Pattern, range, sleep } from "../../Utils";
import { filterMapOpt } from "../../../../common/Utils";
import {
  AppendResult,
  UploadParams,
  UploadRequest,
} from "../common/AppendResult";
import PdpApi, { InMemoryPdp, PdpProvider } from "./api";
import { toArtifactMetadatav2 } from "../common/Helpers";
import ScopedFnQueue from "../../ScopedFnQueue";
import {
  ContentNotFoundError,
  DeletedContentError,
  MalformedContentIdError,
  UserError,
} from "../../../../common/UserError";
const UPLOAD_HEADERS = {
  Accept: "application/xml",
  "Content-Type": "application/octet-stream",
  "x-ms-blob-type": "BlockBlob",
  "x-ms-encryption-algorithm": "AES256",
};

const hexSeq = "[0-9a-f]+";
const idPattern = [hexSeq, hexSeq, hexSeq, hexSeq, hexSeq].join("-");
const indexPattern = "[0-9]+";
const versionPattern = "[0-9]+";
const typePattern = "[a-zA-Z_0-9]+";
const newProcessPattern = `PROCESS_ID`;
const processPattern = Pattern.anyIn(idPattern, newProcessPattern);

const hostPattern = `pdp://${Pattern.URL}/${typePattern}`;
const repoPattern = hostPattern + "/" + processPattern;
const contentPattern = repoPattern + "/" + indexPattern + "/" + versionPattern;

function getValidVersions(data: ObservationData): number[] {
  return matchObsDatum(data, {
    ArtifactMetadata(_md) {
      return [0];
    },
    ContentUpdate(md) {
      return md.validVersions;
    },
    ContentDeletion(md) {
      return md.validVersions;
    },
  });
}

export default class PDP implements Adapter {
  private observerId: string;
  private _readToken: string;
  private _hostUri: string;
  private _repoLocks: ScopedFnQueue;
  private _contentLocks: ScopedFnQueue;
  processType: string;
  private api: PdpProvider;

  constructor(
    api: PdpProvider,
    hostUri: HostUri,
    observerId: string,
    readToken: string,
  ) {
    this.observerId = observerId;
    this.processType = hostUri.processType;
    this._hostUri = hostUri.toString();
    this._readToken = readToken;
    this.api = api;
    this._repoLocks = new ScopedFnQueue();
    this._contentLocks = new ScopedFnQueue();
  }

  async listRepos(): Promise<Repository[]> {
    const allProcesses = fromResult(
      await this.api.listProcesses({ token: this._readToken }),
    );
    const processes = allProcesses.filter(({ processType }) =>
      processType === this.processType
    );
    const processIds = processes.map(({ processId }) => processId);
    return await Promise.all(
      processIds.map(async (id) =>
        fromResult(await this._getRepositoryMetadata(id))
      ),
    );
  }

  async getRepoMetadata(id: string): Promise<Repository> {
    const processId = newtype<ProcessID>(id);
    return fromResult(await this._getRepositoryMetadata(processId));
  }

  private async _getRepositoryMetadata(
    id: ProcessID,
  ): Promise<Result<Repository, UserError>> {
    // fetch the first observation for each to get the repo metadata
    const metadataR = await this.api.getObservation(id, 0, 0, {
      token: this._readToken,
    });
    const metadata = metadataR.andThen((metadata) =>
      parseRepository(metadata).okOr(new RepositoryNotFound(id.toString()))
    );
    return metadata;
  }

  async listArtifacts(
    repoId: string,
    includeAllVersions?: boolean,
  ): Promise<Artifact[]> {
    const processId = newtype<ProcessID>(repoId);
    const observations = await this.getProcessObservations(processId);
    let artifacts: Artifact[] = filterMapOpt(
      observations,
      parseArtifact,
    );

    if (includeAllVersions) {
      const olderVersions: Observation[] = [];
      // Check if any version is higher and collect the older observations.
      for (const obs of observations) {
        if (obs.version === 0) {
          continue;
        }

        const obsData = getObservationData(obs);
        for (const version of getValidVersions(obsData)) {
          if (version === obs.version) {
            continue;
          }

          olderVersions.push(
            fromResult(
              await this.api.getObservation(processId, obs.index, version),
            ),
          );
        }
      }

      artifacts = artifacts.concat(filterMapOpt(olderVersions, parseArtifact));
    }

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
            obsInfo.lastVersionIndex,
            { token: this._readToken },
          )
        ),
    );

    return fromResult(Result.all(...observations)).flat();
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
        processId,
        index,
        version,
        this.getUri(processId, index, version),
      );

      try {
        const result = await fn(reservation);
        return result;
      } catch (err) {
        throw err;
      } finally {
        // TODO: disable the reservation (here and in the appendArtifact methods)
        // TODO: probably should make it a generic
        // TODO: probably should make it a generic
      }
    });
  }

  private getUri(processId: ProcessID, index: number, version: number): string {
    return [
      this._hostUri,
      processId.toString(),
      index,
      version,
    ].join("/");
  }

  /**
   * RAII-style index-level locking for the given function.
   */
  async withUpdateReservation<T>(
    fn: (res: ObservationUpdateReservation) => Promise<T>,
    repoId: string,
    contentId: string,
  ): Promise<T> {
    const { index /*version*/ } = parseContentID(contentId);
    const lockId = repoId + "/" + index;
    return await this._contentLocks.run(lockId, async () => {
      const processId = newtype<ProcessID>(repoId);
      const state = fromResult(await this.api.getProcessState(processId));
      const highestVersion = state.lastVersionIndex;
      const latestObservation = fromResult(
        await this.api.getObservation(processId, index, highestVersion),
      );

      const version = highestVersion + 1;

      const reservation = new ObservationUpdateReservation(
        processId,
        index,
        latestObservation.version,
        version,
        this.getUri(processId, index, version),
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

  async getFileStreams(
    repoId: string,
    id: string,
  ): Promise<FileStreamDict> {
    const [downloadInfo] = await this.downloadFileURLs(repoId, [id]);

    const entries = await Promise.all(
      downloadInfo.files.map(async (fileInfo) => {
        const { url } = fileInfo;
        const name = PDP.getOriginalFilePath(fileInfo.name);
        const response = await fetch(url);
        if (!response.ok) {
          // FIXME: should this be a user error?
          throw new UserError("Unable to retrieve file: " + name);
        }
        return [name, response.body];
      }),
    );
    return Object.fromEntries(entries);
  }

  async getMetadata(
    repoId: string,
    contentId: string,
  ): Promise<Option<ArtifactMetadatav2>> {
    const processId = newtype<ProcessID>(repoId);
    const [index, version] = contentId.split("_").map((n) => +n);
    return await this.getObsMetadata(
      processId,
      index,
      version,
    );
  }

  async getBulkMetadata(
    repoId: string,
    contentIds: string[],
  ): Promise<any> {
    return await Promise.all(
      contentIds.map((id) => this.getMetadata(repoId, id)),
    );
  }

  async downloadFileURLs(
    repoId: string,
    contentIds: string[],
  ): Promise<DownloadInfo[]> {
    const processId = newtype<ProcessID>(repoId);
    const validContentIds = await this.getExistingContentIds(
      processId,
      ...contentIds,
    );

    const response = await Promise.all(
      validContentIds.map(async ({ index, version }) => {
        // Lets download the actual files associated with this observation,index
        const response = fromResult(
          await this.api.getObservationFiles(
            processId,
            index,
            version,
          ),
        );
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

  /**
   * Parse content IDs and ensure that they reference valid (not deleted) content
   */
  private async getExistingContentIds(
    processId: ProcessID,
    ...contentIds: string[]
  ): Promise<ContentId[]> {
    const state = fromResult(await this.api.getProcessState(processId));
    const ids = contentIds.map(parseContentID);
    const lastVersion = state.lastVersionIndex;
    await Promise.all(
      ids.map(async ({ index, version }) => {
        const obs = fromResult(
          await this.api.getObservation(processId, index, lastVersion),
        );
        if (isContentDeletion(obs)) {
          throw new DeletedContentError();
        }
      }),
    );

    return ids;
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
  ): Promise<Option<ArtifactMetadatav2>> {
    const responseObservation = (await this.api.getObservation(
      processId,
      obsIndex,
      version,
    )).ok();
    return responseObservation.andThen(getArtifactMetadata);
  }

  async listPreviousFileNames(
    res: ObservationUpdateReservation,
  ): Promise<string[]> {
    const lastObservation = fromResult(
      await this.api.getObservation(
        res.processId,
        res.index,
        res.version - 1,
      ),
    );

    return lastObservation.dataFiles.map((dataFile) =>
      dataFile.split("/").pop() as string
    );
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

    const observation = this._createObservationData(
      processId,
      this.processType,
      metadata,
      version,
      index,
    );
    // Add the data-files to the observation
    const remoteFileDir = `${index}/${version}/`;
    observation.dataFiles = filenames.map((filename: string) =>
      remoteFileDir + filename
    );
    const appendObservationResult = fromResult(
      await this.api.appendObservation(processId, observation),
    );

    let uploadFileRequests: UploadRequest[] = [];

    console.log({ appendObservationResult });
    if (
      appendObservationResult.uploadDataFiles &&
      appendObservationResult.uploadDataFiles.files
    ) {
      uploadFileRequests = appendObservationResult.uploadDataFiles.files.map(
        (file) => {
          const name = PDP.getOriginalFilePath(file.name);
          const params = new UploadParams(file.sasUrl, "PUT", UPLOAD_HEADERS);
          return new UploadRequest(name, params);
        },
      );
    }

    return new AppendResult(`${index}_0`, uploadFileRequests, index);
  }

  // TODO: this should probably take a reservation
  async disableArtifact(
    repoId: string,
    contentId: string,
  ): Promise<DisableResult> {
    console.log("disabling", contentId);
    await this.withContentReservation(async () => {
      const processId = newtype<ProcessID>(repoId);
      const { index, version } = parseContentID(contentId);

      const state = fromResult(await this.api.getProcessState(processId));
      const latestVersion = state.lastVersionIndex;
      // P: Versions are shared across observations in a process.
      // P: They all start out at 0 but when changed the get that global version number.
      // P: latestVersion here is the highest such "global" version number.

      if (version > latestVersion) {
        throw new ContentNotFoundError(contentId);
      }

      const latestObservation = fromResult(
        await this.api.getObservation(
          processId,
          index,
          latestVersion,
        ),
      );

      const latestData = getObservationData(latestObservation);

      const validVersions = matchObsDatum(latestData, {
        ArtifactMetadata(_md) {
          return [0];
        },
        ContentUpdate(md) {
          return md.validVersions;
        },
        ContentDeletion(md) {
          return md.validVersions;
        },
      });

      console.log({ latestObservation, latestData, validVersions });

      // Get the latest metadata
      let latest: LatestMetadata | undefined;
      if (validVersions.length > 0) {
        const latestVersion = validVersions[validVersions.length - 1];

        const alreadyFetchedLatest =
          latestVersion === latestObservation.version;
        if (alreadyFetchedLatest) {
          latest = {
            version: latestVersion,
            metadata: getMetadataFromObservationData(latestData),
          };
        } else if (
          isContentDeletion(latestData) &&
          latestData.latest?.version === latestVersion
        ) {
          // Latest fetched references the actual latest (ie, we have "stacked deletions")
          latest = latestData.latest;
        } else { // need to fetch the latest
          const metadata = await this.getMetadataSnapshot(
            processId,
            index,
            latestVersion,
          );
          latest = {
            version: latestVersion,
            metadata,
          };
        }
      }

      // Create the observation data
      const deletion: ContentDeletion = {
        version,
        validVersions,
        latest,
      };

      const obs = this._createObservationData(
        processId,
        this.processType,
        deletion,
        latestVersion + 1, // P: FIX for deletion bug - the version number must be bumped.
        index,
      );

      console.log({ deletion });
      console.log("appending", obs);

      return fromResult(await this.api.appendVersion(processId, obs));
    }, repoId);
  }

  async updateArtifact(
    res: ObservationUpdateReservation,
    metadata: ArtifactMetadatav2,
    filenames: string[] = [],
  ): Promise<UpdateResult> {
    const lastObservation = fromResult(
      await this.api.getObservation(
        res.processId,
        res.index,
        res.version - 1, // P: The new version hasn't been submitted..
      ),
    );

    const latestData = getObservationData(lastObservation);
    const validVersions = getValidVersions(latestData);

    const latestVersion = validVersions[validVersions.length - 1];
    console.log({ latestData, validVersions, latestVersion });
    validVersions.push(res.version);

    // store the observation
    const update: ContentUpdate = {
      metadata,
      validVersions,
    };
    const observation = this._createObservationData(
      res.processId,
      this.processType,
      update,
      res.version,
      res.index,
    );

    const reuseFiles = filenames.length === 0;

    // Add the data-files to the observation
    if (reuseFiles) {
      console.log(
        "Reusing files from previous lastObservation",
        lastObservation,
      );
      observation.dataFiles = lastObservation.dataFiles;
    } else {
      const remoteFileDir = `${res.index}/${res.version}/`;
      observation.dataFiles = filenames.map((filename: string) =>
        remoteFileDir + filename
      );
    }

    const appendVersionResult = fromResult(
      await this.api.appendVersion(res.processId, observation),
    );

    console.log({ observation, appendVersionResult });
    let uploadFileRequests: UploadRequest[] = [];

    if (
      !reuseFiles && appendVersionResult.uploadDataFiles &&
      appendVersionResult.uploadDataFiles.files
    ) {
      uploadFileRequests = appendVersionResult.uploadDataFiles.files.map(
        (file) => {
          const name = PDP.getOriginalFilePath(file.name);
          const params = new UploadParams(file.sasUrl, "PUT", UPLOAD_HEADERS);
          return new UploadRequest(name, params);
        },
      );
    }

    return {
      contentId: res.contentId,
      files: uploadFileRequests,
    };
  }

  private async getMetadataSnapshot(
    processId: ProcessID,
    index: number,
    version: number,
  ): Promise<ArtifactMetadata> {
    const datum = await this.getObservationData(processId, index, version);

    return matchObsDatum(datum, {
      ArtifactMetadata(md) {
        return md;
      },
      ContentUpdate(update) {
        return update.metadata;
      },
      ContentDeletion(_deletion) {
        throw new ContentNotFoundError(`${index}_${version}`);
      },
    });
  }
  private async getObservationData(
    processId: ProcessID,
    index: number,
    version: number,
  ): Promise<ObservationData> {
    const obs = fromResult(
      await this.api.getObservation(processId, index, version),
    );
    return getObservationData(obs);
  }

  /**
   * Files stored on PDP have a prefix appended: "dat/<index>/<version>/<original>".
   * This method strips this prefix from the string.
   */
  static getOriginalFilePath(pdpPath: string): string {
    return pdpPath.replace(/^dat\/\d+\/\d+\//, "");
  }

  async _downloadFile(filePath: string, url: string) {
    // TODO: should downloading just get a read stream?
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
    data: ObservationData,
    version: number,
    index: number,
  ): Observation {
    const timestamp = new Date().toISOString();
    return {
      isFunction: false,
      processType: type,
      processId,
      observerId: this.observerId,
      isMeasure: true,
      index,
      version,
      startTime: timestamp,
      endTime: timestamp,
      applicationDependencies: [],
      processDependencies: [],
      data: [data],
      dataFiles: [],
    };
  }

  private _addDataFiles(
    observation: Observation,
    ...files: string[]
  ): Observation {
    const index = observation.index;
    const version = observation.version;

    // All files for a process share the same directory so we need to scope them
    // to an index/version
    const uploadDir = `${index}/${version}/`;
    observation.dataFiles = files
      .map((filename: string) => uploadDir + filename);

    return observation;
  }

  static async from(
    gmeContext: GmeContentContext,
    storageNode: Core.Node,
    req: Request,
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

    const hostUri = fromResult(
      Result.safe(
        () => new HostUri(baseUrl.toString(), processType.toString()),
      )
        .mapErr((err) =>
          new InvalidAttributeError(gmeContext, storageNode, "URL", err.message)
        ),
    );

    return PDP.fromParameters(
      gmeContext,
      req,
      gmeConfig,
      hostUri,
    );
  }

  static async fromParameters(
    gmeContext: GmeContentContext | null,
    req: Request,
    gmeConfig: AzureGmeConfig,
    hostUri: HostUri,
  ): Promise<PDP> {
    const userToken =
      req.cookies[gmeConfig.authentication.azureActiveDirectory.cookieId];

    // We currently allow setting a different token used only for read operations.
    // This is a temporary workaround for the lack of read-only permissions in PDP.
    const readToken = await withTokens(
      gmeConfig,
      (tokens) =>
        !!gmeContext ? tokens.get(gmeContext.project.projectId) : userToken,
    );

    // This doesn't yet work (doesn't support file uploads)
    const isInMemorySandbox = hostUri.baseUrl.toLowerCase().trim() === "memory";
    let api, observerId;
    if (isInMemorySandbox) {
      api = new InMemoryPdp();
      observerId = "testUsername";
    } else {
      api = new PdpApi(hostUri.baseUrl, userToken);
      observerId = RouterUtils.getObserverIdFromToken(userToken);
      if (!observerId) throw new UserError("Unable to determine observer ID");
    }

    return new PDP(
      api,
      hostUri,
      observerId,
      readToken || userToken,
    );
  }

  static async fromUri(
    // gmeContext: GmeContentContext,
    gmeConfig: AzureGmeConfig,
    req: Request,
    uri: string,
  ): Promise<PDP> {
    const hostUri = HostUri.fromUri(uri);

    return PDP.fromParameters(
      null,
      req,
      gmeConfig,
      hostUri,
    );
  }

  resolveUri(uri: string): [string, string, string] {
    return PDP.resolveUri(uri);
  }

  static resolveUri(uri: string): [string, string, string] {
    const chunks = uri.split("/");
    let host: string;
    let repo: string = "";
    let content: string = "";

    if (RegExp(contentPattern).test(uri)) {
      const version = chunks.pop() as string;
      const index = chunks.pop() as string;
      content = `${index}_${version}`;
      repo = chunks.pop() as string;
    } else if (RegExp(repoPattern).test(uri)) {
      repo = chunks.pop() as string;
    } else if (!RegExp(hostPattern).test(uri)) {
      throw new Error(`No valid uri provided: ${uri}`);
    }

    host = chunks.join("/");

    return [host, repo, content];
  }

  static getUriPatterns(): string[] {
    return [
      hostPattern,
      repoPattern,
      contentPattern,
    ];
  }
}

export class HostUri {
  baseUrl: string;
  processType: string;

  constructor(baseUrl: string, processType: string) {
    if (baseUrl.startsWith("http://")) {
      throw new Error("URL must use https"); // FIXME: better error type
    }
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.processType = processType;
  }

  toString() {
    const hostAddr = this.baseUrl
      .replace(/^(https:\/\/)?/, "");
    return `pdp://${hostAddr}/${this.processType}`;
  }

  static fromUri(uri: string): HostUri {
    const chunks = uri.split("/");
    const _version = chunks.pop() as string;
    const _index = chunks.pop() as string;
    const _processId = chunks.pop() as string;
    const processType = chunks.pop() as string;

    const baseUrl = chunks.join("/").replace(/^pdp/, "https");

    return new HostUri(baseUrl, processType);
  }

  static hostUrlToHostUri(hostUrl: string): string {
    return `pdp://${hostUrl.replace(/^(https:\/\/)?/, "")}`;
  }
}

class ProcessReservation implements RepoReservation {
  uri: string;
  repoId: string;

  constructor(hostUri: string, repoId: string) {
    this.uri = hostUri + "/" + repoId;
    this.repoId = repoId;
  }
}

class ObservationReservation implements ContentReservation {
  readonly uri: string;
  readonly repoId: string;
  readonly index: number;
  readonly version: number;
  readonly processId: ProcessID;
  readonly contentId: string;

  constructor(
    processId: ProcessID,
    index: number,
    version: number,
    uri: string,
  ) {
    this.repoId = processId.toString();
    this.processId = processId;
    this.index = index;
    this.version = version;
    this.uri = uri;
    this.contentId = `${index}_${version}`;
  }
}

class ObservationUpdateReservation implements UpdateReservation {
  readonly repoId: string;
  readonly contentId: string;
  readonly targetContentId: string;
  readonly uri: string;
  readonly processId: ProcessID;
  readonly index: number;
  readonly version: number;

  constructor(
    processId: ProcessID,
    index: number,
    targetVersion: number, // The previous version
    version: number, // Not the same as version + 1 (rather "highest-version-in-observation" + 1)
    uri: string,
  ) {
    this.processId = processId;
    this.index = index;
    this.version = version;

    this.repoId = processId.toString();
    this.contentId = `${index}_${version}`;
    this.targetContentId = `${index}_${targetVersion}`;
    this.uri = uri;
  }
}

function getArtifactMetadata(
  obs: Observation,
): Option<ArtifactMetadatav2> {
  return Option.from(obs.data[0])
    .andThen((datum) =>
      Option.from(
        matchObsDatum(datum, {
          ArtifactMetadata: (datum) => datum,
          ContentUpdate: (datum) => datum.metadata,
          ContentDeletion: (datum) => datum.latest?.metadata,
        }),
      )
    )
    .map(toArtifactMetadatav2);
}

// P: Function that makes sure the deleted artifacts are filtered out before returned.
function getUnDeletedArtifactMetadata(
  obs: Observation,
): Option<ArtifactMetadatav2> {
  return Option.from(obs.data[0])
    .andThen((datum) =>
      Option.from(
        matchObsDatum(datum, {
          ArtifactMetadata: (datum) => datum,
          ContentUpdate: (datum) => datum.metadata,
          ContentDeletion: () => undefined,
        }),
      )
    )
    .map(toArtifactMetadatav2);
}

interface ObsDatumCases<T> {
  ArtifactMetadata: (md: ArtifactMetadata) => T;
  ContentUpdate: (md: ContentUpdate) => T;
  ContentDeletion: (md: ContentDeletion) => T;
}

export function matchObsDatum<T>(
  datum: ObservationData,
  actionDict: ObsDatumCases<T>,
): T {
  if ("validVersions" in datum) {
    if ("metadata" in datum) {
      return actionDict.ContentUpdate(datum);
    } else {
      return actionDict.ContentDeletion(datum);
    }
  } else {
    return actionDict.ArtifactMetadata(datum);
  }
}

function parseRepository(
  obs: Observation,
): Option<Repository> {
  return getArtifactMetadata(obs)
    .map((md) => {
      return {
        id: obs.processId.toString(),
        displayName: md.displayName,
        tags: md.tags,
        taxonomyVersion: md.taxonomyVersion,
      };
    });
}

function parseArtifact(obs: Observation): Option<Artifact> {
  return getUnDeletedArtifactMetadata(obs)
    .map((md) => ({
      parentId: obs.processId.toString(),
      id: obs.index + "_" + obs.version,
      displayName: md.displayName,
      tags: md.tags,
      taxonomyVersion: md.taxonomyVersion,
      time: obs.startTime,
    }));
}

function parseContentID(contentId: string): ContentId {
  const [index, version] = contentId.split("_").map((n) => +n);
  if (isNaN(index) || isNaN(version)) {
    throw new MalformedContentIdError(contentId);
  }
  return { index, version };
}

function getObservationData(obs: Observation): ObservationData {
  const datum = obs.data[0];
  if (!datum) {
    throw new Error("Invalid Content"); // FIXME
  }
  return datum;
}

function isContentDeletion(data: any): data is ContentDeletion {
  return "version" in data && "validVersions" in data;
}

function getMetadataFromObservationData(
  datum: ObservationData,
): ArtifactMetadata {
  return matchObsDatum(datum, {
    ArtifactMetadata(md) {
      return md;
    },
    ContentUpdate(event) {
      return event.metadata;
    },
    ContentDeletion(_event) {
      // TODO: log an error
      throw new ContentNotFoundError();
    },
  });
}

interface ContentId {
  index: number;
  version: number;
}
