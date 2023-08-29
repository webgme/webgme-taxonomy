import TaxonomyReference, { TaxonomyVersionData } from "./TaxonomyReference";
import { assert, filterMap, Result, sleep } from "./Utils";
import { Readable, writable } from "svelte/store";

type UploadParams = {
  method: string;
  url: string;
  headers: { [name: string]: string };
};

export type UploadPromise = Promise<boolean> & Readable<number> & {
  file: File;
  abort: () => void;
};

class Storage {
  baseUrl: string;
  constructor() {
    const chunks = window.location.href.split("/"); // TODO:
    chunks.pop();
    chunks.pop();
    this.baseUrl = chunks.join("/") + "/artifacts/";
  }

  async listRepos(): Promise<Repository[]> {
    const result = await this._fetchJson(this.baseUrl, null, ListError);
    const items: RepositoryData[] = await result.unwrap();
    return filterMap(items, (item) => parseRepo(item));
  }

  async listArtifacts(repoId: string): Promise<Artifact[]> {
    const result = await this._fetchJson(
      this.baseUrl + repoId,
      null,
      ListError,
    );
    const items: ArtifactData[] = (await result.unwrap())
      .filter((data: any) => {
        if (isArtifactData(data)) {
          return true;
        } else {
          console.warn("Found malformed data", data);
          return false;
        }
      });

    return items.map((item) => parseArtifact(item));
  }

  async getDownloadUrl(parentId, ...ids) {
    const qs = `ids=${encodeURIComponent(JSON.stringify(ids))}`;
    const createArchiveUrl = this.baseUrl + parentId + `/downloads/?${qs}`;
    const taskId: number =
      await (await this._fetchJson(createArchiveUrl, { method: "post" }))
        .unwrap();

    const checkStatusUrl = this.baseUrl + parentId +
      `/downloads/${taskId}/status`;
    let status: Status = await (await this._fetchJson(checkStatusUrl))
      .unwrap();

    while (status !== Status.Complete) {
      await sleep(10);
      status = await (await this._fetchJson(checkStatusUrl))
        .unwrap();
    }

    const downloadUrl = this.baseUrl + parentId +
      `/downloads/${taskId}`;
    return downloadUrl;
  }

  private _uploadFile({ method, url, headers }: UploadParams, file: File) {
    const { subscribe, set } = writable(0);
    const request = new XMLHttpRequest();
    request.upload.addEventListener("progress", (ev) => {
      set(ev.loaded / ev.total);
    }, false);
    const promise = new Promise<boolean>(function (resolve, reject) {
      request.addEventListener("load", () => {
        set(1);
        resolve(true);
      }, false);
      request.addEventListener("error", () => {
        const error = new AppendDataError(
          request.statusText || "Upload failed",
        );
        reject(error);
      }, false);
      request.addEventListener("abort", () => resolve(false), false);
    });
    request.open(method, url);
    Object.entries(headers || {})
      .forEach(([name, value]: [string, string]) =>
        request.setRequestHeader(name, value)
      );
    request.send(file);
    return Object.assign(promise, {
      file,
      subscribe,
      abort() {
        request.abort();
      },
    }) as UploadPromise;
  }

