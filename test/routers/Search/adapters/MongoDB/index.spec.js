describe("MongoDB", function () {
  const MongoDB =
    require("../../../../../src/routers/Search/build/adapters/MongoDB").default;
  const { range, Pattern } = require(
    "../../../../../src/routers/Search/build/Utils",
  );
  const assert = require("assert");
  const gmeConfig = require("../../../../../config");
  const { MongoClient } = require("mongodb");
  const defaultMongoUri = gmeConfig.mongo.uri;

  describe("getUriPatterns", function () {
    const Ajv = require("ajv");
    const ajv = new Ajv();
    const patterns = MongoDB.getUriPatterns();
    const urlSchema = {
      type: "string",
      pattern: Pattern.exact(Pattern.anyIn(...patterns)),
    };
    const validate = ajv.compile(urlSchema);

    const collection = "__testCollection";
    const hostUri = MongoDB.getHostUri(
      "mongodb://127.0.0.1:27017/",
      collection,
    );

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
});
