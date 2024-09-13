import { GmeCore, GuidTags, HumanReadableTags } from "./types";
import { mapObjectEntries, toString } from "./Utils";
import { getName } from "./GmeHelpers";

/**
 * This converts to and from a human-readable format for tags. Specifically, this will replace the GUIDs
 * with display names for all the terms and properties.
 */
export default class TagFormatter {
  private taxonomy: TaxonomyJson;
  constructor(taxonomy: TaxonomyJson) {
    this.taxonomy = taxonomy;
  }

  /**
   * Convert the given tags to GUID format. If `guid` is provided, use
   * that for the top-level tag.
   */
  toGuidFormat(tags: HumanReadableTags): GuidTags {
    return this._toGuidFormat(this.taxonomy, tags);
  }

  _findTagNode(parentNode: TaxonomyJson, tagName: string): TaxonomyJson {
    const node = parentNode.children.find(
      (child) => child.attributes.name === tagName,
    );
    if (node === undefined) throw new TagNotFoundError(tagName);
    return node;
  }

  _toGuidFormat(node: TaxonomyJson, tag: HumanReadableTags, currentTag = {}) {
    return mapObjectEntries(tag, (data, name) => {
      const tagNode = this._findTagNode(node, name.trim());
      const tagData = this._convertTagData(
        data,
        (datum: HumanReadableTags) =>
          this._toGuidFormat(tagNode, datum, currentTag),
      );
      return [tagNode.guid, tagData];
    });
  }

  toHumanFormat(tags: GuidTags): HumanReadableTags {
    const nodesByGuid = Object.fromEntries(
      this._allNodes(this.taxonomy).map((node) => [node.guid, node]),
    );
    return this._toHumanFormat(tags, nodesByGuid);
  }

  private _allNodes(node: TaxonomyJson): TaxonomyJson[] {
    const children = node.children || [];
    return [node, ...children.flatMap((child) => this._allNodes(child))];
  }

  private _toHumanFormat(
    tag: GuidTags,
    nodesByGuid: { [guid: string]: TaxonomyJson },
  ): HumanReadableTags {
    return mapObjectEntries(tag, (data, guid) => {
      const tagNode = nodesByGuid[guid];
      if (!tagNode) {
        throw new NodeNotFoundError(guid);
      }
      const tagData = this._convertTagData(
        data,
        (datum: GuidTags) => this._toHumanFormat(datum, nodesByGuid),
      );

      return [tagNode.attributes.name, tagData];
    });
  }

  private _convertTagData(
    data: { [k: string]: any },
    fn: (a: any) => any,
  ): { [k: string]: any } {
    if (Array.isArray(data)) {
      return data.map((datum) => fn(datum));
    } else if (typeof data === "object") {
      return fn(data);
    } else {
      return data;
    }
  }

  static async from(core: GmeCore, taxonomyRoot: Core.Node) {
    const load: (n: Core.Node) => Promise<TaxonomyJson> = async (node) => {
      const metaType = core.getBaseType(node);
      const base = core.getBase(node);
      if (base && base !== metaType) { // ensure we export the prototype
        return await load(base);
      }

      const children = await core.loadChildren(node);
      return {
        guid: core.getGuid(node),
        attributes: {
          name: getName(core, node),
        },
        children: await Promise.all(children.map(load)),
      };
    };

    // TODO: Consider using built-in traverse
    // TODO: Consider caching this..
    const taxonomy = await load(taxonomyRoot);
    return new TagFormatter(taxonomy);
  }
}

export interface TaxonomyJson {
  guid: string;
  attributes: { [attr: string]: string };
  children: TaxonomyJson[];
}

export class FormatError extends Error {}
class TagNotFoundError extends FormatError {
  constructor(tagName: string) {
    super(`Tag not found: ${tagName}`);
  }
}

class NodeNotFoundError extends FormatError {
  constructor(guid: string) {
    super(`Could not find tag with GUID: ${guid}`);
  }
}

export function assert(cond: boolean, err: Error) {
  if (!cond) throw err;
}