  async appendArtifact(artifactSet, metadata, files: File[]) {
    console.log({ action: "append", metadata, files });
    const url = this.baseUrl + artifactSet.id + "/append";
    const filenames = files.map((file: File) => file.name);

    const opts = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata,
        filenames,
      }),
    };

    const appendResult =
      await (await this._fetchJson(url, opts, AppendDataError))
        .unwrap() as { files: any[] };

    return appendResult.files.map(
      ({ name, params }: { name: string; params: UploadParams }) => {
        const targetFile = files.find((a) => a.name == name);
        assert(
          !!targetFile,
          new AppendDataError("Could not find upload info for " + name),
        );
        return this._uploadFile(params, targetFile);
      },
    );
  }

  async updateArtifact(metadata, newContent) {
    console.log("Updating artifact:", metadata, newContent);
  }

  async createRepo(metadata) {
    console.log("Creating repo:", metadata);
    metadata.tags = metadata.tags || {};
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        metadata,
      }),
    };
    return (await this._fetchJson(this.baseUrl, opts, CreateError))
      .unwrap();
  }

  async _fetch(url: string, opts = null, ErrorClass = RequestError) {
    const response = await fetch(url, opts);
    let error = null;
    if (response.status === 422) {
      const data = await response.json();
      const context = new ModelContext(
        data.context.projectId,
        data.context.branch,
        data.context.nodeId,
      );
      error = new ModelError(data.message, context);
    } else if (response.status > 399) {
      error = new ErrorClass(await response.text());
    }
    return new Result(response, error);
  }

  async _fetchJson(url: string, opts = null, ErrorClass = RequestError) {
    return (await this._fetch(url, opts, ErrorClass)).map((response) =>
      response.json()
    );
  }
}

export class RequestError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class ModelContext {
  projectId: string;
  nodeId: string;
  branch: string; // FIXME: this could be a commit or something instead

  constructor(projectId: string, branch: string, nodeId: string) {
    this.projectId = projectId;
    this.nodeId = nodeId;
    this.branch = branch;
  }

  toQueryParams(): string {
    const params = new URLSearchParams({
      project: this.projectId,
      branch: this.branch,
      node: this.nodeId,
    });
    return params.toString();
  }
}

export class ModelError extends Error {
  context: ModelContext;

  constructor(msg: string, context: ModelContext) {
    super(msg);
    this.context = context;
  }
}

class StorageError extends RequestError {
  constructor(actionDisplayName: string, msg: string) {
    super(`Unable to ${actionDisplayName}: ${msg}`);
  }
}

class ListError extends StorageError {
  constructor(msg: string) {
    super("list artifacts", msg); // FIXME: rename "artifact"?
  }
}

class DownloadError extends StorageError {
  constructor(msg: string) {
    super("download", msg);
  }
}

class CreateError extends StorageError {
  constructor(msg: string) {
    super("create", msg);
  }
}

class AppendDataError extends StorageError {
  constructor(msg: string) {
    super("append", msg);
  }
}

function parseRepo(item: RepositoryData): Repository | undefined {
  if (!item.displayName) {
    console.log("Found malformed data. Filtering out. Data:", item);
  } else {
    return {
      id: item.id,
      displayName: item.displayName,
      tags: item.tags,
      taxonomyVersion: TaxonomyReference.from(item.taxonomyVersion),
    };
  }
}

function parseArtifact(data: ArtifactData): Artifact | undefined {
  return {
    id: data.id,
    displayName: data.displayName,
    tags: data.tags,
    time: data.time,
    taxonomyVersion: TaxonomyReference.from(data.taxonomyVersion),
  };
}

// TODO: consolidate code with original definition in TaskQueue.ts
enum Status {
  Created,
  Running,
  Complete,
}

// TODO: unify the below types with the server types
interface RepositoryData {
  id: string;
  displayName: string;
  tags: any[];
  taxonomyVersion: TaxonomyVersionData;
}

interface ArtifactData {
  parentId?: string;
  id?: string;
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyVersionData;
  time: string;
  files?: string[];
}

function isArtifactData(data: any): data is ArtifactData {
  const reqKeys = [
    "displayName",
    "tags",
    "taxonomyVersion",
    "time",
  ];
  return reqKeys.reduce(
    (isType, reqKey) => isType && data.hasOwnProperty(reqKey),
    true,
  );
}

export interface Repository {
  id: string;
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyReference;
}

export interface Artifact {
  parentId?: string;
  id?: string;
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyReference;
  time: string;
  files?: string[];
}

export enum LoadState {
  Pending,
  Complete,
}

export interface PopulatedRepo {
  id: string;
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyReference;
  children: Artifact[];
  loadState: LoadState;
}

export default Storage;
