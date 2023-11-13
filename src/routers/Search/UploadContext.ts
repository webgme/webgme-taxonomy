import { filterMap, OptionDict } from "./Utils";
import { GMEContext, GMENode, Primitive } from "webgme-transformations";
import { VerifiedProjectContext } from "../../common/types";
import { mapObject } from "../../common/Utils";

type TypeDict = { [path: string]: string }; // FIXME: don't duplicate this

export interface FileUpload {
  path: string;
  // TODO: add the hash?
}

export interface UploadContextData {
  name: string;
  description: string;
  tags: any[];
  files: FileUpload[];
  project: VerifiedProjectContext;
  core: GmeClasses.Core;
  contentType: Core.Node;
  userId: string;
  uri?: string;
}

interface ProjectAttributes {
  ID: Primitive.Primitive;
  owner: Primitive.Primitive;
  name: Primitive.Primitive;
  commit: Primitive.Primitive;
  tag?: Primitive.Primitive;
  branch?: Primitive.Primitive;
}

export default class UploadContext {
  private readonly core: GmeClasses.Core;
  private readonly contentType: Core.Node;
  readonly typeDict: TypeDict; // Node path to type name
  readonly gmeContext: GMEContext;

  constructor(
    core: GmeClasses.Core,
    contentType: Core.Node,
    gmeContext: GMEContext,
  ) {
    this.core = core;
    this.contentType = contentType;
    this.gmeContext = gmeContext;

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

  static async from(data: UploadContextData): Promise<UploadContext> {
    const content = new GMENode("@tmp/content", {
      name: Primitive.from(data.name),
      description: Primitive.from(data.description),
    });
    // TODO: handle tags
    const files = data.files.map((fdata, i) =>
      new GMENode(`@tmp/content/file_${i}`, {
        path: Primitive.from(fdata.path),
      })
    );

    const [owner, name] = data.project.id.split("+");
    const attrs: ProjectAttributes = {
      ID: Primitive.from(data.project.id),
      owner: Primitive.from(owner),
      name: Primitive.from(name),
      commit: Primitive.from(data.project.commit),
    };

    if ("branch" in data.project) {
      attrs.branch = Primitive.from(data.project.branch);
    }
    if ("tag" in data.project) {
      attrs.tag = Primitive.from(data.project.tag);
    }
    const project = new GMENode("@tmp/project", attrs);
    let location: GMENode | undefined;
    if (data.uri) {
      location = new GMENode("@tmp/location", {
        URI: Primitive.from(data.uri),
      });
    }

    const gmeContext = await getGMEContext(
      project,
      content,
      location,
      files,
      data.core,
      data.contentType,
      Primitive.from(data.userId),
    );
    return new UploadContext(
      data.core,
      data.contentType,
      gmeContext,
    );
  }
}

/**
 * Create a dictionary of metanodes by name
 */
function getMetaNodeDict(
  core: GmeClasses.Core,
  node: Core.Node,
): OptionDict<Core.Node> {
  const metaEntries = filterMap(
    Object.values(core.getAllMetaNodes(node)),
    (node) => {
      const nameAttr = core.getAttribute(node, "name");
      if (nameAttr) {
        return [nameAttr.toString(), node];
      }
    },
  );
  return new OptionDict(
    Object.fromEntries(metaEntries),
  );
}

/**
 * Helper method to add a node of a given type to a GME context (list of nodes).
 */
async function addChildToContext(
  core: GmeClasses.Core,
  nodes: GMENode[],
  child: GMENode,
  baseType: Core.Node,
  parent: GMENode,
) {
  const index = nodes.length;
  nodes.push(child);
  parent.children.push(index);

  let baseTypeIndex = nodes.findIndex((node) =>
    node.id === core.getPath(baseType)
  );
  if (baseTypeIndex === -1) {
    baseTypeIndex = await GMEContext.addNode(core, baseType, nodes);
  }
  child.pointers.base = baseTypeIndex;
}

async function getGMEContext(
  project: GMENode,
  content: GMENode,
  location: GMENode | undefined,
  files: GMENode[],
  core: GmeClasses.Core,
  contentType: Core.Node,
  userId: Primitive.Primitive,
): Promise<GMEContext> {
  const metaDict = getMetaNodeDict(core, contentType);

  // Add UploadContext node (active node)
  // This doesn't use the helper method since it doesn't actually
  // have a parent node (hence the "@tmp" path)
  const context = new GMENode("@tmp", { userId });
  context.setActiveNode();
  const nodes: GMENode[] = [context];
  context.pointers.base = 1; // FIXME: this depends on if the next one exists

  await metaDict.get("UploadContext")
    .map((metaNode) => GMEContext.addNode(core, metaNode, nodes))
    .unwrapOrElse(() => Promise.resolve(0));

  // Add content

  await metaDict.get("UploadContent")
    .map((metaNode) =>
      addChildToContext(
        core,
        nodes,
        content,
        metaNode,
        context,
      )
    )
    .unwrapOrElse(() => Promise.resolve());

  // Add location
  if (location) {
    await metaDict.get("UploadLocation")
      .map((metaNode) =>
        addChildToContext(
          core,
          nodes,
          location,
          metaNode,
          context,
        )
      )
      .unwrapOrElse(() => Promise.resolve());
  }

  // Add files
  await metaDict.get("File").map((metaNode) =>
    files.reduce(async (prevTask, file) => {
      await prevTask;
      return addChildToContext(
        core,
        nodes,
        file,
        metaNode,
        content,
      );
    }, Promise.resolve())
  )
    .unwrapOrElse(() => Promise.resolve());

  // Next, we will add the reference to the content type. Since content types
  // contain the vocabularies which in turn contain transformations, etc, this
  // ends up adding many nodes (1400+ w/ simple models). Realistically, the
  // transformation currently doesn't need to reference children of content types
  // so we will optimize things by simply excluding all these extra nodes.
  //
  // This next section is the old code which captures everything but isn't very
  // performant.

  // const contentTypePath = this.core.getPath(contentType);
  // let contentTypeIdx = nodes.findIndex((node) => node.id === contentTypePath);
  // if (contentTypeIdx === -1) {
  //   contentTypeIdx = await GMEContext.addNode(
  //     core,
  //     contentType,
  //     nodes,
  //   );
  // }

  // Create a shallow copy of the content type node (no children or pointer targets)
  const contentTypeCopy = await GMENode.fromNode(core, contentType);
  const contentTypeIdx = nodes.length;
  nodes.push(contentTypeCopy);

  content.pointers.type = contentTypeIdx;

  // TODO: add tags

  // Add project metadata
  await metaDict.get("ProjectMetadata").map((metaNode) =>
    addChildToContext(
      core,
      nodes,
      project,
      metaNode,
      context,
    )
  )
    .unwrapOrElse(() => Promise.resolve());

  // Add extra system info
  const date = new Date();
  const system = new GMENode("@tmp/system", {
    time: Primitive.from(date.toString()),
    isoDateTime: Primitive.from(date.toISOString()),
  });
  await metaDict.get("System").map((metaNode) =>
    addChildToContext(
      core,
      nodes,
      system,
      metaNode,
      context,
    )
  )
    .unwrapOrElse(() => Promise.resolve());

  const gmeContext = new GMEContext(nodes);
  gmeContext.validate();

  return gmeContext;
}
