describe("MongoDB", function () {
  const MongoDB =
    require("../../../../../src/routers/Search/build/adapters/MongoDB").default;
  const assert = require("assert");
  const gmeConfig = require("../../../../../config");
  const defaultMongoUri = gmeConfig.mongo.uri;
  const client = new MongoClient(defaultMongoUri);

  describe("getUriPatterns", function () {
    const patterns = MongoDB.getUriPatterns();
    const uriRegex = new RegExp(`\\(${patterns.join("|")}\\)`);
    const collection = "__testCollection";
    const hostUri = MongoDB.getHostUri(
      "mongodb://127.0.0.1:27017/",
      collection,
    );
    let mongo;
    before(() => mongo = new MongoDB(client, collection, hostUri));

    it.only("should match against repos", async function () {
      await Promise.all(
        range(0, 100).map((_) =>
          mongo.withRepoReservation((res) => assert(uriRegex.test(res.uri)))
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
      });
      await Promise.all(
        range(0, 10).map((_) =>
          mongo.withContentReservation(
            (res) => assert(uriRegex.test(res.uri)),
            repoId,
          )
        ),
      );
    });
  });
});
