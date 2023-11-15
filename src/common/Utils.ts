/// <amd-module />

import { OutAttr } from "webgme/common";
import type { GmeCore } from "./types";

export function toString(attr: OutAttr): string {
  if (attr) {
    return attr.toString();
  } else {
    return "";
  }
}

export function filterMap<I, O>(list: I[], fn: (x: I) => O | undefined): O[] {
  return list.reduce((items, input) => {
    const mapped = fn(input);
    if (mapped !== undefined) {
      items.push(mapped);
    }
    return items;
  }, <Array<O>> []);
}

/**
 * Given an object and a function, return a new object where the values are `fn(value)`.
 *
 * @param obj - The object to map over
 * @param fn - The function mapping the `obj` values to the output values
 * @returns A new object with the same keys but new values
 */
export function mapObject<T, O>(
  obj: { [key: string]: T },
  fn: (value: T, key: string) => O,
): { [key: string]: O } {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, fn(v, k)]),
  );
}

export default {
  async findTaxonomyNode(
    core: GmeCore,
    node: Core.Node,
  ): Promise<Core.Node | undefined> {
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

    const initialResult: Promise<Core.Node | undefined> = Promise.resolve(
      undefined,
    );
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
function getMetaNode(
  core: GmeCore,
  node: Core.Node,
  name: string,
): Core.Node | undefined {
  const metanode = Object.values(core.getAllMetaNodes(node))
    .find((node) => core.getAttribute(node, "name") === name);

  return metanode;
}
