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

    it("should not match if completely different", function () {
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
            otherPropID: {
              "option #1": {},
            },
          },
        },
      };
      assert(!filter.isMatch(tag));
    });

    it("should match enum with other props, too", function () {
      const filterTag = fromDict({
        id: "value",
        name: "value",
        type: "EnumField",
        value: "Male",
        children: [],
      });
      const tags = [
        { "DataSystemTerms": { "isData": {} } },
        { "Subject": { "Sex": { "value": { "Female": {} } } } },
      ];

      assert(!FilterTag.applyFilters(tags, [filterTag]));
    });
  });

  it("should match using terms", function () {
    const filterTag = fromDict({
      id: "Sex",
      name: "Sex",
      type: "Term",
      children: [],
    });
    const tags = [
      { "DataSystemTerms": { "isData": {} } },
      { "Subject": { "Sex": { "value": { "Female": {} } } } },
    ];

    assert(FilterTag.applyFilters(tags, [filterTag]));

    const invalidTags = [
      { "DataSystemTerms": { "isData": {} } },
      { "Subject": { "NotSex": { "value": { "Female": {} } } } },
    ];

    assert(!FilterTag.applyFilters(invalidTags, [filterTag]));
  });

  it("should match using label terms", function () {
    const filterTag = fromDict({
      id: "isData",
      name: "is data?",
      type: "Term",
      children: [],
    });
    const tags = [
      { "DataSystemTerms": { "isData": {} } },
      { "Subject": { "Sex": { "value": { "Female": {} } } } },
    ];

    assert(FilterTag.applyFilters(tags, [filterTag]));

    const invalidTags = [
      { "DataSystemTerms": { "isNotData": {} } },
      { "Subject": { "Sex": { "value": { "Female": {} } } } },
    ];

    assert(!FilterTag.applyFilters(invalidTags, [filterTag]));
  });

  it("should match using vocab", function () {
    const filterTag = fromDict({
      id: "Subject",
      name: "Subject",
      type: "Vocabulary",
      children: [],
    });
    const tags = [
      { "DataSystemTerms": { "isData": {} } },
      { "Subject": { "Sex": { "value": { "Female": {} } } } },
    ];

    assert(FilterTag.applyFilters(tags, [filterTag]));

    const invalidTags = [
      { "DataSystemTerms": { "isData": {} } },
      { "NotSubject": { "Sex": { "value": { "Female": {} } } } },
    ];
    assert(!FilterTag.applyFilters(invalidTags, [filterTag]));
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
