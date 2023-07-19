import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import type { MiddlewareOptions, WebgmeRequest } from "../types";

type MiddlewareHandler<T extends boolean | void = boolean | void> = (
  req: WebgmeRequest,
  res: Response,
  next: NextFunction,
) => Promise<T>;

export interface AuthenticatedRequest extends Request {
  cookies: { [key: string]: string };
}

export class UserError extends Error {
  constructor(msg: string, code?: number);
  statusCode: number;
  sendVia(response: Response): void;
}

export function handleUserErrors(
  logger: Global.GmeLogger,
  ...fn: MiddlewareHandler[]
): RequestHandler;
export function getProjectScopedRoutes(path: string): string[];
export function addProjectScopeMiddleware(
  middlewareOpts: MiddlewareOptions,
  router: Router,
): Router;
export function addLatestVersionRedirect(
  middlewareOpts: MiddlewareOptions,
  router: Router,
): Router;
export function getObserverIdFromToken(token: string): string;
export function getContentTypeRoutes(path?: string): string[];
export function getContentTypeVocabRoutes(path?: string): string[];
export function addContentTypeMiddleware(
  middlewareOpts: MiddlewareOptions,
  router: Router,
): Router;
