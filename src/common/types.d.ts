declare global {
  /**
   * This global type declaration is necessary prior to importing webgme types
   * to prevent `Cannot find name 'GLbyte'` type error. It should probably be
   * fixed in the webgme types.
   */
  type GLbyte = number;
}

import type from "webgme";
import type { Request, RequestHandler, Response } from "express";

export interface AzureGmeConfig extends GmeConfig.GmeConfig {
  authentication: {
    enable: boolean;
    allowGuests: boolean;
    allowUserRegistration: boolean;
    guestAccount: string;
    logInUrl: string;
    logOutUrl: string;
    salts: number;
    authorizer: {
      path: string;
      options: any;
    };
    jwt: {
      expiresIn: number;
      renewBeforeExpires: number;
      cookieId: string;
      publicKey: string;
      privateKey: string;
      tokenGenerator: string;
      algorithm: string;
      logOutUrlField: string | null;
    };
    encryption: {
      algorithm: string;
      key: string;
    };
    allowPasswordReset: boolean;
    allowedResetInterval: number;
    resetTimeout: number;
    resetUrl: string;
    useEmailForId: boolean;

    azureActiveDirectory: {
      cookieId: string;
    };
  };
}

export type HumanReadableTags = { [name: string]: any };
export type GuidTags = { [name: string]: any };

export interface GmeContext {
  project: UserProject;
  projectVersion: VerifiedProjectContext;
  core: GmeCore;
  root: Core.Node;
  commitObject: CommitObject;
}

export interface GmeContentContext extends GmeContext {
  contentType: Core.Node;
}

interface BranchProjectContext {
  id: string;
  branch: string;
}

interface TagProjectContext {
  id: string;
  tag: string;
}

interface CommitProjectContext {
  id: string;
  commit: string;
}

type ProjectContext =
  | BranchProjectContext
  | CommitProjectContext
  | TagProjectContext;

interface VerifiedBranchProjectContext extends BranchProjectContext {
  commit: string;
}

interface VerifiedTagProjectContext extends TagProjectContext {
  commit: string;
}

/**
 * A project context known to be valid and resolved to a specific commit
 */
type VerifiedProjectContext =
  | VerifiedBranchProjectContext
  | CommitProjectContext
  | VerifiedTagProjectContext;

/**
 * Options passed to middleware initializers by the webgme server.
 *
 * `gmeAuth`, `safeStorage` and `workerManager` are not ready to use until the `start` function is called.
 * (However inside an incoming request they are all ensured to have been initialized.)
 */
export type MiddlewareOptions = {
  /** Passed by the webgme server. */
  gmeConfig: GmeConfig.GmeConfig;
  /** logger */
  logger: Global.GmeLogger;
  /** Ensures the user is authenticated. */
  ensureAuthenticated: RequestHandler;
  /** If authenticated retrieves the userId from the request. */
  getUserId: (req: Request) => string;
  /** Authorization module. */
  gmeAuth: GmeAuth;
  /** Accesses the storage and emits events (PROJECT_CREATED, COMMIT..). */
  safeStorage: SafeStorage;
  /** Spawns and keeps track of "worker" sub-processes. */
  workerManager: Object;
};

export interface GmeAuth {
  getUser(userId: string): GmeUserData;
}

export interface GmeUserData {
  _id: string;
  siteAdmin: boolean;
}

// FIXME: update this in webgme
export interface GmePluginBase extends GmePlugin.PluginBase {
  branchName: string;
  commitHash: string;
  addArtifact(
    taxonomyName: string,
    files: { [name: string]: string },
  ): Promise<void>;
}

export interface GmeLogger {
  warn(msg: any): void;
  error(msg: any): void;
}

export type GmeCore = GmeClasses.Core & {
  getMetaType(node: Core.Node): Core.Node;
  loadSubTree(node: Core.Node): Promise<Core.Node[]>;
};
export interface SafeStorage {
  openProject(params: OpenProjectParams): Promise<UserProject>;
  /**
   * Retrieve all tags and their commits hashes within the project.
   */
  getTags(params: OpenProjectParams): Promise<{ [name: string]: CommitObject }>;
  getProjects(params: GetProjectsParams): Promise<ProjectMetadata[]>;
}

export interface GetProjectsParams {
  info: true; // must be true for now or the return value type is wrong
  branches: true;
}

export interface ProjectMetadata {
  _id: string;
  owner: string;
  info: ProjectInfo;
  branches: { [name: string]: string }; // name to commit hash
}

export interface ProjectInfo {
  kind: string;
}

export interface OpenProjectParams {
  username?: string;
  projectId: string;
}

export interface UserProject {
  projectName: string;
  projectId: string;

  setUser(username: string): void;
  getCommitObject(commitHash: string): CommitObject;
  getTags(): Promise<{ [name: string]: CommitObject }>;
  getRootHash(branch: string): Promise<string>;
  createBranch(name: string, hash: string): Promise<CommitResult>;
  getBranchHash(name: string): Promise<string>;
}

export type CommitResult = any;
export type CommitObject = any; // FIXME

export interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
}

export type WebgmeHandler = (
  req: Request,
  res: Response,
) => void | Promise<void>;
