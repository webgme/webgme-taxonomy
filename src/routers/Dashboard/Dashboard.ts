/**
 * To use in webgme add to gmeConfig.rest.components[Dashboard] = {
 *    mount: 'path/subPath',
 *    src: path.join(process.cwd(), './Dashboard'),
 *    options: {}
 * }
 * If you put this file in the root of your directory the above will expose the routes at
 * <host>/path/subPath, for example GET <host>/path/subPath/getExample will be routed to the getExample below.
 */

// http://expressjs.com/en/guide/routing.html

import * as express from "express";
import * as path from "path";
import type { MiddlewareOptions } from "../../common/types";
import RouterUtils, { getContentContext } from "../../common/routers/Utils";
import ContextFacade from "./ContextFacade";
import StorageAdapter from '../Search/adapters';

export const router = express.Router();
const staticPath = path.join(__dirname, "app", "dist");

/**
 * Called when the server is created but before it starts to listening to incoming requests.
 * N.B. gmeAuth, safeStorage and workerManager are not ready to use until the start function is called.
 * (However inside an incoming request they are all ensured to have been initialized.)
 *
 * @param middlewareOpts - Passed by the webgme server.
 */
export function initialize(middlewareOpts: MiddlewareOptions) {
  const { ensureAuthenticated } = middlewareOpts;
  middlewareOpts.getUserId;
  const logger = middlewareOpts.logger.fork("Dashboard");

  logger.debug("initializing ...");

  // Ensure authenticated can be used only after this rule.
  // router.use('*', function (req, res, next) {
  //   // TODO: set all headers, check rate limit, etc.

  //   // This header ensures that any failures with authentication won't redirect.
  //   res.setHeader('X-WebGME-Media-Type', 'webgme.v1');
  //   next();
  // });

  RouterUtils.addLatestVersionRedirect(middlewareOpts, router);

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  router.use("*", ensureAuthenticated);

  router.use(
    RouterUtils.getProjectScopedRoutes("static/"),
    express.static(staticPath),
  );

  RouterUtils.addProjectRoute(
    middlewareOpts,
    router,
    "info",
    async function getDashboardConfig(gmeContext, _req, res) {
      logger.debug(`1. res.headersSent ${res.headersSent}`);
      const context = new ContextFacade(gmeContext);
      logger.debug(`2. res.headersSent ${res.headersSent}`);
      const body = await context.getProjectInfo();
      logger.debug(`3. res.headersSent ${res.headersSent}`);
      res.json(body);
    },
  );

  RouterUtils.addProjectRoute(
    middlewareOpts,
    router,
    "resolve-url",
    async function resolveUrl(gmeContext, req, res) {
      const { uri } = req.body;
      // FIXME: This doesn't work for repositories..
      const [repoId, contentId] = StorageAdapter.resolveUri(uri);
      logger.info(`uri="${uri}", with repoId="${repoId}", contentId="${contentId}"`);
      // Grab all contentTypes for the project..
      const projectInfo = await (new ContextFacade(gmeContext)).getProjectInfo();

      let url = null;

      for (const { name, path } of projectInfo.contentTypes) {
        logger.info(`At content type ${name} ${path}`);
        const contentContext = await getContentContext(gmeContext, path);
        const storage = await StorageAdapter.from(
          contentContext,
          req,
          middlewareOpts.gmeConfig,
        );
        // List all the repos for each such..
        for (const repo of await storage.listRepos()) {
          if (repo.id === repoId) {
            logger.info(`found matching repository: ${JSON.stringify(repo)}`);
            // original: /routers/Dashboard/guest%2BmongoPipeline/branch/master/resolve-url
            // url: /routers/Search/guest%2BmongoPipeline/branch/master/%2FA/static/index.html?repoId=6617fab6596a7edfc2fb9cff&contentId=0
            url = `${req.originalUrl.split("?")[0].replace(/Dashboard/, "Search").split("/").slice(0, -1).join("/")}` +
              `/${encodeURIComponent(path)}/static/index.html?repoId=${repoId}&contentId=${contentId}`;
            break;
            // TODO: We could try to find a matching content
          }
        }
      }

      // TODO: Check that this works behind secure proxy..
      res.json({ host: `${req.protocol}://${req.get("host")}`, url });
    },
    { method: "post" }
  );

  logger.debug("ready");
}

/**
 * Called before the server starts listening.
 * @param callback
 */
export function start(callback: () => void) {
  callback();
}

/**
 * Called after the server stopped listening.
 * @param callback
 */
export function stop(callback: () => void) {
  callback();
}
