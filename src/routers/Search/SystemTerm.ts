import { assert, filterMap } from "./Utils";

import type UploadContext from "./UploadContext";
import {
  JsonNode,
  ModelTransformation,
  Primitive,
} from "webgme-transformations";

type TypeDict = { [path: string]: string };
type Tag = { [path: string]: any };
export default class SystemTerm {
  name: string;
  private namePath: string[];
  private transformation: ModelTransformation | undefined;

  constructor(
    namePath: string[],
    transformation: ModelTransformation | undefined,
  ) {
    this.namePath = namePath;
    this.name = this.namePath[this.namePath.length - 1];
    this.transformation = transformation;
  }

  async createTags(uploadContext: UploadContext): Promise<Tag[]> {
    let tags = [];

    if (this.transformation) {
      const gmeContext = uploadContext.gmeContext;
      const outputs = await this.transformation.apply(gmeContext);
      tags.push(
        ...outputs.map((output) =>
          SystemTerm.createTag(uploadContext.typeDict, output)
        ),
      );
    } else {
      const tag: Tag = {};
      tags.push(tag);
    }
    return tags.map((innerTag) => Term.fullyQualify(this.namePath, innerTag));
  }

  static createTag(typeDict: TypeDict, nodeJson: JsonNode): object {
    const tag = {};
    const isShortHand = nodeJson.children.length === 0;
    if (isShortHand) {
      // Support a sort of shorthand for primitive fields; ie, convert all non-name attributes
      // set on the node to fields on the tag
      const defaultFieldPath = Object.keys(typeDict).find((k) =>
        typeDict[k] === "TextField"
      );
      assert(
        defaultFieldPath !== undefined,
        "Could not find TextField in the metamodel",
      );
      Object.entries(nodeJson.attributes).forEach(([name, wrappedValue]) => {
        const fieldJson = new JsonNode(`attr:${name}`);
        fieldJson.attributes.name = name;
        fieldJson.attributes.value = wrappedValue;
        if (defaultFieldPath) {
          fieldJson.pointers.base = defaultFieldPath;
        }
        SystemTerm.addFieldToTag(typeDict, tag, fieldJson);
      });
    } else {
      nodeJson.children.forEach((child) =>
        SystemTerm.addFieldToTag(typeDict, tag, child)
      );
    }

    return tag;
  }

  static addFieldToTag(typeDict: TypeDict, tag: Tag, nodeJson: JsonNode) {
    const typeName = typeDict[nodeJson.pointers.base];
    const name = unwrapPrimitive(nodeJson.attributes.name);
    const isPrimitiveField = [
      "TextField",
      "IntegerField",
      "FloatField",
      "BooleanField",
    ].includes(typeName);

    if (isPrimitiveField) {
      tag[name] = unwrapPrimitive(nodeJson.attributes.value);
    } else if (typeName === "EnumField") {
      const enumOpt = nodeJson.children[0];
      if (enumOpt) {
        const optName = unwrapPrimitive(enumOpt.attributes.name);
        tag[name] = {};
        tag[name][optName] = SystemTerm.createTag(
          typeDict,
          enumOpt,
        );
      }
    } else if (typeName === "SetField") {
      const members = nodeJson.children;
      tag[name] = members.map((member: JsonNode) => {
        const name = unwrapPrimitive(member.attributes.name);
        const tag: Tag = {};
        tag[name] = SystemTerm.createTag(
          typeDict,
          member,
        );
        return tag;
      });
    } else if (typeName === "CompoundField") {
      const value = SystemTerm.createTag(typeDict, nodeJson);
      tag[name] = value;
    } else {
      throw new Error(`Unknown field type: ${typeName}`);
    }

    // TODO: set pointers?
    return tag;
  }

  static getPathToTaxRoot(core: GmeClasses.Core, node: Core.Node): Core.Node[] {
    let path = [];
    let baseType = core.getBaseType(node);

    while (baseType && core.getAttribute(baseType, "name") !== "Taxonomy") {
      path.unshift(node);
      const parent = core.getParent(node);
      if (!parent) break;
      node = parent;
      baseType = core.getBaseType(node);
    }
    return path;
  }

  static getPrototype(core: GmeClasses.Core, node: Core.Node): Core.Node {
    const metaNode = core.getBaseType(node);
    let proto = node;
    let next = proto;
    while (next !== metaNode) {
      const base = core.getBase(proto);
      if (!base) break;
      proto = next;
      next = base;
    }

    return proto;
  }

  static async from(
    core: GmeClasses.Core,
    node: Core.Node,
  ): Promise<SystemTerm> {
    const namePath: string[] = filterMap(
      SystemTerm.getPathToTaxRoot(core, SystemTerm.getPrototype(core, node)),
      (node) => core.getAttribute(node, "name")?.toString(),
    );

    // Get the transformation
    let transformation: ModelTransformation | undefined;
    const children = await core.loadChildren(node);
    const transformNode = children.find((node) => {
      const base = core.getBase(node);
      return base && core.getAttribute(base, "name") === "Transformation";
    });

    if (transformNode) {
      transformation = await ModelTransformation.fromNode(
        core,
        transformNode,
      );
    }

    return new SystemTerm(namePath, transformation);
  }

  static async findAll(
    core: GmeClasses.Core,
    vocabContainer: Core.Node,
  ): Promise<SystemTerm[]> {
    const systemTermNode = Object.values(
      core.getAllMetaNodes(vocabContainer),
    )
      .find((node) => core.getAttribute(node, "name") === "SystemTerm");

    if (!systemTermNode) {
      return [];
    }

    const vocabs = await core.loadChildren(vocabContainer);
    const rootTerms = await Promise.all(
      vocabs.map((v) => core.loadChildren(v)),
    );
    const nodes = rootTerms.flat()
      .filter((node) => core.isTypeOf(node, systemTermNode));

    return await Promise.all(nodes.map((n) => SystemTerm.from(core, n)));
  }
}

namespace Term {
  export function fullyQualify(namePath: string[], data: Tag): Tag {
    return namePath.reverse().reduce((data, name) => {
      const tag: Tag = {};
      tag[name] = data;
      return tag;
    }, data);
  }
}

// FIXME: move this to the webgme-transformations lib
function unwrapPrimitive(primitive: Primitive.Primitive) {
  if (typeof primitive === "object") {
    return Object.values(primitive).pop();
  } else { // FIXME: constants in the pattern are not wrapped currently..
    return primitive;
  }
}
