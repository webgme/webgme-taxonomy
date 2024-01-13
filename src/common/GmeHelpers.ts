import type { GmeCore } from "./types";
import { Option } from "oxide.ts";
import type { Primitive } from "webgme/common";

/**
 * Load children explicitly specifying the type to avoid breaking plugins
 * by adding new types of children to a node.
 */
export async function loadChildren(
  core: GmeCore,
  parent: Core.Node,
  typeName: string,
): Promise<Core.Node[]> {
  const allChildren = await core.loadChildren(parent);
  return allChildren.filter((child) => isTypeNamed(core, child, typeName));
}

export function getAttribute(
  core: GmeCore,
  node: Core.Node,
  attr: string,
): Option<Primitive> {
  return Option.from(core.getAttribute(node, attr))
    // FIXME: is there any scenario where getAttribute would return a node?
    .map((value) => value as Primitive);
}

export function getFloatAttribute(
  core: GmeCore,
  node: Core.Node,
  attr: string,
): Option<number> {
  return getAttribute(core, node, attr)
    .map((value) => parseFloat(value.toString()));
}

export function getIntAttribute(
  core: GmeCore,
  node: Core.Node,
  attr: string,
): Option<number> {
  return getAttribute(core, node, attr)
    .map((value) => parseInt(value.toString()));
}

export function getBoolAttribute(
  core: GmeCore,
  node: Core.Node,
  attr: string,
): Option<boolean> {
  return getAttribute(core, node, attr)
    .map((value) => !!value);
}

export function getStringAttribute(
  core: GmeCore,
  node: Core.Node,
  attr: string,
): Option<string> {
  return getAttribute(core, node, attr)
    .map((value) => value.toString());
}

export function isTypeNamed(
  core: GmeCore,
  node: Core.Node | null,
  typeName: string,
) {
  while (node) {
    if (core.getAttribute(node, "name") === typeName) {
      return true;
    }
    node = core.getBase(node);
  }
  return false;
}
