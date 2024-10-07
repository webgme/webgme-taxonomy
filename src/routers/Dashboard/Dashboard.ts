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
import assert from "assert";
import type { GmeCore, GmeLogger, MiddlewareOptions } from "../../common/types";
import RouterUtils, {
  getContentContext,
  getNormalStorageNode,
  handleUserErrors,
} from "../../common/routers/Utils";
import { uniqWithKey } from "../Search/Utils";
import { Adapter, Repository } from "../Search/adapters/common/types";
import {
  canUserDelete,
  filterMap,
  getTaxonomyNode,
  isUserAdmin,
} from "../../common/Utils";
import { MetaNodeNotFoundError } from "../Search/adapters/common/ModelError";
import ContextFacade from "./ContextFacade";
import StorageAdapter from "../Search/adapters";
import {
  ChildContentReference,
  GremlinAdapter,
  StorageWithGraphSearch,
} from "../Search/adapters/metadata";
import exportTaxonomy from "../../common/TaxonomyExporter";
import { MetadataStorageConfig } from "../Search/adapters/common/types";

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
  const logger = middlewareOpts.logger.fork("Dashboard") as GmeLogger;
  const mainConfig = middlewareOpts.gmeConfig;
  const msConfig = middlewareOpts.gmeConfig.rest.components.Search.options
    .metadataStorageConfig as MetadataStorageConfig;

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

  router.get(
    RouterUtils.getProjectScopedRoutes("package-json"),
    handleUserErrors(middlewareOpts.logger, async (req, res) => {
      res.send(await RouterUtils.getPackageJSON());
    }),
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
      let uriPieces: [string, string, string];

      try {
        uriPieces = StorageAdapter.resolveUri(uri);
      } catch (err) {
        logger.error(err);
        res.sendStatus(400);
        return;
      }

      const [hostId, repoId, contentId] = uriPieces;

      logger.info(
        `uri="${uri}", with hostId="${hostId}", repoId="${repoId}", contentId="${contentId}"`,
      );

      // Grab all contentTypes for the project..
      const hostUriToPath = await (new ContextFacade(gmeContext))
        .getHostUriToNodePath();
      // logger.info(JSON.stringify(hostUriToPath, null, 2));
      const path = hostUriToPath[hostId];

      if (!path) {
        logger.error("Could not find matching node for " + hostId);
        res.sendStatus(404);
        return;
      }

      // original: /routers/Dashboard/guest%2BmongoPipeline/branch/master/resolve-url
      // url: /routers/Search/guest%2BmongoPipeline/branch/master/%2FA/static/index.html?repoId=6617fab6596a7edfc2fb9cff&contentId=1_1
      let url =
        `${
          req.originalUrl.split("?")[0].replace(/Dashboard/, "Search").split(
            "/",
          ).slice(0, -1).join("/")
        }` +
        `/${encodeURIComponent(path)}/static/index.html`;

      if (repoId) {
        url += `?repoId=${repoId}`;
      }

      if (contentId) {
        url += `&contentId=${contentId}`;
      }

      res.json({ host: `${req.protocol}://${req.get("host")}`, url });
    },
    { method: "post" },
  );

  const USE_SMALL_TEST_DATA = false;

  RouterUtils.addProjectRoute(
    middlewareOpts,
    router,
    "graphdb/",
    async function dumpContentMetadata(gmeContext, req, res) {
      const { core, root } = gmeContext;
      if (!msConfig.enable) {
        logger.error("Client trying to access disabled metadata");
        res.sendStatus(418);
        return;
      }

      if (!await isUserAdmin(req, middlewareOpts)) {
        logger.error('Non admin trying to access "graphdb" end-point..');
        res.sendStatus(403);
        return;
      }

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
      let storageAdapters: StorageWithGraphSearch<
        Adapter,
        GremlinAdapter | null
      >[] = [];

      if (USE_SMALL_TEST_DATA) {
        for (const node of storageNodes) {
          const { core } = gmeContext;
          // MODEL_ML || Bootcamp Sandbox
          if (core.getPath(node) === "/R/F" || core.getPath(node) === "/f/l") {
            storageAdapters.push(
              await StorageAdapter.fromStorageNode(
                gmeContext,
                req,
                node,
                middlewareOpts.gmeConfig,
                true,
              ),
            );
          }
        }
      } else {
        storageAdapters = await Promise.all(
          storageNodes.map((node) =>
            StorageAdapter.fromStorageNode(
              gmeContext,
              req,
              node,
              middlewareOpts.gmeConfig,
              true,
            )
          ),
        );
      }

      const taxNode = await getTaxonomyNode(gmeContext);
      const taxonomy = await exportTaxonomy(gmeContext.core, taxNode);
      const gremlinAdapter = new GremlinAdapter(msConfig, taxonomy);

      const stats = {
        time_sec: {
          total: Date.now(),
        },
        storages: {
          successes: 0,
          errors: 0,
        },
        repositories: {
          successes: 0,
          errors: 0,
        },
        artifacts: {
          successes: 0,
          errors: 0,
        },
      };

      await gremlinAdapter.dropAll();
      console.log("Dropped current graphDb data..");

      for (const adapter of storageAdapters) {
        try {
          const repos = await adapter.listRepos();
          for (const repo of repos) {
            try {
              const contents = await adapter.listArtifacts(repo.id);
              for (const content of contents) {
                try {
                  const { parentId, id } = content;
                  if (!parentId || !id) {
                    throw new Error(
                      "content missing id or parentId " +
                        JSON.stringify({ parentId, id }),
                    );
                  }
                  await gremlinAdapter.create(
                    new ChildContentReference(parentId, id),
                    content,
                  );
                  stats.artifacts.successes += 1;
                  if (stats.artifacts.successes % 100 === 0) {
                    console.log(
                      "Inserted",
                      stats.artifacts.successes,
                      "artifacts ...",
                    );
                  }
                } catch (e) {
                  logger.error(e);
                  stats.artifacts.errors += 1;
                }
              }
              stats.repositories.successes += 1;
            } catch (e) {
              logger.error(e);
              stats.repositories.errors += 1;
            }
          }

          stats.storages.successes += 1;
        } catch (e) {
          logger.error(e);
          stats.storages.errors += 1;
        }
      }

      stats.time_sec.total = (Date.now() - stats.time_sec.total) / 1000;

      console.log("DONE!, stats:", JSON.stringify(stats, null, 2));

      res.json(stats);
    },
    { method: "post" },
  );

  RouterUtils.addProjectRoute(
    middlewareOpts,
    router,
    "deployment-config.json",
    async function getDeploymentConfig(_, req, res) {
      res.json({
        deletionEnabled: await canUserDelete(req, middlewareOpts),
        isAdmin: await isUserAdmin(req, middlewareOpts),
        graphDbEnabled: msConfig.enable,
      });
    },
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
