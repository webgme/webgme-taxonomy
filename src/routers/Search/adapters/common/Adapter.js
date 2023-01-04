class Adapter {
  async listArtifacts() {
    unimplemented();
  }

  // TODO: rename to createArtifactSet?
  async createArtifact(metadata) {
    // returns status
    unimplemented();
  }

  // TODO: rename to createArtifact
  async getUploadUrls(artifactSetId, artifactId, metadata, filenames) {
    // returns fileUploadInfo
    unimplemented();
  }

  async getDownloadPath(artifactSetId, ids, formatter) {
    // returns DownloadFile
    unimplemented();
  }
}

function unimplemented() {
  throw new Error("Found a method not overridden in subclass!");
}

module.exports = Adapter;
