describe.only("SystemTerm", function () {
  const testFixture = require("../../globals");
  const Utils = require("../../Utils");
  const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
  const assert = require("assert");
  const SystemTerm = require("../../../src/routers/Search/build/SystemTerm");
  let project, gmeAuth, storage, commitHash, core;

  before(async function () {
    this.timeout(7500);
    const params = await Utils.initializeProject(
      "SystemTermTest",
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

  describe("findAll", function () {
    it("should find system terms", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:SystemTerm" },
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const terms = await SystemTerm.findAll(core, taxonomy);
      assert.equal(terms.length, 1);
    });

    it("should ignore regular terms", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomyJson = {
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:Term" },
              },
            ],
          },
        ],
      };
      const importer = new Importer(core, root);
      const taxonomy = await importer.import(root, taxonomyJson);
      const terms = await SystemTerm.findAll(core, taxonomy);
      assert.equal(terms.length, 0);
    });
  });

  describe("instantiate", function () {
    it.only("should make tag using upload's name", async function () {
      const taxonomyJson = {
        attributes: { name: "TestTaxonomy" },
        pointers: { base: "@meta:Taxonomy" }, // TODO: taxonomy type appears to be incorrect
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:SystemTerm" },
              },
            ],
          },
        ],
      };
      // TODO: define transformation
      // match the UploadContent's name attribute
      //   - node (in active node)
      //   - attribute node
      //   - name constant
      //

      // create term
      //   - set "value" attribute to name
      //   - set "name" attribute? Maybe do this by default
      //   - connection between value and value of name attribute

      const inputPattern = [
        {
          id: "@id:content_node",
          pointers: {
            base: "@meta:transformation.Node",
            type: "@meta:UploadContent",
          },
        },
        {
          id: "@id:input_attr",
          pointers: {
            base: "@meta:transformation.Attribute",
          },
        },
        // TODO: get a reference to the inherited child
        {
          id: "@id:input_name",
          pointers: {
            base: "@meta:transformation.Constant",
          },
          attributes: {
            value: "name",
          },
        },
      ];
      const outputPattern = [
        {
          id: "@id",
        },
      ];

      const taxonomy = await importTaxonomy(taxonomyJson);
      const [term] = await SystemTerm.findAll(core, taxonomy);
      const tag = await term.instantiate();
      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Vocabulary");
    });

    it("should make tag using timestamp", async function () {
      const taxonomyJson = {
        attributes: { name: "TestTaxonomy" },
        pointers: { base: "@meta:Taxonomy" },
        children: [
          {
            pointers: { base: "@meta:Vocabulary" },
            children: [
              {
                pointers: { base: "@meta:SystemTerm" },
              },
            ],
          },
        ],
      };
      const taxonomy = await importTaxonomy(taxonomyJson);
    });

    it("should make tag using content type", function () {
    });

    it("should make tag using files", function () {
    });

    it("should make tag using project", function () {
    });
  });

  async function importTaxonomy(taxonomyJson) {
    const root = await Utils.getNewRootNode(project, commitHash, core);
    const importer = new Importer(core, root);
    const fco = (await core.loadChildren(root)).find((node) =>
      core.getPath(node) === "/1"
    );
    // FIXME: there seems to be a bug with the base for the top-level node
    const containedJson = { children: [taxonomyJson] };
    const node = await importer.import(root, containedJson);
    return (await core.loadChildren(node)).pop();
  }
});
