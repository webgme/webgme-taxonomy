import {
  AppendObservationResponse,
  GetObservationFilesResponse,
  Observation,
  Process,
  ProcessID,
  ProcessState,
  TransferState,
} from "./types";
import { retry } from "../../Utils";
import { Ok, Option, Result } from "oxide.ts";

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
  listProcesses(opts?: ListProcessOpts): Promise<Result<Process[], Error>>;
  getProcessState(
    id: ProcessID,
    opts?: RequestOpts,
  ): Promise<Result<ProcessState, Error>>;
  getObservation(
    processId: ProcessID,
    obsIndex: number,
    version: number,
    opts?: RequestOpts,
  ): Promise<Result<Observation, Error>>;
  getObservations(
    processId: ProcessID,
    startIndex: number,
    limit?: number,
    opts?: RequestOpts,
  ): Promise<Result<Observation[], Error>>;
  getObservationFiles(
    id: ProcessID,
    index: number,
    version: number,
    opts?: RequestOpts,
  ): Promise<Result<GetObservationFilesResponse, Error>>;
  appendObservation(
    processId: ProcessID,
    observation: Observation,
    opts?: RequestOpts,
  ): Promise<Result<AppendObservationResponse, Error>>;
  getTransferState(
    processId: ProcessID,
    directoryId: string,
    transferId: string,
  ): Promise<Result<TransferState, Error>>;
}

export default class PdpApi implements PdpProvider {
  private url: string;
  private token: string;

  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
  }

  async listProcesses(
    opts: ListProcessOpts = {},
  ): Promise<Result<Process[], Error>> {
    const permission = opts.permission || "read";
    const url = `v2/Process/ListProcesses?permission=${permission}`;
    const token = Option.from(opts.token);
    const fetchOpts = token.map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const processes: Result<Process[], Error> = await this._fetchJson(
      url,
      fetchOpts.unwrapOrElse(DefaultFetchOpts),
    );
    return processes;
  }

  async getProcessState(
    id: ProcessID,
    opts: RequestOpts = {},
  ): Promise<Result<ProcessState, Error>> {
    const fetchOpts = Option.from(opts.token).map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const state: Result<ProcessState, Error> = await this._fetchJson(
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
  ): Promise<Result<Observation[], Error>> {
    const fetchOpts = Option.from(opts.token).map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const observations: Result<Observation[], Error> = await this._fetchJson(
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
  ): Promise<Result<Observation, Error>> {
    const queryDict = {
      processId: processId.toString(),
      obsIndex: obsIndex.toString(),
      version: version.toString(),
    };
    const url = addQueryParams("v2/Process/GetObservation", queryDict);
    const fetchOpts = Option.from(opts.token).map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const obsResult: Result<Observation, Error> = await this._fetchJson(
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
  ): Promise<Result<GetObservationFilesResponse, Error>> {
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
    const obsFiles: Result<GetObservationFilesResponse, Error> = await this
      ._fetchJson(url, fetchOpts);
    return obsFiles;
  }

  async appendObservation(
    processId: ProcessID,
    observation: Observation,
    opts: RequestOpts = {},
  ): Promise<Result<AppendObservationResponse, Error>> {
    // TODO: use token in opts
    const fetchOpts = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(observation),
    };
    Option.from(opts.token).map((token) => setAuthToken(fetchOpts, token));

    const response: Result<AppendObservationResponse, Error> = await this
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
  ): Promise<Result<TransferState, Error>> {
    const queryDict = {
      processId: processId.toString(),
      directoryId: directoryId.toString(),
      transferId: transferId.toString(),
    };
    const url = addQueryParams("v2/Files/GetTransferState", queryDict);
    const fetchOpts = Option.from(opts.token).map((token) =>
      setAuthToken(DefaultFetchOpts(), token)
    );
    const state: Result<TransferState, Error> = await this._fetchJson(
      url,
      fetchOpts.unwrapOrElse(DefaultFetchOpts),
    );
    return state;
  }

  // async createProcess(type: string): Promise<ProcessOwnerPermissions> {
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

  private async _fetch(
    url: string,
    opts: FetchOpts = DefaultFetchOpts(),
  ): Promise<Result<Response, Error>> {
    url = this.url + url;
    opts.headers = opts.headers || {};
    opts.headers.Authorization = opts.headers.Authorization ||
      "Bearer " + this.token;
    opts.headers.accept = opts.headers.accept || "application/json";
    return await Result.safe(
      retry(async () => {
        const response = await fetch(url, opts);
        if (response.status > 399) {
          const msg = `${opts.method || "GET"} ${url} failed: ${await response
            .text()} (${response.status})`;
          throw new Error(msg);
        }
        return response;
      }),
    );
  }

  private async _fetchJson(
    url: string,
    opts: FetchOpts,
  ): Promise<Result<any, Error>> {
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
    .map((part) => part.join("="))
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
