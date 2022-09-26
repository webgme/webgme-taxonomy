describe("JSONSchemaExporter", function () {
  const testFixture = require("../globals");
  const _ = testFixture.requirejs("underscore");
  const Core = testFixture.requirejs("common/core/coreQ");
  const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
  const TaxonomyParser = require("../../src/common/TaxonomyParser");
  const TagFormatter = require("../../src/common/TagFormatter");
  const JSONSchemaExporter = require("../../src/common/JSONSchemaExporter");
  const Ajv = require("ajv");
  const ajv = new Ajv();
  const { OmittedProperties, NodeSelections } = Importer;
  const assert = require("assert");
  const gmeConfig = testFixture.getGmeConfig();
  const path = testFixture.path;
  const SEED_DIR = path.join(__dirname, "..", "..", "src", "seeds");
  const Q = testFixture.Q;
  const logger = testFixture.logger.fork("JSONImporter");
  const projectName = "testProject";
  let project, gmeAuth, storage, commitHash, core;

  before(async function () {
    this.timeout(7500);
    gmeAuth = await testFixture.clearDBAndGetGMEAuth(gmeConfig, projectName);
    storage = testFixture.getMemoryStorage(logger, gmeConfig, gmeAuth);
    await storage.openDatabase();
    const importParam = {
      projectSeed: path.join(SEED_DIR, "taxonomy", "taxonomy.webgmex"),
      projectName: projectName,
      branchName: "master",
      logger: logger,
      gmeConfig: gmeConfig,
    };

    const importResult = await testFixture.importProject(storage, importParam);
    project = importResult.project;
    core = new Core(project, {
      globConf: gmeConfig,
      logger: logger.fork("core"),
    });
    commitHash = importResult.commitHash;
  });

  after(async function () {
    await storage.closeDatabase();
    await gmeAuth.unload();
  });

  let counter = 1;
  async function getNewRootNode(core) {
    const branchName = "test" + counter++;
    await project.createBranch(branchName, commitHash);
    const branchHash = await project.getBranchHash(branchName);
    const commit = await Q.ninvoke(project, "loadObject", branchHash);
    return await Q.ninvoke(core, "loadRoot", commit.root);
  }

  async function createTaxonomyFromCsv(core, root, csv) {
    const vocabRoots = TaxonomyParser.fromCSV(csv);
    vocabRoots.forEach(
      (vocabRoot) => (vocabRoot.pointers.base = "@meta:Vocabulary")
    );
    const tax = { pointers: { base: "@meta:Taxonomy" }, children: vocabRoots };
    const importer = new Importer(core, root);
    return await importer.import(root, tax);
  }

  async function getValidateFn(core, root, csv) {
    const taxonomy = await createTaxonomyFromCsv(core, root, csv);
    const exporter = JSONSchemaExporter.from(core, root);
    const { schema, uiSchema } = await exporter.getSchemas(taxonomy);
    console.log(JSON.stringify(schema, null, 2));
    const validate = ajv.compile(schema);
    const formatter = await TagFormatter.from(core, taxonomy);

    return async (humanTag) => {
      const [guidTag] = await formatter.toGuidFormat([humanTag]);
      return await validate(guidTag);
    };
  }

  // TODO: create an enum and test the format works
  describe("enum", function () {
    let root;
    beforeEach(async () => {
      root = await getNewRootNode(core);
    });

    it("should support string enums", async function () {
      const taxCsv = `tax,,,
        ,vocab,,,
        ,,enumTerm,,
        ,,,enumProp (enum),
        ,,,,enumItem1 (text)
        ,,,,enumItem2 (text)
        ,,,,enumItem3 (text)`;
      const tag = {
        Tag: "enumTerm",
        enumProp: "enumItem1",
      };
      const validate = await getValidateFn(core, root, taxCsv);
      assert(await validate(tag));
    });

    it("should support compound enums", async function () {
      const taxCsv = `vocab,,,,
        ,enumTerm,,,
        ,,enumProp (enum),,
        ,,,enumItem1,
        ,,,,name (text)
        ,,,enumItem2,
        ,,,,age (int)`;
      // TODO: how does this work?
      const tag = {
        Tag: "enumTerm",
        enumProp: {
          Tag: "enumItem1",
          name: "test name",
        },
      };
      const validate = await getValidateFn(core, root, taxCsv);
      assert(await validate(tag));
    });

    describe("mixed (compound+string) enums", function () {
      let validate;
      beforeEach(async () => {
        const taxCsv = `vocab,,,,
        ,enumTerm,,,
        ,,enumProp (enum),,
        ,,,compoundEnumOpt,
        ,,,,name (text)
        ,,,stringEnumOpt (text),`;
        validate = await getValidateFn(core, root, taxCsv);
      });

      it("should support compound tags", async function () {
        const tag = {
          Tag: "enumTerm",
          enumProp: {
            Tag: "compoundEnumOpt",
            name: "test name",
          },
        };
        assert(await validate(tag));
      });

      it("should support string tags", async function () {
        const tag = {
          Tag: "enumTerm",
          enumProp: "stringEnumOpt"
        };
        assert(await validate(tag));
      });

      it("should error on invalid strings", async function () {
        const tag = {
          Tag: "enumTerm",
          enumProp: "invalidString"
        };
        assert.rejects(validate(tag));
      });
    });
  });
});
