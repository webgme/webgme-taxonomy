declare global {
  /**
   * This global type declaration is necessary prior to importing webgme types
   * to prevent `Cannot find name 'GLbyte'` type error. It should probably be
   * fixed in the webgme types.
   */
  type GLbyte = number;
}

import type from 'webgme';
import type { Request, RequestHandler } from 'express';

/**
 * Options passed to middleware initializers by the webgme server.
 * 
 * `gmeAuth`, `safeStorage` and `workerManager` are not ready to use until the `start` function is called.
 * (However inside an incoming request they are all ensured to have been initialized.)
 */
export type MiddlewareOptions = {
  /** Passed by the webgme server. */
  gmeConfig: GmeConfig.GmeConfig,
  /** logger */
  logger: Global.GmeLogger,
  /** Ensures the user is authenticated. */
  ensureAuthenticated: RequestHandler,
  /** If authenticated retrieves the userId from the request. */
  getUserId: (req: Request) => string,
  /** Authorization module. */
  gmeAuth: Object,
  /** Accesses the storage and emits events (PROJECT_CREATED, COMMIT..). */
  safeStorage: Object,
  /** Spawns and keeps track of "worker" sub-processes. */
  workerManager: Object,
};

export type WebgmeContext = {
  core: GmeClasses.Core,
  root: Core.Node,
  project: {
    projectName: string,
    projectId: string,
  },
  projectVersion: {
    id: string,
    branch?: string,
    tag?: string,
    commitHash?: string,
  }
};

