/**
 * This converts to and from a human-readable format for tags. Specifically, this will replace the GUIDs with display names for all the terms and properties.
 */
function factory() {
  class TagFormatter {
    constructor(nodeNameDict, nodeGuidLookup) {
      this.nodeNameDict = nodeNameDict;
      this.nodeGuidLookup = nodeGuidLookup;
    }

    toGuidFormat(tag, guid = null) {
      // TODO: we need an optional 2nd arg for resolving `tag.Tag` to the correct node
      const data = omit(tag, "Tag");
      if (!guid) {
        guid = this.nodeGuidLookup.getGuid(tag.Tag, data);
      }

      const entries = Object.entries(data);
      // TODO: given a property (or parent name), resolve it to a GUID
      // TODO: given a property (or parent name), resolve it to a GUID
      const guidTag = Object.fromEntries(
        entries.map(([name, data]) => {
          const propertyGuid = this.nodeGuidLookup.getPropertyGuid(guid, name);
          if (isObject(data)) {
            data = this.toGuidFormat(data, propertyGuid);
          }

          return [propertyGuid, data];
        })
      );

      guidTag.ID = guid;
      return guidTag;
    }

    toHumanFormat(tag) {
      const entries = Object.entries(tag).filter(([k]) => k !== "ID");
      const humanReadable = Object.fromEntries(
        entries.map(([guid, data]) => {
          const name = this.nodeNameDict[guid];
          const newData = isObject(data) ? this.toHumanFormat(data) : data;
          return [name, newData];
        })
      );
      humanReadable.Tag = this.nodeNameDict[tag.ID];
      return humanReadable;
    }

    static async from(core, taxonomyRoot) {
      // Construct the lookup tables for the display names and GUIDs
      const nodes = await core.loadSubtree(taxonomyRoot);
      const namedNodes = nodes.map((node) => [
        core.getAttribute(node, "name"),
        core.getGuid(node),
        node,
      ]);

      const nodeNameDict = Object.fromEntries(
        namedNodes.map(([name, guid]) => [guid, name])
      );

      // Construct the lookup table for the GUID (given the name).
      // The key may not be unique so the data structure is a little more involved.
      // TODO
      // For each node, record the GUID, property names, and parent name?
      const nodeGuidLookup = await NodeGuidLookupTable.from(core, namedNodes);
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
      if (matchingNames.length > 1) {
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

    static async from(core, namedNodes) {
      namedNodes.map(([name, guid, node]) => {
        //TODO: how to disambiguate btwn nodes with the same name? Possibilities:
        //  - parent names
        //  - property names
        //const parent = core.getParent(node);
        //const parentName = core.getAttribute(parent, 'name');
        [name, guid];
      });
    }
  }

  function isObject(thing) {
    return thing && typeof thing === "object" && !Array.isArray(thing);
  }

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
