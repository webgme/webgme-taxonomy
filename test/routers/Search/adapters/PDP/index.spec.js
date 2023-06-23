describe("PDP", function () {
  const PDP =
    require("../../../../../src/routers/Search/build/adapters/PDP").default;
  const assert = require("assert");
  const sinon = require("sinon");

  describe("appendArtifact", function () {
    // TODO: should we make these work for all of them?
    it.only("should preserve upload file names", async function () {
      console.log(PDP);
      const repoId = "someRepo";
      const metadata = null; // only used by the mocked method
      const filenames = ["a.txt", "b.csv"];
      const storage = new PDP("http://someUrl", "someToken", "someProcess");
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

      const result = await storage.appendArtifact(repoId, metadata, filenames);
      console.log(result.files);
      const missingFile = filenames.find((name) =>
        !result.files.find((file) => file.name === name)
      );
      console.log({ missingFile });
      assert(!missingFile);
    });
  });
});
