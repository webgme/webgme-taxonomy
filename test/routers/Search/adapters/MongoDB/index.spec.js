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

  function makeMetadata(md) {
    const defaultMetadata = {
      displayName: "metadata",
      tags: {},
      taxonomyVersion: {
        id: "guest+TaxonomyProject",
        tag: "v1.0.0",
        commit: "abadae3",
      },
      time: new Date().toString(),
    };
    return Object.assign({}, defaultMetadata, md);
  }

  describe("disableArtifact", function () {
    let storage, repoId, contentId;

    beforeEach(async () => {
      const collection = '__testDisableArtifact';
      const hostUri = MongoDB.getHostUri(
        "mongodb://127.0.0.1:27017/",
        collection,
      );

      client = new MongoClient(defaultMongoUri);
      const db = client.db(collection);
      for (let m in db) {
        console.log(m);
      }
      await db.dropDatabase();

      storage = new MongoDB(client, collection, hostUri);

      // Create the test fixtures
      const metadata = makeMetadata({
        displayName: `content_item`,
      });
      repoId = await storage.withRepoReservation(
        async res => {
          await storage.createArtifact(res, makeMetadata({displayName: 'repo'}));
          console.log({res})
          return res.repoId;
        },
      );

      const result = await storage.withContentReservation(
        (res) => storage.appendArtifact(res, metadata, []),
        repoId,
      );
      contentId = result.id;

      // disable the content
      await storage.disableArtifact(repoId, contentId);
    });

    afterEach(async () => client.close());

    it("should ignore disabled content while listing", async function () {
      const artifacts = await storage.listArtifacts(repoId);
      assert.equal(artifacts.length, 0);
    });

    it("should not allow downloading disabled content", async function () {
      await assert.rejects(
        storage.getFileStreams(repoId, contentId),
        /Content has been deleted/,
      );
    });
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
      const [i1, i2] = [result1, result2].map((res) => +res.id.split("_"));
      assert.equal(
        i1 + 1,
        i2,
        `Second upload index should be ${i1 + 1} (found ${i2})`,
      );
    });
  });
});
