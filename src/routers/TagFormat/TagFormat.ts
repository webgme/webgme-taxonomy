/*globals define*/

"use strict";

// http://expressjs.com/en/guide/routing.html
import * as express from "express";
const router = express.Router();
import RouterUtils, {
  getFormatter,
  UserError,
} from "../../common/routers/Utils";
import { FormatError } from "../../common/TagFormatter";
import {
  GmeContext,
  GuidTags,
  HumanReadableTags,
  MiddlewareOptions,
} from "../../common/types";
import { deepMerge, isObject } from "../Search/Utils";

type TagFormat = "human" | "guid";
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

  RouterUtils.addProjectRoute(
    middlewareOpts,
    router,
    ":format(guid|human)",
    async function formatTags(gmeContext, req, res) {
      const format = req.params.format as TagFormat; // guaranteed from the express js endpoint regex
      const tagsStr = req.query.tags as string;
      let tags: HumanReadableTags | GuidTags;
      try {
        // TODO: ensure format is correct type
        tags = JSON.parse(tagsStr);
      } catch (err) {
        throw new UserError(
          "Invalid tag format.",
          400,
        );
      }

      const formattedTags = await convertTagsFormat(
        gmeContext,
        tags,
        format,
      );
      res.json(formattedTags);
    },
    { unsafe: true, method: "get" },
  );

  router.use(":format(guid|human)", express.json()); // TODO: test this - only should be for the post endpoint
  RouterUtils.addProjectRoute(
    middlewareOpts,
    router,
    ":format(guid|human)",
    async function formatTags(gmeContext, req, res) {
      const format = req.params.format as TagFormat; // guaranteed from the express js endpoint regex
      let tags = req.body;

      const formattedTags = await convertTagsFormat(
        gmeContext,
        tags,
        format,
      );
      res.json(formattedTags);
    },
    { unsafe: true, method: "post" },
  );

  async function convertTagsFormat(
    gmeContext: GmeContext,
    tags: HumanReadableTags | GuidTags,
    format: TagFormat,
  ) {
    if (Array.isArray(tags)) { // Update tags from v1 to v2 format
      tags = deepMerge(...tags);
    }

    if (!isObject(tags)) {
      throw new UserError("Invalid tag format.");
    }

    const formatter = await getFormatter(gmeContext);
    try {
      if (format === "human") {
        return formatter.toHumanFormat(tags);
      } else {
        return formatter.toGuidFormat(tags);
      }
    } catch (err) {
      if (err instanceof FormatError) {
        throw new UserError(err.message);
      } else {
        throw err;
      }
    }
  }

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
