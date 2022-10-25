const webgme = require("webgme-engine");
const assert = require("assert");
const Core = webgme.requirejs("common/core/coreQ");
const jwt = require("jsonwebtoken");

const Utils = {
  async getWebGMEContext(middlewareOpts, req) {
    const { getUserId } = middlewareOpts;
    const userId = getUserId(req);
    const projectContext = req.params;
    return await Utils.getWebGMEContextUnsafe(
      middlewareOpts,
      userId,
      projectContext
    );
  },
  // This is unsafe since it bypasses permissions
  async getWebGMEContextUnsafe(middlewareOpts, userId, projectContext) {
    const { safeStorage, gmeConfig, logger } = middlewareOpts;
    const { projectId, branch, tag, commitHash } = projectContext;

    console.log("calling from getWebGMEContextUnsafe");
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
    console.log("CTX:", branch, tag, commitHash);
    context.projectVersion = {
      id: projectId,
    };
    if (commitHash) {
      context.commitHash = commitHash;
      context.commitObject = await context.project.getCommitObject(commitHash);
      context.projectVersion.commit = commitHash;
    } else if (tag) {
      context.tag = tag;
      context.projectVersion.tag = tag;
      const tags = await context.project.getTags();
      console.log("CTX-tags:", tags);
      if (tags.hasOwnProperty(tag)) {
        context.commitObject = await context.project.getCommitObject(tags[tag]);
      } else {
        throw new Error("No tag [" + tag + "] exists!");
      }
    } else {
      context.branchName = branch || "master";
      context.projectVersion.branch = branch;
      context.commitObject = await context.project.getCommitObject(
        context.branchName
      );
    }

    context.root = await context.core.loadRoot(context.commitObject.root);
    context.projectVersion.commit = context.commitObject._id;

    console.log("got context!!!");
    return context;
  },
  getObserverIdFromToken(token) {
    return jwt.decode(token).oid; //TODO maybe we need a complete class for token functions?
  },

  // Helpers for endpoints to a router that is prefixed with a variety of ways to specify
  // a webgme project context (branch, tag, commit)
  getContentTypeRoutes(route = "") {
    const contentTypeRoute = `:contentTypePath/${route}`;
    return Utils.getProjectScopedRoutes(contentTypeRoute);
  },

  getProjectScopedRoutes(route = "") {
    return [
      `/:projectId/branch/:branch/${route}`,
      `/:projectId/tag/:tag/${route}`,
      `/:projectId/commit/:commitHash/${route}`,
    ];
  },

  addContentTypeMiddleware(middlewareOpts, router, options) {
    Utils.addProjectScopeMiddleware(middlewareOpts, router, options);
    const { logger } = middlewareOpts;
    return router.use(
      Utils.getContentTypeRoutes(),
      handleUserErrors(logger, async (req) => {
        const { contentTypePath } = req.params;
        const { core, root } = req.webgmeContext;
        const contentType = await core.loadByPath(root, contentTypePath);
        assert(contentType, new ContentTypeNotFoundError(contentTypePath));
        req.webgmeContext.contentType = contentType;
        console.log("CTX received:", req.originalUrl);
      })
    );
  },

  addProjectScopeMiddleware(middlewareOpts, router, options = {}) {
    const { logger } = middlewareOpts;
    const { unsafe } = options;
    const contextFn = !unsafe ?
      (request) => Utils.getWebGMEContext(middlewareOpts, request) :
      (request) => {
        const { projectId, branch } = request.params;
        const userId = projectId.split("+").shift();
        return Utils.getWebGMEContextUnsafe(middlewareOpts, userId, { projectId, branch });
      };
    return router.use(
      Utils.getProjectScopedRoutes(),
      handleUserErrors(
        logger,
        async (req) => req.webgmeContext = await contextFn(req)
      )
    );
  },
};

function handleUserErrors(logger, fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
      if (!res.headersSent) {
        next();
      }
    } catch (e) {
      if (e instanceof UserError) {
        res.status(e.statusCode).send(e.message);
      } else {
        logger.error(e);
        res.sendStatus(500);
      }
    }
  };
}

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
Utils.handleUserErrors = handleUserErrors;
module.exports = Utils;
