/**
 * Given a model of an ontology, generate a utility for desugaring tags.
 *
 * For example, this should convert empty enum variants represented as strings
 * to their object notation. For example:
 *
 *  {
 *    "gender": "male"
 *  }
 *
 * should be converted to
 *
 *  {
 *    "gender": {
 *      "male": {}
 *    }
 *  }
 *
 * as the second format ensures forward-compatibility with respect to any attributes
 * that may be added to the variant in the future.
 */

/**
 * Visitor defines desugaring functions for each node type (named after the visitor design pattern)
 */
const Visitor = {};
Visitor.TextField =
  Visitor.BooleanField =
  Visitor.IntegerField =
  Visitor.FloatField =
  Visitor.UriField =
    async function identityVisitor(_core, _node, data) {
      return data;
    };

Visitor.Taxonomy =
  Visitor.Vocabulary =
  Visitor.CompoundField =
  Visitor.Term =
  Visitor.SystemTerm =
    dictVisitor;

async function dictVisitor(core, node, data) {
  const children = await core.loadChildren(node);
  const entriesP = Object.entries(data).map(async ([name, data]) => {
    const child = children
      .find((node) => core.getAttribute(node, "name") === name);

    if (!child) {
      throw new Error(
        `Could not find field in ${core.getAttribute(node, "name")}: ${child}`,
      );
    }

    const value = await Visitor.call(core, child, data);
    return [name, value];
  });
  const entries = await Promise.all(entriesP);

  return Object.fromEntries(entries);
}

Visitor.SetField = async function (core, node, data) {
  const elementsP = data
    .map(async (datum) => Visitor.EnumField(core, node, datum));

  return await Promise.all(elementsP);
};

Visitor.EnumField = async function (core, node, data) {
  if (typeof data === "string") {
    const variantName = data;
    data = {};
    data[variantName] = {};
    return data;
  }

  return await dictVisitor(core, node, data);
};

/**
 * Generic dispatcher for a node and data. That is, it calls the appropriate
 * visitor function for the given node (and data).
 */
Visitor.call = async function (core, node, data) {
  const metaNode = core.getBaseType(node);
  const typeName = core.getAttribute(metaNode, "name");

  return await Visitor[typeName](core, node, data);
};

class DesugarJson {
  constructor(core, taxonomy) {
    this.core = core;
    // TODO: check that the node is a taxonomy node
    this.taxonomy = taxonomy;
  }

  async desugar(tags) {
    return await Visitor.Taxonomy(this.core, this.taxonomy, tags);
  }
}

module.exports = { DesugarJson, Visitor };
