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
import type { GmeCore, VerifiedProjectContext } from "./types";
import Utils, { getPrototype, toString } from "./Utils";

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
    const prototype = getPrototype(this.core, node);
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
}

export class ContentTypeConfiguration {
  nodePath: string;
  name: string;
  namePlural: string;
  documentation: string;
  vocabularies: VocabularyConfig[];
  content?: ContentTypeConfiguration;

  constructor(
    nodePath: string,
    name: string,
    namePlural: string,
    documentation: string,
    vocabularies: VocabularyConfig[],
    childContent: ContentTypeConfiguration | undefined,
  ) {
    this.nodePath = nodePath;
    this.name = name;
    this.namePlural = namePlural;
    this.documentation = documentation;
    this.vocabularies = vocabularies;
    this.content = childContent;
  }

  static async from(
    core: GmeCore,
    contentTypeNode: Core.Node,
  ): Promise<ContentTypeConfiguration> {
    const name = toString(core.getAttribute(contentTypeNode, "name"));
    const documentation = toString(
      core.getAttribute(contentTypeNode, "documentation"),
    );
    const namePlural = core.getAttribute(contentTypeNode, "namePlural")
      ? toString(core.getAttribute(contentTypeNode, "namePlural"))
      : name + "s";

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
      name,
      namePlural,
      documentation,
      vocabularies,
      childType,
    );
  }
}

export interface DashboardConfig {
  name: string;
  documentation?: string;
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
      documentation: content.documentation, // This is Markdown text explaining the content-type
    };
  }
}
