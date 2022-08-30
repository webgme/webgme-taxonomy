class Storage {
  baseUrl: string;

  constructor() {
    const chunks = window.location.href.split('/');  // TODO:
    chunks.pop();
    chunks.pop();
    this.baseUrl = chunks.join('/') + '/';
  }

  async listArtifacts() {
    const response = await fetch(this.baseUrl + 'artifacts/');
    return response.json();
  }

  async getDownloadUrl(metadata) {
    const url = this.baseUrl + 'artifacts/' + metadata.id + '/downloadUrl';
    const response = await fetch(url);
    return response.json();
  }

  async updateArtifact(metadata, newContent) {
    console.log('Updating artifact:', metadata, newContent);
  }

  async createArtifact(metadata, content) {
    console.log('Creating artifact:', metadata, content);
  }
}

export default Storage;
