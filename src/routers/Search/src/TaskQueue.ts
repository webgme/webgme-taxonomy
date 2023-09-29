import { UserError } from "../../../common/routers/Utils";
import type TagFormatter from "../../../common/TagFormatter";
import type { Adapter } from "./adapters/common/types";
import { COMPRESSION_LEVEL, zip } from "zip-a-folder";
import os from "os";
import fsp from "fs/promises";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
const streamPipeline = promisify(pipeline);
import { Option, Result } from "oxide.ts";
import { cmp, UniqueNames } from "./Utils";

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
    // Fetch all the metadata
    const metadata = await Promise.all(
      this.contentIds.map(async (contentId) => {
        const metadata = await this.storage.getMetadata(this.repoId, contentId);
        return metadata.map((md) => {
          md.tags = this.formatter.toHumanFormat(md.tags);
          return md;
        });
      }),
    );

    // Get unique names for each
    const namer = new UniqueNames();
    const names: string[] = metadata.map((metadataOpt, index) => {
      return metadataOpt.map((metadata) =>
        metadata.tags.Base?.name?.value || metadata.displayName
      ).unwrapOrElse(() => {
        const contentId = this.contentIds[index];
        this.logger.info(
          `No "Base.name" tag found for ${contentId} (${this.repoId})`,
        );
        return contentId.toString();
      });
    });

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
        const contentId = this.contentIds[index];
        const streamDict = await this.storage.getFileStreams(
          this.repoId,
          contentId,
        );

        console.log();
        console.log("file streams for", contentName + ":");
        console.log(Object.keys(streamDict));

        // create the directories and hook up the file pipelines
        const contentDir = path.join(downloadDir, contentName);
        await fsp.mkdir(contentDir);
        const dirs = new Set(
          Object.keys(streamDict)
            .map((filepath) => path.dirname(filepath))
            .sort(cmp.length),
        );
        await Promise.all(
          [...dirs].map((dir) => fsp.mkdir(dir, { recursive: true })),
        );

        await Promise.all(
          Object.entries(streamDict).map(async ([name, dataStream]) => {
            const filePath = path.join(downloadDir, contentName, name);
            const writeStream = fs.createWriteStream(filePath);
            console.log(name, "->", filePath);
            await streamPipeline(dataStream, writeStream);
          }),
        );
      },
    );

    await Promise.all(fileWriteTasks);

    // Zip the downloaded files. If only a single content, download just that one
    const [archiveName, dataDir]: [string, string] =
      this.contentIds.length === 1
        ? [uniqNames[0], path.join(downloadDir, uniqNames[0])]
        : [await this.getRepositoryName(this.repoId), downloadDir];

    const zipPath = path.join(tmpDir, `${archiveName}.zip`);
    await zip(dataDir, zipPath, {
      compression: COMPRESSION_LEVEL.medium,
    });
    await fsp.rm(downloadDir, { recursive: true });
    await fsp.access(zipPath, fs.constants.R_OK);

    console.log("created zip archive:", zipPath, "from", downloadDir);
    return zipPath;
  }

  async getRepositoryName(repoId: string): Promise<string> {
    const metadata = await this.storage.getRepoMetadata(repoId);
    const tags = this.formatter.toHumanFormat(metadata.tags);
    return Option.from(tags.Base?.name?.value as string)
      .unwrapOrElse(() => {
        this.logger.info(
          `No "Base.name" tag found for ${this.repoId}. Using ID instead.`,
        );
        return repoId;
      });
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
