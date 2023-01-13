describe("JSONSchemaExporter", function () {
  const testFixture = require("../globals");
  const _ = testFixture.requirejs("underscore");
  const Core = testFixture.requirejs("common/core/coreQ");
  const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
  const TaxonomyParser = require("../../src/common/TaxonomyParser");
  const TagFormatter = require("../../src/common/TagFormatter");
  const JSONSchemaExporter = require("../../src/common/JSONSchemaHuman");
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
  const Utils = require("../Utils");
  let project, gmeAuth, storage, commitHash, core;

  before(async function () {
    this.timeout(7500);
    const params = await Utils.initializeProject(
      "JSONSchemaExporter",
      "taxonomy"
    );
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
    console.log(JSON.stringify(schema, null, 2));
    const validate = ajv.compile(schema);
    return (tag) => {
      const completeTags = {
        taxonomyTags: [tag],
      };
      return validate(completeTags);
    };
  }

  describe("enum", function () {
    let root;
    beforeEach(async () => {
      root = await Utils.getNewRootNode(project, commitHash, core);
    });

    it("should support string enums", async function () {
      const taxCsv = `vocab,,,
        ,enumTerm,,
        ,,enumProp (enum),
        ,,,enumItem1 (text)
        ,,,,itemField (int)
        ,,,enumItem2 (text)
        ,enumTerm2,,
        ,,name (text),
        ,,enumSubTerm2,
        ,,,child_name (text)
        ,enumTerm3,,
        ,,enumItem3 (text)`;
      const tag = {
        vocab: {
          enumTerm: {
            enumProp: { enumItem1: {} },
          },
        },
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
      const tag = {
        vocab: {
          enumTerm: {
            enumProp: {
              enumItem1: {
                name: "test name",
              },
            },
          },
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

      it("should fail if invalid enum item", async function () {
        const tag = {
          vocab: {
            enumTerm: {
              enumProp: {
                Tag: "compoundEnumOpt",
                name: "test name",
              },
            },
          },
        };
        assert(!validate(tag));
      });

      it("should support compound tags", async function () {
        const tag = {
          vocab: {
            enumTerm: {
              enumProp: {
                compoundEnumOpt: {
                  name: "test name",
                },
              },
            },
          },
        };
        assert(validate(tag));
      });

      it("should support string tags", async function () {
        const tag = {
          vocab: {
            enumTerm: {
              enumProp: { stringEnumOpt: {} },
            },
          },
        };
        assert(validate(tag));
      });

      it("should error on invalid strings", async function () {
        const tag = {
          vocab: {
            enumTerm: {
              enumProp: "invalidString",
            },
          },
        };
        assert(!validate(tag));
      });
    });
  });
});
