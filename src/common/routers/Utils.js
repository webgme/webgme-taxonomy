const webgme = require("webgme-engine");
const Core = webgme.requirejs("common/core/coreQ");
const jwt = require("jsonwebtoken");

const Utils = {
  async getWebGMEContext(middlewareOpts, req, projectId, branch = "master") {
    const { safeStorage, getUserId, gmeConfig, logger } = middlewareOpts;
    const userId = getUserId(req);

    console.log("CTX-user:", userId);
    console.log("CTX-project:", projectId);
    console.log("CTX-branch:", branch);
    const context = {};

    const projectList = await safeStorage.getProjects({
      username: userId,
    });
    console.log("CTX-projects: ", projectList);
    const projectAuthParams = {
      entityType: safeStorage.authorizer.ENTITY_TYPES.PROJECT,
    };
    const authorizations = await Promise.all(
      projectList.map(
        async (projectInfo) =>
          await safeStorage.authorizer.getAccessRights(
            userId,
            projectInfo._id,
            projectAuthParams
          )
      )
    );
    console.log("CTX-authorizations: ", authorizations);

    context.project = await safeStorage.openProject({
      username: userId,
      projectId,
    });
    // TODO: throw ProjectNotFoundError if not found or invalid perms
    context.project.setUser(userId);

    context.core = new Core(context.project, {
      globConf: gmeConfig,
      logger: logger.fork("core"),
    });
    context.branchName = branch;
    context.commitObject = await context.project.getCommitObject(
      context.branchName
    );
    context.root = await context.core.loadRoot(context.commitObject.root);

    console.log("got context!!!");
    return context;
  },
  getObserverIdFromToken(token) {
    return jwt.decode(token).oid; //TODO maybe we need a complete class for token functions?
  },
};

class UserError extends Error {
  constructor(msg, code) {
    super(msg);
    self.statusCode = 400;
  }
}

class ProjectNotFoundError extends UserError {
  constructor() {
    super("Project not found", 404);
  }
}

Utils.UserError = UserError;
module.exports = Utils;
