import { UserError } from "../../../common/routers/Utils";
import type { ArtifactMetadatav2 } from "./adapters/common/types";
import StorageAdapter from "./adapters";
import { COMPRESSION_LEVEL, zip } from "zip-a-folder";
import os from "os";
import fsp from "fs/promises";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
const streamPipeline = promisify(pipeline);
import { Result } from "oxide.ts";
import { UniqueNames } from "./Utils";
import { AzureGmeConfig, WebgmeRequest } from "../../../common/types";

export enum Status {
  Created,
  Running,
  Complete,
}

let taskCounter = 0;

type TaskID = number;
class Task<R extends Runnable<O>, O> {
  id: TaskID;
  status: Status;
  private runnable: R;

  constructor(runnable: R) {
    this.runnable = runnable;
    this.id = taskCounter++;
    this.status = Status.Created;
  }

  async run(): Promise<O> {
    return await this.runnable.run();
  }
}

interface Runnable<O> {
  run(): Promise<O>;
}

export type FilePath = string;
export class DownloadTask implements Runnable<FilePath> {
  private config: AzureGmeConfig;
  private req: WebgmeRequest;
  logger: Global.GmeLogger;
  metadata: ArtifactMetadatav2[];
  getRepoName: () => Promise<string>;

  constructor(
    config: AzureGmeConfig,
    logger: Global.GmeLogger,
    req: WebgmeRequest,
    metadata: ArtifactMetadatav2[],
    getRepoName: () => Promise<string>,
  ) {
    this.getRepoName = getRepoName;
    this.config = config;
    this.req = req;
    this.logger = logger;
    this.metadata = metadata;
  }

  async run(): Promise<string> {
    // TODO: guarantee that the Base.URI term exists?
    // What do we fall back on if the taxonomy doesn't support URIs?
    const contentUris = this.metadata
      .map((metadata) =>
        metadata.tags.Base?.Location?.URI || metadata.tags.Base?.URI?.value
      );
    // Get unique names for each
    const namer = new UniqueNames();
    const names: string[] = this.metadata.map((metadata) =>
      metadata.tags.Base?.name?.value || metadata.displayName
    );

    const uniqNames = names.reduce(
      (names, name) => names.concat(namer.unique(name)),
      <string[]> [],
    );

    // Write data to files
    const tmpDir = await fsp.mkdtemp(
      path.join(os.tmpdir(), "webgme-taxonomy-"),
    );
    const downloadDir = path.join(tmpDir, "download");
    await fsp.mkdir(downloadDir);

    const fileWriteTasks = uniqNames.map(
      async (contentName, index) => {
        const uri = contentUris[index];
        const storage = await StorageAdapter.fromUri(
          this.req,
          uri,
          this.config,
        );
        const [repoId, id] = storage.resolveUri(uri);
        console.log("getting file streams:", { uri, repoId, id });
        const streamDict = await storage.getFileStreams(repoId, id);

        // create the main content directory
        const contentDir = path.join(downloadDir, contentName);
        await fsp.mkdir(contentDir);

        // add the metadata file
        const metadata = this.metadata[index];
        const metadataPath = path.join(contentDir, "metadata.json");
        await fsp.writeFile(
          metadataPath,
          JSON.stringify(metadata.tags, null, 2),
        );

        // hook up the streaming file pipelines
        await Promise.all(
          Object.entries(streamDict).map(async ([name, dataStream]) => {
            const filePath = path.join(downloadDir, contentName, name);
            await fsp.mkdir(path.dirname(filePath), { recursive: true });
            const writeStream = fs.createWriteStream(filePath);
            await streamPipeline(dataStream, writeStream);
          }),
        );
      },
    );

    await Promise.all(fileWriteTasks);

    // Zip the downloaded files. If only a single content, download just that one
    const [archiveName, dataDir]: [string, string] = this.metadata.length === 1
      ? [uniqNames[0], path.join(downloadDir, uniqNames[0])]
      : [await this.getRepoName(), downloadDir];

    const zipPath = path.join(tmpDir, `${archiveName}.zip`);
    await zip(dataDir, zipPath, {
      compression: COMPRESSION_LEVEL.medium,
    });
    await fsp.rm(downloadDir, { recursive: true });
    await fsp.access(zipPath, fs.constants.R_OK);

    return zipPath;
  }
}

class TaskNotFoundError extends UserError {
  constructor() {
    super("Task not found", 404);
  }
}

class TaskNotCompleteError extends UserError {
  constructor() {
    super("Task not complete");
  }
}

export default class TaskQueue<R extends Runnable<O>, O> {
  private tasks: Task<R, O>[];
  private currentTasks: Task<R, O>[];
  private taskResults: { [id: TaskID]: Result<O, Error> };
  private maxConcurrentTasks: number;

  constructor() {
    this.tasks = [];
    this.currentTasks = [];
    this.taskResults = {};
    this.maxConcurrentTasks = 1;
  }

  submitTask(task: R): TaskID {
    const innerTask: Task<R, O> = new Task(task);

    this.tasks.push(innerTask);
    // TODO: make sure to run tasks
    // TODO: set the status
    const isIdle = this.currentTasks.length === 0;
    if (isIdle) {
      this.start();
    }

    return innerTask.id;
  }

  private async start() {
    const currentTask = this.tasks.shift();

    if (currentTask) {
      this.currentTasks.push(currentTask);
      await this.runTask(currentTask);
      const index = this.currentTasks.indexOf(currentTask);
      this.currentTasks.splice(index, 1);

      if (
        this.currentTasks.length < this.maxConcurrentTasks && this.tasks.length
      ) {
        this.start();
      }
    }
  }

  private async runTask(task: Task<R, O>) {
    const result = await Result.safe(task.run());
    this.taskResults[task.id] = result;
  }

  getStatus(id: TaskID) {
    if (this.taskResults[id]) {
      return Status.Complete;
    } else if (this.tasks.find((t) => t.id === id)) {
      return Status.Created;
    } else if (this.currentTasks.find((t) => t.id === id)) {
      return Status.Running;
    } else {
      throw new TaskNotFoundError();
    }
  }

  getResult(id: TaskID): Result<O, Error> {
    const result = this.taskResults[id];

    if (!result) {
      const status = this.getStatus(id);
      if (status !== Status.Complete) {
        throw new TaskNotCompleteError();
      } else {
        // FIXME: what error happened here?
        throw new TaskNotCompleteError();
      }
    }

    delete this.taskResults[id];
    return result;
  }
}
