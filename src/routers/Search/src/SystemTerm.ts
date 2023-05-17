import { assert, filterMap, mapObject } from "./Utils";
// import type {
//   ModelTransformation,
// } from "webgme-transformations/dist/common/index";

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
  private namePath: string[];
  private transformation: ModelTransformation | undefined;

  constructor(
    namePath: string[],
    transformation: ModelTransformation | undefined,
  ) {
    this.namePath = namePath;
    this.transformation = transformation;
  }

  async instantiate(uploadContext: UploadContext): Promise<any[]> {
    let tags = [];

    if (this.transformation) {
      const gmeContext = await uploadContext.toGMEContext();
      const outputs = await this.transformation.apply(gmeContext);
      const typeDict = uploadContext.getMetaDict();
      tags.push(
        ...outputs.map((output) => SystemTerm.createTag(typeDict, output)),
      );
    } else {
      const tag: object = {};
      tags.push(tag);
    }
    console.log(tags);
    return tags.map((innerTag) =>
      SystemTerm.fullyQualify(this.namePath, innerTag)
    );
  }

  static fullyQualify(namePath: string[], data: object) {
    return namePath.reverse().reduce((data, name) => {
      const tag: { [key: string]: object } = {};
      tag[name] = data;
      return tag;
    }, data);
  }

  static createTag(typeDict: TypeDict, nodeJson: JsonNode): object {
    const tag = {};
    // TODO: should I support a "short-hand" where the attributes are just added directly to the node?
    console.log("creating tag from", nodeJson);
    nodeJson.children.forEach((child) =>
      SystemTerm.addFieldToTag(typeDict, tag, child)
    );

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
      if (name !== "name") {
        const fieldJson = new JsonNode(`attr:${name}`);
        fieldJson.attributes.name = Primitive.from(name);
        fieldJson.attributes.value = wrappedValue;
        if (defaultFieldPath) {
          fieldJson.pointers.base = defaultFieldPath;
        }
        console.log("base", defaultFieldPath);
        SystemTerm.addFieldToTag(typeDict, tag, fieldJson);
      }
    });
    console.log("tag!!", tag);
    return tag;
  }

  static addFieldToTag(typeDict: TypeDict, tag: Tag, nodeJson: JsonNode) {
    console.log("base", nodeJson.pointers.base);
    const typeName = typeDict[nodeJson.pointers.base];
    console.log("getting name of", nodeJson, typeName);
    const name = unwrapPrimitive(nodeJson.attributes.name);
    const isPrimitiveField = [
      "TextField",
      "IntegerField",
      "FloatField",
      "BooleanField",
    ].includes(typeName);

    if (isPrimitiveField) {
      console.log("getting value of", nodeJson, typeName);
      tag[name] = unwrapPrimitive(nodeJson.attributes.value);
    } else if (typeName === "EnumField") {
      throw new Error("todo");
    } else if (typeName === "SetField") {
      throw new Error("todo");
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
      console.log(
        core.getAttribute(node, "name"),
        core.getAttribute(baseType, "name"),
      );
      path.unshift(node);
      const parent = core.getParent(node);
      if (!parent) break;
      node = parent;
      baseType = core.getBaseType(node);
    }
    return path;
  }

  static async from(
    core: GmeClasses.Core,
    node: Core.Node,
  ): Promise<SystemTerm> {
    console.log(core.getPath(node));
    const namePath: string[] = filterMap(
      SystemTerm.getPathToTaxRoot(core, node),
      (node) => core.getAttribute(node, "name")?.toString(),
    );

    // Get the transformation
    let transformation;
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
      console.log("error! missing data");
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
  private core: GmeClasses.Core;
  private contentType: Core.Node;
  private content: GMENode;
  private project: GMENode;
  private metaDict: TypeDict | undefined;

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
    // FIXME: uncomment the following line
    //this.content.pointers.someType = contentTypeIdx;
    // TODO: add tags
    // TODO: add files

    // Add project metadata
    await addChild(this.project, "ProjectMetadata");

    // Add extra system info
    const date = new Date();
    const system = new GMENode("@tmp/system", {
      time: Primitive.from(date.toISOString()),
    });
    await addChild(system, "System");

    const gmeContext = new GMEContext(nodes);
    gmeContext.validate();

    return gmeContext;
  }

  getMetaDict(): TypeDict {
    if (!this.metaDict) {
      this.metaDict = mapObject(
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

    return this.metaDict;
  }

  static builder(): UploadContextBuilder {
    return new UploadContextBuilder();
  }
}

// FIXME: move this to the webgme-transformations lib
function unwrapPrimitive(primitive: Primitive.Primitive) {
  console.log("prim:", primitive);
  return Object.values(primitive).pop();
}
