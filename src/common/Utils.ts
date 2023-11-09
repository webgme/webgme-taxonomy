/// <amd-module />

  import type {GmeCore} from './types';
  export default {
    async findTaxonomyNode(core: GmeCore, node: Core.Node): Promise<Core.Node | undefined> {
      // This finds the first taxonomy node and uses it
      // In the future, it might be nice to find all of them
      const isTaxonomyNode = (n: Core.Node) => {
        const baseNode = core.getMetaType(n);
        return baseNode && core.getAttribute(baseNode, "name") === "Taxonomy";
      };
      const searchLocations: Core.Node[] = [
        core.getRoot(node),
        ...core
          .getLibraryNames(node)
          .map((name) => core.getLibraryRoot(node, name)),
      ].filter((node: Core.Node | null): node is Core.Node => !!node);

      const initialResult: Promise<Core.Node | undefined> = Promise.resolve(undefined) ;
      return searchLocations.reduce(async (prevSearch, location) => {
        const taxNode = await prevSearch;
        if (taxNode) return taxNode;

        const children = await core.loadChildren(location);
        return children.find(isTaxonomyNode);
      }, initialResult);
    },
    async getVocabulariesFor(core: GmeCore, contentType: Core.Node) {
      const children = await core.loadChildren(contentType);
      const container = children.find((node) => {
        const typeNode = core.getBase(node);
        return core.getAttribute(typeNode, "name") === "Vocabularies";
      }) || getMetaNode(core, contentType, "Taxonomy"); // fallback to default/base vocabularies if none specified

      if (container) {
        return await core.loadChildren(container);
      } else {
        return [];
      }
    },

    isTypeNamed(core: GmeCore, node: Core.Node | null, typeName: string) {
      while (node) {
        if (core.getAttribute(node, "name") === typeName) {
          return true;
        }
        node = core.getBase(node);
      }
      return false;
    },
    getMetaNode,
  };
    function getMetaNode(core: GmeCore, node: Core.Node, name: string): Core.Node | undefined{
      const metanode = Object.values(core.getAllMetaNodes(node))
        .find((node) => core.getAttribute(node, "name") === name);

      return metanode;
    }

