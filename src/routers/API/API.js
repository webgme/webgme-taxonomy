/*globals define*/

/**
 * This router defines the public API used for querying based on URIs
 */

"use strict";

// http://expressjs.com/en/guide/routing.html
import RouterUtils, { UserError } from "../../../common/routers/Utils";
var express = require("express"),
  router = express.Router();

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
  var logger = middlewareOpts.logger.fork("API"),
    ensureAuthenticated = middlewareOpts.ensureAuthenticated;

  logger.debug("initializing ...");

  // Ensure authenticated can be used only after this rule.
  router.use("*", function (req, res, next) {
    // TODO: set all headers, check rate limit, etc.

    // This header ensures that any failures with authentication won't redirect.
    res.setHeader("X-WebGME-Media-Type", "webgme.v1");
    next();
  });

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  router.use("*", ensureAuthenticated);

  // Downloading as a single archive
  router.post(
    "/v1/archive/:uri/prepare",
    RouterUtils.handleUserErrors(
      logger,
      async function startDownloadTask(req, res /*, next*/) {
        const { uri } = req.params;
        const storage = StorageAdapter.fromUri(uri);
        // TODO: return a URL for checking the tasks? This doesn't need to be in this router...
      },
    ),
  );

  router.get(
    "/v1/archive/:uri/:taskId/status",
    RouterUtils.handleUserErrors(
      logger,
      async function checkDownloadStatus(req, res /*, next*/) {
        // TODO
      },
    ),
  );

  router.get(
    "/v1/archive/:uri/:taskId",
    RouterUtils.handleUserErrors(
      logger,
      async function downloadArchive(req, res /*, next*/) {
        // TODO
      },
    ),
  );

  // Downloading specific files
  router.get(
    "/v1/files/:uri/:filePattern",
    RouterUtils.handleUserErrors(
      logger,
      async function fetchDownloadUrls(req, res /*, next*/) {
        // TODO: include metadata.json as a "virtual file" - as long as it is part of the single archive download
        // TODO: it can simply point to the metadata endpoint
        res.sendStatus(201);
      },
    ),
  );

  router.get(
    "/v1/metadata/:uri",
    RouterUtils.handleUserErrors(
      logger,
      async function fetchMetadata(req, res /*, next*/) {
        // TODO: include metadata.json as a "virtual file" - as long as it is part of the single archive download
        res.sendStatus(201);
      },
    ),
  );

  // TODO: pick a list children endpoint
  router.get("/v1/:uri/", function listChildren(req, res /*, next*/) {
    // TODO
  });

  router.get(
    "/v1/children/:uri",
    RouterUtils.handleUserErrors(
      logger,
      async function listChildren(req, res /*, next*/) {
        // TODO: include metadata.json as a "virtual file" - as long as it is part of the single archive download
        res.sendStatus(201);
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
