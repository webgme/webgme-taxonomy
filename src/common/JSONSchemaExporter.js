/*globals define*/
/*eslint-env node, browser*/
// @ts-check
/// <reference path="define.d.ts" />
function factory() {
  const optionTypes = ["EnumField", "SetField"];

  class JSONSchemaExporter {
    /**
     * Creates an instance of JSONSchemaExporter.
     * @param {GmeClasses.Core & { getMetaType(node: Core.Node): Core.Node }} core
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
      const termNodes = (
        await Promise.all(vocabs.map((node) => this.getTermNodes(node)))
      ).flat();

      const terms = await Promise.all(
        termNodes.map((node) => this.getTermFromNode(node)),
      );
      const properties = {
        taxonomyTags: {
          title: taxonomyName,
          type: "array",
          uniqueItems: true,
          minItems: 1,
          items: {
            type: "object",
            anyOf: terms.map((term) => term.schema),
          },
        },
      };

      // add constraint for all required terms
      const requiredTerms = terms.filter((term) => term.isRequired());
      if (requiredTerms.length) {
        properties.taxonomyTags.allOf = requiredTerms.map((term) => ({
          contains: term.schema,
        }));
      }

      const schema = {
        type: "object",
        properties,
      };

      const uiSchema = {
        taxonomyTags: {
          items: {},
        },
      };
      const formData = {
        taxonomyTags: terms
          .filter((term) => !term.isOptional())
          .map((term) => term.getInstance()),
      };
      console.log(schema);
      // TODO: add data here?
      return { schema, uiSchema, formData };
    }

    async getTermFromNode(node) {
      const parentTerms = this.getAncestorTerms(node);
      const name = this.core.getAttribute(node, "name");
      const schema = {
        type: "object",
        // FIXME: we need to figure out how to hide the top title...
        title: name,
        properties: {},
        additionalProperties: false,
      };
      const termFields = await Promise.all(
        parentTerms.map((n) => this.getDefinition(n)),
      );
      zip(parentTerms, termFields).reduce((schema, [parent, fields]) => {
        const name = this.core.getAttribute(parent, "name");
        return (schema.properties[name] = fields);
      }, schema);

      const selection = this.core.getAttribute(node, "selection");
      return new Term(name, schema, selection);
    }

    getAncestorTerms(node) {
      const nodes = [node];
      let parent = this.core.getParent(node);
      while (this.isTerm(parent) || this.isVocab(parent)) {
        nodes.unshift(parent);
        parent = this.core.getParent(parent);
      }
      return nodes;
    }

    async getTermFields(node) {
      const fieldNodes = (await this.core.loadChildren(node)).filter(
        (n) => !this.isTerm(n),
      );
    }

    async getTermNodes(node) {
      return (await this.core.loadSubTree(node)).filter((node) =>
        this.isTerm(node)
      );
    }

    isTypeOf(node, name) {
      /** @type {Core.Node | null} */
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

    /**
     * Gets whether the given node is a Set field.
     *
     * @param {Core.Node} node The node to check the type of
     * @return {boolean} Whether or not the `node` is a `SetField` type
     * @memberof JSONSchemaExporter
     */
    isSet(node) {
      return this.isTypeOf(node, "SetField");
    }

    /**
     * Gets whether the given node is a type that has child "option" fields
     * (i.e. `EnumField` or `SetField`).
     *
     * @param {Core.Node} node The node to check the type of
     * @return {boolean} Whether or not the `node` is a type with "option" fields
     * @memberof JSONSchemaExporter
     */
    isOptionType(node) {
      return optionTypes.some((optType) => this.isTypeOf(node, optType));
    }

    /**
     * Gets whether the given node is an option field for another field
     * (i.e. child of `EnumField` or `SetField`).
     *
     * @param {Core.Node} node The node to check the type of
     * @return {boolean} Whether or not the `node` is an "option" field
     * @memberof JSONSchemaExporter
     */
    isFieldOption(node) {
      const parent = this.core.getParent(node);
      return (
        parent != null &&
        optionTypes.some((optType) =>
          this.core.isTypeOf(parent, this.META[optType])
        )
      );
    }

    /**
     * Gets whether the given node is a taxonomy term.
     *
     * @param {Core.Node | null} node The node to check the type of
     * @return {node is Core.Node} Whether or not the `node` is a taxonomy term
     * @memberof JSONSchemaExporter
     */
    isTerm(node) {
      return node != null && this.core.isTypeOf(node, this.META.Term);
    }

    /**
     * Gets whether the given node is a vocabulary node.
     *
     * @param {Core.Node | null} node The node to check the type of
     * @return {node is Core.Node} Whether or not the `node` is a vocabulary
     * @memberof JSONSchemaExporter
     */
    isVocab(node) {
      return node != null && this.core.isTypeOf(node, this.META.Vocabulary);
    }

    async getDependentDefinitions(node) {
      const children = await this.core.loadChildren(node);
      if (this.isOptionType(node)) {
        return children;
      } else {
        return children.filter(
          (child) =>
            this.core.isTypeOf(child, this.META.Term) ||
            this.core.isTypeOf(child, this.META.CompoundField),
        );
      }
    }

    async getDefinitionEntries(node) {
      const children = await this.core.loadChildren(node);
      const dependentDefs = await this.getDependentDefinitions(node);

      const childDefs = (
        await Promise.all(
          children.map((node) => this.getDefinitionEntries(node)),
        )
      ).flat();
      const myDefs = await Promise.all(
        dependentDefs.map(async (node) => [
          this.core.getGuid(node),
          await this.getDefinition(node),
        ]),
      );
      return myDefs.concat(childDefs);
    }

    hasProperties(node) {
      return (
        this.core.isTypeOf(node, this.META.Term) ||
        this.core.isTypeOf(node, this.META.Vocabulary) ||
        this.core.isTypeOf(node, this.META.CompoundField)
      );
    }

    async getDefinition(node) {
      const isFieldOpt = this.isFieldOption(node);

      if (this.hasProperties(node)) {
        const properties = await this.getProperties(node);
        const required = properties
          .filter((prop) => prop.required)
          .map((prop) => prop.name);

        const propDict = Object.fromEntries(
          properties.map((prop) => [prop.name, prop.schema]),
        );

        return {
          title: this.core.getAttribute(node, "name"),
          type: "object",
          properties: propDict,
          required,
          additionalProperties: false,
        };
      } else if (isFieldOpt) {
        const schema = await this.getFieldSchema(node);
        return schema;
      } else {
        throw new Error("Cannot get definition for " + this.core.getPath(node));
      }
    }

    /**
     * Get the properties field for a given node.
     *
     * @param {Core.Node} node A field node to get properties for
     * @return {Promise<{ [key:string]: any }>} A promise for properties dict
     * @memberof JSONSchemaExporter
     */
    async getProperties(node) {
      const fieldNodes = (await this.core.loadChildren(node)).filter((child) =>
        this.core.isTypeOf(child, this.META.Field)
      );
      return await Promise.all(fieldNodes.map((n) => Property.from(this, n)));
    }

    /**
     * Get the JSON Schema for field node.
     *
     * @param {Core.Node} node A field node to get JSON schema for
     * @return {Promise<{ [key:string]: any }>} A promise for schema
     * @memberof JSONSchemaExporter
     */
    async getFieldSchema(node) {
      const name = this.core.getAttribute(node, "name");
      const baseNode = this.core.getMetaType(node);
      const baseName = this.core.getAttribute(baseNode, "name");

      /** @type {{ [key:string]: any }} */
      let fieldSchema = {
        title: name,
      };
      let isPrimitive = false;
      switch (baseName) {
        case "IntegerField":
          fieldSchema.type = "integer";
          isPrimitive = true;
          break;
        case "FloatField":
          fieldSchema.type = "number";
          isPrimitive = true;
          break;
        case "BooleanField":
          fieldSchema.type = "boolean";
          isPrimitive = true;
          break;
        case "TextField":
          fieldSchema.type = "string";
          isPrimitive = true;
          break;
        case "EnumField":
          Object.assign(fieldSchema, await this._getAnyOfSchema(node));
          // Currently, setting the default is problematic for enums and results in the default key
          // always being added (resulting in many validation errors)
          delete fieldSchema.default;
          break;
        case "CompoundField":
          fieldSchema.type = "object";
          fieldSchema.properties = {};
          fieldSchema.properties[name] = await this.getDefinition(node);
          fieldSchema.additionalProperties = false;
          break;
        case "SetField":
          Object.assign(fieldSchema, {
            type: "array",
            uniqueItems: true,
            items: await this._getAnyOfSchema(node),
          });
      }

      if (isPrimitive) {
        const value = this.core.getAttribute(node, "value");
        if (value) {
          fieldSchema.default = value;
        }
      }
      return fieldSchema;
    }

    /**
     * Get a partial JSON schema allowing any of the node's children.
     *
     * @param {Core.Node} node A field node to get JSON schema for
     * @return {Promise<{ [key:string]: any }>} A promise for schema w/ anyOf, default fields
     * @memberof JSONSchemaExporter
     */
    async _getAnyOfSchema(node) {
      const children = await this.core.loadChildren(node);
      if (!children.length) {
        return { type: "null" };
      }

      const childSchemas = await Promise.all(
        children.map((c) => this.getFieldSchema(c)),
      );
      return {
        anyOf: childSchemas,
        default: this._getDefault(childSchemas[0]),
      };
    }

    _getDefault(fieldSchema) {
      if (fieldSchema.default) {
        return fieldSchema.default;
      }

      if (fieldSchema.properties) {
        return Object.fromEntries(
          Object.entries(fieldSchema.properties).map(([k, v]) => [
            k,
            this._getDefault(v),
          ]),
        );
      }
    }

    static from(core, node) {
      const metanodes = Object.values(core.getAllMetaNodes(node));
      const meta = Object.fromEntries(
        metanodes.map((n) => [core.getAttribute(n, "name"), n]),
      );
      return new JSONSchemaExporter(core, meta);
    }
  }

  function range(len) {
    return [...new Array(len)].map((_, i) => i);
  }

  function zip(...lists) {
    const maxIndex = Math.min(...lists.map((l) => l.length));
    return range(maxIndex).map((i) => lists.map((l) => l[i]));
  }

  class Property {
    constructor(name, schema, required = false) {
      this.name = name;
      this.schema = schema;
      this.required = required;
    }

    static async from(exporter, node) {
      const core = exporter.core;
      const schema = await exporter.getFieldSchema(node);
      const name = core.getAttribute(node, "name");
      const required = core.getAttribute(node, "required");
      return new Property(name, schema, required);
    }
  }

  class Term {
    constructor(name, schema, selectionConstraint) {
      this.name = name;
      this.schema = schema;
      this.selectionConstraint = selectionConstraint;
    }

    isRequired() {
      return this.selectionConstraint === "required";
    }

    isRecommended() {
      return this.selectionConstraint === "recommended";
    }

    isOptional() {
      return !this.isRecommended() && !this.isRequired();
    }

    getInstance(schema = this.schema) {
      console.log("getInstance", schema);
      if (schema.type === "object") {
        const entries = Object.entries(schema.properties).map(([k, v]) => [
          k,
          this.getInstance(v),
        ]);

        return Object.fromEntries(entries);
      } else if (schema.default) {
        return schema.default;
      } else if (schema.type === "array") {
        return [];
        // } else if (schema.type === "string") {
        //   return ";
        // } else if (schema.type === "integer") {
        //   return null;
      }
      return null;
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
