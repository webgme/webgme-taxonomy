describe("TagFormatter", function () {
  const testFixture = require("../globals");
  const TagFormatter = require("../../src/common/TagFormatter");
  const TaxonomyParser = require("../../src/common/TaxonomyParser");
  const assert = require("assert");
  const Utils = require("../Utils");
  const Importer = testFixture.requirejs("webgme-json-importer/JSONImporter");
  let formatter, nodesByGuid, storage, gmeAuth, root, core;

  function withRequiredTerms(tags) {
    tags.DemoTerms = tags.DemoTerms || {};
    tags.DemoTerms.RequiredTerm = tags.DemoTerms.RequiredTerm || {};
    return tags;
  }

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

  function getNestedValue(obj, ...keys) {
    return keys.reduce((dict, key) => dict[key], obj);
  }

  before(async () => {
    const params = await Utils.initializeProject(
      "TagFormatter",
      "test",
    );
    const { project, commitHash } = params;
    storage = params.storage;
    gmeAuth = params.gmeAuth;
    core = params.core;
    root = await Utils.getNewRootNode(project, commitHash, core);
    const taxonomy = await core.loadByPath(root, "/s");

    formatter = await TagFormatter.from(core, taxonomy);
    nodesByGuid = Object.fromEntries(
      formatter._allNodes(formatter.taxonomy).map((node) => [node.guid, node]),
    );
  });

  after(function () {
    storage.closeDatabase();
    gmeAuth.unload();
  });

  async function getGuidsToTerm(nodePath) {
    // get the node paths of the vocab to the innermost node (skip taxonomy)
    const nodePaths = nodePath
      .split("/").slice(1)
      .reduce((paths, chunk) => {
        const pathPrefix = paths[paths.length - 1] || "";
        const nextPath = pathPrefix + "/" + chunk;
        paths.push(nextPath);

        return paths;
      }, []);

    nodePaths.shift(); // remove the taxonomy

    const nodes = await Promise.all(
      nodePaths.map((path) => core.loadByPath(root, path)),
    );
    return nodes.map((node) => core.getGuid(node));
  }

  it("should convert term names to guid", async function () {
    const tag = withRequiredTerms({
      DemoTerms: {
        LabelTerm: {},
      },
    });

    const [vocabGuid, termGuid] = await getGuidsToTerm("/s/s/7");
    const guidTags = await formatter.toGuidFormat(tag);
    assert(guidTags.hasOwnProperty(vocabGuid));
    assert(guidTags[vocabGuid].hasOwnProperty(termGuid));
  });

  it("should convert properties to guid", async function () {
    const tag = withRequiredTerms({
      DemoTerms: {
        Person: {
          name: "brian",
        },
      },
    });

    const [vocabGuid, termGuid, propertyGuid] = await getGuidsToTerm(
      "/s/s/n/G",
    );
    const guidTags = await formatter.toGuidFormat(tag);
    assert.equal(guidTags[vocabGuid][termGuid][propertyGuid], "brian");
  });

  it("should convert enum items to guid", async function () {
    const tag = withRequiredTerms({
      DemoTerms: {
        Person: {
          gender: { male: {} },
        },
      },
    });
    const guids = await getGuidsToTerm(
      "/s/s/n/o/v",
    );
    const guidTags = await formatter.toGuidFormat(tag);
    const enumValue = getNestedValue(guidTags, ...guids);
    assert.deepEqual(enumValue, {});
  });

  it("should convert multiple tags", async function () {
    const tag = withRequiredTerms({
      DemoTerms: {
        LabelTerm: {},
        RecommendedTerm: {},
      },
    });
    const labelTermGuids = await getGuidsToTerm(
      "/s/s/v",
    );
    const recTermGuids = await getGuidsToTerm(
      "/s/s/D",
    );

    const guidTags = await formatter.toGuidFormat(tag);
    assert.deepEqual(getNestedValue(guidTags, ...labelTermGuids), {});
    assert.deepEqual(getNestedValue(guidTags, ...recTermGuids), {});
  });

  it("should set field items (1 item)", async function () {
    const tag = withRequiredTerms({
      DemoTerms: {
        Person: {
          pets: [
            { Cat: { name: "Maui", breed: { Other: {} } } },
          ],
        },
      },
    });

    const [vocabGuid, termGuid, petsGuid, catGuid, breedGuid, otherGuid] =
      await getGuidsToTerm("/s/s/n/H/F/k/Q");
    const guidTags = await formatter.toGuidFormat(tag);

    const petsValue = getNestedValue(guidTags, vocabGuid, termGuid, petsGuid);
    assert(Array.isArray(petsValue), "Set field is not a list");
    assert.equal(petsValue.length, 1);

    const otherValue = getNestedValue(
      petsValue[0],
      catGuid,
      breedGuid,
      otherGuid,
    );
    assert.deepEqual(otherValue, {});
  });

  it("should format terms from the base vocab w/ prototype guid", async function () {
    const tag = withRequiredTerms({
      Base: {
        name: { value: "test" },
      },
    });
    const [_langGuid, _taxGuid, vocabGuid, termGuid, valueGuid] =
      await getGuidsToTerm("/J/9/2/MAg/J/O");
    const guidTags = await formatter.toGuidFormat(tag);
    const nameValue = getNestedValue(
      guidTags,
      vocabGuid,
      termGuid,
      valueGuid,
    );
    assert.equal(nameValue, "test");
  });

  it("should set field items (multi)", async function () {
    const tag = withRequiredTerms({
      DemoTerms: {
        Person: {
          pets: [
            { Cat: { name: "Maui", breed: { Other: {} } } },
            { Cat: { name: "Perry", breed: { Other: {} } } },
          ],
        },
      },
    });

    const [vocabGuid, termGuid, petsGuid, catGuid, breedGuid, otherGuid] =
      await getGuidsToTerm("/s/s/n/H/F/k/Q");
    const guidTags = await formatter.toGuidFormat(tag);

    const petsValue = getNestedValue(guidTags, vocabGuid, termGuid, petsGuid);
    assert(Array.isArray(petsValue), "Set field is not a list");
    assert.equal(petsValue.length, 2);

    petsValue.forEach((petValue) => {
      const otherValue = getNestedValue(
        petValue,
        catGuid,
        breedGuid,
        otherGuid,
      );
      assert.deepEqual(otherValue, {});
    });
  });

  describe("sugar support", function () {
    // FIXME: add support for the following test
    it.skip("should throw validation error if invalid tag", async function () {
      const tag = { // missing required term
        DemoTerms: {
          Person: {
            gender: "male",
          },
        },
      };
      await assert.rejects(
        formatter.toGuidFormat(tag),
        /must have required property/,
      );
    });

    it("should support syntactic sugar", async function () {
      const tag = withRequiredTerms({
        DemoTerms: {
          Person: {
            gender: "male",
          },
        },
      });
      const guidTag = await formatter.toGuidFormat(tag);
      const humanTag = formatter.toHumanFormat(guidTag);

      const desugaredTag = withRequiredTerms({
        DemoTerms: {
          Person: {
            gender: { male: {} },
          },
          RequiredTerm: {},
        },
      });
      assert.deepEqual(humanTag, desugaredTag);
    });
  });
});
