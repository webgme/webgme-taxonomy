describe("Utils", function () {
  const assert = require("assert");
  const { range, intervals } = require(
    "../../../src/routers/Search/build/Utils",
  );

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
});
