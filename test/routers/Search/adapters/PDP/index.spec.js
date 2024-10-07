describe("PDP", function () {
  const { default: PDP, HostUri } = require(
    "../../../../../build/routers/Search/adapters/PDP",
  );
  const { InMemoryPdp } = require(
    "../../../../../build/routers/Search/adapters/PDP/api",
  );
  const { sleep, Pattern } = require(
    "../../../../../build/routers/Search/Utils",
  );
  const assert = require("assert");
  const processType = "someProcessType";

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

  describe("updateArtifact", function () {
    let storage, repoId, contentId, updatedId, updatedFiles;

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
      const metadata = makeMetadata({
        displayName: `content_item`,
      });
      const filenames = ["a.txt", "b.txt"];
      const result = await storage.withContentReservation(
        // TODO: should we guarantee the reservation was only used once?
        (res) => storage.appendArtifact(res, metadata, filenames),
        repoId,
      );
      contentId = result.getContentId();

      // update the content
      const updatedMetadata = makeMetadata({
        displayName: `content_item`,
      });
      updatedFiles = filenames.map((n) => `updated_${n}`);
      const updateResult = await storage.withUpdateReservation(
        (res) => storage.updateArtifact(res, updatedMetadata, updatedFiles),
        repoId,
        contentId,
      );
      updatedId = updateResult.contentId;
    });

    it("should return latest when listing", async function () {
      const artifacts = await storage.listArtifacts(repoId);
      assert.equal(artifacts.length, 1);

      // Check that the artifact is the updated one
      assert.equal(artifacts[0].id, updatedId);
    });

    it("should update files", async function () {
      const [data] = await storage.downloadFileURLs(repoId, [updatedId]);
      assert.equal(data.files.length, 2);
      data.files.forEach((file, i) =>
        assert(file.name.endsWith(updatedFiles[i]))
      );
    });
  });

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
      const metadata = makeMetadata({
        displayName: `content_item`,
      });
      const result = await storage.withContentReservation(
        (res) => storage.appendArtifact(res, metadata, []),
        repoId,
      );
      contentId = result.getContentId();

      // disable the content
      await storage.disableArtifact(repoId, contentId);
    });

    it("should ignore disabled content while listing", async function () {
      const artifacts = await storage.listArtifacts(repoId);
      assert.equal(artifacts.length, 0);
    });

    it.skip("should not allow downloading disabled content", async function () {
      await assert.rejects(
        storage.downloadFileURLs(repoId, [contentId]),
        /Content has been deleted/,
      );
    });
  });

  describe("getOriginalFilePath", function () {
    it("should strip prefix from filenames", function () {
      const original = "a/b/cat.txt";
      const filename = "dat/0/100/" + original;
      assert.equal(PDP.getOriginalFilePath(filename), original);
    });
  });

  describe("HostUri.fromUri", function () {
    it("should extract the correct URL, processType", function () {
      const hostUri = HostUri.fromUri(
        "pdp://premonitiondev.azurewebsites.net/vutest/6e9da372-8cc7-4b11-bf85-23ed9d83a901/90/0",
      );
      assert.equal(hostUri.baseUrl, "https://premonitiondev.azurewebsites.net");
      assert.equal(hostUri.processType, "vutest");
    });
  });

  describe("appendArtifact", function () {
    beforeEach(() => {
      const api = new InMemoryPdp();
      api.dropData();
      const hostUri = new HostUri("memory", processType);
      storage = new PDP(
        api,
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
      const hostUri = new HostUri("memory", processType);
      storage = new PDP(
        api,
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

    it.skip("should use read token on listArtifacts", async function () {
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

  describe("HostUri", function () {
    it("should replace trailing /", function () {
      const uri = new HostUri("https://127.0.0.1:80/", "someProcess");
      assert.equal(uri, "pdp://127.0.0.1:80/someProcess");
    });

    it("should strip https://", function () {
      const uri = new HostUri("https://127.0.0.1:80/", "someProcess");
      assert.equal(uri, "pdp://127.0.0.1:80/someProcess");
    });

    it("should throw an error if http", function () {
      assert.throws(() => new HostUri("http://127.0.0.1:80/", "someProcess"));
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

    it("should allow process types with _'s'", function () {
      const idString = "pdp://127.0.0.1:435/some_type/PROCESS_ID/9/0";
      assert(validate(idString));
    });

    it("should allow process types with numbers", function () {
      const idString =
        "pdp://leappremonitiondev.azurewebsites.net/sandbox_eegv1/51336660-a9c2-4a28-84e4-f6c3bdcc7e4e/1/0";
      assert(validate(idString));
    });

    it("should allow repo/process version", function () {
      const idString =
        "pdp://127.0.0.1:435/processType/e0de6a4a-5257-4f2c-b3ce-470e3299fc4a";
      assert(validate(idString));
    });
  });

  describe("resolveUri", function () {
    const storageHostUri =
      "pdp://leappremonitiondev.azurewebsites.net/PROD_MODEL_ML";
    const repoId = "a8409436-2040-46c7-9310-ea23f7d29c25";
    const repoUri = storageHostUri + "/" + repoId;
    const contentUri = repoUri + "/1/0";

    it("should resolve storageHostUri", function () {
      const [host, repo, content] = PDP.resolveUri(storageHostUri);
      assert.equal(host, storageHostUri);
      assert.equal(repo, "");
      assert.equal(content, "");
    });

    it("should resolve repoUri", function () {
      const [host, repo, content] = PDP.resolveUri(repoUri);
      assert.equal(host, storageHostUri);
      assert.equal(repo, repoId);
      assert.equal(content, "");
    });

    it("should resolve storageHostUri", function () {
      const [host, repo, content] = PDP.resolveUri(contentUri);
      assert.equal(host, storageHostUri);
      assert.equal(repo, repoId);
      assert.equal(content, "1_0");
    });

    it("should throw if no uri", function () {
      let didThrow = false;
      try {
        PDP.resolveUri("pdp://leappremonitiondev.azurewebsites.net");
      } catch {
        didThrow = true;
      }

      assert(didThrow, "Should have thrown");
    });
  });

  describe("concurrent uploads", function () {
    let pdp;
    before(() => {
      const processType = "testProcessType";
      const hostUri = new HostUri("memory", processType);
      const api = new InMemoryPdp();
      pdp = new PDP(api, hostUri, "someUser", "unusedToken");
    });

    it("should queue concurrent upload requests", async function () {
      const repoId = await pdp.withRepoReservation(async (res) => {
        const metadata = makeMetadata({
          displayName: "hello",
        });
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
        .map((displayName) => makeMetadata({ displayName }));

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
      const [i1, i2] = [result1, result2].map((res) => res.index);
      assert.equal(
        i1 + 1,
        i2,
        `Second upload index should be ${i1 + 1} (found ${i2})`,
      );
    });
  });

  describe("deletion", function () {
    let pdp;
    before(() => {
      const processType = "testProcessType";
      const hostUri = new HostUri("memory", processType);
      const api = new InMemoryPdp();
      pdp = new PDP(api, hostUri, "someUser", "unusedToken");
    });

    it("should be able to ", function () {
      // TODO
    });
  });
});
