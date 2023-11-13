/**
 * This generates a schema of the taxonomy as required by the search dashboard. The format is basically:
 *
 *     {
 *       "id": "GUID",
 *       "name": "display name",
 *       "type": "meta name",
 *       "children": [...child nodes]
 *     }
 */
import { GmeCore, VerifiedProjectContext } from "./types";
import Utils, { toString } from "./Utils";

export interface VocabularyConfig {
  id: string;
  name: string;
  type: string;
  children: VocabularyConfig[];
}

class VocabExporter {
  private core: GmeCore;

  constructor(core: GmeCore) {
    this.core = core;
  }

  async toSchema(node: Core.Node): Promise<VocabularyConfig> {
    const base = this.core.getBaseType(node);
    const prototype = this.getPrototype(node);
    const children = await this.core.loadChildren(node);

    return {
      id: this.core.getGuid(prototype),
      name: toString(this.core.getAttribute(node, "name")),
      type: toString(this.core.getAttribute(base, "name")),
      children: await Promise.all(
        children
          .filter((child) => !this.isTransformation(child))
          .map((child) => this.toSchema(child)),
      ),
    };
  }

  isTransformation(node: Core.Node): boolean {
    const base = this.core.getBaseType(node);
    let iternode = base;

    while (iternode) {
      if (this.core.getAttribute(iternode, "name") === "Transformation") {
        return true;
      }
      iternode = this.core.getBase(iternode);
    }
    return false;
  }

  getPrototype(node: Core.Node): Core.Node {
    const base = this.core.getBaseType(node);

    while (this.core.getBase(node) !== base) {
      // This cannot be null. If `getBase` is null, then getBaseType must be null
      // and we know they aren't equal. If the first call is null, the provided node
      // will be returned.
      node = this.core.getBase(node) as Core.Node;
    }

    return node;
  }
}

export class ContentTypeConfiguration {
  nodePath: string;
  name: string;
  vocabularies: VocabularyConfig[];
  content: ContentTypeConfiguration | undefined;

  constructor(
    nodePath: string,
    name: string,
    vocabularies: VocabularyConfig[],
    childContent: ContentTypeConfiguration | undefined,
  ) {
    this.nodePath = nodePath;
    this.name = name;
    this.vocabularies = vocabularies;
    this.content = childContent;
  }

  static async from(
    core: GmeCore,
    contentTypeNode: Core.Node,
  ): Promise<ContentTypeConfiguration> {
    const name = core.getAttribute(contentTypeNode, "name");
    const exporter = new VocabExporter(core);
    // FIXME: remove this
    const vocabNodes = await Utils.getVocabulariesFor(core, contentTypeNode);
    const vocabularies = await Promise.all(
      vocabNodes.map((node) => exporter.toSchema(node)),
    );

    // TODO: check for a content type
    const children = await core.loadChildren(contentTypeNode);
    const childTypeNode = children.find((node) =>
      Utils.isTypeNamed(core, node, "Content Type")
    );
    const childType = !!childTypeNode
      ? await ContentTypeConfiguration.from(core, childTypeNode)
      : undefined;

    const nodePath = core.getPath(contentTypeNode);
    return new ContentTypeConfiguration(
      nodePath,
      toString(name),
      vocabularies,
      childType,
    );
  }
}

export interface DashboardConfig {
  name: string;
  content: ContentTypeConfiguration;
  project?: VerifiedProjectContext;
  contentTypePath?: string; // FIXME: is this needed?
}

export default class DashboardConfiguration {
  // TODO: update this to be recursive
  // each content type defines:
  //  - nested content type
  //  - vocabularies
  static async from(
    core: GmeCore,
    contentTypeNode: Core.Node,
  ): Promise<DashboardConfig> {
    const content = await ContentTypeConfiguration.from(
      core,
      contentTypeNode,
    );

    return {
      name: content.name, // TODO: allow other names?
      content: content,
    };
  }
}
