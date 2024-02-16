export class AppendResult {
  id: string;
  files: UploadRequest[];
  /**
   * This has been deprecated in favor of "id" since this attribute leaks the concept of an "index" from PDP.
   * The goal is to move away from these PDP-specific concepts rather than bake these concepts into every
   * supported storage adapter.
   * 
   * @deprecated
   */
  index: number;

  constructor(id: string, files: UploadRequest[], index: number) {
    this.id = id;
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

type StringDict = { [key: string]: string };
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
