/*globals define*/
/*eslint-env node, browser*/
// @ts-check
/// <reference path="define.d.ts" />
const StorageAdapters =
  require("../routers/Search/build/adapters/index").default;
const { Pattern, unique } = require("../routers/Search/build/Utils");
const optionTypes = ["EnumField", "SetField"];

const SugarLevel = {};
SugarLevel.Sugared = "Sugared";
SugarLevel.Desugared = "Desugared";
SugarLevel.Any = "Any";

class JSONSchemaExporter {
  /**
   * Creates an instance of JSONSchemaExporter.
   * @param {GmeClasses.Core & { getMetaType(node: Core.Node): Core.Node }} core
   * @param {any} META
   * @param {string} sugarLevel
   * @memberof JSONSchemaExporter
   */
  constructor(core, META, sugarLevel) {
    this.core = core;
    this.META = META;
    this.sugarLevel = sugarLevel;
  }

  /**
   * Get the JSON (and UI) schemas for a taxonomy.
   * @param {Core.Node} taxonomyNode
   * @param {boolean} onlyReleased
   * @memberof JSONSchemaExporter
   */
  async getSchemas(taxonomyNode, onlyReleased = false) {
    const taxonomyName = this.core.getAttribute(taxonomyNode, "name");
    const vocabs = await this.core.loadChildren(taxonomyNode);
    return this.getVocabSchemas(vocabs, taxonomyName, onlyReleased);
  }

  async getVocabSchemas(vocabNodes, taxonomyName, onlyReleased = false) {
    const allVocabs = await Promise.all(
      vocabNodes
        .filter((node) => !onlyReleased || this.isReleased(node))
        .map(
          (node) => this._getVocab(node, onlyReleased),
        ),
    );
    const vocabs = allVocabs.filter((v) => !v.isEmpty());
    const properties = Object.fromEntries(
      vocabs.map((v) => [v.name, v.schema]),
    );
    const required = vocabs
      .filter((v) => v.isRequired())
      .map((v) => v.name);

    const schema = {
      title: `Metadata for ${taxonomyName}`,
      type: "object",
      properties,
      additionalProperties: false,
      required,
    };

    const uiSchema = {};
    const formData = Object.assign(
      {},
      ...vocabs.filter((v) => v.isRequired())
        .map((v) => v.getFormData()),
    );
    return { schema, uiSchema, formData };
  }

  async _getVocab(vocabNode, onlyReleased = false) {
    const terms = await Promise.all(
      (await this.core.loadChildren(vocabNode))
        .filter((node) =>
          this.isTerm(node) && (!onlyReleased || this.isReleased(node))
        )
        .map((node) => this.getTermFromNode(node)),
    );

    const required = terms.filter((term) => term.isRequired())
      .map((term) => term.name);

    const schema = {
      type: "object",
      properties: Object.fromEntries(
        terms.map((term) => [term.name, term.schema]),
      ),
      required,
    };

    const name = this.core.getAttribute(vocabNode, "name");
    return new Vocabulary(name, schema, terms);
    // FIXME: this is assuming that it is flat atm
    // TODO: add a test for deeper hierarchies
  }

