/// <amd-module />
import assert from "assert";
import webgme from "webgme";
//@ts-ignore
const Core = webgme.requirejs("common/core/coreQ");
import jwt from "jsonwebtoken";
import { filterMap } from "../../routers/Search/Utils";
import { SemanticVersion } from "../TaxonomyReference";
import type {
  GmeContentContext,
  GmeContext,
  GmeCore,
  GmeLogger,
  MiddlewareOptions,
  ProjectContext,
  UserProject,
  VerifiedProjectContext,
  WebgmeHandler,
} from "../types";
import type { NextFunction, Request, Response, Router } from "express";
// TODO: module or requirejs
type ContentTypeRoute = (
  context: GmeContentContext,
  req: Request,
  res: Response,
) => Promise<void> | void;
type GmeProjectRoute = (
  context: GmeContext,
  req: Request,
  res: Response,
) => Promise<void> | void;
function makeCore(project: UserProject, opts: MiddlewareOptions): GmeCore {
  const { gmeConfig, logger } = opts;
  //@ts-ignore
  return new Core(project, {
    globConf: gmeConfig,
    logger: logger.fork("core"),
  });
}

interface GmeRouteOpts {
  unsafe?: boolean;
  method: "get" | "post";
}

function getProjectContext(params: { [k: string]: string }): ProjectContext {
  if (!params.projectId) {
    throw new MissingParameterError("projectId");
  }

  if (params.tag) {
    return {
      id: params.projectId,
      tag: params.tag,
    };
  } else if (params.commitHash) {
    return {
      id: params.projectId,
      commit: params.commitHash,
    };
  } else if (params.branch) {
    return {
      id: params.projectId,
      branch: params.branch,
    };
  } else {
    throw new MissingParameterChooseError("tag", "commitHash", "branch");
  }
}

