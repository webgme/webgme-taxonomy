/**
 * This generates a schema of the taxonomy as required by the search dashboard. The format is basically:
 *
 *     {
 *       "id": "GUID",
 *       "name": "display name",
 *       "type": "meta name",
 *       "children": [...child nodes]
 *     }
 */
function factory(Utils) {
  class VocabExporter {
    constructor(core) {
      this.core = core;
    }

    async toSchema(node) {
      const base = this.core.getBaseType(node);
      const prototype = this.getPrototype(node);
      const children = await this.core.loadChildren(node);

      return {
        id: this.core.getGuid(prototype),
        name: this.core.getAttribute(node, "name"),
        type: this.core.getAttribute(base, "name"),
        children: await Promise.all(
          children.map((child) => this.toSchema(child)),
        ),
      };
    }

    getPrototype(node) {
      const base = this.core.getBaseType(node);

      while (this.core.getBase(node) !== base) {
        node = this.core.getBase(node);
      }

      return node;
    }
  }

  class ContentTypeExporter {
    constructor(nodePath, name, vocabularies, childContent) {
      this.nodePath = nodePath;
      this.name = name;
      this.vocabularies = vocabularies;
      this.content = childContent;
    }

    static async from(core, contentTypeNode) {
      const name = core.getAttribute(contentTypeNode, "name");
      const exporter = new VocabExporter(core);
      // FIXME: remove this
      const vocabNodes = await Utils.getVocabulariesFor(core, contentTypeNode);
      const vocabularies = await Promise.all(
        vocabNodes.map((node) => exporter.toSchema(node)),
      );

      // TODO: check for a content type
      const children = await core.loadChildren(contentTypeNode);
      const childTypeNode = children.find((node) =>
        Utils.isTypeNamed(core, node, "Content Type")
      );
      const childType = !!childTypeNode
        ? await ContentTypeExporter.from(core, childTypeNode)
        : undefined;

      const nodePath = core.getPath(contentTypeNode);
      return new ContentTypeExporter(nodePath, name, vocabularies, childType);
    }
  }

  class DashboardConfiguration {
    // TODO: update this to be recursive
    // each content type defines:
    //  - nested content type
    //  - vocabularies
    static async from(core, contentTypeNode) {
      const content = await ContentTypeExporter.from(core, contentTypeNode);

      return {
        name: content.name, // TODO: allow other names?
        content: content,
      };
    }
  }

  DashboardConfiguration.ContentTypeExporter = ContentTypeExporter;

  return DashboardConfiguration;
}

if (typeof define !== "undefined") {
  define(["./Utils"], factory);
} else {
  const Utils = require("./Utils");
  module.exports = factory(Utils);
}
