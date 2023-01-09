class AppendResult {
  constructor(index, files) {
    this.index = index;
    this.files = files;
  }
}

class UploadRequest {
  constructor(name, params) {
    this.name = name;
    this.params = params;
  }
}

class UploadParams {
  constructor(url, method, headers = {}) {
    this.url = url;
    this.method = method;
    this.headers = headers;
  }
}

module.exports = {
  AppendResult,
  UploadRequest,
  UploadParams,
};
