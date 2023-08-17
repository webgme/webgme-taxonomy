describe("PDP", function () {
  const PDP =
    require("../../../../../src/routers/Search/build/adapters/PDP").default;
  const { range } = require(
    "../../../../../src/routers/Search/build/Utils",
  );
  const assert = require("assert");
  const sinon = require("sinon");

  describe("appendArtifact", function () {
    it("should preserve upload file names", async function () {
      const repoId = "someRepo";
      const metadata = null; // only used by the mocked method
      const filenames = ["a.txt", "b.csv"];
      const storage = new PDP("http://someUrl", "someProcess", "someToken");

      // Add mocks to make the request succeed
      storage._getObserverId = sinon.fake.returns("observer");
      storage._getProcessState = sinon.fake.resolves(
        { numObservations: 1 },
      );

      storage._appendObservation = async (_processId, obs) => {
        obs.uploadDataFiles = {
          files: obs.dataFiles.map((name) => ({
            name: `dat/${name}`, // PDP prepends "dat/" to the filenames
            sasUrl: `http://sasUrl/${name}`,
          })),
        };
        return obs;
      };

      // append the artifact and check the result
      const result = await storage.appendArtifact(repoId, metadata, filenames);
      const missingFile = filenames.find((name) =>
        !result.files.find((file) => file.name === name)
      );
      assert(!missingFile);
    });
  });

  describe("readToken", function () {
    let storage;
    beforeEach(() =>
      storage = new PDP(
        "http://someUrl",
        "someProcess",
        "userToken",
        "readToken",
      )
    );

    it("should use read token on listRepos", async function () {
      storage._getObserverId = sinon.fake.returns("observer");
      storage._fetchJson = (url, opts) => {
        const isReadToken = opts.headers.Authorization.includes("readToken");
        assert(isReadToken);

        if (url.includes("ListProcesses")) {
          const ids = [...new Array(10)].map((_, i) => `process_${i}`);
          return ids.map((processId) => ({
            processId,
            processType: storage.processType,
          }));
        } else if (url.includes("GetProcessState")) {
          return { numObservations: 1 };
        } else if (url.includes("GetObservation")) {
          const processId = url.split("processId=")[1].split("&").shift();
          const taxonomyVersion = {
            commit: "someCommit",
            tag: "v1.0.0",
          };
          const taxonomyTags = [];
          const displayName = `Artifact for ${processId}`;
          const data = { taxonomyTags, taxonomyVersion, displayName };

          return storage._createObservationData(
            processId,
            storage.processType,
            data,
          );
        } else {
          throw new Error(`Unknown request: ${url}`);
        }
      };
      const repos = await storage.listRepos();
      assert.equal(repos.length, 10);
    });

    it("should use read token on listArtifacts", async function () {
      storage._getObserverId = sinon.fake.returns("observer");
      storage.getObservations = (processId, start, limit, token) => {
        const isReadToken = token.includes("readToken");
        assert(isReadToken);
        const taxonomyVersion = {
          commit: "someCommit",
          tag: "v1.0.0",
        };
        const taxonomyTags = [];
        const displayName = `Artifact for ${processId}`;
        const data = { taxonomyTags, taxonomyVersion, displayName };

        return range(start, start + limit).map((index) =>
          storage._createObservationData(
            processId,
            storage.processType,
            data,
          )
        );
      };

      storage._fetchJson = (url, opts) => {
        const isReadToken = opts.headers.Authorization.includes("readToken");
        assert(isReadToken);

        if (url.includes("ListProcesses")) {
          const ids = [...new Array(10)].map((_, i) => `process_${i}`);
          return ids.map((processId) => ({
            processId,
            processType: storage.processType,
          }));
        } else if (url.includes("GetProcessState")) {
          return { numObservations: 11 };
        } else if (url.includes("GetObservation")) {
          const processId = url.split("processId=")[1].split("&").shift();
          const taxonomyVersion = {
            commit: "someCommit",
            tag: "v1.0.0",
          };
          const taxonomyTags = [];
          const displayName = `Artifact for ${processId}`;
          const data = { taxonomyTags, taxonomyVersion, displayName };

          return storage._createObservationData(
            processId,
            storage.processType,
            data,
          );
        } else {
          throw new Error(`Unknown request: ${url}`);
        }
      };
      const repos = await storage.listArtifacts("repoId");
      assert.equal(repos.length, 10);
    });

    it("should use user token on createArtifact", async function () {
      storage._fetchJson = (_url, opts) => {
        const isReadToken = opts.headers.Authorization.includes("readToken");
        assert(!isReadToken);
      };
      storage._getObserverId = sinon.fake.returns("observer");

      const metadata = {
        displayName: "example artifact",
        taxonomyTags: [],
        taxonomyVersion: { commit: "commithash", tag: "v1.0.2" },
        time: new Date().toString(),
      };
      await storage.createArtifact(metadata);
    });

    // The following are trickier to mock and are likely to change
    it.skip("should use user token on download", function () {
    });

    it("should use user token on appendArtifact", async function () {
      storage._fetchJson = async (_url, opts) => {
        const isReadToken = opts.headers.Authorization?.includes("readToken");
        assert(!isReadToken);
      };
      const processId = "processId";
      const obs = {};
      await storage._appendObservation(processId, obs);
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
});
