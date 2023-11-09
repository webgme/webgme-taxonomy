import type { GmeContentContext } from "../../../../common/types";
import { UserError } from "../../../../common/routers/Utils";
import type { Response } from "express";
const UNPROCESSABLE_ENTITY = 422;

interface ModelContext {
  projectId: string;
  branch: string | undefined;
  nodeId: string;
}

export class ModelError extends UserError {
  modelContext: ModelContext;

  constructor(context: ModelContext, msg: string) {
    super(msg, UNPROCESSABLE_ENTITY);
    this.modelContext = context;
  }

  sendVia(response: Response) {
    const data = {
      message: this.message,
      context: this.modelContext,
    };
    response.status(this.statusCode).json(data);
  }

  static getContext(gmeContext: GmeContentContext, node: Core.Node): ModelContext {
    const { core, projectVersion } = gmeContext;
    return {
      projectId: projectVersion.id,
      branch: projectVersion.branch, // TODO: add support for more types of references to a project
      nodeId: core.getPath(node),
    };
  }
}

export class MissingAttributeError extends ModelError {
  constructor(gmeContext: GmeContentContext, node: Core.Node, attrName: string) {
    const { core } = gmeContext;
    const name = core.getAttribute(node, "name");
    const msg = `No ${attrName} specified for ${name}`;
    const context = ModelError.getContext(gmeContext, node);
    super(context, msg);
  }
}

export class InvalidAttributeError extends ModelError {
  constructor(
    gmeContext: GmeContentContext,
    node: Core.Node,
    attrName: string,
    issue: string,
  ) {
    const { core } = gmeContext;
    const name = core.getAttribute(node, "name");
    const msg = `Invalid ${attrName} for ${name}: ${issue}`;
    const context = ModelError.getContext(gmeContext, node);
    super(context, msg);
  }
}

export class StorageNotFoundError extends ModelError {
  constructor(gmeContext: GmeContentContext, contentTypeNode: Core.Node) {
    const { core } = gmeContext;
    const name = core.getAttribute(contentTypeNode, "name");
    const msg = `No storage configured for ${name}`;
    const context = ModelError.getContext(gmeContext, contentTypeNode);
    super(context, msg);
  }
}

export class ChildContentTypeNotFoundError extends ModelError {
  constructor(gmeContext: GmeContentContext, contentTypeNode: Core.Node) {
    const { core } = gmeContext;
    const name = core.getAttribute(contentTypeNode, "name");
    const msg = `No content defined within ${name}`;
    const context = ModelError.getContext(gmeContext, contentTypeNode);
    super(context, msg);
  }
}

export class MetaNodeNotFoundError extends ModelError {
  constructor(gmeContext: GmeContentContext, name: string) {
    const msg =
      `Could not find "${name}" in the metamodel. Is this a taxonomy project?`;
    const context = ModelError.getContext(gmeContext, gmeContext.root);
    super(context, msg);
  }
}

export class TaxNodeNotFoundError extends ModelError {
  constructor(gmeContext: GmeContentContext) {
    const msg = `No taxonomy defined in the project.`;
    const context = ModelError.getContext(gmeContext, gmeContext.root);
    super(context, msg);
  }
}
