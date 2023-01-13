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
  const path = testFixture.path;
  const SEED_DIR = path.join(__dirname, "..", "..", "src", "seeds");
  const Q = testFixture.Q;
  const logger = testFixture.logger.fork("JSONImporter");
  const projectName = "testProject";
  const Utils = require('../Utils');
  let project, gmeAuth, storage, commitHash, core;

  before(async function () {
    this.timeout(7500);
    const params = await Utils.initializeProject("JSONSchemaExporter", "taxonomy");
    gmeAuth = params.gmeAuth;
    storage = params.storage;
    commitHash = params.commitHash;
    core = params.core;
    project = params.project;
  });

  after(async function () {
    await storage.closeDatabase();
    await gmeAuth.unload();
  });

  async function getValidateFn(core, root, csv) {
    const taxonomy = await Utils.createTaxonomyFromCsv(core, root, csv);
    const exporter = JSONSchemaExporter.from(core, root);
    const { schema, uiSchema } = await exporter.getSchemas(taxonomy);
    const validate = ajv.compile(schema);
    const formatter = await TagFormatter.from(core, taxonomy);

    return async (humanTag) => {
      const [guidTag] = await formatter.toGuidFormat([humanTag]);
      return await validate(guidTag);
    };
  }

  describe("enum", function () {
    let root;
    beforeEach(async () => {
      root = await Utils.getNewRootNode(project, commitHash, core);
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

    it("should convert string to GUID (and back)", async function () {
      // FIXME: this really belongs in the formatter tests
      const taxCsv = `tax,,,
        ,vocab,,,
        ,,enumTerm,,
        ,,,enumProp (enum),
        ,,,,enumItem1 (text)
        ,,,,enumItem2 (text)
        ,,,,enumItem3 (text)`;
      const humanTag = {
        Tag: "enumTerm",
        enumProp: "enumItem1",
      };
      const taxonomy = await Utils.createTaxonomyFromCsv(core, root, taxCsv);
      const exporter = JSONSchemaExporter.from(core, root);
      const { schema, uiSchema } = await exporter.getSchemas(taxonomy);
      const validate = ajv.compile(schema);
      const formatter = await TagFormatter.from(core, taxonomy);

      const [guidTag] = await formatter.toGuidFormat([humanTag]);
      assert(!Object.values(guidTag).includes(humanTag.enumProp));
      const [humanTag2] = await formatter.toHumanFormat([guidTag]);
      assert.deepEqual(humanTag, humanTag2);
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
