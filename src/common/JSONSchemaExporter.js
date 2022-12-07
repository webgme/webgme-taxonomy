/*globals define*/
/*eslint-env node, browser*/
// @ts-check

function factory() {
  class JSONSchemaExporter {

    /** @param {GmeClasses.Core} core */
    core;

    /**
     * Creates an instance of JSONSchemaExporter.
     * @param {GmeClasses.Core} core
     * @param {any} META
     * @memberof JSONSchemaExporter
     */
    constructor(core, META) {
      this.core = core;
      this.META = META;
    }

    async getSchemas(taxonomyNode) {
      const taxonomyName = this.core.getAttribute(taxonomyNode, "name");
      const vocabs = await this.core.loadChildren(taxonomyNode);
      return this.getVocabSchemas(vocabs, taxonomyName);
    }

    async getVocabSchemas(vocabs, taxonomyName) {
      const defEntries = (
        await Promise.all(vocabs.map((node) => this.getDefinitionEntries(node)))
      ).flat();
      const definitions = Object.fromEntries(defEntries);
      const termNodes = (
        await Promise.all(vocabs.map((node) => this.getTermNodes(node)))
      ).flat();
      const properties = {
        taxonomyTags: {
          title: taxonomyName,
          type: "array",
          uniqueItems: true,
          minItems: 1,
          items: {
            type: "object",
            anyOf: termNodes.map((node) => {
              const guid = this.core.getGuid(node);
              return this.getGuidRef(guid);
            }),
          },
        },
      };
      const schema = {
        type: "object",
        properties,
        definitions,
      };

      const hiddenProperties = this.getConstantProperties().map(([name]) => [
        name,
        {
          "ui:widget": "hidden",
        },
      ]);
      const defHiddenProperties = Object.fromEntries(
        Object.keys(definitions).map((name) => [name, hiddenProperties])
      );
      const termsUiSchemas = (
        await Promise.all(termNodes.map((node) => this.getUiSchemaEntry(node)))
      ).map(([id, value]) => value);
      const itemsUiSchema = Object.assign(
        ...termsUiSchemas,
        Object.fromEntries(hiddenProperties)
      );
      const uiSchema = {
        taxonomyTags: {
          items: itemsUiSchema,
        },
      };
      return { schema, uiSchema };
    }

    async getTermNodes(node) {
      return (await this.core.loadSubTree(node)).filter((node) =>
        this.core.isTypeOf(node, this.META.Term)
      );
    }

    async getUiSchemaEntry(node) {
      const entries = this.getConstantProperties().map(([name]) => [
        name,
        {
          "ui:widget": "hidden",
        },
      ]);

      const fields = (await this.core.loadChildren(node)).filter((child) =>
        this.isTypeOf(child, "Field")
      );
      const childEntries = await Promise.all(
        fields.map((child) => this.getUiSchemaEntry(child))
      );

      if (this.isEnum(node)) {
        // if we are an enum, our children ui schemas should be merged into ours
        const childSchemas = childEntries.map(([id, schema]) => schema);
        const mergedChildren = Object.assign({}, ...childSchemas);
        entries.push(...Object.entries(mergedChildren));
      } else {
        entries.push(...childEntries);
      }

      const isTerm = !this.isTypeOf(node, "Field");
      if (isTerm) {
        const parent = this.core.getParent(node);
        if (parent) {
          const parentEntry = await this.getUiSchemaEntry(parent);
          entries.push(parentEntry);
        }
      }

      const guid = this.core.getGuid(node);
      return [guid, Object.fromEntries(entries)];
    }

    isTypeOf(node, name) {
      let iternode = this.core.getMetaType(node);
      while (iternode) {
        const baseName = this.core.getAttribute(iternode, "name");
        if (baseName === name) {
          return true;
        }
        iternode = this.core.getBase(iternode);
      }

      return false;
    }

    isEnum(node) {
      return this.isTypeOf(node, "EnumField");
    }

    async getDependentDefinitions(node) {
      const children = await this.core.loadChildren(node);
      if (this.isEnum(node)) {
        return children;
      } else {
        return children.filter(
          (child) =>
            this.core.isTypeOf(child, this.META.Term) ||
            this.core.isTypeOf(child, this.META.CompoundField)
        );
      }
    }

    async getDefinitionEntries(node) {
      const children = await this.core.loadChildren(node);
      const dependentDefs = await this.getDependentDefinitions(node);

      const childDefs = (
        await Promise.all(
          children.map((node) => this.getDefinitionEntries(node))
        )
      ).flat();
      const myDefs = await Promise.all(
        dependentDefs.map(async (node) => [
          this.core.getGuid(node),
          await this.getDefinition(node),
        ])
      );
      return myDefs.concat(childDefs);
    }

    hasProperties(node) {
      return (
        this.core.isTypeOf(node, this.META.Term) ||
        this.core.isTypeOf(node, this.META.CompoundField)
      );
    }

    async getDefinition(node) {
      const isEnumOpt = this.core.isTypeOf(
        this.core.getParent(node),
        this.META.EnumField
      );

      if (this.hasProperties(node)) {
        const properties = await this.getProperties(node);
        return {
          title: this.core.getAttribute(node, "name"),
          type: "object",
          properties,
          required: Object.keys(properties),
        };
      } else if (isEnumOpt) {
        const [guid, schema] = await this.getFieldSchema(node);
        schema.default = guid;
        schema.const = guid;
        return schema;
      } else {
        throw new Error("Cannot get definition for " + this.core.getPath(node));
      }
    }

    async getProperties(node) {
      const isTerm = this.core.isTypeOf(node, this.META.Term);
      const isEnumOpt = this.core.isTypeOf(
        this.core.getParent(node),
        this.META.EnumField
      );

      const properties =
        isTerm || isEnumOpt ? this.getConstantPropertiesFor(node) : [];
      const fieldNodes = (await this.core.loadChildren(node)).filter((child) =>
        this.core.isTypeOf(child, this.META.Field)
      );

      // if parent is a term, add it as a property
      const parent = this.core.getParent(node);
      if (this.core.isTypeOf(parent, this.META.Term)) {
        const guid = this.core.getGuid(parent);
        properties.push([guid, this.getGuidRef(guid)]);
      }

      return Object.fromEntries([
        ...properties,
        ...(await Promise.all(
          fieldNodes.map((node) => this.getFieldSchema(node))
        )),
      ]);
    }

    getConstantProperties() {
      return [["ID", (node) => this.core.getGuid(node)]];
    }

    getConstantPropertiesFor(node) {
      return this.getConstantProperties().map(([name, valueFn]) =>
        this.getConstantProperty(name, valueFn(node))
      );
    }

    getConstantProperty(name, value) {
      return [
        name,
        {
          type: "string",
          const: value,
          default: value,
        },
      ];
    }

    async getFieldSchema(node) {
      const name = this.core.getAttribute(node, "name");
      const guid = this.core.getGuid(node);
      const baseNode = this.core.getMetaType(node);
      const baseName = this.core.getAttribute(baseNode, "name");

      let fieldSchema = {
        title: name,
      };
      switch (baseName) {
        case "IntegerField":
          fieldSchema.type = "integer";
          break;
        case "FloatField":
          fieldSchema.type = "number";
          break;
        case "BooleanField":
          fieldSchema.type = "boolean";
          break;
        case "TextField":
          fieldSchema.type = "string";
          break;
        case "EnumField":
          fieldSchema.anyOf = (await this.core.loadChildren(node)).map(
            (node) => {
              const guid = this.core.getGuid(node);
              return this.getGuidRef(guid);
            }
          );
          break;
        case "CompoundField": // TODO: use guid?
          fieldSchema = this.getGuidRef(guid);
          break;
      }
      return [guid, fieldSchema];
    }

    /**
     * Gets a JSON ref to the given GUID definition.
     *
     * @param {string} guid The GUID to get a ref for
     * @return {{ $ref: string }} A JSON ref to the GUID definition
     * @memberof JSONSchemaExporter
     */
    getGuidRef(guid) {
      return { $ref: `#/definitions/${guid}` }
    }

    static from(core, node) {
      const metanodes = Object.values(core.getAllMetaNodes(node));
      const meta = Object.fromEntries(
        metanodes.map((n) => [core.getAttribute(n, "name"), n])
      );
      return new JSONSchemaExporter(core, meta);
    }
  }

  return JSONSchemaExporter;
}

if (typeof define !== "undefined") {
  define([], factory);
} else if (typeof module !== "undefined") {
  module.exports = factory();
} else {
  this.JSONSchemaExporter = factory();
}
