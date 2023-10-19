describe("PDP", function () {
  const PDP =
    require("../../../../../src/routers/Search/build/adapters/PDP").default;
  const { InMemoryPdp } = require(
    "../../../../../src/routers/Search/build/adapters/PDP/api",
  );
  const { sleep, Pattern } = require(
    "../../../../../src/routers/Search/build/Utils",
  );
  const assert = require("assert");
  const processType = "someProcessType";

  describe("getOriginalFilePath", function () {
    it("should strip prefix from filenames", function () {
      const original = "a/b/cat.txt";
      const filename = "dat/0/100/" + original;
      assert.equal(PDP.getOriginalFilePath(filename), original);
    });
  });

  describe("appendArtifact", function () {
    beforeEach(() => {
      const api = new InMemoryPdp();
      api.dropData();
      const hostUri = PDP.getHostUri("memory", processType);
      storage = new PDP(
        api,
        processType,
        hostUri,
        "observerId",
        "readToken",
      );
    });

    it("should preserve upload file names", async function () {
      const metadata = {};
      const filenames = ["a.txt", "b.csv"];

      // append the artifact and check the result
      const repoId = await storage.api.createProcessHelper(
        "observerId",
        processType,
        metadata,
      );
      const result = await storage.withContentReservation(
        async (res) => await storage.appendArtifact(res, metadata, filenames),
        repoId,
      );
      const missingFile = filenames.find((name) =>
        !result.files.find((file) => file.name === name)
      );
      assert(!missingFile);
    });
  });

  describe("readToken", function () {
    let storage;

    beforeEach(() => {
      const api = new InMemoryPdp();
      api.dropData();
      const processType = "someProcessType";
      const hostUri = PDP.getHostUri("memory", processType);
      storage = new PDP(
        api,
        processType,
        hostUri,
        "observerId",
        "readToken",
      );
    });

    it("should use read token on listRepos", async function () {
      let called = 0;
      const listProcesses = storage.api.listProcesses.bind(storage.api);
      storage.api.listProcesses = function (opts) {
        called++;
        assert.equal(opts?.token, "readToken");
        return listProcesses(...arguments);
      };
      await storage.listRepos();
      assert.equal(called, 1);
    });

    it("should use read token on listArtifacts", async function () {
      // Create the test fixtures
      const repoId = await storage.api.createProcessHelper(
        "observerId",
        processType,
        { displayName: "someRepo" },
      );
      const contentMetadata = [...new Array(10)].map((i) => ({
        displayName: `content_${i}`,
      }));
      await Promise.all(
        contentMetadata.map((metadata) =>
          storage.withContentReservation(
            (res) => storage.appendArtifact(res, metadata, []),
            repoId,
          )
        ),
      );

      // Try to list them
      const getObservations = storage.api.getObservations.bind(storage.api);
      storage.api.getObservations = function (_id, _index, _version, opts) {
        assert.equal(opts?.token, "readToken");
        return getObservations(...arguments);
      };
      const contents = await storage.listArtifacts(repoId);
      assert.equal(contents.length, 10);
    });

    it("should use user token on content upload", async function () {
      // Setup mocks
      let called = 0;
      const appendObservation = storage.api.appendObservation.bind(storage.api);
      storage.api.appendObservation = function (_id, _index, _limit, opts) {
        assert(!opts?.token); // don't use any special token
        called++;
        return appendObservation(...arguments);
      };

      // Add fixtures
      const repoId = await storage.api.createProcessHelper(
        "observerId",
        processType,
        { displayName: "someRepo" },
      );

      // Run test
      const metadata = {
        displayName: "example repo",
        taxonomyTags: [],
        taxonomyVersion: { commit: "commithash", tag: "v1.0.2" },
        time: new Date().toString(),
      };
      await storage.withContentReservation(
        (res) => storage.appendArtifact(res, metadata, []),
        repoId,
      );
      assert.equal(called, 1);
    });

    // The following are trickier to mock and are likely to change
    it.skip("should use user token on download", function () {
    });
  });

  describe("getHostUri", function () {
    it("should replace trailing /", function () {
      const uri = PDP.getHostUri("https://127.0.0.1:80/", "someProcess");
      assert.equal(uri, "pdp://127.0.0.1:80/someProcess");
    });

    it("should strip https://", function () {
      const uri = PDP.getHostUri("https://127.0.0.1:80/", "someProcess");
      assert.equal(uri, "pdp://127.0.0.1:80/someProcess");
    });

    it("should throw an error if http", function () {
      assert.throws(() =>
        PDP.getHostUri("http://127.0.0.1:80/", "someProcess")
      );
    });
  });

  describe("getUriPatterns", function () {
    const Ajv = require("ajv");
    const ajv = new Ajv();
    const patterns = PDP.getUriPatterns();
    const urlSchema = {
      type: "string",
      pattern: Pattern.exact(Pattern.anyIn(...patterns)),
    };
    const validate = ajv.compile(urlSchema);

    it("should fail if deprecated format", function () {
      const idString = "e0de6a4a-5257-4f2c-b3ce-470e3299fc4a_9_0";
      assert(!validate(idString));
    });

    it("should fail if missing version in deprecated format", function () {
      const idString = "e0de6a4a-5257-4f2c-b3ce-470e3299fc4a_9";
      assert(!validate(idString));
    });

    it("should allow content uri", function () {
      const idString =
        "pdp://127.0.0.1:435/someType/e0de6a4a-5257-4f2c-b3ce-470e3299fc4a/9/0";
      assert(validate(idString));
    });

    it("should allow (tmp) new process ID", function () {
      const idString = "pdp://127.0.0.1:435/someType/PROCESS_ID/9/0";
      assert(validate(idString));
    });

    it("should allow repo/process version", function () {
      const idString =
        "pdp://127.0.0.1:435/processType/e0de6a4a-5257-4f2c-b3ce-470e3299fc4a";
      assert(validate(idString));
    });
  });

  describe("concurrent uploads", function () {
    let pdp;
    before(() => {
      const processType = "testProcessType";
      const hostUri = PDP.getHostUri("memory", processType);
      const api = new InMemoryPdp();
      pdp = new PDP(api, processType, hostUri, "someUser", "unusedToken");
    });

    it("should queue concurrent upload requests", async function () {
      const repoId = await pdp.withRepoReservation(async (res) => {
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
        await pdp.createArtifact(res, metadata);
        // Look up the repoId. Since process creation is disabled, we can't
        // actually get the process ID
        return pdp.api.data.processes[0].metadata.processId;
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

      const firstUpload = await pdp.withContentReservation(
        async (res) => {
          await sleep(75);
          return await pdp.appendArtifact(res, metadata1, []);
        },
        repoId,
      );

      const secondUpload = pdp.withContentReservation(
        async (res) => await pdp.appendArtifact(res, metadata2, []),
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
