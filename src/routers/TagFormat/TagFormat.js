/*globals define*/

"use strict";

// http://expressjs.com/en/guide/routing.html
var express = require("express"),
  router = express.Router();
const RouterUtils = require("../../common/routers/Utils");
const Utils = require("../../common/Utils");
const TagFormatter = require("../../common/TagFormatter");
const { deepMerge, isObject } = require("../Search/build/Utils");
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
function initialize(middlewareOpts) {
  var logger = middlewareOpts.logger.fork("TagFormat");

  logger.debug("initializing ...");

  router.use("*", function (_req, res, next) {
    // TODO: set all headers, check rate limit, etc.

    // This header ensures that any failures with authentication won't redirect.
    res.setHeader("X-WebGME-Media-Type", "webgme.v1");
    next();
  });

  // Skipping authentication here as data is not easy to determine from these routes.
  // The GUID/display name (and fields) need to be guessed exactly.
  RouterUtils.addLatestVersionRedirect(middlewareOpts, router);
  RouterUtils.addProjectScopeMiddleware(middlewareOpts, router, {
    unsafe: true,
  });

  router.get(
    RouterUtils.getProjectScopedRoutes(":format(guid|human)"),
    RouterUtils.handleUserErrors(
      logger,
      async function formatTags(req, res) {
        const { format } = req.params;
        let { tags } = req.query;
        try {
          tags = JSON.parse(tags);
        } catch (err) {
          throw new RouterUtils.UserError(
            "Invalid tag format.",
            400,
          );
        }

        if (Array.isArray(tags)) { // Update tags from v1 to v2 format
          tags = deepMerge(...tags);
        }

        if (!isObject(tags)) {
          throw new RouterUtils.UserError(
            "Invalid tag format.",
            400,
          );
        }

        const { root, core } = req.webgmeContext;
        const node = await Utils.findTaxonomyNode(core, root);
        const formatter = await TagFormatter.from(core, node);

        try {
          if (format === "human") {
            res.json(await formatter.toHumanFormat(tags));
          } else {
            res.json(await formatter.toGuidFormat(tags));
          }
        } catch (err) {
          if (err instanceof TagFormatter.FormatError) {
            res.status(400).send(err.message);
          } else {
            logger.error(
              `Error occurred during tag format conversion: ${err.stack}`,
            );
            res
              .status(500)
              .send("Internal error occurred. Please try again later.");
          }
        }
      },
    ),
  );

  logger.debug("ready");
}

/**
 * Called before the server starts listening.
 * @param {function} callback
 */
function start(callback) {
  callback();
}

/**
 * Called after the server stopped listening.
 * @param {function} callback
 */
function stop(callback) {
  callback();
}

module.exports = {
  initialize: initialize,
  router: router,
  start: start,
  stop: stop,
};
