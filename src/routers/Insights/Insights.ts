/*globals define*/

"use strict";

// http://expressjs.com/en/guide/routing.html
import path from "path";
import assert from "assert";
import StorageAdapter from "../Search/adapters";

import { uniqWithKey } from "../Search/Utils";
import { filterMap, getTaxonomyNode } from "../../common/Utils";
import RouterUtils, { getFormatter } from "../../common/routers/Utils";
import { MetaNodeNotFoundError } from "../Search/adapters/common/ModelError";
import express from "express";
import { Request, Response } from "express";
import { GmeContext, GmeCore, MiddlewareOptions } from "../../common/types";

const nop = () => {};
const staticPath = path.join(__dirname, "dashboard", "public");
const router = express.Router();

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

  /**
   * Generate a normalized string representation of the given storage node
   */
  function getNormalStorageNode(core: GmeCore, node: Core.Node) {
    const attrEntries = core.getAttributeNames(node)
      .sort()
      .map((name) => [name, core.getAttribute(node, name)]);
    const typeName = core.getAttribute(core.getMetaType(node), "name");
    return JSON.stringify({ typeName, attrEntries });
  }

  RouterUtils.addProjectRoute(
    middlewareOpts,
    router,
    "metadata/",
    async function dumpContentMetadata(
      gmeContext: GmeContext,
      req: Request,
      res: Response,
    ) {
      const { core, root } = gmeContext;
      // Get all the storage adapters for each (unique) storage node in the project
      const storageType = Object.values(core.getAllMetaNodes(root))
        .find((node) => core.getAttribute(node, "name") === "Storage");

      assert(storageType, new MetaNodeNotFoundError(gmeContext, "Storage"));

      const allStorageNodes: Core.Node[] = (await core.loadSubTree(root))
        .filter((node: Core.Node) =>
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
            gmeContext,
            req,
            node,
            mainConfig,
          )
        ),
      );

      const allContents = (await Promise.all(
        storageAdapters
          .map(async (adapter) => {
            const repos = (await adapter.listRepos().catch(nop)) || [];
            const contents = await Promise.all(
              repos.map((repo) => adapter.listArtifacts(repo.id)),
            );
            return contents.flat();
          }),
      )).flat();

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
          if (err instanceof Error) {
            logger.warn("Unable to convert tags to human format:", err.message);
          } else if (err) {
            logger.warn(
              "Unable to convert tags to human format:",
              err.toString(),
            );
          } else {
            logger.warn("Unable to convert tags to human format.");
          }
        }
      });

      res.json(metadata);
    },
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
