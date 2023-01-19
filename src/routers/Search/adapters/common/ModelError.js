const { UserError } = require("../../../../common/routers/Utils");
const UNPROCESSABLE_ENTITY = 422;

class ModelError extends UserError {
  constructor(context, msg) {
    super(msg, UNPROCESSABLE_ENTITY);
    this.modelContext = context;
  }

  sendVia(response) {
    const data = {
      message: this.message,
      context: this.modelContext,
    };
    response.status(this.statusCode).json(data);
  }

  static getContext(gmeContext, node) {
    const { core, project, branchName } = gmeContext;
    return {
      projectId: project.projectId,
      branch: branchName, // TODO: add support for more types of references to a project
      nodeId: core.getPath(node),
    };
  }
}

class MissingAttributeError extends ModelError {
  constructor(gmeContext, node, attrName) {
    const { core } = gmeContext;
    const name = core.getAttribute(node, "name");
    const msg = `No ${attrName} specified for ${name}`;
    const context = ModelError.getContext(gmeContext, node);
    super(context, msg);
  }
}

class StorageNotFoundError extends ModelError {
  constructor(gmeContext, contentTypeNode) {
    const { core } = gmeContext;
    const name = core.getAttribute(contentTypeNode, "name");
    const msg = `No storage configured for ${name}`;
    const context = ModelError.getContext(gmeContext, node);
    super(context, msg);
  }
}

module.exports = { ModelError, StorageNotFoundError, MissingAttributeError };
