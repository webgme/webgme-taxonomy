describe("JSONSchemaExporter", function () {
  const testFixture = require("../globals");
  const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
  const JSONSchemaExporter = require("../../src/common/JSONSchemaExporter");
  const SugarLevel = JSONSchemaExporter.SugarLevel;
  const Ajv = require("ajv");
  const ajv = new Ajv();
  const assert = require("assert");
  const Utils = require("../Utils");
  let project, gmeAuth, storage, commitHash, core;

  before(async function () {
    this.timeout(7500);
    const params = await Utils.initializeProject(
      "JSONSchemaExporter",
      "taxonomy",
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

  async function getValidateFn(
    core,
    root,
    csv,
    sugarLevel = SugarLevel.Desugared,
  ) {
    const taxonomy = await Utils.createTaxonomyFromCsv(core, root, csv);
    const exporter = JSONSchemaExporter.from(core, root, sugarLevel);
    const { schema, uiSchema } = await exporter.getSchemas(taxonomy);
    const validate = ajv.compile(schema);
    return validate;
  }

  describe("required terms", function () {
    let schemaDict;
    before(async () => {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:Term" },
                attributes: {
                  name: "RequiredTerm",
                  selection: "required",
                },
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const exporter = JSONSchemaExporter.from(core, taxonomy);
      schemaDict = await exporter.getSchemas(taxonomy);
    });

    it("should add constraint for required terms", async function () {
      const requiredTerms = schemaDict.schema.properties.Vocabulary.required;
      assert(requiredTerms.includes("RequiredTerm"));
    });

    it("should include terms in initial form data", async function () {
      const { formData } = schemaDict;
      assert(formData.Vocabulary.RequiredTerm);
    });

    it("should set required fields correctly", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:Term" },
                attributes: {
                  name: "RequiredTerm",
                  selection: "required",
                },
                children: [
                  {
                    pointers: { base: "@meta:TextField" },
                    attributes: { name: "requiredField" },
                  },
                  {
                    pointers: { base: "@meta:EnumField" },
                    attributes: { name: "value", required: false },
                    children: [
                      {
                        pointers: { base: "@meta:CompoundField" },
                        attributes: { name: "A" },
                      },
                      {
                        pointers: { base: "@meta:CompoundField" },
                        attributes: { name: "B" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const exporter = JSONSchemaExporter.from(core, taxonomy);
      const { schema } = await exporter.getSchemas(taxonomy);

      const termSchema = schema.properties.Vocabulary.properties.RequiredTerm;
      const reqFields = termSchema.required;

      assert(termSchema);

      assert(reqFields.includes("requiredField"));
      assert(!reqFields.includes("value"));
    });
  });

  describe("required props", function () {
    // The following test is required bc of a limitation of the tag form itself
    it("should make all properties of optional terms optional, too", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const requiredPropJson = {
        pointers: { base: "@meta:TextField" },
        attributes: { required: true },
      };
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:Term" },
                attributes: {
                  name: "RequiredTerm",
                  selection: "required",
                },
                children: [requiredPropJson],
              },
              {
                pointers: { base: "@meta:Term" },
                attributes: {
                  name: "OptionalTerm",
                  selection: "optional",
                },
                children: [requiredPropJson],
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const exporter = JSONSchemaExporter.from(core, taxonomy);

      const { schema } = await exporter.getSchemas(taxonomy);
      const termDict = schema.properties.Vocabulary.properties;

      assert.equal(termDict.OptionalTerm.required.length, 0);
      assert.equal(termDict.RequiredTerm.required.pop(), "TextField");
    });
  });

  describe("recommended terms", function () {
    it.skip("should include terms in initial form data", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:Term" },
                attributes: {
                  name: "RecTerm",
                  selection: "recommended",
                },
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const exporter = JSONSchemaExporter.from(core, taxonomy);
      const { formData } = await exporter.getSchemas(taxonomy);
      const tags = formData.Vocabulary.properties;
      assert(tags.RecTerm);
    });
  });

  describe("required properties", function () {
    it("should set property as required in schema", async () => {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:Term" },
                attributes: {
                  name: "RecTerm",
                  selection: "required",
                },
                children: [
                  {
                    pointers: { base: "@meta:TextField" },
                    attributes: { name: "testAttr", required: true },
                  },
                ],
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const exporter = JSONSchemaExporter.from(core, taxonomy);
      const { schema } = await exporter.getSchemas(taxonomy);
      const termSchema = schema.properties.Vocabulary.properties.RecTerm;
      const reqProps = termSchema.required;
      assert(reqProps.includes("testAttr"));
    });
  });

  describe("enum", function () {
    let root;
    beforeEach(async () => {
      root = await Utils.getNewRootNode(project, commitHash, core);
    });

    it("should support simple enums", async function () {
      const taxCsv = `vocab,,,
        ,enumTerm,,
        ,,enumProp (enum),
        ,,,Option1
        ,,,Option2
        ,,,Option3
        `;
      const tag = {
        vocab: {
          enumTerm: {
            enumProp: {
              Option1: {},
            },
          },
        },
      };
      const validate = await getValidateFn(core, root, taxCsv);
      assert(await validate(tag));
    });

    /**
     * A helper function for making tests for sugar levels and enum/sets
     */
    function testSugarTag(testName, tag, sugarLevel, isValid = true) {
      it(testName, async function () {
        const taxCsv = `vocab,,,
          ,enumTerm,,
          ,,enumProp (enum),
          ,,,Option1
          ,,,Option2
          ,,,,name(text)
          ,,,Option3
          ,setTerm,,
          ,,setProp (set),
          ,,,Option1
          ,,,Option2
          ,,,,name(text)
          ,,,Option3
          `;
        const validate = await getValidateFn(
          core,
          root,
          taxCsv,
          sugarLevel,
        );
        assert.equal(await validate(tag), isValid);
      });
    }

    testSugarTag(
      "should allow sugared enums (level = sugared)",
      {
        vocab: {
          enumTerm: {
            enumProp: "Option1",
          },
        },
      },
      SugarLevel.Sugared,
    );

    testSugarTag(
      "should not allow desugared enums (level = sugared)",
      {
        vocab: {
          enumTerm: {
            enumProp: { Option1: {} },
          },
        },
      },
      SugarLevel.Sugared,
      false,
    );

    testSugarTag("should not sugar compound enums (level = sugared)", {
      vocab: {
        enumTerm: {
          enumProp: { Option2: { name: "hello" } },
        },
      },
    }, SugarLevel.Sugared);

    testSugarTag("should allow sugared enums (level = any)", {
      vocab: {
        enumTerm: {
          enumProp: "Option1",
        },
      },
    }, SugarLevel.Any);

    testSugarTag("should allow desugared enums (level = any)", {
      vocab: {
        enumTerm: {
          enumProp: { Option1: {} },
        },
      },
    }, SugarLevel.Any);

    testSugarTag(
      "should not allow different (sugared) variant",
      {
        vocab: {
          enumTerm: {
            enumProp: "Option4",
          },
        },
      },
      SugarLevel.Sugared,
      false,
    );

    testSugarTag(
      "should allow sugared sets (level = sugared)",
      {
        vocab: {
          setTerm: {
            setProp: ["Option1"],
          },
        },
      },
      SugarLevel.Sugared,
    );

    testSugarTag(
      "should not allow desugared sets (level = sugared)",
      {
        vocab: {
          setTerm: {
            setProp: [{ Option1: {} }],
          },
        },
      },
      SugarLevel.Sugared,
      false,
    );

    testSugarTag("should not sugar compound sets (level = sugared)", {
      vocab: {
        setTerm: {
          setProp: [{ Option2: { name: "hello" } }],
        },
      },
    }, SugarLevel.Sugared);

    testSugarTag("should allow sugared sets (level = any)", {
      vocab: {
        setTerm: {
          setProp: ["Option1"],
        },
      },
    }, SugarLevel.Any);

    testSugarTag("should allow desugared sets (level = any)", {
      vocab: {
        setTerm: {
          setProp: [{ Option1: {} }],
        },
      },
    }, SugarLevel.Any);

    testSugarTag(
      "should not allow different (sugared) variant (set)",
      {
        vocab: {
          setTerm: {
            setProp: ["Option4"],
          },
        },
      },
      SugarLevel.Sugared,
      false,
    );

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

  describe("releaseState", function () {
    let root;
    beforeEach(async () => {
      root = await Utils.getNewRootNode(project, commitHash, core);
    });

    it("should omit deprecated terms", async function () {
      const taxCsv = `vocab,,,
        ,term,,
        ,term2,,
        ,depTerm,,`;
      const taxonomy = await Utils.createTaxonomyFromCsv(core, root, taxCsv);
      const termNode = (await core.loadSubTree(taxonomy))
        .find((node) => core.getAttribute(node, "name") === "depTerm");
      core.setAttribute(termNode, "releaseState", "deprecated");

      const exporter = JSONSchemaExporter.from(core, root);
      const { schema } = await exporter.getSchemas(taxonomy, true);
      const termSchemas = Object.keys(schema.properties.vocab.properties);
      assert.equal(termSchemas.length, 2);
      assert(!termSchemas.find((schema) => schema.title === "depTerm"));
    });

    it("should omit prerelease terms", async function () {
      const taxCsv = `vocab,,,
        ,term,,
        ,term2,,
        ,preTerm,,`;
      const taxonomy = await Utils.createTaxonomyFromCsv(core, root, taxCsv);
      const termNode = (await core.loadSubTree(taxonomy))
        .find((node) => core.getAttribute(node, "name") === "preTerm");
      core.setAttribute(termNode, "releaseState", "prerelease");

      const exporter = JSONSchemaExporter.from(core, root);
      const { schema } = await exporter.getSchemas(taxonomy, true);
      const termSchemas = Object.values(schema.properties)
        .flatMap((v) => Object.values(v.properties));
      assert.equal(termSchemas.length, 2);
      assert(!termSchemas.find((schema) => schema.title === "preTerm"));
    });

    it("should omit terms in deprecated vocabs", async function () {
      const taxCsv = `vocab,,,
        ,term,,
        ,term2,,
        ,term3,,
        depVocab,,,
        ,depTerm,,
        ,depTerm2,,
        ,depTerm3,,
      `;
      const taxonomy = await Utils.createTaxonomyFromCsv(core, root, taxCsv);
      const vocabNode = (await core.loadChildren(taxonomy))
        .find((node) => core.getAttribute(node, "name") === "depVocab");
      core.setAttribute(vocabNode, "releaseState", "deprecated");

      const exporter = JSONSchemaExporter.from(core, root);
      const { schema } = await exporter.getSchemas(taxonomy, true);
      const termSchemas = Object.values(schema.properties)
        .flatMap((v) => Object.values(v.properties));
      assert.equal(termSchemas.length, 3);
      assert(!termSchemas.find((schema) => schema.title.startsWith("dep")));
    });

    it("should omit terms in prerelease vocabs", async function () {
      const taxCsv = `vocab,,,
        ,term,,
        ,term2,,
        ,term3,,
        preVocab,,,
        ,preTerm,,
        ,preTerm2,,
        ,preTerm3,,
      `;
      const taxonomy = await Utils.createTaxonomyFromCsv(core, root, taxCsv);
      const vocabNode = (await core.loadChildren(taxonomy))
        .find((node) => core.getAttribute(node, "name") === "preVocab");
      core.setAttribute(vocabNode, "releaseState", "prerelease");

      const exporter = JSONSchemaExporter.from(core, root);
      const { schema } = await exporter.getSchemas(taxonomy, true);
      const termSchemas = Object.values(schema.properties)
        .flatMap((v) => Object.values(v.properties));
      assert.equal(termSchemas.length, 3);
      assert(termSchemas.every((schema) => !schema.title.startsWith("pre")));
    });

    it("should include unreleased terms by default", async function () {
      const taxCsv = `vocab,,,
        ,term,,
        ,term2,,
        ,term3,,
        depVocab,,,
        ,depTerm,,
        ,depTerm2,,
        ,depTerm3,,
        preVocab,,,
        ,preTerm,,
        ,preTerm2,,
        ,preTerm3,,
      `;
      const taxonomy = await Utils.createTaxonomyFromCsv(core, root, taxCsv);
      const depVocab = (await core.loadChildren(taxonomy))
        .find((node) => core.getAttribute(node, "name") === "depVocab");
      core.setAttribute(depVocab, "releaseState", "deprecated");
      const preVocab = (await core.loadChildren(taxonomy))
        .find((node) => core.getAttribute(node, "name") === "preVocab");
      core.setAttribute(preVocab, "releaseState", "prerelease");

      const exporter = JSONSchemaExporter.from(core, root);
      const { schema } = await exporter.getSchemas(taxonomy);
      const termSchemas = Object.values(schema.properties)
        .flatMap((v) => Object.values(v.properties));
      assert.equal(termSchemas.length, 9);

      assert.equal(
        termSchemas.filter((schema) => schema.title.startsWith("dep")).length,
        3,
      );
      assert.equal(
        termSchemas.filter((schema) => schema.title.startsWith("pre")).length,
        3,
      );
    });
  });

  describe("UriField", function () {
    it("should enforce syntax", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxCsv = `vocab,,,
        ,term,,
        ,,field (uri),
      `;
      const uri =
        "pdp://127.0.0.1:435/someType/e0de6a4a-5257-4f2c-b3ce-470e3299fc4a/9/0";

      const tag = {
        vocab: {
          term: {
            field: uri,
          },
        },
      };
      const validate = await getValidateFn(core, root, taxCsv);
      assert(await validate(tag));

      const badTag = {
        vocab: {
          term: {
            field: "IamAnInvalidURI",
          },
        },
      };
      assert(!await validate(badTag));
    });
  });
});
