import CreateRequestLogger from "./CreateRequestLogger";
const logFilePath = process.env.CREATE_LOG_PATH || "./CreateProcesses.jsonl";
const reqLogger = new CreateRequestLogger(logFilePath);
import {
  AppendObservationResponse,
  GetObservationFilesResponse,
  newtype,
  Observation,
  Process,
  ProcessID,
  ProcessState,
  TransferState,
  TransferStatus,
} from "./types";
import { retry } from "../../Utils";
import { Err, Ok, Option, Result } from "oxide.ts";
import { ArtifactMetadata } from "../common/types";
import { TestEnvOnlyError, UserError } from "../../../../common/UserError";

class PdpApiError extends UserError {}

interface RequestOpts {
  token?: string;
}

// interface ProcessOwnerPermissions {
//   isFunction: boolean;
//   processType: string;
//   processId: ProcessID;
//   principalId: string;
//   permission: string;
// }

interface ListProcessOpts extends RequestOpts {
  permission?: string;
  token?: string;
}

export interface PdpProvider {
  listProcesses(
    opts?: ListProcessOpts,
  ): Promise<Result<Process[], PdpApiError>>;
  createProcess(
    observerId: string,
    processType: string,
    metadata: ArtifactMetadata,
  ): Promise<string>;
  getProcessState(
    id: ProcessID,
    opts?: RequestOpts,
  ): Promise<Result<ProcessState, PdpApiError>>;
  getObservation(
    processId: ProcessID,
    obsIndex: number,
    version: number,
    opts?: RequestOpts,
  ): Promise<Result<Observation, PdpApiError>>;
  getObservations(
    processId: ProcessID,
    startIndex: number,
    limit?: number,
    opts?: RequestOpts,
  ): Promise<Result<Observation[], PdpApiError>>;
  getObservationFiles(
    id: ProcessID,
    index: number,
    version: number,
    opts?: RequestOpts,
  ): Promise<Result<GetObservationFilesResponse, PdpApiError>>;
  appendObservation(
    processId: ProcessID,
    observation: Observation,
    opts?: RequestOpts,
  ): Promise<Result<AppendObservationResponse, PdpApiError>>;
  getTransferState(
    processId: ProcessID,
    directoryId: string,
    transferId: string,
  ): Promise<Result<TransferState, PdpApiError>>;
}

export default class PdpApi implements PdpProvider {
  private url: string;
  private token: string;

  constructor(url: string, token: string) {
    this.url = url.replace(/\/?$/, "/");
    this.token = token;
  }

  async listProcesses(
    opts: ListProcessOpts = {},
  ): Promise<Result<Process[], PdpApiError>> {
    const permission = opts.permission || "read";
    const url = `v2/Process/ListProcesses?permission=${permission}`;
    const token = Option.from(opts.token);
    const fetchOpts = token.map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const processes: Result<Process[], PdpApiError> = await this._fetchJson(
      url,
      fetchOpts.unwrapOrElse(DefaultFetchOpts),
    );
    return processes;
  }

  async getProcessState(
    id: ProcessID,
    opts: RequestOpts = {},
  ): Promise<Result<ProcessState, PdpApiError>> {
    const fetchOpts = Option.from(opts.token).map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const state: Result<ProcessState, PdpApiError> = await this._fetchJson(
      `v2/Process/GetProcessState?processId=${id}`,
      fetchOpts.unwrapOrElse(DefaultFetchOpts),
    );

    return state;
  }

  async getObservations(
    processId: ProcessID,
    startIndex: number,
    limit: number = 20,
    opts: RequestOpts = {},
  ): Promise<Result<Observation[], PdpApiError>> {
    const fetchOpts = Option.from(opts.token).map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const observations: Result<Observation[], PdpApiError> = await this
      ._fetchJson(
        `v2/Process/PeekObservations?processId=${processId}&obsIndex=${startIndex}` +
          `&maxReturn=${limit}`,
        fetchOpts.unwrapOrElse(DefaultFetchOpts),
      );

    return observations;
  }

  async getObservation(
    processId: ProcessID,
    obsIndex: number,
    version: number,
    opts: RequestOpts = {},
  ): Promise<Result<Observation, PdpApiError>> {
    const queryDict = {
      processId: processId.toString(),
      obsIndex: obsIndex.toString(),
      version: version.toString(),
    };
    const url = addQueryParams("v2/Process/GetObservation", queryDict);
    const fetchOpts = Option.from(opts.token).map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const obsResult: Result<Observation, PdpApiError> = await this._fetchJson(
      url,
      fetchOpts.unwrapOrElse(DefaultFetchOpts),
    );

    return obsResult;
  }

  async getObservationFiles(
    id: ProcessID,
    index: number,
    version: number,
    opts: RequestOpts = {},
  ): Promise<Result<GetObservationFilesResponse, PdpApiError>> {
    const queryDict = {
      processId: id.toString(),
      obsIndex: index.toString(),
      version: version.toString(),
      endObsIndex: index.toString(),
      filePattern: "**/*",
    };
    const url = addQueryParams("v3/Files/GetObservationFiles", queryDict);
    const fetchOpts = {
      method: "put",
    };
    Option.from(opts.token).map((token) => setAuthToken(fetchOpts, token));
    const obsFiles: Result<GetObservationFilesResponse, PdpApiError> =
      await this
        ._fetchJson(url, fetchOpts);
    return obsFiles;
  }

