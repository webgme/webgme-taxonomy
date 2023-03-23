export class AppendResult {
  index: number;
  files: UploadRequest[];

  constructor(index: number, files: UploadRequest[]) {
    this.index = index;
    this.files = files;
  }
}

export class UploadRequest {
  name: string;
  params: UploadParams;

  constructor(name: string, params: UploadParams) {
    this.name = name;
    this.params = params;
  }
}

type StringDict = {[key: string]: string};
export class UploadParams {
  url: string;
  method: string;
  headers: StringDict;

  constructor(url: string, method: string, headers: StringDict = {}) {
    this.url = url;
    this.method = method;
    this.headers = headers;
  }
}
