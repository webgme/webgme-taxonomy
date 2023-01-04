class Adapter {
  async listArtifacts() {
    unimplemented();
  }

  // TODO: rename to createArtifactSet?
  async createArtifact(metadata) {
    // returns status
    unimplemented();
  }

  async appendArtifact(artifactSetId, artifactId, metadata, filenames) {
    // returns fileUploadInfo
    unimplemented();
  }

  async getDownloadPath(artifactSetId, ids, formatter) {
    // returns DownloadFile
    unimplemented();
  }

  async uploadFile(artifactSetId, index, fileId, fileStream) {
    unsupported();
  }
}

function unimplemented() {
  throw new Error("Found a method not overridden in subclass!");
}

function unsupported() {
  throw new Error("Method not supported by storage adapter");
}

module.exports = Adapter;
