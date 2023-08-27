describe("SystemTerm", function () {
  this.timeout(5000);
  const testFixture = require("../../globals");
  const Utils = require("../../Utils");
  const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
  const assert = require("assert");
  const { default: SystemTerm } = require(
    "../../../src/routers/Search/build/SystemTerm",
  );
  const { default: UploadContext } = require(
    "../../../src/routers/Search/build/UploadContext",
  );
  let project, gmeAuth, storage, commitHash, core, projectVersion;

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
    projectVersion = {
      id: project.projectId,
      commit: commitHash,
    };
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
      const uri = "mongoDoc://someMongoURI/collection/";
      context = await UploadContext.from({
        name: "TestUploadName",
        description: "someDesc",
        tags: [],
        files: [{ path: "path/to/someFile" }],
        core,
        contentType,
        project: projectVersion,
        userId: "someUserID",
        uri,
      });
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

    it("should make tag using upload location's URI", async function () {
      const term = systemTerms.find((term) => term.name === "URI");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Base");
      assert(!!tag.Base.URI.value);
      assert(tag.Base.URI.value.startsWith("mongoDoc://"));
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

    it("should make tag using uploader's user ID", async function () {
      const term = systemTerms.find((term) => term.name === "uploadedBy");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Base");
      assert.equal(tag.Base.uploadedBy.user, "someUserID");
    });

    it("should make tag using timestamp (w/ timezone)", async function () {
      const term = systemTerms
        .find((term) => term.name === "uploadedAt");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Base");
      assert(!!tag.Base.uploadedAt.time);

      // Check for the timezone
      const timezone = /.*GMT[+-]\d{4}/;
      assert(timezone.test(tag.Base.uploadedAt.time));
    });

    it("should make tag using content type", async function () {
      const term = systemTerms.find((term) => term.name === "content");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Base");
      assert.equal(tag.Base.content.type.name, "ExampleContentType");
    });

    it("should make tag with enum field", async function () {
      const term = systemTerms.find((term) => term.name === "EnumTest");
      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "SystemTerms");
      assert.equal(
        tag.SystemTerms.EnumTest.enumField.enumOption.value,
        "TestUploadName",
      );
    });

    it("should make tag with set field", async function () {
      const term = systemTerms.find((term) => term.name === "attachments");

      const tags = await term.createTags(context);
      assert.equal(tags.length, 1);
      const [tag] = tags;

      const vocabName = Object.keys(tag).shift();
      assert.equal(vocabName, "Base");

      const members = tag.Base.attachments.files;
      assert(Array.isArray(members));
      assert.equal(members.length, 1);

      const member = members.pop();
      assert.equal(Object.keys(member).length, 1);
      assert.equal(Object.keys(member.File).length, 1);
      assert.equal(member.File.path, "path/to/someFile");
    });

    it("should make tag with compound field", async function () {
      const term = systemTerms.find((term) => term.name === "CompoundTest");

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

  describe("UploadContext (compat)", function () {
    let root, systemTerms;
    const uri = "mongoDoc://someMongoURI/collection/";

    it("should not fail if missing library", async function () {
      root = await Utils.getNewRootNode(project, commitHash, core);
      const taxonomy = await getNodeByName(root, "UploadNameTaxonomy");
      contentType = await getNodeByName(root, "ExampleContentType");
      systemTerms = await SystemTerm.findAll(core, taxonomy);
      const metaNode = Object.values(core.getAllMetaNodes(root))
        .find((node) => core.getAttribute(node, "name") === "UploadContext");
      core.removeLibrary(metaNode, "taxonomy");

      // create the upload context
      context = await UploadContext.from({
        name: "TestUploadName",
        description: "someDesc",
        tags: [],
        files: [{ path: "path/to/someFile" }],
        core,
        contentType,
        project: projectVersion,
        userId: "someUserID",
        uri,
      });

      const term = systemTerms.find((term) => term.name === "name");
      const tags = await term.createTags(context);
      assert.equal(tags.length, 0);
    });

    describe("meta nodes", function () {
      let gmeAuth, storage, project, commitHash, core, projectVersion;
      before(async () => {
        const params = await Utils.initializeProject(
          "SystemTermTest2",
          "taxonomy",
        );
        gmeAuth = params.gmeAuth;
        storage = params.storage;
        commitHash = params.commitHash;
        core = params.core;
        project = params.project;
        projectVersion = {
          id: project.projectId,
          commit: commitHash,
        };

        // Create the necessary nodes in the project
      });

      after(async function () {
        await storage.closeDatabase();
        await gmeAuth.unload();
      });

      describe("missing System", function () {
        let metanodes, systemTerms, contentType, context;
        before(async () => {
          const root = await Utils.getNewRootNode(project, commitHash, core);
          // Create an empty taxonomy
          metanodes = Object.values(core.getAllMetaNodes(root));
          const taxonomyDef = metanodes.find((n) =>
            core.getAttribute(n, "name") === "Taxonomy"
          );
          const contentTypeDef = metanodes.find((n) =>
            core.getAttribute(n, "name") === "Taxonomy"
          );
          const taxonomy = core.createNode({
            parent: root,
            base: taxonomyDef,
          });
          contentType = core.createNode({
            parent: root,
            base: contentTypeDef,
          });
          const systemDef = metanodes.find((node) =>
            core.getAttribute(node, "name") === "System"
          );
          core.deleteNode(systemDef);

          context = await UploadContext.from({
            name: "TestUploadName",
            description: "someDesc",
            tags: [],
            files: [{ path: "path/to/someFile" }],
            core,
            contentType,
            project: projectVersion,
            userId: "someUserID",
            uri,
          });

          systemTerms = await SystemTerm.findAll(core, taxonomy);
        });

        it("should make name tag", async function () {
          const term = systemTerms.find((term) => term.name === "name");
          const tags = await term.createTags(context);
          assert.equal(tags.length, 1);
        });

        // We don't need to worry about terms that depend on it, like uploadedAt,
        // bc they won't be present in the project if the dependent definition, aka
        // System, isn't present. We don't test this bc deleting System results in
        // a broken transformation.
        it("should throw error on broken transformations", async function () {
          // Deleting the definition will break the transformation for the uploadedAt
          // term
          const term = systemTerms.find((term) => term.name === "uploadedAt");
          await assert.rejects(term.createTags(context));
        });
      });
    });
  });
});