  async appendObservation(
    processId: ProcessID,
    observation: Observation,
    opts: RequestOpts = {},
  ): Promise<Result<AppendObservationResponse, PdpApiError>> {
    // TODO: use token in opts
    const fetchOpts = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(observation),
    };
    Option.from(opts.token).map((token) => setAuthToken(fetchOpts, token));

    const response: Result<AppendObservationResponse, PdpApiError> = await this
      ._fetchJson(
        `v3/Process/AppendObservation?processId=${processId}&uploadExpiresInMins=180`,
        fetchOpts,
      );

    return response;
  }

  async getTransferState(
    processId: ProcessID,
    directoryId: string,
    transferId: string,
    opts: RequestOpts = {},
  ): Promise<Result<TransferState, PdpApiError>> {
    const queryDict = {
      processId: processId.toString(),
      directoryId: directoryId.toString(),
      transferId: transferId.toString(),
    };
    const url = addQueryParams("v2/Files/GetTransferState", queryDict);
    const fetchOpts = Option.from(opts.token).map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const state: Result<TransferState, PdpApiError> = await this._fetchJson(
      url,
      fetchOpts.unwrapOrElse(DefaultFetchOpts),
    );
    return state;
  }

  async createProcess(
    observerId: string,
    _processType: string,
    metadata: ArtifactMetadata,
  ): Promise<string> {
    reqLogger.log(observerId, metadata);

    //   //TODO we probably need description field
    //   const queryDict = {
    //     isFunction: false.toString(),
    //     isVirtual: false.toString(),
    //     processType: encodeURIComponent(type),
    //     processDescription: encodeURIComponent(
    //       "A process created from webgme-taxonomy",
    //     ),
    //   };
    //   const url = addQueryParams("v2/Process/CreateProcess", queryDict);
    //   return await this._fetchJson(url, { headers: {}, method: "put" });
    // }

    return "Submitted create request!";
  }

  private async _fetch(
    url: string,
    opts: FetchOpts = DefaultFetchOpts(),
  ): Promise<Result<Response, PdpApiError>> {
    url = this.url + url;
    opts.headers = opts.headers || {};
    opts.headers.Authorization = opts.headers.Authorization ||
      "Bearer " + this.token;
    opts.headers.accept = opts.headers.accept || "application/json";

    try {
      const response = await retry(async () => {
        const response = await this._rawFetch(url, opts);
        if (response.status > 399) {
          const bodyText = (await response.text()) || response.statusText;
          const message = `Received error from PDP: ${bodyText}`;
          throw new PdpApiError(message, response.status);
        }
        return response;
      });
      return Ok(response);
    } catch (err) {
      if (err instanceof PdpApiError) {
        return Err(err);
      } else {
        console.warn("Error occurred in PDP API:", err);
        return Err(
          new PdpApiError(
            "Internal error occurred. Please try again later.",
            500,
          ),
        );
      }
    }
  }

  private async _rawFetch(url: string, opts: RequestInit): Promise<Response> {
    return await fetch(url, opts);
  }

  private async _fetchJson(
    url: string,
    opts: FetchOpts,
  ): Promise<Result<any, PdpApiError>> {
    const respRes = await this._fetch(url, opts);
    const response = respRes.map((resp) => resp.json());
    if (response.isOk()) {
      return Ok(await response.unwrap());
    } else {
      return response;
    }
  }
}

export function addQueryParams(
  baseUrl: string,
  queryDict: { [key: string]: string },
): string {
  const queryString = Object.entries(queryDict)
    .map((part) => part.map((c) => encodeURIComponent(c)).join("="))
    .join("&");
  return baseUrl.replace(/\??$/, "?") + queryString;
}

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

///////////////////////// In-Memory PDP Storage /////////////////////////
interface ProcessData {
  metadata: Process;
  state: ProcessState;
  observations: ObservationData[];
}

interface ObservationData {
  data: Observation;
  fileData: GetObservationFilesResponse;
}

interface InMemoryData {
  processes: ProcessData[];
  transfers: { [id: string]: TransferState };
  counter: number;
}

const InMemoryPdpData: InMemoryData = {
  processes: [],
  transfers: {},
  counter: 1,
};

export class InMemoryPdp implements PdpProvider {
  private data: InMemoryData;

  constructor() {
    TestEnvOnlyError.check("In-Memory PDP storage");
    this.data = InMemoryPdpData;
  }

  async listProcesses(
    _opts: ListProcessOpts = {},
  ): Promise<Result<Process[], PdpApiError>> {
    return Result.from(this.data.processes.map((data) => data.metadata));
  }

  async getProcessState(
    id: ProcessID,
    _opts: RequestOpts = {},
  ): Promise<Result<ProcessState, PdpApiError>> {
    return this.getProcessData(id).map((data) => data.state);
  }

