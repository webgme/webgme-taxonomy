describe("TagCreatorForm", function () {
  const TagForm = require("../../src/common/TagCreatorForm");
  const assert = require("assert");

  describe("_getDefaultValue", function () {
    it("should get default for primitive", function () {
      const def = {
        type: "string",
        default: "hello",
      };
      const value = TagForm.prototype._getDefaultValue(def);
      assert.equal(value, "hello");
    });

    it("should get default for object (w/ props)", function () {
      const def = {
        type: "object",
        properties: {
          field: {
            type: "string",
            default: "hello",
          },
        },
      };
      const value = TagForm.prototype._getDefaultValue(def);
      assert.deepEqual(value, { field: "hello" });
    });

    it("should get default for enum", function () {
      const def = {
        type: "string",
        anyOf: [
          {
            type: "string",
            default: "hello",
          },
        ],
      };
      const value = TagForm.prototype._getDefaultValue(def);
      assert.deepEqual(value, "hello");
    });

    it("should get default for object (anyOf)", function () {
      const defs = {
        A: {
          type: "object",
          properties: {
            field: {
              type: "string",
              default: "I am A!",
            },
          },
        },
      };
      const def = {
        type: "object",
        anyOf: [{ $ref: "definition/A" }, { $ref: "definition/B" }],
      };
      const value = TagForm.prototype._getDefaultValue(def, defs);
      assert.deepEqual(value, { field: "I am A!" });
    });
  });

  describe("setMissingDefaults", function () {
    const definitions = {
      simpleTag: {
        type: "object",
        properties: {
          field: {
            type: "string",
            default: "hello",
          },
        },
      },
    };
    function getSchema(defaultName) {
      return {
        type: "object",
        properties: {
          taxonomyTags: {
            title: "testTaxonomy",
            type: "array",
            uniqueItems: true,
            minItems: 1,
            items: {
              type: "object",
              anyOf: [{ $ref: `definitions/${defaultName}` }],
            },
          },
        },
        definitions,
      };
    }

    it("should default to empty object if falsey", function () {
      const schema = { type: "object", properties: {} };
      assert.deepEqual(TagForm.prototype._setMissingDefaults(schema, null), {});
    });

    it("should set default on primitive if falsey", function () {
      const schema = { type: "string", default: "hello" };
      assert.deepEqual(
        TagForm.prototype._setMissingDefaults(schema, {}, null),
        schema.default
      );
    });

    it("should set default in array", function () {
      const schema = getSchema("simpleTag");
      const defaults = TagForm.prototype.setMissingDefaults(schema, {
        taxonomyTags: [null],
      });
      assert.equal(defaults.taxonomyTags.length, 1);
      assert.equal(defaults.taxonomyTags[0].field, "hello");
    });
  });
});
