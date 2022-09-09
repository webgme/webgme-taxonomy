import {filterMap, Result} from './Utils';

class Storage {
  baseUrl: string;
  constructor() {
    const chunks = window.location.href.split('/'); // TODO:
    chunks.pop();
    chunks.pop();
    this.baseUrl = chunks.join('/') + '/artifacts/';
  }

  async listArtifacts() {
    const result = (await this._fetchJson(this.baseUrl))
                       .mapError((err: Error) => new ListError(err.message));
    const items: any[] = await result.unwrap();
    return filterMap(items, item => Artifact.tryFrom(item));
  }

  async getDownloadUrl(metadata) {
    return this.baseUrl + metadata.id + '/download';
    // const url = this.baseUrl + metadata.id + '/downloadUrl';
    // return (await this._fetchJson(url))
    //// TODO: map based on status code?
    //.map(response => {
    // if (response.status === 204) {
    // throw new DownloadError('No files found.');
    //}
    // return response.json();
    //})
    //.mapError(err => new DownloadError(err.message))
    //.unwrap();
  }

  async readFile(file: File) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.error) {
          console.log("error:", reader.error);
          return rej(reader.error);
        } else {
          return res(reader.result);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  async pushArtifact(file: File, sasUrl: string) {
    console.log('Uploading to', sasUrl, file.name);
    const myString = await this.readFile(file)
    console.log(myString)
    const opts = {
      method : 'PUT',
      headers : {
        'Connection' : 'keep-alive',
        'x-ms-blob-type' : 'BlockBlob',
        'Content-Type' : 'application/octet-stream',
        'Accept' : 'application/xml',
        'x-ms-version' : '2020-10-02',
        'x-ms-client-request-id' : 'b71bb1f3-491e-4000-b8a6-fc86a0a48c37',
        'x-ms-encryption-algorithm' : 'AES256',
        'Origin': 'https://leappremonition.azurewebsites.net',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://leappremonition.azurewebsites.net/',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      body : myString
    };
    return (await this._fetch(sasUrl, opts))
        .mapError(err => new AppendDataError(err.message))
        .unwrap();
  }

  async appendArtifact(item, files: File[]) {
    const [metadata] = item.data;
    console.log({action : 'append', metadata, files});
    const url = this.baseUrl + item.id + '/uploadUrl';
    const filenames = files.map((file: File) => file.name);

    // const myString = await this.readFile(files[0])
    // console.log(myString)

    const opts = {
      method : 'post',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        metadata,
        filenames,
      })
    };

    const uploadInfo = await (await this._fetchJson(url, opts))
                           .mapError(err => new AppendDataError(err.message))
                           .unwrap();

    // TODO: use the upload info to push the files
    if (uploadInfo) {
      uploadInfo.map(
          async (element) => {
              const targetFile =
                  files
                      .filter(a => a.name == element.name.substring(4))
                          await this.pushArtifact(targetFile[0],
                                                  element.sasUrl)})
    }

    // TODO: use the upload info to push the files
    console.log({uploadInfo});
    console.log('Append artifact:', metadata, files);
  }

  async updateArtifact(metadata, newContent) {
    console.log('Updating artifact:', metadata, newContent);
  }

  async createArtifact(metadata, files) {
    console.log('Creating artifact:', metadata, files);
    const opts = {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        metadata,
      })
    };
    return (await this._fetchJson(this.baseUrl, opts))
        .mapError(err => new CreateError(err.message))
        .unwrap();
  }

  async _fetch(url: string, opts = null) {
    const response = await fetch(url, opts);
    let error = null;
    if (response.status > 399) {
      error = new RequestError(await response.text());
    }
    return new Result(response, error);
  }

  async _fetchJson(url: string, opts = null) {
    return (await this._fetch(url, opts)).map(response => response.json());
  }
}

export class RequestError extends Error {
  constructor(msg: string) { super(msg); }
}

class StorageError extends RequestError {
  constructor(actionDisplayName: string, msg: string) {
    super(`Unable to ${actionDisplayName}: ${msg}`);
  }
}

class ListError extends StorageError {
  constructor(msg: string) {
    super('list artifacts', msg); // FIXME: rename "artifact"?
  }
}

class DownloadError extends StorageError {
  constructor(msg: string) { super('download', msg); }
}

class CreateError extends StorageError {
  constructor(msg: string) { super('create', msg); }
}

class AppendDataError extends StorageError {
  constructor(msg: string) { super('append', msg); }
}

class Artifact {
  static tryFrom(item: any) {
    const metadata = item.data ? item.data[0] : null;
    if (!metadata || !metadata.displayName) {
      console.log("Found malformed data. Filtering out. Data:", item);
    } else {
      return item;
    }
  }
}

export default Storage;
