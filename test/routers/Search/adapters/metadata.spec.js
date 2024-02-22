describe("graphml", function () {
  const { addNodeData, toGraph } = require(
    "../../../../build/routers/Search/adapters/graphml",
  );
  const { getTaxonomyNode } = require(
    "../../../../build/common/Utils",
  );
  const TagFormatter = require("../../../../build/common/TagFormatter").default;
  const exportTaxonomy = require("../../../../build/common/TaxonomyExporter");
  const assert = require("assert");
  const TestUtils = require("../../../Utils");
  let storage, gmeAuth, core, formatter;

  before(async () => {
    const params = await TestUtils.initializeProject(
      "TagFormatter",
      "test",
    );
    core = params.core;
    const { project, commitHash } = params;
    storage = params.storage;
    gmeAuth = params.gmeAuth;
    const root = await TestUtils.getNewRootNode(project, commitHash, core);
    const taxNode = await getTaxonomyNode({ core, root });
    taxonomy = await exportTaxonomy(core, taxNode);
    formatter = await TagFormatter.from(core, taxNode);
  });

  after(function () {
    storage.closeDatabase();
    gmeAuth.unload();
  });

  describe("addNodeData", function () {
    let metadata;
    before(async () => {
      metadata = {
        "tags": formatter.toGuidFormat({
          "DemoTerms": {
            "RequiredTerm": {},
            "Person": {
              "name": "Brian",
              "isTall?": true,
              "pets": [],
              "age": 32,
              "gender": { "male": {} },
            },
          },
        }),
        "taxonomyVersion": {
          "id": "guest+e2e_tests",
          "branch": "master",
          "commit": "#8f12d5e6ba3232ed3e603a7e707f0fd1d31743d4",
          "url": "localhost",
        },
        displayName: "testContent",
      };
    });

    it("should set labelV to term/field types", function () {
      const graph = addNodeData(taxonomy, toGraph(metadata));
      const untypedNode = graph.nodes.find((node) =>
        !node.attributes.labelV || node.attributes.labelV === "TagData"
      );
      assert(
        !untypedNode,
        `Found untyped node: ${JSON.stringify(untypedNode)}`,
      );
    });

    it.only("should set originalName on term/field types", function () {
      console.log(JSON.stringify(metadata));
      const graph = addNodeData(taxonomy, toGraph(metadata));
      const unnamedNode = graph.nodes.find((node) =>
        !node.attributes.originalName
      );
      assert(
        !unnamedNode,
        `Found unnamed node: ${JSON.stringify(unnamedNode)}`,
      );
    });
  });
});
