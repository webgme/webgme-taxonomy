// @ts-check
/// <reference path="define.d.ts" />

function factory() {
  const Utils = {
    async findTaxonomyNode(core, node) {
      // This finds the first taxonomy node and uses it
      // In the future, it might be nice to find all of them
      const isTaxonomyNode = (n) => {
        const baseNode = core.getMetaType(n);
        return baseNode && core.getAttribute(baseNode, "name") === "Taxonomy";
      };
      const searchLocations = [
        core.getRoot(node),
        ...core
          .getLibraryNames(node)
          .map((name) => core.getLibraryRoot(node, name)),
      ];

      return searchLocations.reduce(async (prevSearch, location) => {
        const taxNode = await prevSearch;
        if (taxNode) return taxNode;

        const children = await core.loadChildren(location);
        return children.find(isTaxonomyNode);
      }, Promise.resolve(null));
    },
    async getVocabulariesFor(core, contentType, scope = "data") {
      // TODO: should we fall back from one scope to the other?
      const metaType =
        scope === "repo" ? "RepositoryVocabularies" : "DataVocabularies";
      const children = await core.loadChildren(contentType);
      const container = children.find((node) => {
        const typeNode = core.getBase(node);
        return core.getAttribute(typeNode, "name") === metaType;
      });
      return await core.loadChildren(container);
    },
  };

  return Utils;
}

if (typeof define !== "undefined") {
  define([], factory);
} else {
  module.exports = factory();
}
