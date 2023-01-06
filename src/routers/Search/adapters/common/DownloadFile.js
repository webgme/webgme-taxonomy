// This is a file used to download a given archive. This should
class DownloadFile {
  constructor(filePath, name) {
    this.path = filePath;
    this.name = name || filePath;
  }

  async cleanUp() {
    // This can be implemented in child classes
  }
}

module.exports = DownloadFile;
