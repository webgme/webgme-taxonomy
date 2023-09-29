import RouterUtils from "../../../../../common/routers/Utils";

export class RepositoryNotFound extends RouterUtils.UserError {
  constructor(id: string) {
    super("Repository not found: " + id);
  }
}
