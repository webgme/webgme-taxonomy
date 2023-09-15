describe("Utils", function () {
  const assert = require("assert");
  const { retry, range, intervals, Pattern, toArtifactMetadatav2 } = require(
    "../../../src/routers/Search/build/Utils",
  );

  describe("retry", function () {
    it("should throw error if all attempts fail", async function () {
      await assert.rejects(() => retry(async () => assert(false)));
    });

    it("should make multiple attempts", async function () {
      let attempts = 0;
      await retry(async () => assert(++attempts > 1));
      assert.equal(attempts, 2);
    });

    it("should return fn return value", async function () {
      const ten = await retry(async () => 10);
      assert.equal(ten, 10);
    });

    it("should convert thrown error to Err type", async function () {
      const promise = retry(async () => {
        throw new Error("hello there!");
      });
      try {
        await promise;
      } catch (err) {
        assert(err.message.includes("hello there!"));
      }
    });
  });

  describe("range", function () {
    it("should not return the last value", function () {
      let oneToFour = range(1, 5);
      assert.deepEqual(oneToFour, [1, 2, 3, 4]);
    });

    it("should change by step", function () {
      let list = range(2, 6, 2);
      assert.deepEqual(list, [2, 4]);
    });

    it("should change by step (uneven)", function () {
      let list = range(2, 5, 2);
      assert.deepEqual(list, [2, 4]);
    });
  });

  describe("intervals", function () {
    it("should return single range", function () {
      const ranges = intervals(3, 7, 4);
      assert.deepEqual(ranges, [[3, 4]]);
    });

    it("should return single range w/ remainder", function () {
      const ranges = intervals(3, 7, 8);
      assert.deepEqual(ranges, [[3, 4]]);
    });

    it("should return multi range", function () {
      const ranges = intervals(3, 11, 4);
      assert.deepEqual(ranges, [[3, 4], [7, 4]]);
    });

    it("should return multi range w/ remainder", function () {
      const ranges = intervals(3, 11, 5);
      assert.deepEqual(ranges, [[3, 5], [8, 3]]);
    });
  });

  describe("Pattern", function () {
    const Ajv = require("ajv");
    const ajv = new Ajv();

    describe("URL", function () {
      const urlSchema = { type: "string", pattern: Pattern.exact(Pattern.URL) };
      const validate = ajv.compile(urlSchema);

      it("should allow IP address", function () {
        assert(validate("127.0.0.1"));
      });

      it("should disallow spaces", function () {
        assert(!validate("127.0. 0.1"));
      });

      it("should allow URL", function () {
        assert(validate("google.com"));
        assert(validate("github.io"));
        assert(validate("vanderbilt.edu"));
        assert(validate("localhost"));
      });

      it("should allow subdomain", function () {
        assert(validate("editor.netsblox.org"));
        assert(validate("dev-test.netsblox.org"));
      });

      it("should allow IP address w/ port", function () {
        assert(validate("127.0.0.1:27017"));
        assert(validate("127.0.0.1:8080"));
      });

      it("should allow URL w/ port", function () {
        assert(validate("google.com:443"));
        assert(validate("google.com:80"));
      });

      it("should allow subdomain w/ port", function () {
        assert(validate("editor.netsblox.org:443"));
        assert(validate("dev-test.netsblox.org:4033"));
      });
    });

    describe("anyIn", function () {
      const options = ["aaa", "bbb", "ccc", "slashesWorkRight/"];
      const urlSchema = {
        type: "string",
        pattern: Pattern.exact(Pattern.anyIn(...options)),
      };
      const validate = ajv.compile(urlSchema);

      it("should allow options", function () {
        options.forEach((opt) => assert(validate(opt)));
      });

      it("should disallow non-members", function () {
        assert(!validate("abc"));
        assert(!validate("AAA"));
        assert(!validate("BBB"));
      });
    });
  });

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
