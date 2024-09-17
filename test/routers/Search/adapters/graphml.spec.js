describe("graphml", function () {
  const { addNodeData, toGraph } = require(
    "../../../../build/routers/Search/adapters/graphml",
  );
  const { getTaxonomyNode } = require(
    "../../../../build/common/Utils",
  );
  const TagFormatter = require("../../../../build/common/TagFormatter").default;
  const exportTaxonomy = require("../../../../build/common/TaxonomyExporter");
  const TestUtils = require("../../../Utils");
  let storage, gmeAuth, core, formatter;

  const assert = require("assert");

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

  function newMetadata(displayName, tags = {}) {
    return {
      tags,
      "taxonomyVersion": {
        "id": "guest+e2e_tests",
        "branch": "master",
        "commit": "#8f12d5e6ba3232ed3e603a7e707f0fd1d31743d4",
        "url": "localhost",
      },
      displayName,
    };
  }

  it("should convert term to node connected to vocabulary", function () {
    const metadata = {
      displayName: "someContent",
      tags: { "vocab": { "term1": { "f1": "hello!" } } },
    };
    const graph = toGraph(metadata);

    const content = graph.nodes[0];
    const edge = graph.edges.find((edge) => edge.sourceId === content.id);
    const target = graph.nodes.find((n) => edge.targetId === n.id);
    assert.equal(target.attributes.tagId, "vocab");
  });

  it.skip("should convert reference field to edge", function () {
    const m1 = newMetadata("m1");
    // check that there is an edge to the given field
    // - do I need to update the graph to use gremlin instead?
    const m2 = newMetadata(
      "m2",
      formatter.toGuidFormat({
        "DemoTerms": {
          "RequiredTerm": {},
          "TermWithRef": {
            "origin": `metadata://${uuid}`,
          },
        },
      }),
    );
    // TODO: create a term
    // TODO: create another term (w/ ref field)
    // TODO: check that it created an edge
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

    it.skip("should set labelV to term/field types", function () {
      const graph = addNodeData(taxonomy, toGraph(metadata));
      const untypedNode = graph.nodes.find((node) =>
        !node.attributes.labelV || node.attributes.labelV === "TagData"
      );
      assert(
        !untypedNode,
        `Found untyped node: ${JSON.stringify(untypedNode)}`,
      );
    });

    it("should set originalName on term/field types", function () {
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
