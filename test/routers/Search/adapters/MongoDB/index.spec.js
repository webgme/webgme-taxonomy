describe("MongoDB", function () {
  const MongoDB = require(
    "../../../../../build/routers/Search/adapters/MongoDB",
  );
  const { range, Pattern, sleep } = require(
    "../../../../../build/routers/Search/Utils",
  );
  const assert = require("assert");
  const gmeConfig = require("../../../../../config");
  const { MongoClient } = require("mongodb");
  const defaultMongoUri = gmeConfig.mongo.uri;
  const collection = "__testCollection";
  const hostUri = MongoDB.getHostUri(
    "mongodb://127.0.0.1:27017/",
    collection,
  );

  describe("disableArtifact", function () {
    let storage, repoId, contentId;

    beforeEach(async () => {
      const api = new InMemoryPdp();
      api.dropData();
      const processType = "disableArtifactTest";
      const hostUri = new HostUri("memory", processType);
      storage = new PDP(
        api,
        hostUri,
        "observerId",
        "readToken",
      );
      // Create the test fixtures
      repoId = await storage.api.createProcessHelper(
        "observerId",
        processType,
        { displayName: "someRepo" },
      );
      const metadata = {
        displayName: `content_item`,
      };
      const result = await storage.withContentReservation(
        (res) => storage.appendArtifact(res, metadata, []),
        repoId,
      );
      contentId = result.id;

      // disable the content
      await storage.disableArtifact(repoId, contentId);
    });

    it("should ignore disabled content while listing", async function () {
      const artifacts = await storage.listArtifacts(repoId);

      console.log({artifacts})
      assert.equal(artifacts.length, 0);

      // Check that the artifact is marked as deleted...
      assert(artifacts[0].disabled);
    });

    it("should not allow downloading disabled content", async function () {
      await assert.rejects(
        storage.downloadFileURLs(repoId, [contentId]),
        /Content has been deleted/,
      );
    });
  });

  describe("updateArtifact", function () {
    it('should update the given artifact', function() {
      throw new Error('todo!');
    })
  });

  describe("getUriPatterns", function () {
    const Ajv = require("ajv");
    const ajv = new Ajv();
    const patterns = MongoDB.getUriPatterns();
    const urlSchema = {
      type: "string",
      pattern: Pattern.exact(Pattern.anyIn(...patterns)),
    };
    const validate = ajv.compile(urlSchema);

    let client, mongo;
    before(() => {
      client = new MongoClient(defaultMongoUri);
      mongo = new MongoDB(client, collection, hostUri);
    });
    after(() => client.close());

    it("should match against repos", async function () {
      await Promise.all(
        range(0, 100).map((_) =>
          mongo.withRepoReservation((res) =>
            assert(validate(res.uri), "Found failing URI: " + res.uri)
          )
        ),
      );
    });

    it("should match against content URIs", async function () {
      const repoId = await mongo.withRepoReservation(async (res) => {
        const metadata = {
          displayName: "hello",
          taxonomyTags: [],
          taxonomyVersion: {
            id: "guest+TaxonomyProject",
            tag: "v1.0.0",
            commit: "abadae3",
          },
          time: new Date().toString(),
        };
        await mongo.createArtifact(res, metadata);
        return res.repoId;
      });
      await Promise.all(
        range(0, 10).map((_) =>
          mongo.withContentReservation(
            (res) => assert(validate(res.uri), "Found failing URI: " + res.uri),
            repoId,
          )
        ),
      );
    });
  });

  describe("concurrent uploads", function () {
    let client, mongo;
    before(() => {
      client = new MongoClient(defaultMongoUri);
      mongo = new MongoDB(client, collection, hostUri);
    });
    after(() => client.close());

    it("should queue concurrent upload requests", async function () {
      const repoId = await mongo.withRepoReservation(async (res) => {
        const metadata = {
          displayName: "hello",
          taxonomyTags: [],
          taxonomyVersion: {
            id: "guest+TaxonomyProject",
            tag: "v1.0.0",
            commit: "abadae3",
          },
          time: new Date().toString(),
        };
        await mongo.createArtifact(res, metadata);
        return res.repoId;
      });
      const taxonomyVersion = {
        id: "someProjectId",
        commit: "someCommit",
      };

      const [metadata1, metadata2] = ["first", "second"]
        .map((displayName) => ({
          displayName,
          tags: {},
          taxonomyVersion,
          time: new Date().toString(),
        }));

      const firstUpload = mongo.withContentReservation(
        async (res) => {
          await sleep(75);
          return await mongo.appendArtifact(res, metadata1, []);
        },
        repoId,
      );

      const secondUpload = mongo.withContentReservation(
        async (res) => await mongo.appendArtifact(res, metadata2, []),
        repoId,
      );

      const [result1, result2] = await Promise.all([firstUpload, secondUpload]);
      assert.equal(
        result1.index + 1,
        result2.index,
        `Second upload index should be ${
          result1.index + 1
        } (found ${result2.index})`,
      );
    });
  });
});
