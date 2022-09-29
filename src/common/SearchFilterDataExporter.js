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
function factory() {
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
          children.map((child) => this.toSchema(child))
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
      const root = core.getRoot(contentTypeNode);
      const vocabularies = await Promise.all(
        core
          .getMemberPaths(contentTypeNode, "vocabularies")
          .map((path) =>
            core.loadByPath(root, path).then((node) => exporter.toSchema(node))
          )
      );
      return new ContentTypeExporter(name, vocabularies);
    }
  }

  // TODO: make this available via REST or in common/?
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
  define([], factory);
} else {
  module.exports = factory();
}