  async getTermFromNode(node) {
    // const parentTerms = this.getAncestorTerms(node);
    const name = this.core.getAttribute(node, "name");
    const schema = await this.getDefinition(node);
    // const termFields = await Promise.all(
    //   parentTerms.map((n) => this.getDefinition(n)),
    // );
    // // FIXME: remove the path to the children stuff
    // zip(parentTerms, termFields).reduce((schema, [parent, fields]) => {
    //   const name = this.core.getAttribute(parent, "name");
    //   return (schema.properties[name] = fields);
    // }, schema);
    const selection = this.core.getAttribute(node, "selection");
    return new Term(name, schema, selection);
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

  async getTermNodes(node, onlyReleased) {
    return (await this.core.loadSubTree(node)).filter((node) =>
      this.isTerm(node) && (!onlyReleased || this.isReleased(node))
    );
  }

  async getTermFields(node) {
    const fieldNodes = (await this.core.loadChildren(node)).filter(
      (n) => !this.isTerm(n),
    );
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
    const name = (this.core.getAttribute(node, "name") || "").toString();
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
      case "UriField":
        fieldSchema.type = "string";
        fieldSchema.pattern = Pattern.exact(Pattern.anyIn(
          ...StorageAdapters.getUriPatterns(),
        ));
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
   * Gets whether the given term node is deprecated.
   *
   * @param {Core.Node | null} node The node to check the type of
   * @return {boolean} Whether or not the `node` is deprecated
   * @memberof JSONSchemaExporter
   */
  isReleased(node) {
    if (node === null) {
      return false;
    }
    const releaseState = this.core.getAttribute(node, "releaseState") ||
      "released";

    if (releaseState !== "released") {
      return false;
    }

    const parent = this.core.getParent(node);
    const hasUnreleasedParent = parent && !this.isReleased(parent);
    return !hasUnreleasedParent;
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

    // if the child is an empty compound field, we may need to support
    // a string with the name (syntactic sugar)
    const childSchemaTuples = await Promise.all(
      children.map(async (c) => {
        const schema = await this.getFieldSchema(c);
        return [c, schema];
      }),
    );

    const childSchemas = childSchemaTuples
      .flatMap(([child, schema]) => {
        let schemas = [schema];

        if (this.sugarLevel === SugarLevel.Desugared) {
          return schemas;
        }

        // If it is an empty compound field, add support for the name as syntactic sugar
        const isEmptyCompound = this.isTypeOf(child, "CompoundField") &&
          this.core.getChildrenPaths(child).length == 0;

        // Empty compounds in enums or sets can be expressed with just the text name
        // rather than the empty object notation
        if (isEmptyCompound) {
          const sugarySchema = {
            type: "string",
            pattern: "^" + this.core.getAttribute(child, "name") + "$",
          };

          if (this.sugarLevel === SugarLevel.Sugared) {
            schemas = [sugarySchema];
          } else if (this.sugarLevel === SugarLevel.Any) {
            schemas.push(sugarySchema);
          }
        }

        return schemas;
      });

    let type = unique(childSchemas.map((s) => s.type));
    if (type.length < 2) {
      type = type[0];
    }
    return {
      type,
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

  static from(core, node, sugarLevel) {
    const metanodes = Object.values(core.getAllMetaNodes(node));
    const meta = Object.fromEntries(
      metanodes.map((n) => [core.getAttribute(n, "name"), n]),
    );
    return new JSONSchemaExporter(core, meta, sugarLevel);
  }
}

class Vocabulary {
  constructor(name, schema, childTerms) {
    this.name = name;
    this.schema = schema;
    this.childTerms = childTerms;
  }

  // A vocabulary is required if it contains any required child terms
  isRequired() {
    return this.childTerms.some((term) => term.isRequired());
  }

  // Get the initial form data (only for required terms)
  getFormData() {
    if (!this.isRequired()) {
      return;
    }

    const entries = this.childTerms
      .filter((term) => term.isRequired())
      .map((term) => [term.name, term.getInstance()]);

    const formData = {};
    formData[this.name] = Object.fromEntries(entries);
    return formData;
  }

  isEmpty() {
    return this.childTerms.length === 0;
  }
}

function getContainmentAncestors(core, node) {
  let pathToRoot = [];

  while (node) {
    pathToRoot.push(node);
    node = core.getParent(node);
  }

  return pathToRoot;
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

    // FIXME: Due to a limitation in the tag forms, fields can only
    // be considered required if they are contained in a required term
    const parentTerm = getContainmentAncestors(core, node)
      .find((node) => exporter.isTerm(node));
    const isTermRequired =
      core.getAttribute(parentTerm, "selection") === "required";
    const required = isTermRequired && core.getAttribute(node, "required");

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
    if (schema.anyOf) {
      return this.getInstance(schema.anyOf[0]);
    } else if (schema.type === "object") {
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

module.exports = JSONSchemaExporter;
module.exports.SugarLevel = SugarLevel;
