/**
 * This converts to and from a human-readable format for tags. Specifically, this will replace the GUIDs with display names for all the terms and properties.
 */
function factory() {
  class TagFormatter {
    constructor(nodeNameDict, nodeGuidLookup) {
      this.nodeNameDict = nodeNameDict;
      this.nodeGuidLookup = nodeGuidLookup;
    }

    /**
     * Convert the given tags to GUID format. If `guid` is provided, use
     * that for the top-level tag.
     */
    toGuidFormat(tags) {
      return tags.map(tag => this._toGuidFormat(tag));
    }

    _toGuidFormat(tag, guid = null) {
      const data = omit(tag, "Tag");
      if (!guid) {
        guid = this.nodeGuidLookup.getGuid(tag.Tag, data);
      }

      const entries = Object.entries(data);
      // given a property (or parent name), resolve it to a GUID
      const guidTag = Object.fromEntries(
        entries.map(([name, data]) => {
          const propertyGuid = this.nodeGuidLookup.getPropertyGuid(guid, name);
          if (isObject(data)) {
            data = this._toGuidFormat(data, propertyGuid);
          }

          return [propertyGuid, data];
        })
      );

      guidTag.ID = guid;
      return guidTag;
    }

    toHumanFormat(tags) {
      return tags.map(tag => this._toHumanFormat(tag));
    }

    _toHumanFormat(tag) {
      const entries = Object.entries(tag).filter(([k]) => k !== "ID");
      const humanReadable = Object.fromEntries(
        entries.map(([guid, data]) => {
          const name = this.nodeNameDict[guid];
          const newData = isObject(data) ? this._toHumanFormat(data) : data;
          return [name, newData];
        })
      );
      humanReadable.Tag = this.nodeNameDict[tag.ID];
      return humanReadable;
    }

    static async from(core, taxonomyRoot) {
      // Construct the lookup tables for the display names and GUIDs
      const nodes = await core.loadSubTree(taxonomyRoot);
      const namesAndGuids = nodes.map((node) => [
        core.getAttribute(node, "name"),
        core.getGuid(node),
      ]);

      const nodeNameDict = Object.fromEntries(
        namesAndGuids.map(([name, guid]) => [guid, name])
      );

      // Construct the lookup table for the GUID (given the name).
      // The key may not be unique so the data structure is a little more involved.
      const propsForGuid = await Promise.all(
        nodes.map(async (node) => {
          const children = await core.loadChildren(node);
          const properties = children.filter((node) => !isTerm(core, node));
          const propertyDict = Object.fromEntries(
            properties.map((node) => [
              core.getAttribute(node, "name"),
              core.getGuid(node),
            ])
          );
          return [core.getGuid(node), propertyDict];
        })
      );
      const nodeGuidLookup = new NodeGuidLookupTable(
        namesAndGuids,
        Object.fromEntries(propsForGuid)
      );
      return new TagFormatter(nodeNameDict, nodeGuidLookup);
    }
  }

  class NodeGuidLookupTable {
    constructor(guidList, tagProperties) {
      this.guidList = guidList;
      this.tagProperties = tagProperties;
    }

    getGuid(tagName, data) {
      //const properties = Object.keys(data).filter(k => k !== 'Tag');
      const matchingNames = this.guidList.filter(([name /*, guid*/]) => {
        return (
          tagName === name
        ); /*&& setEquals(this.getProperties(guid), properties)*/
      });
      if (matchingNames.length === 0) {
        throw new TagNotFoundError(tagName);
      } else if (matchingNames.length > 1) {
        throw new Error(
          `Resolving ambiguous taxonomy terms is currently unsupported (${tagName})`
        );
      }

      const [, guid] = matchingNames[0];
      return guid;
    }

    getPropertyGuid(guid, propertyName) {
      return this.tagProperties[guid][propertyName];
    }
  }

  function isObject(thing) {
    return thing && typeof thing === "object" && !Array.isArray(thing);
  }
  function isTerm(core, node) {
    let basenode = core.getMetaType(node);
    while (basenode) {
      if (core.getAttribute(basenode, "name") === "Term") {
        return true;
      }
      basenode = core.getBase(basenode);
    }

    return false;
  }

  class FormatError extends Error {}
  class TagNotFoundError extends FormatError {
    constructor(tagName) {
      super(`Tag not found: ${tagName}`);
    }
  }

  TagFormatter.FormatError = FormatError;
  function omit(obj, ...keys) {
    return Object.fromEntries(
      Object.entries(obj).filter(([k /*v*/]) => !keys.includes(k))
    );
  }

  TagFormatter.GuidLookupTable = NodeGuidLookupTable;
  return TagFormatter;
}

if (typeof define !== "undefined") {
  define([], factory);
} else {
  module.exports = factory();
}
