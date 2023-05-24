describe("SystemTerm", function () {
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
    it("should make empty tag if no transformation", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      const contentType = await getNodeByName(root, "ExampleContentType");
      const term = (await SystemTerm.findAll(core, taxonomy))
        .find((term) => term.name === "NoTransform");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestUploadName", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.instantiate(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "SystemTerms");
      assert(tag.SystemTerms.NoTransform);
      assert.equal(Object.keys(tag.SystemTerms.NoTransform), 0);
    });

    it("should make tag using upload's name", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      const contentType = await getNodeByName(root, "ExampleContentType");
      const term = (await SystemTerm.findAll(core, taxonomy))
        .find((term) => term.name === "name");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestUploadName", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.instantiate(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Base");
      assert.equal(tag.Base.name.value, "TestUploadName");
    });

    it("should make tag using timestamp", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      const contentType = await getNodeByName(root, "ExampleContentType");
      const term = (await SystemTerm.findAll(core, taxonomy))
        .find((term) => term.name === "UploadTime");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestUploadName", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.instantiate(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "SystemTerms");
      assert(!!tag.SystemTerms.UploadTime.timestamp);
    });

    it("should make tag using content type", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      const contentType = await getNodeByName(root, "ExampleContentType");
      const term = (await SystemTerm.findAll(core, taxonomy))
        .find((term) => term.name === "ContentTypeName");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestUploadContentType", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.instantiate(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "SystemTerms");
      assert.equal(tag.SystemTerms.ContentTypeName.type, "ExampleContentType");
    });

    it("should make tag with enum field", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      const contentType = await getNodeByName(root, "ExampleContentType");
      const term = (await SystemTerm.findAll(core, taxonomy))
        .find((term) => term.name === "EnumTest");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestEnum", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.instantiate(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "SystemTerms");
      assert.equal(
        tag.SystemTerms.EnumTest.enumField.enumOption.value,
        "TestEnum",
      );
    });

    it("should make tag with set field", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      const contentType = await getNodeByName(root, "ExampleContentType");
      const term = (await SystemTerm.findAll(core, taxonomy))
        .find((term) => term.name === "SetTest");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestSet", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.instantiate(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "SystemTerms");

      const members = tag.SystemTerms.SetTest.TestSet;
      assert(Array.isArray(members));
      assert(members.find((member) => Object.keys(member).shift() === "name"));
      assert(
        members.find((member) => Object.keys(member).shift() === "isoDateTime"),
      );
    });

    it("should make tag with compound field", async function () {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      const contentType = await getNodeByName(root, "ExampleContentType");
      const term = (await SystemTerm.findAll(core, taxonomy))
        .find((term) => term.name === "CompoundTest");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestCompound", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.instantiate(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const tagData = tag.SystemTerms.CompoundTest.project;
      assert(tagData, "No tag data found.");
      assert(tagData.name, 'Missing "name" field.');
      assert(tagData.ID, 'Missing "ID" field.');
      assert(tagData.owner, 'Missing "owner" field.');
      assert(tagData.commit, 'Missing "commit" field.');
    });

    it.skip("should make tag using files", function () {
    });

    it.skip("should make tag using project", function () {
    });
  });
});
