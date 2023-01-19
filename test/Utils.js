import {ninvoke} from 'q';

let counter = 1;

const Utils = {
  async getNewRootNode(project, commitHash, core) {
    const branchName = "test" + counter++;
    await project.createBranch(branchName, commitHash);
    const branchHash = await project.getBranchHash(branchName);
    const commit = await ninvoke(project, "loadObject", branchHash);
    return await ninvoke(core, "loadRoot", commit.root);
  }
};

module.exports = Utils;
