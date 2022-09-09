/**
 * This is a temporary mechanism to log (and email) creation request
 */
const fsp = require("fs/promises");

module.exports = class CreateRequestLogger {
  constructor(logPath) {
    this.filepath = logPath;
    this._writeTask = Promise.resolve();
  }

  log(observerId, metadata) {
    const request = {
      observerId,
      metadata,
      time: new Date(),
    };

    this._writeTask = this._writeTask.then(() =>
      fsp.appendFile(this.filepath, JSON.stringify(request) + "\n")
    );
  }
};
