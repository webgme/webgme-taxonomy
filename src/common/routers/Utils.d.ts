import type { Request, Response, Router, RequestHandler, NextFunction } from "express";
import type { MiddlewareOptions } from "../types";

type MiddlewareHandler<T extends boolean | void = boolean | void> =
  (req: Request, res: Response, next: NextFunction) => Promise<T>;

export interface AuthenticatedRequest extends Request {
  cookies: { [key: string]: string };
}

export class UserError extends Error {
  constructor(msg: string, code?: number);
  statusCode: number;
  sendVia(response: Response): void;
}

export function handleUserErrors(logger: Global.GmeLogger, fn: MiddlewareHandler): MiddlewareHandler<void>;
export function getProjectScopedRoutes(path: string): string[];
export function addProjectScopeMiddleware(middlewareOpts: MiddlewareOptions, router: Router): Router;
export function getObserverIdFromToken(token: string): string;
