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
      const base = this.core.getBase(node);
      const children = await this.core.loadChildren(node);

      return {
        id: this.core.getGuid(node),
        name: this.core.getAttribute(node, "name"),
        type: this.core.getAttribute(base, "name"),
        children: await Promise.all(
          children.map((child) => this.toSchema(child)),
        ),
      };
    }
  }

  class ContentTypeExporter {
    constructor(name, vocabularies) {
      this.name = name;
      this.vocabularies = vocabularies;
    }

    static async from(core, contentTypeNode) {
      const name = core.getAttribute(contentTypeNode, "name");
      const exporter = new VocabExporter(core);
      const vocabNodes = await Utils.getVocabulariesFor(
        core,
        contentTypeNode,
        "data",
      );
      const vocabularies = await Promise.all(
        vocabNodes.map((node) => exporter.toSchema(node)),
      );

      return new ContentTypeExporter(name, vocabularies);
    }
  }

  class DashboardConfiguration {
    static async from(core, contentTypeNode) {
      const config = await ContentTypeExporter.from(core, contentTypeNode);

      return {
        name: config.name,
        storage: config.storage,
        taxonomy: {
          id: core.getGuid(contentTypeNode),
          name: config.name,
          children: config.vocabularies,
        },
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
