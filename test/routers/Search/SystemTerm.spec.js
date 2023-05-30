describe("SystemTerm", function () {
  this.timeout(5000);
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

  describe("createTags", function () {
    let systemTerms;
    let contentType;
    let context;

    before(async () => {
      const root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      contentType = await getNodeByName(root, "ExampleContentType");
      systemTerms = await SystemTerm.findAll(core, taxonomy);

      // create the upload context
      context = UploadContext.builder()
        .withContent("TestUploadName", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();
    });

    it("should make empty tag if no transformation", async function () {
      const term = systemTerms.find((term) => term.name === "NoTransform");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "SystemTerms");
      assert(tag.SystemTerms.NoTransform);
      assert.equal(Object.keys(tag.SystemTerms.NoTransform), 0);
    });

    it("should make tag using upload's name", async function () {
      const term = systemTerms.find((term) => term.name === "name");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Base");
      assert.equal(tag.Base.name.value, "TestUploadName");
    });

    it("should make tag using upload's description", async function () {
      const term = systemTerms.find((term) => term.name === "description");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Base");
      assert.equal(tag.Base.description.value, "someDesc");
    });

    it("should make tag using timestamp", async function () {
      const term = systemTerms
        .find((term) => term.name === "UploadTime");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "SystemTerms");
      assert(!!tag.SystemTerms.UploadTime.timestamp);
    });

    it("should make tag using content type", async function () {
      const term = systemTerms.find((term) => term.name === "content");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Base");
      console.log(JSON.stringify(tag));
      assert.equal(tag.Base.content.type.name, "ExampleContentType");
    });

    it("should make tag with enum field", async function () {
      const term = systemTerms.find((term) => term.name === "EnumTest");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestEnum", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.createTags(context);
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
      const term = systemTerms.find((term) => term.name === "SetTest");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestSet", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.createTags(context);
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
      const term = systemTerms.find((term) => term.name === "CompoundTest");

      // create the upload context
      const context = UploadContext.builder()
        .withContent("TestCompound", "someDesc", [], [])
        .withContentType(core, contentType)
        .withProject(project.projectId, commitHash)
        .build();

      const tags = await term.createTags(context);
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
