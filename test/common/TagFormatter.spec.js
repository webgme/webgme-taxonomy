describe("TagFormatter", function () {
  const TagFormatter = require("../../src/common/TagFormatter");
  const assert = require("assert");
  const Utils = require("../Utils");
  let formatter, nodesByGuid, storage, gmeAuth;

  function keysAtDepth(obj, depth) {
    let objects = [obj];
    let keys = [];
    for (i = -1; i < depth; i++) {
      keys = objects.flatMap((obj) => Object.keys(obj));
      objects = objects
        .flatMap((obj) => Object.values(obj))
        .filter((obj) => typeof obj === "object");
    }
    return keys;
  }

  before(async () => {
    const params = await Utils.initializeProject(
      "TagFormatter",
      "TaxonomyProject",
    );
    const { core, project, commitHash } = params;
    storage = params.storage;
    gmeAuth = params.gmeAuth;
    const root = await Utils.getNewRootNode(project, commitHash, core);
    const csv = `vocab,,,
      ,enumTerm,,
      ,,enumProp (enum),
      ,,,enumItem1
      ,,,,itemField (int)
      ,,,enumItem2
      ,enumTerm2,,
      ,,name (text),
      ,,enumSubTerm2,
      ,,,child_name (text)
      ,simpleTerm,,
      ,enumTerm3,,
      ,,enumItem3 (text)`;
    const taxonomy = await Utils.createTaxonomyFromCsv(core, root, csv);
    formatter = await TagFormatter.from(core, taxonomy);
    nodesByGuid = Object.fromEntries(
      formatter._allNodes(formatter.taxonomy).map((node) => [node.guid, node]),
    );
  });

  after(function () {
    storage.closeDatabase();
    gmeAuth.unload();
  });

  function check(tag, depth) {
    const [guidTag] = formatter.toGuidFormat([tag]);
    for (let i = 0; i < depth; i++) {
      const names = keysAtDepth(tag, i);
      keysAtDepth(guidTag, i).forEach((keyGuid) => {
        const name = nodesByGuid[keyGuid].attributes.name;
        assert(
          names.includes(name),
          `Could not resolve ${keyGuid}. Expected one of ${names.join(", ")}`,
        );
        const index = names.indexOf(name);
        names.splice(index, 1);
      });
      assert.equal(names.length, 0, `Found names: ${names.join(", ")}`);
    }
    const [humanTag] = formatter.toHumanFormat([guidTag]);
    assert.deepEqual(humanTag, tag);
  }

  it("should convert term names to guid", function () {
    const tag = {
      vocab: {
        simpleTerm: {},
      },
    };
    check(tag, 2);
  });

  it("should convert properties to guid", function () {
    const tag = {
      vocab: {
        enumTerm3: {
          enumItem3: "hello",
        },
      },
    };
    check(tag, 3);
  });

  it("should convert enum items to guid", function () {
    const tag = {
      vocab: {
        enumTerm: {
          enumProp: {
            enumItem1: {},
          },
        },
      },
    };
    check(tag, 4);
  });
});
