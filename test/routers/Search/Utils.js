describe("Utils", function () {
  const Utils = require(
    "../../../src/routers/Search/build/Utils",
  );
  const assert = require("assert");

  describe.only("deepMerge", function () {
    it("should merge two shallow objects", function () {
      const combined = Utils.deepMerge({ k1: true }, { k2: true });
      assert(combined.k1);
      assert(combined.k2);
      assert.equal(Object.keys(combined).length, 2);
    });

    it("should merge two shallow objects (multi keys)", function () {
      const combined = Utils.deepMerge({ k1: true }, { k2: true, k3: true });
      assert(combined.k1);
      assert(combined.k2);
      assert(combined.k3);
      assert.equal(Object.keys(combined).length, 3);
    });

    it("should merge deep objects", function () {
      const combined = Utils.deepMerge(
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
