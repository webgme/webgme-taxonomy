/**
 * This converts to and from a human-readable format for tags. Specifically, this will replace the GUIDs with display names for all the terms and properties.
 */
function factory() {
  class TagFormatter {
    constructor(nodeNameLookup, nodeGuidLookup) {
      this.nodeNameLookup = nodeNameLookup;
      this.nodeGuidLookup = nodeGuidLookup;
    }

    /**
     * Convert the given tags to GUID format. If `guid` is provided, use
     * that for the top-level tag.
     */
    toGuidFormat(tags) {
      return tags.map((tag) => this._toGuidFormat(tag));
    }

    _toGuidFormat(tag, guid = null) {
      const data = omit(tag, "Tag");
      if (!guid) {
        guid = this.nodeGuidLookup.getGuid(tag.Tag, data);
        assert(guid, new TagNotFoundError(tag.Tag));
      }

      const entries = Object.entries(data);
      // given a property (or parent name), resolve it to a GUID
      const guidTag = Object.fromEntries(
        entries.map(([name, data]) => {
          const propertyGuid = this.nodeGuidLookup.getPropertyGuid(
            guid,
            name,
            data
          );
          assert(propertyGuid, new PropertyNotFoundError(guid, name));
          // If this is an enum, the values will be stored by ID (or converted to GUID format)
          const valueGuid = this.nodeGuidLookup.getPropertyValueGuid(
            guid,
            name,
            data
          );
          if (isObject(data)) {
            data = this._toGuidFormat(data, valueGuid || propertyGuid);
          } else if (valueGuid) {
            data = valueGuid;
          }

          return [propertyGuid, data];
        })
      );

      guidTag.ID = guid;
      return guidTag;
    }

    toHumanFormat(tags) {
      return tags.map((tag) => this._toHumanFormat(tag));
    }

    _toHumanFormat(tag) {
      const entries = Object.entries(tag).filter(([k]) => k !== "ID");
      // TODO: for enums, look up the names
      const humanReadable = Object.fromEntries(
        entries.map(([guid, data]) => {
          const name = this.nodeNameLookup.getName(guid);
          assert(name, new TagNotFoundError(guid));
          let newData;
          if (isObject(data)) {
            newData = this._toHumanFormat(data);
          } else {
            const valueName = this.nodeNameLookup.getPropertyValueName(
              guid,
              data
            );
            newData = valueName || data;
          }
          return [name, newData];
        })
      );
      humanReadable.Tag = this.nodeNameLookup.getName(tag.ID);
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

          const parent = core.getParent(node);
          if (parent) {
            properties.push(parent);
          }

          const propertyDict = Object.fromEntries(
            properties.map((node) => [
              core.getAttribute(node, "name"),
              core.getGuid(node),
            ])
          );

          return [core.getGuid(node), propertyDict];
        })
      );
      const enumItemEntries = await Promise.all(
        nodes
          .filter((node) => isTypeOf(core, node, "EnumField"))
          .map(async (field) => {
            const children = await core.loadChildren(field);
            const parentGuid = core.getGuid(core.getParent(field));
            const fieldName = core.getAttribute(field, "name");
            const fieldGuid = core.getGuid(field);
            return children.map((enumOpt) => [
              parentGuid,
              fieldGuid,
              fieldName,
              core.getAttribute(enumOpt, "name"),
              core.getGuid(enumOpt),
            ]);
          })
      );
      const enumItems = {};
      const enumNameDict = {};
      enumItemEntries
        .flat()
        .forEach(([parentGuid, fieldGuid, fieldName, enumName, enumGuid]) => {
          enumItems[parentGuid] = enumItems[parentGuid] || {};
          enumItems[parentGuid][fieldName] =
            enumItems[parentGuid][fieldName] || {};
          enumItems[parentGuid][fieldName][enumName] = enumGuid;

          enumNameDict[fieldGuid] = enumNameDict[fieldGuid] || {};
          enumNameDict[fieldGuid][enumGuid] = enumName;
        });
      const nodeNameLookup = new NodeNameLookupTable(
        nodeNameDict,
        enumNameDict
      );
      const nodeGuidLookup = new NodeGuidLookupTable(
        namesAndGuids,
        Object.fromEntries(propsForGuid),
        enumItems
      );
      return new TagFormatter(nodeNameLookup, nodeGuidLookup);
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
  class PropertyNotFoundError extends FormatError {
    constructor(guid, name) {
      super(`Property "${name}" not found in ${guid}`);
    }
  }
  class EnumNotFoundError extends FormatError {
    constructor(guid, name) {
      super(`Enum option "${name}" not found in ${guid}`);
    }
  }

  TagFormatter.FormatError = FormatError;
  function omit(obj, ...keys) {
    return Object.fromEntries(
      Object.entries(obj).filter(([k /*v*/]) => !keys.includes(k))
    );
  }

  function assert(cond, err) {
    if (!cond) throw err;
  }

  TagFormatter.GuidLookupTable = NodeGuidLookupTable;
  TagFormatter.NodeNameLookupTable = NodeNameLookupTable;
  return TagFormatter;
}

if (typeof define !== "undefined") {
  define([], factory);
} else {
  module.exports = factory();
}
