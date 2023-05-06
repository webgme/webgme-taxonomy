import { filterMap } from "./Utils";
// import type {
//   ModelTransformation,
// } from "webgme-transformations/dist/common/index";
import { GMEContext, GMENode } from "webgme-transformations/dist/common/index";

type ModelTransformation = any;
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

  async instantiate(uploadContext: UploadContext): Promise<any> {
    const tag: { [key: string]: any } = {};
    const innerTag = this.namePath.reduce((tag, name) => tag[name] = {}, tag);
    if (!this.transformation) {
      return tag;
    }

    const gmeContext = await uploadContext.toGMEContext();
    const outputs = await this.transformation.apply(gmeContext);

    // TODO: ensure outputs is non-empty
    const tagContent = outputs.shift();
    console.log({ tagContent, outputs });

    // TODO: convert the upload context to GME nodes?
    // TODO: run the model transformation
    // TODO: convert to tag JSON
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
    let transformation = null;
    // TODO: Maybe keep the node or guid, too?
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
    this.content = new GMENode("@id:content", {
      name,
      description,
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
    this.project = new GMENode("@id:project", {
      ID: id,
      owner,
      name,
      commit,
      branch,
      tag,
    });
    return this;
  }

  build(): UploadContext {
    if (!this.core || !this.contentType || !this.content || !this.project) {
      // TODO:
      throw new Error();
    }

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

  async toGMEContext(): GMEContext {
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
    const context = new GMENode("@id:context");
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
      parent = context,
    ) => {
      const index = nodes.length;
      nodes.push(child);
      parent.children.push(index);

      const baseType = metaDict[typeName];
      if (!baseType) {
        // TODO
      }
      let baseTypeIndex = nodes.findIndex((node) => node === baseType);
      if (baseTypeIndex === -1) {
        baseTypeIndex = await GMEContext.addNode(this.core, baseType, nodes);
      }
      child.pointers.type = baseTypeIndex;
    };

    // Add content
    await addChild(this.content, "Content Type");
    // TODO: add tags
    // TODO: add files

    // Add project metadata
    await addChild(this.project, "ProjectMetadata");

    // Add extra system info
    const date = new Date();
    const system = new GMENode("@id:system", { time: date.toISOString() });
    await addChild(system, "System");

    return context;
  }

  static builder(): UploadContextBuilder {
    return new UploadContextBuilder();
  }
}
