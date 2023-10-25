describe("DesugarJson", function () {
  const { DesugarJson, Visitor } = require("../../src/common/DesugarJson");
  const assert = require("assert");
  const Utils = require("../Utils");
  let project, gmeAuth, storage, commitHash, core;

  before(async function () {
    this.timeout(7500);
    const params = await Utils.initializeProject(
      "DesugarJson",
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

  async function getDesugarFn(csv) {
    const root = await Utils.getNewRootNode(project, commitHash, core);
    const taxonomy = await Utils.createTaxonomyFromCsv(core, root, csv);
    const desugar = new DesugarJson(core, taxonomy);
    return (tags) => desugar.desugar(tags);
  }

  describe("required terms", function () {
    it("should have visitor for every field type", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const metaNodes = Object.values(core.getAllMetaNodes(root));
      const term = metaNodes.find((n) =>
        core.getAttribute(n, "name") === "Term"
      );
      assert(!!term, "Term node not found in the metamodel");

      const fieldTypes = metaNodes.filter((n) => core.isTypeOf(n, term))
        .map((n) => core.getAttribute(n, "name"));

      const requiredTypes = ["Term", "Vocabulary", "Taxonomy", "SystemTerm"]
        .concat(fieldTypes);

      requiredTypes.forEach((typeName) =>
        assert(
          Visitor.hasOwnProperty(typeName),
          "No visitor defined for " + typeName,
        )
      );
    });

    it("should desugar enums", async function () {
      const taxCsv = `vocab,,,,
        ,term1,,,
        ,,enumField(enum),,,
        ,,,Opt1,,
      `;
      const tags = {
        vocab: {
          term1: {
            enumField: "Opt1",
          },
        },
      };
      const expectedTags = {
        vocab: {
          term1: {
            enumField: { Opt1: {} },
          },
        },
      };

      const desugar = await getDesugarFn(taxCsv);
      assert.deepEqual(await desugar(tags), expectedTags);
    });

    it("should desugar multiple enums", async function () {
      const taxCsv = `vocab,,,,
        ,term1,,,
        ,,enumField(enum),,,
        ,,,Opt1,,
        ,,,Opt2,,
        ,,,Opt3,,
        ,term2 (enum),,,
        ,,enumField(enum),,,
        ,,,Opt1,,
        ,,,Opt2,,
        ,,,Opt3,,
        ,,,,nestedValue (text),
        ,,,,nestedEnum(enum),
        ,,,,,NestedOpt1
        ,,,,,NestedOpt2
      `;
      const tags = {
        vocab: {
          term1: {
            enumField: "Opt1",
          },
          term2: {
            enumField: {
              Opt3: {
                nestedValue: "hello",
                nestedEnum: "NestedOpt1",
              },
            },
          },
        },
      };
      const expectedTags = {
        vocab: {
          term1: {
            enumField: { Opt1: {} },
          },
          term2: {
            enumField: {
              Opt3: {
                nestedValue: "hello",
                nestedEnum: {
                  NestedOpt1: {},
                },
              },
            },
          },
        },
      };

      const desugar = await getDesugarFn(taxCsv);
      assert.deepEqual(await desugar(tags), expectedTags);
    });

    it("should desugar set", async function () {
      const taxCsv = `vocab,,,,,
        ,term1,,,,
        ,,setField (set),,,,
        ,,,Opt1,,
      `;
      const tags = {
        vocab: {
          term1: {
            setField: ["Opt1"],
          },
        },
      };
      const expectedTags = {
        vocab: {
          term1: {
            setField: [{
              Opt1: {},
            }],
          },
        },
      };

      const desugar = await getDesugarFn(taxCsv);
      assert.deepEqual(await desugar(tags), expectedTags);
    });

    it("should desugar set (multiple)", async function () {
      const taxCsv = `vocab,,,,,
        ,term1,,,,
        ,,setField (set),,,,
        ,,,Opt1,,
        ,,,Opt2,,
        ,,,Opt3,,
        ,term2,,,,
        ,,setField (set),,,,
        ,,,Opt1,,
        ,,,Opt2,,
        ,,,Opt3,,
        ,,,,nestedValue (text),
        ,,,,nestedSet(set),
        ,,,,,NestedOpt1
        ,,,,,NestedOpt2
      `;
      const tags = {
        vocab: {
          term1: {
            setField: ["Opt1"],
          },
          term2: {
            setField: [
              {
                Opt3: {
                  "nestedValue": "hello",
                  "nestedSet": ["NestedOpt1"],
                },
              },
            ],
          },
        },
      };
      const expectedTags = {
        vocab: {
          term1: {
            setField: [
              {
                Opt1: {},
              },
            ],
          },
          term2: {
            setField: [{
              Opt3: {
                nestedValue: "hello",
                nestedSet: [{
                  NestedOpt1: {},
                }],
              },
            }],
          },
        },
      };

      const desugar = await getDesugarFn(taxCsv);
      assert.deepEqual(await desugar(tags), expectedTags);
    });
  });
});
