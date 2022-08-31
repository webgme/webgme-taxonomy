class Storage {
  baseUrl: string;

  constructor() {
    const chunks = window.location.href.split('/');  // TODO:
    chunks.pop();
    chunks.pop();
    this.baseUrl = chunks.join('/') + '/artifacts/';
  }

  async listArtifacts() {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  async getDownloadUrl(metadata) {
    const url = this.baseUrl + metadata.id + '/downloadUrl';
    const response = await fetch(url);
    return await response.json();
  }

  async updateArtifact(metadata, newContent) {
    console.log('Updating artifact:', metadata, newContent);
  }

  async createArtifact(metadata, content) {
    console.log('Creating artifact:', metadata, content);
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        metadata,
      })
    };
    const response = await fetch(this.baseUrl, opts);
    console.log('create artifact response:', await response.json());
  }
}

export default Storage;
