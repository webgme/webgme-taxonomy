import type { Response } from "express";

export class UserError extends Error {
  statusCode: number;

  constructor(msg: string, code = 400) {
    super(msg);
    this.statusCode = code;
  }

  sendVia(response: Response) {
    response.status(this.statusCode).send(this.message);
  }
}

export class ProjectNotFoundError extends UserError {
  constructor() {
    super("Project not found", 404);
  }
}

export class ContentTypeNotFoundError extends UserError {
  constructor(path: string) {
    super(`Content type not found: ${path}`, 404);
  }
}

export class InvalidProjectIdError extends UserError {
  constructor(projectId: string | undefined) {
    const msg = projectId
      ? `Invalid project ID: ${projectId}`
      : `Project ID required.`;
    super(msg);
  }
}

export class TagNotFoundError extends UserError {
  constructor(tag: string) {
    super(`Tag not found: ${tag}`, 404);
  }
}

export class TestEnvOnlyError extends UserError {
  constructor(name: string) {
    super(`${name} is only allowed on a test deployment`, 403);
  }

  static check(name: string) {
    if (typeof process !== "undefined" && process.env.ENV !== "test") {
      throw new TestEnvOnlyError(name);
    }
  }
}

export class MissingParameterError extends UserError {
  constructor(param: string) {
    super(`Missing URL parameter: ${param}`);
  }
}

/**
 * Missing a required parameter. Must choose one from the given set.
 */
export class MissingParameterChooseError extends UserError {
  constructor(...choices: string[]) {
    super(`Must specify a URL parameter from: ${choices.join(" ")}`);
  }
}

export class DeletedContentError extends UserError {
  constructor() {
    super(`Content has been deleted and is no longer accessible.`);
  }
}

export class MalformedContentIdError extends UserError {
  constructor(id: string) {
    super(`Invalid content ID: ${id}`);
  }
}

export class ContentNotFoundError extends UserError {
  constructor(id?: string) {
    const message = id ? `Content not found: ${id}` : `Content not found`;
    super(message);
  }
}
