describe("TagFormatter", function () {
  const TagFormatter = require("../../src/common/TagFormatter");
  const assert = require("assert");
  let formatter;

  before(() => {
    const nodesByGuid = [
      "tag1",
      "tag2",
      "dupTag",
      "dupTag",
      "prop1",
      "prop2",
      "prop2",
    ].map((name, i) => [i, name]);
    const nodeNameDict = Object.fromEntries(nodesByGuid);

    const guidList = nodesByGuid.map((pair) => pair.reverse());
    const propsForTagGuid = {
      1: { prop2: 5 },
      2: { prop2: 6 },
      3: { prop1: 4 },
    };
    const guidLookup = new TagFormatter.GuidLookupTable(guidList, propsForTagGuid);
    const nameLookup = new TagFormatter.NodeNameLookupTable(nodeNameDict, {});
    formatter = new TagFormatter(nameLookup, guidLookup);
  });

  describe("from guid format", function () {
    const tag = { ID: 0, 4: "hello!" };
    let humanTag;

    before(() => {
      humanTag = formatter.toHumanFormat([tag])[0];
    });

    it("should resolve ID", function () {
      assert.equal(humanTag.Tag, "tag1");
    });

    it("should resolve props", function () {
      assert.equal(humanTag.prop1, tag[4]);
    });
  });

  describe("from human format", function () {
    it("should resolve Tag", function () {
      const tag = { Tag: "tag2", prop2: "world!" };
      const [guidTag] = formatter.toGuidFormat([tag]);
      assert.equal(guidTag.ID, 1);
    });

    it("should resolve properties", function () {
      const tag = { Tag: "tag2", prop2: "world!" };
      const [guidTag] = formatter.toGuidFormat([tag]);
      assert.equal(guidTag[5], tag.prop2);
    });

    it("should save enum values by UUID", function () {
      // TODO
    });

    it.skip("should resolve duplicate tags using props", function () {
      const tag = { Tag: "dupTag", prop1: "world!" };
      const [guidTag] = formatter.toGuidFormat([tag]);
      assert.equal(guidTag.ID, 3);
      assert.equal(guidTag[4], tag.prop1);
    });
  });

  it.skip("should throw error if ambiguous tag names (ctor)", function () {
    throw new Error('todo!');  // TODO
  });
});
