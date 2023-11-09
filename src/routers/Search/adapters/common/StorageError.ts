import RouterUtils from "../../../../common/routers/Utils";

export class RepositoryNotFound extends RouterUtils.UserError {
  constructor(id: string) {
    super("Repository not found: " + id);
  }
}

export class UnsupportedUriFormat extends RouterUtils.UserError {
  constructor(uri: string) {
    super("Unsupported URI: " + uri);
  }
}