  async getObservations(
    id: ProcessID,
    startIndex: number,
    limit: number = 20,
    _opts: RequestOpts = {},
  ): Promise<Result<Observation[], PdpApiError>> {
    return this.getProcessData(id)
      .map((data) => data.observations.slice(startIndex, startIndex + limit))
      .map((obsData) => obsData.map((d) => d.data));
  }

  async getObservation(
    id: ProcessID,
    obsIndex: number,
    _version: number,
    _opts: RequestOpts = {},
  ): Promise<Result<Observation, PdpApiError>> {
    return this.getObservationData(id, obsIndex)
      .map((obsDatum) => obsDatum.data);
  }

  async getObservationFiles(
    id: ProcessID,
    index: number,
    _version: number,
    _opts: RequestOpts = {},
  ): Promise<Result<GetObservationFilesResponse, PdpApiError>> {
    return this.getObservationData(id, index)
      .map((obsDatum) => obsDatum.fileData);
  }

  async appendObservation(
    processId: ProcessID,
    observation: Observation,
    _opts: RequestOpts = {},
  ): Promise<Result<AppendObservationResponse, PdpApiError>> {
    return this.getProcessData(processId)
      .map((data) => { // add the observation
        const transferId = `transfer_${Date.now()}_${this.data.counter++}`;
        const obsDatum = {
          data: observation,
          fileData: {
            processId,
            directoryId: "test-dat/",
            transferId,
            expiresOn: "unused",
            files: observation.dataFiles.map((name) => ({
              name,
              sasUrl: `http://sasUrl.com/${name}`,
              hash: `hashFor${name}`,
              length: Math.floor(10000 * Math.random()),
            })),
          },
        };
        data.observations.push(obsDatum);
        data.state.numObservations = data.observations.length;
        const response: AppendObservationResponse = Object.assign(
          {},
          observation,
          { // the new field in the append response
            uploadDataFiles: {
              files: obsDatum.fileData.files.map((fdata) => ({
                name: `dat/${fdata.name}`,
                sasUrl: fdata.sasUrl,
              })),
            },
          },
        );

        this.startTransfer(
          transferId,
          obsDatum.fileData.files.map((fdata) => fdata.name),
        );
        // TODO: add dataFiles
        console.log(JSON.stringify(response));

        return response;
      });
  }

  async getTransferState(
    _processId: ProcessID,
    _directoryId: string,
    transferId: string,
    _opts: RequestOpts = {},
  ): Promise<Result<TransferState, PdpApiError>> {
    return Option.from(this.data.transfers[transferId])
      .okOr(new PdpApiError("Transfer not found.", 404));
  }

  async createProcess(
    observerId: string,
    processType: string,
    metadata: ArtifactMetadata,
  ): Promise<string> {
    console.log("createProcess", metadata);
    this.createProcessHelper(observerId, processType, metadata);
    return "Created!";
  }

  /**
   * A helper function to be used by the testing suite to make processes and return
   * the process ID without modifying the method signature of createProcess.
   */
  createProcessHelper(
    observerId: string,
    processType: string,
    metadata: ArtifactMetadata,
  ): ProcessID {
    const processId = newtype<ProcessID>(`process_${this.data.counter++}`);
    this.data.processes.push({
      metadata: {
        processType,
        processId, // FIXME
      },
      state: {
        isFunction: false,
        processType,
        processId,
        numObservations: 1,
        lastVersionIndex: 0,
      },
      observations: [{
        data: {
          isFunction: false,
          processType,
          processId,
          isMeasure: false,
          index: 0,
          version: 0,
          observerId,
          startTime: new Date().toString(),
          endTime: new Date().toString(),
          data: [metadata],
          dataFiles: [],
          applicationDependencies: [],
          processDependencies: [],
        },
        fileData: {
          processId,
          directoryId: "test-data/",
          transferId: "",
          expiresOn: "unused",
          files: [],
        },
      }],
    });
    return processId;
  }

  dropData() {
    this.data.processes = [];
    this.data.transfers = {};
  }

  private getProcessData(id: ProcessID): Result<ProcessData, PdpApiError> {
    return Option.from(
      this.data.processes.find((d) => d.metadata.processId === id),
    )
      .okOrElse(() => new PdpApiError("Process not found", 404));
  }

  private getObservationData(
    id: ProcessID,
    index: number,
  ): Result<ObservationData, PdpApiError> {
    return this.getProcessData(id)
      .andThen((data) =>
        Option(data.observations[index]).okOrElse(() =>
          new PdpApiError("Observation not found.", 404)
        )
      );
  }

  private startTransfer(transferId: string, filenames: string[]) {
    const start = new Date().toString();
    this.data.transfers[transferId] = {
      operation: "upload",
      files: filenames,
      runStart: start,
      lastUpdate: start,
      runEnd: "",
      runDurationMs: -1,
      status: TransferStatus.Pending,
    };

    setTimeout(() => {
      const transferData = this.data.transfers[transferId];
      if (transferData) {
        transferData.runEnd = new Date().toString();
        transferData.runDurationMs = 500;
        transferData.status = TransferStatus.Success;
      }
    }, 500);
  }
}
