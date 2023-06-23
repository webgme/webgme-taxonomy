describe("PDP", function () {
  const PDP =
    require("../../../../../src/routers/Search/build/adapters/PDP").default;
  const assert = require("assert");
  const sinon = require("sinon");

  describe("appendArtifact", function () {
    it("should preserve upload file names", async function () {
      const repoId = "someRepo";
      const metadata = null; // only used by the mocked method
      const filenames = ["a.txt", "b.csv"];
      const storage = new PDP("http://someUrl", "someToken", "someProcess");

      // Add mocks to make the request succeed
      storage._getObserverId = sinon.fake.returns("observer");
      storage._getProcessState = sinon.fake.resolves(
        { numObservations: 1 },
      );

      storage._appendObservation = async (_processId, obs) => {
        obs.uploadDataFiles = {
          files: obs.dataFiles.map((name) => ({
            name,
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
});
