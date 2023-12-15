describe("JSONSchemaExporter", function () {
  const testFixture = require("../globals");
  const JSONSchemaExporter =
    require("../../build/common/JSONSchemaExporter").default;
  const Ajv = require("ajv");
  const ajv = new Ajv();
  const assert = require("assert");
  const Utils = require("../Utils");
  let project, gmeAuth, storage, commitHash, core;

  before(async function () {
    this.timeout(7500);
    const params = await Utils.initializeProject(
      "JSONSchemaExporter",
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

  describe("enum", function () {
    it("should validate basic enum", async function () {
      const tags = { Subject: { Sex: { value: { Male: {} } } } };
      const errors = await getErrors(tags);
      assert(!errors);
    });
  });

  async function getErrors(tags, onlyReleased = true) {
    const root = await Utils.getNewRootNode(project, commitHash, core);
    const exporter = JSONSchemaExporter.from(core, root);
    const taxonomy = (await core.loadChildren(root))
      .find((n) => {
        const metaType = core.getMetaType(n);
        return metaType && core.getAttribute(metaType, "name") === "Taxonomy";
      });

    const name = core.getAttribute(taxonomy, "name");
    const vocabs = await Promise.all(
      Object.keys(tags).map(async (vocabName) => {
        const allVocabs = await core.loadChildren(taxonomy);
        return allVocabs.find((v) =>
          core.getAttribute(v, "name") === vocabName
        );
      }),
    );
    const { schema } = await exporter.getVocabSchemas(
      vocabs,
      name,
      onlyReleased,
    );

    const validate = ajv.compile(schema);
    validate(tags);
    return validate.errors;
  }
});
