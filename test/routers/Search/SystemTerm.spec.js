describe.only("SystemTerm", function () {
  const testFixture = require("../../globals");
  const Utils = require("../../Utils");
  const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
  const assert = require("assert");
  const { default: SystemTerm, UploadContext } = require(
    "../../../src/routers/Search/build/SystemTerm",
  );
  let project, gmeAuth, storage, commitHash, core;

  before(async function () {
    this.timeout(7500);
    const params = await Utils.initializeProject(
      "SystemTermTest",
      "test",
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

  async function getNodeByName(root, name) {
    return (await core.loadChildren(root))
      .find((node) => core.getAttribute(node, "name") === name);
  }

  describe("instantiate", function () {
    it.only("should make tag using upload's name", async function () {
      console.log({ SystemTerm });
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      const contentType = await getNodeByName(root, "ExampleContentType");
      console.log(
        (await core.loadChildren(root)).map((n) =>
          core.getAttribute(n, "name")
        ),
      );

      const [term] = await SystemTerm.findAll(core, taxonomy);

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestUploadName", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tag = await term.instantiate(context);
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
