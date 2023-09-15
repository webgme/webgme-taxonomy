const webgme = require("webgme-engine");
const assert = require("assert");
const Core = webgme.requirejs("common/core/coreQ");
const jwt = require("jsonwebtoken");
const { filterMap } = require("../../routers/Search/build/Utils");
const {
  SemanticVersion,
} = require("../../routers/Search/dashboard/dist/TaxonomyReference");

const Utils = {
  async getWebGMEContext(middlewareOpts, req) {
    const { getUserId } = middlewareOpts;
    const userId = getUserId(req);
    const projectContext = req.params;
    return await Utils.getWebGMEContextUnsafe(
      middlewareOpts,
      userId,
      projectContext,
    );
  },
  // This is unsafe since it bypasses permissions
  async getWebGMEContextUnsafe(middlewareOpts, userId, projectContext) {
    const { safeStorage, gmeConfig, logger } = middlewareOpts;
    const { projectId, branch, tag, commitHash } = projectContext;

    console.log("CTX-user:", userId);
    console.log("CTX-project:", projectId);
    console.log("CTX-branch:", branch);
    const context = {};

    try {
      context.project = await safeStorage.openProject({
        username: userId,
        projectId,
      });
    } catch (err) {
      const authError = err.message.includes("authorized");
      if (authError) {
        throw new ProjectNotFoundError();
      } else {
        throw err;
      }
    }
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
        throw new TagNotFoundError(tag);
      }
    } else {
      context.branchName = branch || "master";
      context.projectVersion.branch = branch;
      context.commitObject = await context.project.getCommitObject(
        context.branchName,
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

  // FIXME: remove this
  getContentTypeVocabRoutes(route = "") {
    const vocabRoute = `:vocabScope(data|repo)/${route}`;
    return Utils.getContentTypeRoutes(vocabRoute);
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
      }),
    );
  },

  addProjectScopeMiddleware(middlewareOpts, router, options = {}) {
    const { logger } = middlewareOpts;
    const { unsafe } = options;
    const contextFn = !unsafe
      ? (request) => Utils.getWebGMEContext(middlewareOpts, request)
      : (request) => {
        const userId = request.params.projectId.split("+").shift();
        return Utils.getWebGMEContextUnsafe(
          middlewareOpts,
          userId,
          request.params,
        );
      };

    Utils.addLatestVersionRedirect(middlewareOpts, router);

    return router.use(
      Utils.getProjectScopedRoutes(),
      handleUserErrors(
        logger,
        async (req) => (req.webgmeContext = await contextFn(req)),
      ),
    );
  },

  addLatestVersionRedirect(middlewareOpts, router) {
    const { logger } = middlewareOpts;
    router.use(
      Utils.getProjectScopedRoutes(),
      handleUserErrors(logger, async function resolveLatestTag(req, res) {
        const { projectId, tag } = req.params;
        if (tag === "latest") {
          const { safeStorage } = middlewareOpts;
          const userId = projectId.split("+").shift();
          const tagDict = await safeStorage.getTags({
            projectId,
            username: userId,
          });
          const tags = filterMap(Object.keys(tagDict), (tagName) => {
            try {
              const version = SemanticVersion.parse(tagName);
              return {
                name: tagName,
                version,
              };
            } catch (_err) {
              return undefined;
            }
          });

          if (tags.length === 0) {
            throw new TagNotFoundError("latest");
          }

          const latestTag = tags.reduce((latest, other) =>
            latest.version.gte(other.version) ? latest : other
          );

          const url = req.originalUrl.replace(
            "/tag/latest",
            `/tag/${latestTag.name}`,
          );
          res.redirect(url);
        }
      }),
    );
    return router;
  },
};

function handleUserErrors(logger, ...fns) {
  return async function (req, res, next) {
    try {
      await fns.reduce(async (prev, fn) => {
        await prev;
        if (!res.headersSent) {
          return await fn(req, res);
        }
      }, Promise.resolve());
      if (!res.headersSent) {
        next();
      }
    } catch (e) {
      if (e instanceof UserError) {
        e.sendVia(res);
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

  sendVia(response) {
    response.status(this.statusCode).send(this.message);
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

class TagNotFoundError extends UserError {
  constructor(tag) {
    super(`Tag not found: ${tag}`, 404);
  }
}

class TestEnvOnlyError extends UserError {
  constructor(name) {
    super(`${name} is only allowed on a test deployment`, 403);
  }

  static check(name) {
    if (typeof process !== "undefined" && process.env.ENV !== "test") {
      throw new TestEnvOnlyError(name);
    }
  }
}

async function eventEmitted(emitter, eventName) {
  return new Promise((resolve) => {
    emitter.on(eventName, resolve);
  });
}

Utils.UserError = UserError;
Utils.TestEnvOnlyError = TestEnvOnlyError;
Utils.handleUserErrors = handleUserErrors;
Utils.responseClose = (res) => {
  return eventEmitted(res, "close");
};
module.exports = Utils;
