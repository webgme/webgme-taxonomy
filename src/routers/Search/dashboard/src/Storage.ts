import {filterMap, Result, assert} from './Utils';

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

  async getDownloadUrl(parentId, ...ids) {
    // TODO: add item IDs
    const qs = `ids=${encodeURIComponent(JSON.stringify(ids))}`;
    return this.baseUrl + parentId + `/download?${qs}`;
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
    const opts = {
      method : 'PUT',
      headers : {
        'Accept' : 'application/xml',
        'Content-Type' : 'application/octet-stream',
        'x-ms-blob-type' : 'BlockBlob',
        'x-ms-encryption-algorithm' : 'AES256',
      },
      body : await this.readFile(file),
    };
    return (await this._fetch(sasUrl, opts))
        .mapError(err => new AppendDataError(err.message))
        .unwrap();
  }

  async appendArtifact(item, files: File[]) {
    const metadata = {
      displayName: item.displayName,
      taxonomyTags: item.taxonomyTags,
    };
    console.log({action : 'append', metadata, files});
    const url = `${this.baseUrl}${item.parentId}/${item.id}/uploadUrl`;
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

    const uploadTasks = uploadInfo.map(async (element) => {
      const filename = element.name.substring(4);
      const targetFile = files.find(a => a.name == filename);
      assert(!!targetFile, new AppendDataError('Could not find upload URL for ' + filename));
      await this.pushArtifact(targetFile, element.sasUrl)
    });

    await Promise.all(uploadTasks);

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
    if (!item.displayName) {
      console.log("Found malformed data. Filtering out. Data:", item);
    } else {
      return item;
    }
  }
}

export default Storage;
