/**
 * This converts to and from a human-readable format for tags. Specifically, this will replace the GUIDs with display names for all the terms and properties.
 */
function factory(Importer) {
  class TagFormatter {
    constructor(taxonomyWJI) {
      this.taxonomy = taxonomyWJI;
    }

    /**
     * Convert the given tags to GUID format. If `guid` is provided, use
     * that for the top-level tag.
     */
    toGuidFormat(tags) {
      return tags.map((tag) => this._toGuidFormat(this.taxonomy, tag));
    }

    _findTagNode(parentNode, tagName) {
      const node = parentNode.children.find(
        (child) => child.attributes.name === tagName
      );
      assert(node, new TagNotFoundError(tagName));
      return node;
    }

    _toGuidFormat(node, tag, currentTag = {}) {
      return mapObject(tag, (name, data) => {
        const tagNode = this._findTagNode(node, name);
        const isNestedData = typeof data === "object";
        const tagData = isNestedData
          ? this._toGuidFormat(tagNode, data, currentTag)
          : data;

        return [tagNode.guid, tagData];
      });
    }

    toHumanFormat(tags) {
      const nodesByGuid = Object.fromEntries(
        this._allNodes(this.taxonomy).map((node) => [node.guid, node])
      );
      return tags.map((tag) => this._toHumanFormat(tag, nodesByGuid));
    }

    _allNodes(node) {
      const children = node.children || [];
      return [node, ...children.flatMap((child) => this._allNodes(child))];
    }

    _toHumanFormat(tag, nodesByGuid) {
      return mapObject(tag, (guid, data) => {
        const tagNode = nodesByGuid[guid];
        const isNestedData = typeof data === "object";
        const tagData = isNestedData
          ? this._toHumanFormat(data, nodesByGuid)
          : data;

        return [tagNode.attributes.name, tagData];
      });
    }

    static async from(core, taxonomyRoot) {
      const root = core.getRoot(taxonomyRoot);
      const importer = new Importer(core, root);
      const taxonomyWJI = await importer.toJSON(taxonomyRoot);
      return new TagFormatter(taxonomyWJI);
    }
  }

  class NodeNameLookupTable {
    constructor(nodeNameDict, propEnumNames) {
      this.nodeNameDict = nodeNameDict;
      this.propEnumNames = propEnumNames;
    }

    getName(nodeGuid) {
      return this.nodeNameDict[nodeGuid];
    }

    getPropertyValueName(propertyGuid, propertyValue) {
      const valueGuidDict = this.propEnumNames[propertyGuid] || {};
      return valueGuidDict[propertyValue];
    }
  }

  class NodeGuidLookupTable {
    constructor(guidList, tagProperties, enumItems) {
      this.guidList = guidList;
      this.tagProperties = tagProperties;
      this.enumItems = enumItems;
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

    getPropertyGuid(guid, propertyName, propertyValue) {
      return this.tagProperties[guid][propertyName];
    }

    getPropertyValueGuid(guid, propertyName, propertyValue) {
      const enumValueDict = getNestedKey(this.enumItems, guid, propertyName);
      const isEnumValue = !!enumValueDict;
      const enumOptName = isObject(propertyValue)
        ? propertyValue.Tag
        : propertyValue;
      const valueGuid = getNestedKey(enumValueDict, enumOptName);

      assert(
        !isEnumValue || valueGuid,
        new EnumNotFoundError(propertyName, propertyValue)
      );
      return valueGuid;
    }
  }

  function getNestedKey(dict, ...keys) {
    const value = dict;
    return keys.reduce(
      (dict, k) => (isObject(dict) ? dict[k] : undefined),
      dict
    );
  }
  function isObject(thing) {
    return thing && typeof thing === "object" && !Array.isArray(thing);
  }

  function isTerm(core, node) {
    return isTypeOf(core, node, "Term");
  }

  function isTypeOf(core, node, name) {
    let basenode = core.getMetaType(node);
    while (basenode) {
      if (core.getAttribute(basenode, "name") === name) {
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
  class EnumNotFoundError extends FormatError {
    constructor(guid, name) {
      super(`Enum option "${name}" not found in ${guid}`);
    }
  }

  TagFormatter.FormatError = FormatError;

  function assert(cond, err) {
    if (!cond) throw err;
  }

  function mapObject(obj, fn) {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => fn(k, v)));
  }

  TagFormatter.GuidLookupTable = NodeGuidLookupTable;
  TagFormatter.NodeNameLookupTable = NodeNameLookupTable;
  return TagFormatter;
}

if (typeof define !== "undefined") {
  define(["webgme-json-importer/JSONImporter"], factory);
} else {
  const { requirejs } = require("webgme");
  const Importer = requirejs("webgme-json-importer/JSONImporter");
  module.exports = factory(Importer);
}
