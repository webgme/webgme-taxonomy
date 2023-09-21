/*globals define*/

"use strict";

// http://expressjs.com/en/guide/routing.html
const nop = () => {};
const path = require("path");
const assert = require("assert");
const fsp = require("fs/promises");
const staticPath = path.join(__dirname, "..", "dashboard", "public");
const StorageAdapter = require("../Search/build/adapters").default;
const Utils = require("../../common/Utils");
const { uniqWithKey, filterMap } = require("../Search/build/Utils");
const TagFormatter = require("../../common/TagFormatter");
const RouterUtils = require("../../common/routers/Utils");
const {
  MetaNodeNotFoundError,
  TaxNodeNotFoundError,
} = require("../Search/build/adapters/common/ModelError");
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
    ensureAuthenticated = middlewareOpts.ensureAuthenticated;
  const mainConfig = middlewareOpts.gmeConfig;

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
    RouterUtils.getProjectScopedRoutes("metadata/"),
    RouterUtils.handleUserErrors(
      logger,
      async function dumpContentMetadata(req, res) {
        console.log(">>> dumpContentMetadata");
        const gmeContext = req.webgmeContext;
        const { core, root } = gmeContext;
        // Get all the storage adapters for each (unique) storage node in the project
        const storageType = Object.values(core.getAllMetaNodes(root))
          .find((node) => core.getAttribute(node, "name") === "Storage");

        assert(storageType, new MetaNodeNotFoundError(gmeContext, "Storage"));

        const allStorageNodes = (await core.loadSubTree(root))
          .filter((node) =>
            core.isTypeOf(node, storageType) && !core.isMetaNode(node)
          );
        const storageNodes = uniqWithKey(
          allStorageNodes,
          (node) => getNormalStorageNode(core, node),
        );

        // Fetch all the contents
        const storageAdapters = await Promise.all(
          storageNodes.map((node) =>
            StorageAdapter.fromStorageNode(
              req,
              node,
              mainConfig,
            )
          ),
        );

        const allContents = (await Promise.all(
          storageAdapters
            .map(async (adapter) => {
              const repos = await adapter.listRepos().catch(nop);
              const contents = await Promise.all(
                repos.map((repo) => adapter.listArtifacts(repo)),
              );
              return contents.flat();
            }),
        )).flat();
        console.log("found contents:", allContents.length);

        // Convert all tags to human format
        const formatter = await getFormatter(gmeContext);
        const metadata = filterMap(allContents, (content) => {
          try {
            return {
              displayName: content.displayName,
              tags: formatter.toHumanFormat(content.tags),
              taxonomyVersion: content.taxonomyVersion,
              time: content.time,
            };
          } catch (err) {
            logger.warn("Unable to convert tags to human format:", err);
          }
        });

        res.json(metadata);
      },
    ),
  );

  logger.debug("ready");
}

/**
 * Convert the taxonomy tags in the metadata to human format.
 */
async function toHumanFormat(
  gmeContext,
  metadata,
) {
  const formatter = await getFormatter(gmeContext);
  try {
    metadata.tags = formatter.toHumanFormat(metadata.tags);
    return metadata;
  } catch (err) {
    // A stop-gap solution until FormatError actually inherits from UserError
    if (err instanceof TagFormatter.FormatError) {
      throw new UserError(err.message);
    } else {
      throw err;
    }
  }
}

async function getFormatter(gmeContext) {
  const { root, core } = gmeContext;
  const node = await Utils.findTaxonomyNode(core, root);
  if (node == null) {
    throw new TaxNodeNotFoundError(gmeContext);
  }
  return await TagFormatter.from(core, node);
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