export default {
  async getWebGMEContext(middlewareOpts: MiddlewareOptions, req: Request) {
    const { getUserId } = middlewareOpts;
    const userId = getUserId(req);
    const projectContext = getProjectContext(req.params);

    return await this.getWebGMEContextUnsafe(
      middlewareOpts,
      userId,
      projectContext,
    );
  },
  /**
   * Get the GME context without checking userId authorization.
   */
  async getWebGMEContextUnsafe(
    middlewareOpts: MiddlewareOptions,
    userId: string,
    projectContext: ProjectContext,
  ): Promise<GmeContext> {
    const { safeStorage } = middlewareOpts;
    const { id: projectId } = projectContext;

    console.log("CTX-user:", userId);
    console.log("CTX-project:", projectId);
    let project;

    try {
      project = await safeStorage.openProject({
        username: userId,
        projectId,
      });
    } catch (err) {
      if (err instanceof Error) {
        const authError = err.message.includes("authorized");
        if (authError) {
          throw new ProjectNotFoundError();
        }
      }
      throw err;
    }
    project.setUser(userId);

    const core = makeCore(project, middlewareOpts);

    // The priority is the following commitHash > tag > branch.
    // If nothing is given, we try to open the master branch
    let projectVersion: VerifiedProjectContext;

    // TODO: Get the context
    let commitObject;
    if ("commit" in projectContext) {
      const commitHash = projectContext.commit;
      commitObject = await project.getCommitObject(commitHash);
      projectVersion = {
        id: projectId,
        commit: commitHash as string,
      };
    } else if ("tag" in projectContext) {
      const tag = projectContext.tag;
      const tags = await project.getTags();
      if (!tags.hasOwnProperty(tag)) {
        throw new TagNotFoundError(tag);
      }

      commitObject = await project.getCommitObject(tags[tag]);
      projectVersion = {
        id: projectId,
        tag,
        commit: commitObject._id,
      };
    } else if ("branch" in projectContext) {
      const branch = projectContext.branch;
      commitObject = await project.getCommitObject(branch);

      projectVersion = {
        id: projectId,
        branch,
        commit: commitObject._id,
      };
    } else {
      throw new Error();
    }

    return {
      root: await core.loadRoot(commitObject.root),
      core,
      project,
      projectVersion,
      commitObject,
    };
  },

  getObserverIdFromToken(token: string): string | undefined {
    const tokenData = jwt.decode(token);
    if (typeof tokenData !== "string" && tokenData) {
      return tokenData.oid; //TODO maybe we need a complete class for token functions?
    }
  },

  // Helpers for endpoints to a router that is prefixed with a variety of ways to specify
  // a webgme project context (branch, tag, commit)
  getContentTypeRoutes(route = "") {
    const contentTypeRoute = `:contentTypePath/${route}`;
    return this.getProjectScopedRoutes(contentTypeRoute);
  },

  // FIXME: remove this
  getContentTypeVocabRoutes(route = "") {
    const vocabRoute = `:vocabScope(data|repo)/${route}`;
    return this.getContentTypeRoutes(vocabRoute);
  },

  getProjectScopedRoutes(route = ""): string[] {
    return [
      `/:projectId/branch/:branch/${route}`,
      `/:projectId/tag/:tag/${route}`,
      `/:projectId/commit/:commitHash/${route}`,
    ];
  },

  addContentTypeRoute(
    middlewareOpts: MiddlewareOptions,
    router: Router,
    path: string,
    handler: ContentTypeRoute,
    options: GmeRouteOpts = { method: "get" },
  ): void {
    this.addProjectRoute(
      middlewareOpts,
      router,
      `:contentTypePath/${path}`,
      async (gmeContext, req, res) => {
        const { contentTypePath } = req.params;
        const { core, root } = gmeContext;
        const contentType = await core.loadByPath(root, contentTypePath);
        assert(contentType, new ContentTypeNotFoundError(contentTypePath));
        const context = {
          project: gmeContext.project,
          projectVersion: gmeContext.projectVersion,
          core: gmeContext.core,
          root: gmeContext.root,
          commitObject: gmeContext.commitObject,
          contentType,
        };
        console.log("CTX received:", req.originalUrl);
        await handler(context, req, res);
      },
      options,
    );
  },

  addProjectRoute(
    middlewareOpts: MiddlewareOptions,
    router: Router,
    path: string,
    handler: GmeProjectRoute,
    options: GmeRouteOpts = { method: "get" },
  ): void {
    const { unsafe, method } = options;
    const contextFn: (req: Request) => Promise<GmeContext> = !unsafe
      ? (request: Request) => this.getWebGMEContext(middlewareOpts, request)
      : (request: Request) => {
        const userId = request.params.projectId.split("+").shift();
        if (!userId) {
          throw new InvalidProjectIdError(request.params.projectId);
        }

        const projectContext = getProjectContext(request.params);
        return this.getWebGMEContextUnsafe(
          middlewareOpts,
          userId,
          projectContext,
        );
      };

    router[method](
      this.getProjectScopedRoutes(path),
      handleUserErrors(
        middlewareOpts.logger,
        async (req, res) => {
          const gmeContext = await contextFn(req);
          handler(gmeContext, req, res);
        },
      ),
    );
  },

  addLatestVersionRedirect(middlewareOpts: MiddlewareOptions, router: Router) {
    const { logger } = middlewareOpts;
    router.use(
      this.getProjectScopedRoutes(),
      handleUserErrors(
        logger,
        async function resolveLatestTag(req: Request, res: Response) {
          const { projectId, tag } = req.params;
          if (tag === "latest") {
            const { safeStorage } = middlewareOpts;
            const userId = projectId.split("+").shift() as string;
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
        },
      ),
    );
    return router;
  },
};

export function handleUserErrors(logger: GmeLogger, ...fns: WebgmeHandler[]) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
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

export class UserError extends Error {
  statusCode: number;

  constructor(msg: string, code = 400) {
    super(msg);
    this.statusCode = code;
  }

  sendVia(response: Response) {
    response.status(this.statusCode).send(this.message);
  }
}

class ProjectNotFoundError extends UserError {
  constructor() {
    super("Project not found", 404);
  }
}

class ContentTypeNotFoundError extends UserError {
  constructor(path: string) {
    super(`Content type not found: ${path}`, 404);
  }
}

class InvalidProjectIdError extends UserError {
  constructor(projectId: string | undefined) {
    const msg = projectId
      ? `Invalid project ID: ${projectId}`
      : `Project ID required.`;
    super(msg);
  }
}

class TagNotFoundError extends UserError {
  constructor(tag: string) {
    super(`Tag not found: ${tag}`, 404);
  }
}

export class TestEnvOnlyError extends UserError {
  constructor(name: string) {
    super(`${name} is only allowed on a test deployment`, 403);
  }

  static check(name: string) {
    if (typeof process !== "undefined" && process.env.ENV !== "test") {
      throw new TestEnvOnlyError(name);
    }
  }
}

class MissingParameterError extends UserError {
  constructor(param: string) {
    super(`Missing URL parameter: ${param}`);
  }
}

/**
 * Missing a required parameter. Must choose one from the given set.
 */
class MissingParameterChooseError extends UserError {
  constructor(...choices: string[]) {
    super(`Must specify a URL parameter from: ${choices.join(" ")}`);
  }
}

interface Emitter {
  on<T>(name: string, callback: (data: T) => void): void;
}
async function eventEmitted(emitter: Emitter, eventName: string) {
  return new Promise((resolve) => {
    emitter.on(eventName, resolve);
  });
}

export function responseClose(res: Response) {
  return eventEmitted(res, "close");
}
