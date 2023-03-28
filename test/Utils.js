const Q = require("q");
const path = require("path");
const testFixture = require("./globals");
const TaxonomyParser = require("../src/common/TaxonomyParser");
const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
const SEED_DIR = path.join(__dirname, "..", "src", "seeds");

let counter = 1;

const Utils = {
  async getNewRootNode(project, commitHash, core) {
    const branchName = "test" + counter++;
    await project.createBranch(branchName, commitHash);
    const branchHash = await project.getBranchHash(branchName);
    const commit = await Q.ninvoke(project, "loadObject", branchHash);
    return await Q.ninvoke(core, "loadRoot", commit.root);
  },
  async createTaxonomyFromCsv(core, root, csv) {
    const vocabRoots = TaxonomyParser.fromCSV(csv);
    vocabRoots.forEach(
      (vocabRoot) => (vocabRoot.pointers.base = "@meta:Vocabulary"),
    );
    const tax = { pointers: { base: "@meta:Taxonomy" }, children: vocabRoots };
    const importer = new Importer(core, root);
    return await importer.import(root, tax);
  },
  async initializeProject(name, seedName, core) {
    const Core = testFixture.requirejs("common/core/coreQ");
    const logger = testFixture.logger.fork(name);
    const gmeConfig = testFixture.getGmeConfig();
    const projectName = name + "_" + Date.now() + Math.random() * 10000;
    const gmeAuth = await testFixture.clearDBAndGetGMEAuth(
      gmeConfig,
      projectName,
    );
    const storage = testFixture.getMemoryStorage(logger, gmeConfig, gmeAuth);
    await storage.openDatabase();
    const importParam = {
      projectSeed: path.join(SEED_DIR, seedName, seedName + ".webgmex"),
      projectName: name,
      branchName: "master",
      logger,
      gmeConfig,
    };

    const importResult = await testFixture.importProject(storage, importParam);
    project = importResult.project;
    core = new Core(project, {
      globConf: gmeConfig,
      logger: logger.fork("core"),
    });
    commitHash = importResult.commitHash;
    return { gmeAuth, storage, core, commitHash, project };
  },
};

module.exports = Utils;
