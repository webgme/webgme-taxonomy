/**
 * This is a temporary mechanism to log (and email) creation request
 */
import fsp from "fs/promises";
import type { ArtifactMetadata } from "../common/types";

export default class CreateRequestLogger {
  filepath: string;
  private _writeTask: Promise<void>;

  constructor(logPath: string) {
    this.filepath = logPath;
    this._writeTask = Promise.resolve();
  }

  log(observerId: string, metadata: ArtifactMetadata) {
    const request = {
      observerId,
      metadata,
      time: new Date(),
    };

    this._writeTask = this._writeTask.then(() =>
      fsp.appendFile(this.filepath, JSON.stringify(request) + "\n")
    );
  }
}
