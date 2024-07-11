import type {
  MiddlewareOptions as GmeMiddlewareOptions,
  UserProject,
} from "webgme";

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
  commitObject: GmeStorage.CommitObject;
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

export interface MiddlewareOptions extends GmeMiddlewareOptions {
  ensureAuthenticated: RequestHandler; // This is just defined as Function in webgme..
  getUserId: (req: Request) => string; // .. this is takes req as any.
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
  debug(...msg: any): void;
  info(...msg: any): void;
  warn(...msg: any): void;
  error(...msg: any): void;
}

export type GmeCore = GmeClasses.Core & {
  getMetaType(node: Core.Node): Core.Node;
};

export interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
}

export type WebgmeHandler = (
  req: Request,
  res: Response,
) => void | Promise<void>;

export interface PackageJSON {
  name: string;
  version: string;
}
