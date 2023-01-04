const Q = require('q');

let counter = 1;

const Utils = {
  async getNewRootNode(project, commitHash, core) {
    const branchName = "test" + counter++;
    await project.createBranch(branchName, commitHash);
    const branchHash = await project.getBranchHash(branchName);
    const commit = await Q.ninvoke(project, "loadObject", branchHash);
    return await Q.ninvoke(core, "loadRoot", commit.root);
  }
};

module.exports = Utils;
