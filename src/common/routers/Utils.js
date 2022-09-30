const webgme = require("webgme-engine");
const Core = webgme.requirejs("common/core/coreQ");
const jwt = require("jsonwebtoken");

const Utils = {
  async getWebGMEContext(middlewareOpts, req, projectContext) {
    const { getUserId } = middlewareOpts;
    const userId = getUserId(req);
    return await Utils.getWebGMEContextUnsafe(
      middlewareOpts,
      userId,
      projectContext
    );
  },
  // This is unsafe since it bypasses permissions
  async getWebGMEContextUnsafe(
    middlewareOpts,
    userId,
    projectContext
  ) {
    const { safeStorage, gmeConfig, logger } = middlewareOpts;
    const {projectId, branch, tag, commitHash} = projectContext;

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

    // The priority is the following commitHash > tag > branch.
    // If nothing is given, we try to open the master branch
    console.log('CTX:',branch,tag,commitHash);
    if (commitHash) {
      context.commitHash = commitHash;
      context.commitObject = await context.project.getCommitObject(commitHash);
    } else if (tag) {
      context.tag = tag;
      const tags = await context.project.getTags();
      console.log('CTX-tags:', tags);
      if (tags.hasOwnProperty(tag)) {
        context.commitObject = await context.project.getCommitObject(tags[tag]);
      } else {
        throw new Error('No tag ['+ tag + '] exists!');
      }
    } else {
      context.branchName = branch || 'master';
      context.commitObject = await context.project.getCommitObject(
        context.branchName
      );  
    }
    
    context.root = await context.core.loadRoot(context.commitObject.root);

    console.log("got context!!!");
    return context;
  },
  getObserverIdFromToken(token) {
    return jwt.decode(token).oid; //TODO maybe we need a complete class for token functions?
  },
};

class UserError extends Error {
  constructor(msg, code = 400) {
    super(msg);
    this.statusCode = code;
  }
}

class ProjectNotFoundError extends UserError {
  constructor() {
    super("Project not found", 404);
  }
}

class ContentTypeNotFoundError extends UserError {
  constructor(path) {
    super(`Content type not found: ${path}`, 404);
  }
}

Utils.UserError = UserError;
Utils.ContentTypeNotFoundError = ContentTypeNotFoundError;
module.exports = Utils;
