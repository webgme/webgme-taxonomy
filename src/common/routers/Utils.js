const webgme = require("webgme-engine");
const Core = webgme.requirejs("common/core/coreQ");

const Utils = {
  async getWebGMEContext(middlewareOpts, req, projectId, branch = "master") {
    const { safeStorage, getUserId, gmeConfig, logger } = middlewareOpts;
    const userId = getUserId(req);

    const context = {};

    context.project = await safeStorage.openProject({
      username: userId,
      projectId,
    });
    context.core = new Core(context.project, {
      globConf: gmeConfig,
      logger: logger.fork("core"),
    });
    context.branchName = branch;
    context.commitObject = await context.project.getCommitObject(
      context.branchName
    );
    context.root = await context.core.loadRoot(context.commitObject.root);

    return context;
  },
};

module.exports = Utils;
