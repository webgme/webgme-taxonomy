/*globals define*/

/**
 * Generated by RestRouterGenerator 2.2.0 from webgme on Mon Oct 24 2022 14:51:41 GMT-0500 (Central Daylight Time).
 * To use in webgme add to gmeConfig.rest.components[JSONSchema] = {
 *    mount: 'path/subPath',
 *    src: path.join(process.cwd(), './JSONSchema'),
 *    options: {}
 * }
 * If you put this file in the root of your directory the above will expose the routes at
 * <host>/path/subPath, for example GET <host>/path/subPath/getExample will be routed to the getExample below.
 */

"use strict";

// http://expressjs.com/en/guide/routing.html
import * as express from "express";
import type { NextFunction, Request, Response } from "express";
const router = express.Router();
import RouterUtils from "../../common/routers/Utils";
import Utils from "../../common/Utils";
import JSONSchemaExporter from "../../common/JSONSchemaExporterv1";
import type { GmeContentContext, MiddlewareOptions } from "../../common/types";

/**
 * Called when the server is created but before it starts to listening to incoming requests.
 * N.B. gmeAuth, safeStorage and workerManager are not ready to use until the start function is called.
 * (However inside an incoming request they are all ensured to have been initialized.)
 *
 * @param {object} middlewareOpts - Passed by the webgme server.
 * @param {GmeConfig} middlewareOpts.gmeConfig - GME config parameters.
 * @param {GmeLogger} middlewareOpts.logger - logger
 * @param {function} middlewareOpts.ensureAuthenticated - Ensures the user is authenticated.
 * @param {function} middlewareOpts.getUserId - If authenticated retrieves the userId from the request.
 * @param {object} middlewareOpts.gmeAuth - Authorization module.
 * @param {object} middlewareOpts.safeStorage - Accesses the storage and emits events (PROJECT_CREATED, COMMIT..).
 * @param {object} middlewareOpts.workerManager - Spawns and keeps track of "worker" sub-processes.
 */
function initialize(middlewareOpts: MiddlewareOptions) {
  const logger = middlewareOpts.logger.fork("JSONSchema");

  logger.debug("initializing ...");

  // Ensure authenticated can be used only after this rule.
  router.use("*", function (_req: Request, res: Response, next: NextFunction) {
    // TODO: set all headers, check rate limit, etc.

    // This header ensures that any failures with authentication won't redirect.
    res.setHeader("X-WebGME-Media-Type", "webgme.v1");
    next();
  });

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  // router.use('*', ensureAuthenticated);
  // Authentication not needed since actual data isn't shared, just taxonomy used to label data (as JSON schema).
  RouterUtils.addLatestVersionRedirect(middlewareOpts, router);

  RouterUtils.addContentTypeRoute(
    middlewareOpts,
    router,
    "schema.json",
    async function (
      gmeContext: GmeContentContext,
      _request: Request,
      response: Response,
    ) {
      const { root, core, contentType } = gmeContext;
      const exporter = JSONSchemaExporter.from(core, root);
      const vocabularies = await Utils.getVocabulariesFor(core, contentType);
      const { schema } = await exporter.getVocabSchemas(vocabularies);
      response.json(schema);
    },
    { unsafe: true, method: "get" },
  );

  logger.debug("ready");
}

/**
 * Called before the server starts listening.
 * @param {function} callback
 */
function start(callback: () => void) {
  callback();
}

/**
 * Called after the server stopped listening.
 * @param {function} callback
 */
function stop(callback: () => void) {
  callback();
}

module.exports = {
  initialize: initialize,
  router: router,
  start: start,
  stop: stop,
};
