import { assert, filterMap, mapObject } from "./Utils";

import {
  GMEContext,
  GMENode,
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
      const gmeContext = await uploadContext.toGMEContext();
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

// The upload content used to instantiate the system terms
class UploadContextBuilder {
  private core?: GmeClasses.Core;
  private contentType?: Core.Node;
  private content?: GMENode;
  private project?: GMENode;

  withContent(
    name: string,
    description: string,
    tags: any[],
    files: any[],
  ): UploadContextBuilder {
    this.content = new GMENode("@tmp/content", {
      name: Primitive.from(name),
      description: Primitive.from(description),
    });
    // TODO: handle tags, files
    return this;
  }

  withContentType(
    core: GmeClasses.Core,
    contentType: Core.Node,
  ): UploadContextBuilder {
    this.contentType = contentType;
    this.core = core;
    return this;
  }

  withProject(
    id: string,
    commit: string,
    branch: string | undefined,
    tag: string | undefined,
  ): UploadContextBuilder {
    const [owner, name] = id.split("+");
    this.project = new GMENode("@tmp/project", {
      ID: Primitive.from(id),
      owner: Primitive.from(owner),
      name: Primitive.from(name),
      commit: Primitive.from(commit),
      branch: branch && Primitive.from(branch),
      tag: tag && Primitive.from(tag),
    });
    return this;
  }

  build(): UploadContext {
    if (!this.core || !this.contentType || !this.content || !this.project) {
      const missingFields = filterMap(
        Object.entries({
          contentType: this.contentType,
          content: this.content,
          project: this.project,
        }),
        ([name, value]) => {
          if (!value) {
            return name;
          }
        },
      );
      throw new Error("Missing fields " + missingFields.join(" "));
    }
    // TODO: set the pointers?

    return new UploadContext(
      this.core,
      this.contentType,
      this.content,
      this.project,
    );
  }
}

export class UploadContext {
  private readonly core: GmeClasses.Core;
  private readonly contentType: Core.Node;
  private readonly content: GMENode;
  private readonly project: GMENode;
  readonly typeDict: TypeDict; // Node path to type name

  constructor(
    core: GmeClasses.Core,
    contentType: Core.Node,
    content: GMENode,
    project: GMENode,
  ) {
    this.core = core;
    this.contentType = contentType;
    this.content = content;
    this.project = project;

    this.typeDict = mapObject(
      this.core.getAllMetaNodes(this.contentType),
      (node: Core.Node) => {
        const name = this.core.getAttribute(node, "name");
        if (name) {
          return name.toString();
        }
        return "";
      },
    );
  }

  async toGMEContext(): Promise<GMEContext> {
    // Create a dictionary of metanodes by name for later
    const metaEntries = filterMap(
      Object.values(this.core.getAllMetaNodes(this.contentType)),
      (node) => {
        const nameAttr = this.core.getAttribute(node, "name");
        if (nameAttr) {
          return [nameAttr.toString(), node];
        }
      },
    );
    const metaDict = Object.fromEntries(metaEntries);

    // Add UploadContext node (active node)
    const context = new GMENode("@tmp");
    context.setActiveNode();
    const nodes: GMENode[] = [context];
    context.pointers.base = 1;

    if (!metaDict.UploadContext) {
      // TODO:
    }

    await GMEContext.addNode(this.core, metaDict.UploadContext, nodes);

    // helper for adding children
    const addChild = async (
      child: GMENode,
      typeName: string,
      parent: GMENode = context,
    ) => {
      const index = nodes.length;
      nodes.push(child);
      parent.children.push(index);

      const baseType = metaDict[typeName];
      if (!baseType) {
        throw new Error("Could not find " + baseType); // FIXME: better errors
      }
      let baseTypeIndex = nodes.findIndex((node) => node === baseType);
      if (baseTypeIndex === -1) {
        baseTypeIndex = await GMEContext.addNode(this.core, baseType, nodes);
      }
      child.pointers.base = baseTypeIndex;
    };

    // Add content
    await addChild(this.content, "UploadContent");
    const contentTypePath = this.core.getPath(this.contentType);
    let contentTypeIdx = nodes.findIndex((node) => node.id === contentTypePath);
    if (contentTypeIdx === -1) {
      contentTypeIdx = await GMEContext.addNode(
        this.core,
        this.contentType,
        nodes,
      );
    }
    this.content.pointers.type = contentTypeIdx;
    // TODO: add tags
    // TODO: add files

    // Add project metadata
    await addChild(this.project, "ProjectMetadata");

    // Add extra system info
    const date = new Date();
    const system = new GMENode("@tmp/system", {
      isoDateTime: Primitive.from(date.toISOString()),
    });
    await addChild(system, "System");

    const gmeContext = new GMEContext(nodes);
    gmeContext.validate();

    return gmeContext;
  }

  static builder(): UploadContextBuilder {
    return new UploadContextBuilder();
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
