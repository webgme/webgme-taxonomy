/*globals define*/

"use strict";

// http://expressjs.com/en/guide/routing.html
const nop = () => {};
const path = require("path");
const fsp = require("fs/promises");
const staticPath = path.join(__dirname, "..", "dashboard", "public");
const StorageAdapter = require("../Search/build/adapters");
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
  var logger = middlewareOpts.logger.fork("Insights"),
    ensureAuthenticated = middlewareOpts.ensureAuthenticated,
    getUserId = middlewareOpts.getUserId;

  logger.debug("initializing ...");

  RouterUtils.addLatestVersionRedirect(middlewareOpts, router);

  // Use ensureAuthenticated if the routes require authentication. (Can be set explicitly for each route.)
  router.use("*", ensureAuthenticated);

  router.use(
    RouterUtils.getProjectScopedRoutes("static/"),
    express.static(staticPath),
  );

  RouterUtils.addProjectScopeMiddleware(middlewareOpts, router);

  /**
   * Generate a normalized string representation of the given storage node
   */
  function getNormalStorageNode(core, node) {
    const attrEntries = core.getAttributeNames(node)
      .sort()
      .map((name) => [name, core.getAttribute(node, name)]);
    const typeName = core.getAttribute(core.getMetaType(node), "name");
    return JSON.stringify({ typeName, attrEntries });
  }

  router.get(
    RouterUtils.getProjectScopedRoutes("/metadata/"),
    RouterUtils.handleUserErrors(
      logger,
      async function dumpContentMetadata(req, res) {
        const gmeContext = req.webgmeContext;
        const { core, root } = gmeContext;
        // Get all the storage adapters for each (unique) storage node in the project
        const storageType = Object.values(core.getAllMetaNodes(root))
          .find((node) => core.getAttribute(node, "name") === "Storage");

        assert(storageType, new MetaNodeNotFoundError(gmeContext, "Storage"));

        const allStorageNodes = (await core.loadSubTree(root))
          .filter((node) => core.isTypeOf(node, storageType));
        const storageNodes = uniqWithKey(
          allStorageNodes,
          (node) => getNormalStorageNode(core, node),
        );

        const storageAdapters = await Promise.all(
          storageNodes.map((node) =>
            StorageAdapter.fromStorageNode(
              req,
              node,
              mainConfig,
            )
          ),
        );

        const repos = (await Promise.all(
          storageAdapters
            .map(async (adapter) => {
              const repos = await adapter.listRepos().catch(nop);
              const contents = await Promise.all(
                repos.map((repo) => adapter.listArtifacts(repo)),
              );
              return contents.flat();
            }),
        )).map();

        // TODO: load all the repos
        const allContents = await Promise.all(
          storageAdapters
            .map((adapter) => adapter.listArtifacts(repo).catch(nop)),
        );

        // TODO: fetch the data for each

        res.json({ userId: userId, message: "get request was handled" });
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
