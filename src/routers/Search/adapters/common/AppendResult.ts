export class AppendResult {
  //id: string;
  files: UploadRequest[];
  /**
   * This has been deprecated in favor of "id" since this attribute leaks the concept of an "index" from PDP.
   * The goal is to move away from these PDP-specific concepts rather than bake these concepts into every
   * supported storage adapter.
   *
   * TODO: Deprecate this and add 'id' back. I removed the deprecation since there is no
   * alternative yet...
   */
  index: number;

  // FIXME: disable the id field for now since the CLI cannot handle it currently
  constructor(_id: string, files: UploadRequest[], index: number) {
    //this.id = id;
    this.index = index;
    this.files = files;
  }

  /**
   * Get the content ID for the append result. Appending content is adding a new content
   * item for a repository so its version is guaranteed to be 0.
   *
   * I would prefer this be an attribute but this is disabled (for now) as described above.
   */
  getContentId(): string {
    return `${this.index}_0`;
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
