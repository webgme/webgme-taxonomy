export class UserError extends Error {
  constructor(msg: string, code?: number);
  statusCode: number;
  sendVia(response: any): void;
}
export function handleUserErrors(logger: any, fn: any): (req: any, res: any, next: any) => Promise<void>;
export function getProjectScopedRoutes(path: any): any;
export function addProjectScopeMiddleware(middlewareOpts: any, router: any): void;
