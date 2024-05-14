/// <amd-module />
import assert from "assert";
import webgme from "webgme";
import fs from "node:fs/promises";
//@ts-ignore
const Core = webgme.requirejs("common/core/coreQ");
import jwt from "jsonwebtoken";
import { filterMap } from "../../common/Utils";
import { SemanticVersion } from "../TaxonomyReference";
import type {
  GmeContentContext,
  GmeContext,
  GmeCore,
  GmeLogger,
  MiddlewareOptions,
  PackageJSON,
  ProjectContext,
  UserProject,
  VerifiedProjectContext,
  WebgmeHandler,
} from "../types";
import type { NextFunction, Request, Response, Router } from "express";
import TagFormatter from "../TagFormatter";
import { TaxNodeNotFoundError } from "../../routers/Search/adapters/common/ModelError";
import Utils from "../Utils";
import {
  ContentTypeNotFoundError,
  InvalidProjectIdError,
  MissingParameterChooseError,
  MissingParameterError,
  ProjectNotFoundError,
  TagNotFoundError,
  UserError,
} from "../UserError";

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

/**
 * Create a new Core instance.
 * @param project
 * @param opts
 * @returns
 */
export function makeCore(
  project: UserProject,
  opts: MiddlewareOptions,
): GmeCore {
  const { gmeConfig, logger } = opts;
  //@ts-ignore
  return new Core(project, {
    globConf: gmeConfig,
    logger: logger.fork("core"),
  });
}

interface GmeRouteOpts {
  unsafe?: boolean;
  method: "get" | "post" | "delete";
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
  /**
   * Get the GME context and use authorization from the userId in the request.
   * @param middlewareOpts
   * @param req
   * @returns Resolves to GmeContext
   */
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
   * @param middlewareOpts
   * @param userId
   * @param projectContext
   * @returns Resolves to GmeContext
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
      throw new Error(); // FIXME: more meaningful error
    }

    return {
      root: await core.loadRoot(commitObject.root),
      core,
      project,
      projectVersion,
      commitObject,
    };
  },

  /**
   * What is this?
   * @param token
   * @returns
   */
  getObserverIdFromToken(token: string): string | undefined {
    const tokenData = jwt.decode(token);
    if (typeof tokenData !== "string" && tokenData) {
      return tokenData.oid; //TODO maybe we need a complete class for token functions?
    }
  },

  /**
   * Creates router endpoints with contentTypePath that are prefixed with a variety of ways to specify
   * a webgme project context (branch, tag, commit).
   * @param route
   * @returns routes using brach, tag or commit
   */
  getContentTypeRoutes(route = "") {
    const contentTypeRoute = `:contentTypePath/${route}`;
    return this.getProjectScopedRoutes(contentTypeRoute);
  },

  /**
   * Creates router endpoints that are prefixed with a variety of ways to specify
   * a webgme project context (branch, tag, commit).
   * @param route - route to which the project scope is prefixed
   * @returns Routes using brach, tag, commit..
   */
  getProjectScopedRoutes(route = ""): string[] {
    return [
      `/:projectId/branch/:branch/${route}`,
      `/:projectId/tag/:tag/${route}`,
      `/:projectId/commit/:commitHash/${route}`,
    ];
  },

  /**
   * Utility for endpoints that act on a content type in the context of a webgme model. This utililty loads and passes
   * on the webgme context for the specific content type.
   * @param middlewareOpts - passed to router by webgme framework
   * @param router - express router
   * @param path - last part of endpoint url (is prefixed with project routes and contentTypePath)
   * @param handler - async request handler that addtionally receives the gme-context
   * @param options - options with e.g. method type, and safe/unsafe specified
   */
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
        const context = await getContentContext(gmeContext, contentTypePath);
        console.log("CTX received:", req.originalUrl);
        await handler(context, req, res);
      },
      options,
    );
  },

  /**
   * Utility for endpoints that act on a specific webgme project. This utililty loads and passes
   * on the webgme context for the project.
   * @param middlewareOpts - passed to router by webgme framework
   * @param router - express router
   * @param path - last part of endpoint url (is prefixed with project routes)
   * @param handler - async request handler that addtionally receives the gme-context
   * @param options - options with e.g. method type, and safe/unsafe specified
   */
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
          await handler(gmeContext, req, res);
        },
      ),
    );
  },

  /**
   * Redirects requests targeting "latest" tag to the tag with the highest semantic version.
   * @param middlewareOpts - passed to router by webgme framework
   * @param router - express router
   * @returns the same router
   */
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
  getPackageJSON,
};

/**
 * Creates a GmeContentContext from the provided GmeContext and path.
 * @param gmeContext
 * @param gmeContentPath
 * @returns
 */
export async function getContentContext(
  gmeContext: GmeContext,
  gmeContentPath: string,
): Promise<GmeContentContext> {
  const { core, root } = gmeContext;
  const contentType = await core.loadByPath(root, gmeContentPath);
  assert(contentType, new ContentTypeNotFoundError(gmeContentPath));
  const context = {
    project: gmeContext.project,
    projectVersion: gmeContext.projectVersion,
    core: gmeContext.core,
    root: gmeContext.root,
    commitObject: gmeContext.commitObject,
    contentType,
  };

  return context;
}

/**
 * Helper for consistent error handling in routers.
 * @param logger
 * @param fn
 * @returns
 */
export function handleUserErrors(logger: GmeLogger, fn: WebgmeHandler) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await fn(req, res);
      if (!res.headersSent) {
        next();
      }
    } catch (e) {
      if (e instanceof UserError) {
        logger.error(e.stack);
        e.sendVia(res);
      } else {
        if (e instanceof Error) {
          logger.error(e.stack);
        } else {
          logger.error(e);
        }
        res.sendStatus(500);
      }
    }
  };
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

/**
 * Creates and returns a tag-formatter based on the taxonomy in the supplied gmeContext.
 * Use this whenever you need to switch between guid based adn name based tag formats.
 * @param gmeContext
 * @returns
 */
export async function getFormatter(
  gmeContext: GmeContext,
): Promise<TagFormatter> {
  const { root, core } = gmeContext;
  const node = await Utils.findTaxonomyNode(core, root);
  if (node == null) {
    throw new TaxNodeNotFoundError(gmeContext);
  }
  return await TagFormatter.from(core, node);
}


let _packageJSon: PackageJSON;
export async function getPackageJSON(): Promise<PackageJSON> {
  if (!_packageJSon) {
    try {
      const packgeStr = await fs.readFile('package.json', 'utf8');
      _packageJSon = JSON.parse(packgeStr) as PackageJSON;
    } catch (err) {
      console.error('Could not read package.json', err);
      _packageJSon = { version: 'N/A', name: 'webgme-taxonomy' };
    }
  }

  return _packageJSon;
}