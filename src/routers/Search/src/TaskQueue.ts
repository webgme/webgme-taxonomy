import { UserError } from "../../../common/routers/Utils";
import type TagFormatter from "../../../common/TagFormatter";
import type { Adapter } from "./adapters/common/types";
import { COMPRESSION_LEVEL, zip } from "zip-a-folder";
import os from "os";
import fsp from "fs/promises";
import fs from "fs";
import path from "path";
import type { Option } from "oxide.ts";
import { pipeline } from "stream";
import { promisify } from "util";
const streamPipeline = promisify(pipeline);

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
  storage: Adapter;
  formatter: TagFormatter;
  logger: Global.GmeLogger;
  repoId: string;
  contentIds: string[];

  constructor(
    logger: Global.GmeLogger,
    storage: Adapter,
    formatter: TagFormatter,
    repoId: string,
    contentIds: string[],
  ) {
    this.storage = storage;
    this.formatter = formatter;
    this.logger = logger;
    this.repoId = repoId;
    // TODO: test this
    this.contentIds = contentIds.sort((id1, id2) => +id1 < +id2 ? -1 : 1);
  }

  async run(): Promise<string> {
    const tmpDir = await fsp.mkdtemp(
      path.join(os.tmpdir(), "webgme-taxonomy-"),
    );
    const downloadDir = path.join(tmpDir, "download");
    const contentNames = new Set();

    console.log(">>> about to download to", downloadDir);
    // TODO: get file stream?
    // TODO: write the metadata to a file
    // TODO: get the files for each content ID
    // TODO: flatten into contentId, fileId then map into streams
    // TODO: sort the contentIds
    await this.contentIds.reduce(async (prevTask, contentId) => {
      await prevTask;
      // TODO: convert metadata to human format
      const basename: string =
        (await this.storage.getMetadata(this.repoId, contentId))
          .map((metadata) =>
            metadata.tags.Base?.name?.value || metadata.displayName
          ).unwrapOrElse(() => contentId.toString());

      // TODO: refactor this
      let i = 2;
      let uniqName = basename;
      while (contentNames.has(uniqName)) {
        uniqName = `${basename} (${i++})`;
      }
      contentNames.add(uniqName);

      const streamDict = await this.storage.getFileStreams(
        this.repoId,
        contentId,
      );
      await Promise.all(
        Object.entries(streamDict).map(async ([name, dataStream]) => {
          const filePath = path.join(downloadDir, uniqName, name);
          const writeStream = fs.createWriteStream(filePath);
          await streamPipeline(dataStream, writeStream);
        }),
      );
    }, Promise.resolve());

    console.log(">>> about to zip", downloadDir);
    const zipPath = path.join(tmpDir, `${this.repoId}.zip`);
    await zip(downloadDir, zipPath, {
      compression: COMPRESSION_LEVEL.medium,
    });
    await fsp.rm(downloadDir, { recursive: true });

    await fsp.access(zipPath, fs.constants.R_OK);
    console.log("created zip archive:", zipPath, "from", downloadDir);
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
  private taskResults: { [id: TaskID]: O };
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
    const result = await task.run();
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

  getResult(id: TaskID): O {
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
