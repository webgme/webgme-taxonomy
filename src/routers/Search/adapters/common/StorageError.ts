import { UserError } from "../../../../common/UserError";

export class RepositoryNotFound extends UserError {
  constructor(id: string) {
    super("Repository not found: " + id);
  }
}

export class UnsupportedUriFormat extends UserError {
  constructor(uri: string) {
    super("Unsupported URI: " + uri);
  }
}

export class UnsupportedMethodFormat extends UserError {
  constructor(adapter: string, method: string) {
    super(`${adapter} does not support method: ${method}`);
  }
}
