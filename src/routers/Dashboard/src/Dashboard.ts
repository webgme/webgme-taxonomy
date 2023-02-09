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

import type from 'webgme';
import * as express from 'express';
import * as path from 'path';
import * as RouterUtils from '../../../common/routers/Utils';
import ContextFacade from './ContextFacade';

export const router = express.Router();
const staticPath = path.join(__dirname, "..", "dashboard", "dist");

type MiddlewareOpts = {
  /** Passed by the webgme server. */
  gmeConfig: GmeConfig.GmeConfig,
  /** logger */
  logger: Global.GmeLogger,
  /** Ensures the user is authenticated. */
  ensureAuthenticated: express.RequestHandler,
  /** If authenticated retrieves the userId from the request. */
  getUserId: (req: express.Request) => string,
  /** Authorization module. */
  gmeAuth: Object,
  /** Accesses the storage and emits events (PROJECT_CREATED, COMMIT..). */
  safeStorage: Object,
  /** Spawns and keeps track of "worker" sub-processes. */
  workerManager: Object,
}

/**
 * Called when the server is created but before it starts to listening to incoming requests.
 * N.B. gmeAuth, safeStorage and workerManager are not ready to use until the start function is called.
 * (However inside an incoming request they are all ensured to have been initialized.)
 *
 * @param middlewareOpts - Passed by the webgme server.
 */
export function initialize(middlewareOpts: MiddlewareOpts) {
  const { ensureAuthenticated } = middlewareOpts;
  const logger = middlewareOpts.logger.fork('Dashboard');

  logger.debug('initializing ...');

  // Ensure authenticated can be used only after this rule.
  // router.use('*', function (req, res, next) {
  //   // TODO: set all headers, check rate limit, etc.

  //   // This header ensures that any failures with authentication won't redirect.
  //   res.setHeader('X-WebGME-Media-Type', 'webgme.v1');
  //   next();
  // });

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  router.use('*', ensureAuthenticated);

  router.use(
    RouterUtils.getProjectScopedRoutes("static/"),
    express.static(staticPath)
  );

  RouterUtils.addProjectScopeMiddleware(middlewareOpts, router);

  router.get(
    RouterUtils.getProjectScopedRoutes("info"),
    async (req, res) => {
      const context = new ContextFacade((<any>req).webgmeContext);
      const body = await context.getProjectInfo()
      res.json(body);
    }
  );

  logger.debug('ready');
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
