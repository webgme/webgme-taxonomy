describe("Helpers", function () {
  const { toArtifactMetadatav2 } = require(
    "../../../../../src/routers/Search/build/adapters/common/Helpers",
  );
  const assert = require("assert");

  describe("toArtifactMetadatav2", function () {
    const time = new Date().toString();
    const taxonomyVersion = {
      id: "taxID",
      commit: "abcdef",
    };

    it("should convert single tax tag correctly", function () {
      const metadata = {
        displayName: "Example",
        taxonomyVersion,
        time,
        taxonomyTags: [
          {
            Base: {
              name: {
                value: "Hi there!",
              },
            },
          },
        ],
      };
      const updated = toArtifactMetadatav2(metadata);

      assert(updated.tags);
      assert.deepEqual(updated.tags, metadata.taxonomyTags[0]);
    });

    it("should initialize tags to {} if no taxonomyTags", function () {
      const metadata = {
        displayName: "Example",
        taxonomyVersion,
        time,
      };
      const updated = toArtifactMetadatav2(metadata);

      assert(typeof updated.tags === "object");
      assert.equal(Object.keys(updated.tags), 0);
    });

    it("should convert multi tax tags correctly", function () {
      const metadata = {
        displayName: "Example",
        taxonomyVersion,
        time,
        taxonomyTags: [
          {
            Base: {
              name: {
                value: "Hi there!",
              },
            },
          },
          {
            Base: {
              content: {
                type: "SomeType",
                id: "/a/b/c",
              },
            },
          },
        ],
      };
      const updated = toArtifactMetadatav2(metadata);

      assert(updated.tags);

      assert.deepEqual(updated.tags.Base.name.value, "Hi there!");
      assert.deepEqual(updated.tags.Base.content.type, "SomeType");
      assert.deepEqual(updated.tags.Base.content.id, "/a/b/c");
    });
  });
});
