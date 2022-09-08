class Storage {
  baseUrl: string;

  constructor() {
    const chunks = window.location.href.split('/');  // TODO:
    chunks.pop();
    chunks.pop();
    this.baseUrl = chunks.join('/') + '/artifacts/';
  }

  async listArtifacts() {
    return (await this._fetch(this.baseUrl))
        .mapError(err => new ListError(err.message))
        .unwrap();
  }

  async getDownloadUrl(metadata) {
    return this.baseUrl + metadata.id + '/download';
    //const url = this.baseUrl + metadata.id + '/downloadUrl';
    //return (await this._fetch(url))
        //// TODO: map based on status code?
        //.map(response => {
          //if (response.status === 204) {
            //throw new DownloadError('No files found.');
          //}
          //return response.json();
        //})
        //.mapError(err => new DownloadError(err.message))
        //.unwrap();
  }

  async appendArtifact(item, files: File[]) {
    const [metadata] = item.data;
    console.log({metadata, files});
    const url = this.baseUrl + metadata.id + '/uploadUrl';
    const filenames = files.map((file: File) => file.name);
    const opts = {
      method: 'patch',
      body: JSON.stringify({
        metadata,
        filenames,
      })
    };
    const urls = await (await this._fetch(url, opts))
      .mapError(err => new AppendDataError(err.message))
      .unwrap();
    console.log({urls});
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
    return (await this._fetch(this.baseUrl, opts))
        .mapError(err => new CreateError(err.message))
        .unwrap();
  }

  async _fetch(url: string, opts = null) {
    const response = await fetch(url, opts);
    return RequestResult.from(response);
  }
}

/**
 * A RequestResult is the result from a request. Errors can be mapped (like
 * combinators). Unwrapping the result will either throw an error (if an error
 * occurred) or return the parsed result from the request.
 */
class RequestResult {
  _response: Response;
  _error: Error|null;
  _result: any;

  constructor(response: Response, error: Error) {
    this._response = response;
    this._error = error;
    this._result = null;
  }

  map(fn: (response: Response) => any) {
    if (!this._error) {
      this._result = fn(this._response);
    }
    return this;
  }

  mapError(errFn: (err: Error) => Error) {
    this._error = this._error && errFn(this._error);
    return this;
  }

  async unwrap() {
    if (this._error) {
      throw this._error;
    }

    if (this._result) {
      return await this._result;
    }

    return await this._response.json();
  }

  static async from(response: Response) {
    let error = null;
    if (response.status > 399) {
      error = new RequestError(await response.text());
    }
    return new RequestResult(response, error);
  }
}

class RequestError extends Error {
  constructor(msg: string) { super(msg); }
}

class StorageError extends Error {
  constructor(actionDisplayName: string, msg: string) {
    super(`Unable to ${actionDisplayName}: ${msg}`);
  }
}

class ListError extends StorageError {
  constructor(msg) {
    super('list artifacts', msg); // FIXME: rename "artifact"?
  }
}

class DownloadError extends StorageError {
  constructor(msg) { super('download', msg); }
}

class CreateError extends StorageError {
  constructor(msg) { super('create', msg); }
}

class AppendDataError extends StorageError {
  constructor(msg) { super('append', msg); }
}

export default Storage;
