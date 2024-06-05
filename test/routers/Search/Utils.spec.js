describe("Utils", function () {
  const assert = require("assert");
  const {
    deepMerge,
    retry,
    uniqWithKey,
    sortDates,
    range,
    intervals,
    Pattern,
    toArtifactMetadatav2,
    shiftWhile,
    lazy,
    getTimepoints,
    DateTimeIter,
    DateTimeInterval,
    UniqueNames,
  } = require(
    "../../../build/routers/Search/Utils",
  );

  describe("UniqueNames", function () {
    it("should keep name if no collisions", function () {
      const namer = new UniqueNames();
      const names = ["a", "b", "c"];
      const newNames = names.map((n) => namer.unique(n));
      assert.deepEqual(names, newNames);
    });

    it("should rename duplicates", function () {
      const namer = new UniqueNames();
      const names = ["a", "a", "a"];
      const newNames = names.map((n) => namer.unique(n));
      assert.equal(new Set(newNames).size, names.length);
    });

    it("should preserve name (as prefix)", function () {
      const namer = new UniqueNames();
      const names = ["a", "a", "a"];
      const newNames = names.map((n) => namer.unique(n));
      assert(newNames.filter((n) => n.startsWith("a")).length, names.length);
    });
  });

  describe("sortDates", function () {
    it("should sort chronologically", function () {
      const dates = [
        new Date("2023-09-14T17:50:04.000Z"), // Thursday
        new Date("2023-08-25T22:12:53.000Z"), // Friday (a few weeks earlier)
      ];
      const sorted = sortDates(dates);
      assert.equal(sorted.length, dates.length);
      assert.equal(sorted[0], dates[1]);
      assert.equal(sorted[1], dates[0]);
    });
  });

  describe("lazy.iter", function () {
    it("should start with initial value", function () {
      const i = lazy.iter(1, () => 1);
      assert.equal(i.next().value, 1);
    });

    it("should compute subsequent values using next fn", function () {
      let i = lazy.iter(1, (i) => i + 1);
      i.next();
      assert.equal(i.next().value, 2);
    });

    it("should return 1000 values", function () {
      let i = lazy.iter(1, (i) => i + 1);
      [...new Array(1000)].forEach(() => i.next());
    });
  });

  describe("DateTimeIter", function () {
    it("should get minutes", function () {
      const mins = DateTimeIter.minutes(
        new Date("2023-09-25T20:00:00.306Z"),
      );
      [...new Array(61)].forEach((_, i) =>
        assert.equal(i % 60, mins.next().value.getMinutes())
      );
    });

    it("should get hours", function () {
      const hrs = DateTimeIter.hours(
        new Date("2023-09-25T00:00:00.306Z"),
      );
      [...new Array(61)].forEach((_, i) =>
        assert.equal(i % 24, hrs.next().value.getUTCHours())
      );
    });

    it("should get weeks", function () {
      const weeks = DateTimeIter.weeks(
        new Date("2023-09-01T01:00:00.306Z"),
      );
      const expected = [1, 8, 15, 22, 29, 6];
      expected.forEach((day) => {
        const actual = weeks.next().value.getUTCDate();
        assert.equal(day, actual);
      });
    });

    it("should get months", function () {
      const months = DateTimeIter.months(
        new Date("2023-01-01T01:00:00.306Z"),
      );
      [...new Array(61)].forEach((_, i) =>
        assert.equal(i % 12, months.next().value.getUTCMonth())
      );
    });

    it("should get months", function () {
      const months = DateTimeIter.months(
        new Date("2023-01-01T01:00:00.306Z"),
      );
      [...new Array(61)].forEach((_, i) =>
        assert.equal(i % 12, months.next().value.getUTCMonth())
      );
    });
  });

  describe("getTimepoints", function () {
    it("should get minutes", function () {
      const dates = [
        new Date("2023-09-25T20:13:53.306Z"),
        new Date("2023-09-25T20:23:53.306Z"),
      ];
      const [, ticks] = getTimepoints(dates);
      const delta = ticks[1] - ticks[0];
      assert.equal(delta, 60 * 1000);
    });

    it("should get hours", function () {
      const dates = [
        new Date("2023-09-25T02:13:53.306Z"),
        new Date("2023-09-25T20:23:53.306Z"),
      ];
      const [, ticks] = getTimepoints(dates, 25);
      const delta = ticks[1] - ticks[0];
      assert.equal(delta, 60 * 60 * 1000);
    });

    it("should get days", function () {
      const dates = [
        new Date("2023-09-05T02:13:53.306Z"),
        new Date("2023-09-25T20:23:53.306Z"),
      ];
      const [, ticks] = getTimepoints(dates, 25);
      const delta = ticks[1] - ticks[0];
      assert.equal(delta, 24 * 60 * 60 * 1000);
    });

    it("should get weeks", function () {
      const dates = [
        new Date("2023-08-05T02:13:53.306Z"),
        new Date("2023-09-25T20:23:53.306Z"),
      ];
      const [, ticks] = getTimepoints(dates, 25);
      const delta = ticks[1] - ticks[0];
      assert.equal(delta, 7 * 24 * 60 * 60 * 1000);
    });

    it("should get months", function () {
      const dates = [
        new Date("2023-01-05T02:13:53.306Z"),
        new Date("2023-11-25T20:23:53.306Z"),
      ];
      const [, ticks] = getTimepoints(dates, 25);
      const delta = ticks[1] - ticks[0];
      assert.equal(delta, 31 * 24 * 60 * 60 * 1000);
    });

    it("should get years", function () {
      const dates = [
        new Date("2000-01-05T02:13:53.306Z"),
        new Date("2023-11-25T20:23:53.306Z"),
      ];
      const [, ticks] = getTimepoints(dates);
      const delta = ticks[1] - ticks[0];
      assert.equal(delta, 366 * 24 * 60 * 60 * 1000);
    });

    it("should get multi-years", function () {
      const dates = [
        new Date("1800-01-05T02:13:53.306Z"),
        new Date("2023-11-25T20:23:53.306Z"),
      ];
      const [interval, ticks] = getTimepoints(dates);
      assert.equal(interval, DateTimeInterval.Decade);
    });
  });

  describe("shiftWhile", function () {
    it("should return matching items", function () {
      const list = shiftWhile([1, 2, 3, 4, 5], (i) => i < 5);
      assert.deepEqual(list, [1, 2, 3, 4]);
    });

    it("should stop matching after first false", function () {
      const list = shiftWhile([1, 2, 3, 4, 5, 1], (i) => i < 5);
      assert.deepEqual(list, [1, 2, 3, 4]);
    });

    it("should remove matching items", function () {
      const original = [1, 2, 3, 4, 5, 1];
      shiftWhile(original, (i) => i < 5);
      assert.deepEqual(original, [5, 1]);
    });
  });

  describe("uniqWithKey", function () {
    it("should remove duplicates using fn", function () {
      const nums = [1, -2, 1, -1, 3, 5, -5];
      const uniq = uniqWithKey(nums, Math.abs);
      assert.equal(uniq.length, 4);
      assert.deepEqual(uniq, [1, -2, 3, 5]);
    });

    it("should keep the untransformed item", function () {
      const nums = [-1];
      const uniq = uniqWithKey(nums, Math.abs);
      assert.deepEqual(uniq, [-1]);
    });
  });

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

    it("should not return the last value", function () {
      let zero = range(0, 1);
      assert.deepEqual(zero, [0]);
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

  describe("deepMerge", function () {
    it("should merge two shallow objects", function () {
      const combined = deepMerge({ k1: true }, { k2: true });
      assert(combined.k1);
      assert(combined.k2);
      assert.equal(Object.keys(combined).length, 2);
    });

    it("should merge two shallow objects (multi keys)", function () {
      const combined = deepMerge({ k1: true }, { k2: true, k3: true });
      assert(combined.k1);
      assert(combined.k2);
      assert(combined.k3);
      assert.equal(Object.keys(combined).length, 3);
    });

    it("should merge deep objects", function () {
      const combined = deepMerge(
        { k1: { nk1: true } },
        { k2: true },
        { k1: { nk2: { nnk1: "Hello!" } } },
      );
      assert(combined.k1);
      assert(combined.k2);
      assert.equal(Object.keys(combined).length, 2);

      assert.equal(Object.keys(combined.k1).length, 2);
      assert(combined.k1.nk2);
      assert.equal(combined.k1.nk2.nnk1, "Hello!");
    });
  });
});
