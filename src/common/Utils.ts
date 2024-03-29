/// <amd-module />

import type { OutAttr } from "webgme/common";
import { None, Option, Some } from "oxide.ts";
import { isTypeNamed } from "./GmeHelpers";
import type { GmeCore } from "./types";

export function toString(attr: OutAttr): string {
  if (attr) {
    return attr.toString();
  } else {
    return "";
  }
}

export function filterMap<I, O>(list: I[], fn: (x: I) => O | undefined): O[] {
  return filterMapOpt(list, (item) => Option.from(fn(item)));
}

export function filterMapOpt<I, O>(list: I[], fn: (x: I) => Option<O>): O[] {
  return list.reduce((items, input) => {
    const opt = fn(input);
    if (opt.isSome()) {
      items.push(opt.unwrap());
    }
    return items;
  }, <Array<O>> []);
}

export function findIndex<I>(list: I[], fn: (x: I) => boolean): Option<number> {
  const index = list.findIndex(fn);
  if (index > -1) {
    return Some(index);
  }
  return None;
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

/**
 * Given an object and a function, return a new object that returns the new entry
 * for each key, value pair
 */
export function mapObjectEntries<T, O>(
  obj: { [key: string]: T },
  fn: (value: T, key: string) => [string, O],
): { [key: string]: O } {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => fn(v, k)),
  );
}

export function last<T>(l: T[]): T | undefined {
  return l[l.length - 1];
}

export default {
  /**
   * Looks for and returns the first encountered taxonomy node.
   * @param core
   * @param node - any node in the
   * @returns
   */
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
  /**
   * Loads all the vocabularies (as nodes) defined for the contextType node.
   * @param core
   * @param contentType
   * @returns
   */
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

  isTypeNamed,
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

export class InvalidVariantError<T> extends Error {
  constructor(value: unknown, variants: T[]) {
    const msg = `Invalid value "${value}". Expected one of ${
      variants.join(",")
    }`;
    super(msg);
  }
}

export function parseEnum<T>(possibleVariant: unknown, variants: T[]): T {
  const index = variants.indexOf(possibleVariant as T);
  if (index > -1) {
    return variants[index];
  }

  throw new InvalidVariantError(possibleVariant, variants);
}
