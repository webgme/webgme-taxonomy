class ModelError extends Error {
  constructor(nodeId, msg) {
    super(msg);
    this.nodeId = nodeId;
  }
}

module.exports = ModelError;
