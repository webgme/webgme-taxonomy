const { UserError } = require("../../../common/routers/Utils");
const UNPROCESSABLE_ENTITY = 422;

class ModelError extends UserError {
  constructor(nodeId, msg) {
    super(msg, UNPROCESSABLE_ENTITY);
    this.nodeId = nodeId;
  }

  sendVia(response) {
    response.status(this.statusCode).json(JSON.stringify(this));
  }
}

class MissingAttributeError extends ModelError {
  constructor(core, node, attrName) {
    const nodeId = core.getPath(node);
    const name = core.getAttribute(node, "name");
    const msg = `No ${attrName} specified for ${name}`;
    super(nodeId, msg);
  }
}

class StorageNotFoundError extends ModelError {
  constructor(core, contentTypeNode) {
    const nodeId = core.getPath(contentTypeNode);
    const name = core.getAttribute(contentTypeNode, "name");
    const msg = `No storage configured for ${name}`;
    super(nodeId, msg);
  }
}

module.exports = { ModelError, StorageNotFoundError, MissingAttributeError };
