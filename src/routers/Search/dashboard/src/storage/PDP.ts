import testDataItems from "../TestResultData.js";

class PDP {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  async listArtifacts() {
    console.log('list artifacts');
    return testDataItems;
  }

  async downloadArtifact(metadata) {
    // TODO
  }

  async updateArtifact(metadata, newContent) {
    // TODO
  }

  async createArtifact(metadata, content) {
    // TODO
  }
}

export default PDP;
