describe("TagFormatter", function () {
  const testFixture = require("../globals");
  const TagFormatter = require("../../build/common/TagFormatter").default;
  const TaxonomyParser = require("../../build/common/TaxonomyParser");
  const assert = require("assert");
  const Utils = require("../Utils");
  const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
  let formatter, nodesByGuid, storage, gmeAuth, taxonomyNode, core;

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
      "test",
    );
    core = params.core;
    const { project, commitHash } = params;
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
    const vocabRoots = TaxonomyParser.fromCSV(csv);
    vocabRoots.forEach(
      (vocabRoot) => (vocabRoot.pointers.base = "@meta:Vocabulary"),
    );

    const taxonomyType = Object.values(core.getAllMetaNodes(root))
      .find((node) => core.getAttribute(node, "name") === "Taxonomy");
    taxonomyNode = (await core.loadChildren(root))
      .find((n) => core.getBase(n) === taxonomyType);

    const importer = new Importer(core, root);
    await Promise.all(
      vocabRoots.map((vr) => importer.import(taxonomyNode, vr)),
    );

    formatter = await TagFormatter.from(core, taxonomyNode);
    nodesByGuid = Object.fromEntries(
      formatter._allNodes(formatter.taxonomy).map((node) => [node.guid, node]),
    );
  });

  after(function () {
    storage.closeDatabase();
    gmeAuth.unload();
  });

  function check(tag, depth) {
    const guidTag = formatter.toGuidFormat(tag);
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
    const humanTag = formatter.toHumanFormat(guidTag);
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

  it("should convert multiple tags", function () {
    const tag = {
      vocab: {
        enumTerm: {
          enumProp: {
            enumItem1: {},
          },
        },
        enumTerm3: {
          enumItem3: "hello",
        },
      },
    };
    check(tag, 4);
  });

  it("should set field items (1 item)", function () {
    const tags = {
      Base: {
        attachments: {
          files: [{
            File: { path: "testName" },
          }],
        },
      },
    };

    check(tags, 3);
  });

  it("should set field items (multi)", function () {
    const tags = {
      Base: {
        attachments: {
          files: [
            {
              File: { path: "testName" },
            },
            {
              File: { path: "secondPath.txt" },
            },
          ],
        },
      },
    };

    check(tags, 3);
  });

  it("should convert vocabulary name to GUID", function () {
    const tag = { Base: { name: "test name" } };
    const guidTag = formatter.toGuidFormat(tag);
    assert(!guidTag.Base, "Vocabulary name not converted to a GUID");
  });

  it("should convert compound field to GUID", async function () {
    const tag = {
      DemoTerms: { TermWithCompound: { compound: { text1: "value1" } } },
    };
    const guidTag = formatter.toGuidFormat(tag);
    const allKeys = nestedKeys(guidTag);
    const compoundNode = await getTagNode(
      "DemoTerms",
      "TermWithCompound",
      "compound",
    );
    assert(
      allKeys.includes(core.getGuid(compoundNode)),
      "Compound guid not found in formatted tag object.",
    );
  });

  function nestedKeys(obj) {
    return Object.entries(obj).flatMap(([key, value]) => {
      if (typeof value === "object") {
        return nestedKeys(value).concat(key);
      }
      return [key];
    });
  }

  async function getTagNode(...path) {
    return path.reduce(async (parentP, name) => {
      const parent = await parentP;
      const children = await core.loadChildren(parent);
      const child = children.find((n) => core.getAttribute(n, "name") === name);
      if (!child) {
        throw new Error(
          `Could not find ${name} in ${core.getAttribute(parent, "name")}`,
        );
      }
      return child;
    }, Promise.resolve(taxonomyNode));
  }
});
