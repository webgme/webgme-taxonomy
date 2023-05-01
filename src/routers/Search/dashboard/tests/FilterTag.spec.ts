/* eslint-env mocha */

import { EnumFilterTag, FilterTag, fromDict } from "../src/tags";
import assert from "assert";

describe("FilterTag", function () {
  describe("text field", function () {
    it("should match if values are equal", function () {
      const filter = new FilterTag(
        "textID",
        "Test Field",
        "StringField",
        "someValue",
        [],
      );
      const tag = {
        vocabID: {
          textID: "someValue",
        },
      };
      assert(filter.isMatch(tag));
    });

    it("should not match if values are not equal", function () {
      const filter = new FilterTag(
        "textID",
        "Test Field",
        "StringField",
        "someValue",
        [],
      );
      const tag = {
        vocabID: {
          textID: "someOtherValue",
        },
      };
      assert(!filter.isMatch(tag));
    });
  });

  describe("enum field", function () {
    it("should match if values are equal", function () {
      const filter = new EnumFilterTag(
        "enumID",
        "Test Enum",
        "EnumField",
        "option #2",
        [],
      );
      const tag = {
        vocabID: {
          parentID: {
            enumID: {
              "option #2": {},
            },
          },
        },
      };
      assert(filter.isMatch(tag));
    });

    it("should not match if values don't match", function () {
      const filter = new EnumFilterTag(
        "enumID",
        "Test Enum",
        "EnumField",
        "option #2",
        [],
      );
      const tag = {
        vocabID: {
          parentID: {
            enumID: {
              "option #1": {},
            },
          },
        },
      };
      assert(!filter.isMatch(tag));
    });
  });

  describe("fromDict", function () {
    it("should parse enum fields", function () {
      const tag = fromDict({
        id: "enumID",
        name: "test enum",
        type: "EnumField",
        value: "someOptionID",
        children: [],
      });
      assert(tag instanceof EnumFilterTag);
    });
  });
});
