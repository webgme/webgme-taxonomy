/*globals define*/
/*eslint-env node, browser*/
import { JSONSchema7 } from "json-schema";
import StorageAdapters from "../routers/Search/adapters/index";
import { Pattern } from "../routers/Search/Utils";
import { GmeCore } from "./types";
import { toString } from "./Utils";

// subsets of JSON schema targeted:
interface VocabSchema {
  type: "object";
  required: string[];
  properties: { [name: string]: TermSchema };
}

interface TermSchema {
  title: string;
  type: "object";
  properties: { [name: string]: FieldSchema };
  required: string[];
  additionalProperties: false;
}

interface BaseFieldSchema {
  title: string;
}
interface IntegerFieldSchema extends BaseFieldSchema {
  type: "integer";
  default?: number;
}
interface FloatFieldSchema extends BaseFieldSchema {
  type: "number";
  default?: number;
}
interface BooleanFieldSchema extends BaseFieldSchema {
  type: "boolean";
  default?: boolean;
}
interface TextFieldSchema extends BaseFieldSchema {
  type: "string";
  default?: string;
}
interface UriFieldSchema extends BaseFieldSchema {
  type: "string";
  pattern: string;
  default?: string;
}
interface EnumFieldSchema extends BaseFieldSchema {
  type: "object";
  additionalProperties: false;
  anyOf: CompoundFieldSchema[];
}
interface CompoundFieldSchema extends BaseFieldSchema {
  type: "object";
  properties: { [k: string]: any };
  additionalProperties: false;
}
interface SetFieldSchema extends BaseFieldSchema {
  type: "array";
  uniqueItems: true;
  items: {
    anyOf: CompoundFieldSchema[]; // FIXME
  };
}

type FieldSchema =
  | SetFieldSchema
  | CompoundFieldSchema
  | EnumFieldSchema
  | UriFieldSchema
  | TextFieldSchema
  | BooleanFieldSchema
  | FloatFieldSchema
  | IntegerFieldSchema;

const optionTypes = ["EnumField", "SetField"];
export default class JSONSchemaExporter {
  core: GmeCore;
  private META: { [name: string]: Core.Node };

  /**
   * Creates an instance of JSONSchemaExporter.
   * @param {GmeClasses.Core & { getMetaType(node: Core.Node): Core.Node }} core
   * @param {any} META
   * @memberof JSONSchemaExporter
   */
  constructor(core: GmeCore, META: { [name: string]: Core.Node }) {
    this.core = core;
    this.META = META;
  }

  async getSchemas(taxonomyNode: Core.Node, onlyReleased = false) {
    const taxonomyName = toString(this.core.getAttribute(taxonomyNode, "name"));
    const vocabs = await this.core.loadChildren(taxonomyNode);
    return this.getVocabSchemas(vocabs, taxonomyName, onlyReleased);
  }

  async getVocabSchemas(
    vocabNodes: Core.Node[],
    taxonomyName: string,
    onlyReleased = false,
  ) {
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

  async _getVocab(
    vocabNode: Core.Node,
    onlyReleased = false,
  ): Promise<Vocabulary> {
    const terms = await Promise.all(
      (await this.core.loadChildren(vocabNode))
        .filter((node) =>
          this.isTerm(node) && (!onlyReleased || this.isReleased(node))
        )
        .map((node) => this.getTermFromNode(node)),
    );

    const required = terms.filter((term) => term.isRequired())
      .map((term) => term.name);

    const schema: VocabSchema = {
      type: "object",
      properties: Object.fromEntries(
        terms.map((term) => [term.name, term.schema]),
      ),
      required,
    };

    const name = toString(this.core.getAttribute(vocabNode, "name"));
    return new Vocabulary(name, schema, terms);
    // FIXME: this is assuming that it is flat atm
    // TODO: add a test for deeper hierarchies
  }

  async getTermFromNode(node: Core.Node): Promise<Term> {
    // const parentTerms = this.getAncestorTerms(node);
    const name = toString(this.core.getAttribute(node, "name"));
    const properties = await this.getProperties(node);
    const required = properties
      .filter((prop) => prop.required)
      .map((prop) => prop.name);

    const propDict = Object.fromEntries(
      properties.map((prop) => [prop.name, prop.schema]),
    );

    const schema: TermSchema = {
      title: toString(this.core.getAttribute(node, "name")),
      type: "object",
      properties: propDict,
      required,
      additionalProperties: false,
    };
    // const termFields = await Promise.all(
    //   parentTerms.map((n) => this.getDefinition(n)),
    // );
    // // FIXME: remove the path to the children stuff
    // zip(parentTerms, termFields).reduce((schema, [parent, fields]) => {
    //   const name = this.core.getAttribute(parent, "name");
    //   return (schema.properties[name] = fields);
    // }, schema);
    const selectionStr = toString(this.core.getAttribute(node, "selection"))
      .toLowerCase();

    const validSelections = ["required", "recommended", "optional"];
    if (!validSelections.includes(selectionStr)) {
      throw new Error("Unknown selection constraint: " + selectionStr);
    }
    let selection: SelectionConstraint = selectionStr as SelectionConstraint;

    return new Term(name, schema, selection);
  }

  /**
   * Gets whether the given node is a vocabulary node.
   *
   * @param {Core.Node | null} node The node to check the type of
   * @return {node is Core.Node} Whether or not the `node` is a vocabulary
   * @memberof JSONSchemaExporter
   */
  isVocab(node: Core.Node): boolean {
    return node != null && this.core.isTypeOf(node, this.META.Vocabulary);
  }

  async getTermNodes(
    node: Core.Node,
    onlyReleased: boolean,
  ): Promise<Core.Node[]> {
    return (await this.core.loadSubTree(node)).filter((node: Core.Node) =>
      this.isTerm(node) && (!onlyReleased || this.isReleased(node))
    );
  }

  /**
   * Gets whether the given node is a type that has child "option" fields
   * (i.e. `EnumField` or `SetField`).
   *
   * @param {Core.Node} node The node to check the type of
   * @return {boolean} Whether or not the `node` is a type with "option" fields
   * @memberof JSONSchemaExporter
   */
  isOptionType(node: Core.Node): boolean {
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
  isFieldOption(node: Core.Node): boolean {
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
  isTerm(node: Core.Node): boolean {
    return node != null && this.core.isTypeOf(node, this.META.Term);
  }

  isTypeOf(node: Core.Node, name: string): boolean {
    let iternode: Core.Node | null = this.core.getMetaType(node);
    while (iternode) {
      const baseName = this.core.getAttribute(iternode, "name");
      if (baseName === name) {
        return true;
      }
      iternode = this.core.getBase(iternode);
    }
    return false;
  }

  async getDependentDefinitions(node: Core.Node) {
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

  hasProperties(node: Core.Node): boolean {
    return (
      this.core.isTypeOf(node, this.META.Term) ||
      this.core.isTypeOf(node, this.META.Vocabulary) ||
      this.core.isTypeOf(node, this.META.CompoundField)
    );
  }

  async getDefinition(node: Core.Node): Promise<JSONSchema7> {
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
        title: toString(this.core.getAttribute(node, "name")),
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
  async getProperties(node: Core.Node): Promise<Property[]> {
    const fieldNodes = (await this.core.loadChildren(node)).filter((child) =>
      this.core.isTypeOf(child, this.META.Field)
    );
    return await Promise.all(fieldNodes.map((n) => Property.from(this, n)));
  }

  /**
   * Get the JSON schema for the given field node.
   */
  async getFieldSchema(node: Core.Node): Promise<FieldSchema> {
    const name = (this.core.getAttribute(node, "name") || "").toString();
    const baseNode = this.core.getMetaType(node);
    const baseName = this.core.getAttribute(baseNode, "name");

    switch (baseName) {
      case "IntegerField": {
        const fieldSchema: IntegerFieldSchema = {
          title: name,
          type: "integer",
        };
        const value = toString(this.core.getAttribute(node, "value"));
        if (value) {
          fieldSchema.default = parseInt(value);
        }
        return fieldSchema;
      }
      case "FloatField": {
        const fieldSchema: FloatFieldSchema = {
          title: name,
          type: "number",
        };
        const value = toString(this.core.getAttribute(node, "value"));
        if (value) {
          fieldSchema.default = parseFloat(value);
        }
        return fieldSchema;
      }
      case "BooleanField": {
        const fieldSchema: BooleanFieldSchema = {
          title: name,
          type: "boolean",
        };
        const value = toString(this.core.getAttribute(node, "value"));
        if (value) {
          fieldSchema.default = value === "true";
        }
        return fieldSchema;
      }
      case "TextField": {
        const fieldSchema: TextFieldSchema = {
          title: name,
          type: "string",
        };
        const value = toString(this.core.getAttribute(node, "value"));
        if (value) {
          fieldSchema.default = value;
        }
        return fieldSchema;
      }
      case "UriField": {
        const fieldSchema: UriFieldSchema = {
          title: name,
          type: "string",
          pattern: Pattern.exact(Pattern.anyIn(
            ...StorageAdapters.getUriPatterns(),
          )),
        };

        const value = toString(this.core.getAttribute(node, "value"));
        if (value) { // FIXME: validate the default URI?
          fieldSchema.default = value;
        }
        return fieldSchema;
      }
      case "EnumField": {
        const { anyOf } = await this._getAnyOfSchema(node);
        // Currently, setting the default is problematic for enums and results in the default key
        // always being added (resulting in many validation errors)
        const fieldSchema: EnumFieldSchema = {
          title: name,
          type: "object",
          additionalProperties: false,
          anyOf,
          // TODO: make the name a required field
        };
        return fieldSchema;
      }
      case "CompoundField": {
        const properties: { [k: string]: any } = {};
        properties[name] = await this.getDefinition(node);
        return {
          title: name,
          type: "object",
          properties,
          additionalProperties: false,
        };
      }
      case "SetField": {
        const { anyOf } = await this._getAnyOfSchema(node);
        const fieldSchema: SetFieldSchema = {
          title: name,
          type: "array",
          uniqueItems: true,
          items: { anyOf },
        };
        return fieldSchema;
      }
      default:
        throw new Error("Unsupported field type: " + baseName); // FIXME: should this be a user error?
    }
  }

  /**
   * Gets whether the given term node is deprecated.
   */
  isReleased(node: Core.Node | null): boolean {
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
   */
  async _getAnyOfSchema(
    node: Core.Node,
  ): Promise<{ anyOf: CompoundFieldSchema[] }> {
    const children = await this.core.loadChildren(node);
    if (!children.length) { // FIXME: Should we throw an error instead?
      throw new Error(
        "No valid candidates found for " + this.core.getAttribute(node, "name"),
      );
      //return { type: "null" };
    }

    const childSchemas = await Promise.all(
      children.map((c) => this.getFieldSchema(c)),
    ) as CompoundFieldSchema[];
    // FIXME: do we need 'type'?
    // let type = unique(childSchemas.map((s) => s.type));
    // if (type.length < 2) {
    //   type = type[0];
    // }
    return {
      //type,
      anyOf: childSchemas,
      //default: this._getDefault(childSchemas[0]),
    };
  }

  // _getDefault(fieldSchema: JSONSchema7) {
  //   if (fieldSchema.default) {
  //     return fieldSchema.default;
  //   }

  //   if (fieldSchema.properties) {
  //     return Object.fromEntries(
  //       Object.entries(fieldSchema.properties).map(([k, v]) => [
  //         k,
  //         this._getDefault(v),
  //       ]),
  //     );
  //   }
  // }

  static from(core: GmeCore, node: Core.Node) {
    const metanodes = Object.values(core.getAllMetaNodes(node));
    const meta = Object.fromEntries(
      metanodes.map((n) => [core.getAttribute(n, "name"), n]),
    );
    return new JSONSchemaExporter(core, meta);
  }
}

class Vocabulary {
  name: string;
  schema: VocabSchema;
  childTerms: Term[];

  constructor(name: string, schema: VocabSchema, childTerms: Term[]) {
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

    const formData: { [field: string]: any } = {};
    formData[this.name] = Object.fromEntries(entries);
    return formData;
  }

  isEmpty() {
    return this.childTerms.length === 0;
  }
}

function getContainmentAncestors(core: GmeCore, node: Core.Node) {
  let pathToRoot = [];
  let iternode: Core.Node | null = node;

  while (iternode) {
    pathToRoot.push(iternode);
    iternode = core.getParent(iternode);
  }

  return pathToRoot;
}

export class Property {
  name: string;
  schema: FieldSchema;
  required: boolean;

  constructor(name: string, schema: FieldSchema, required = false) {
    this.name = name;
    this.schema = schema;
    this.required = required;
  }

  static async from(exporter: JSONSchemaExporter, node: Core.Node) {
    const core = exporter.core;
    const schema = await exporter.getFieldSchema(node);
    const name = toString(core.getAttribute(node, "name"));

    // FIXME: Due to a limitation in the tag forms, fields can only
    // be considered required if they are contained in a required term
    const parentTerm = getContainmentAncestors(core, node)
      .find((node) => exporter.isTerm(node));

    if (parentTerm === undefined) {
      throw new Error("Found field not contained in term: " + name);
    }
    const isTermRequired =
      toString(core.getAttribute(parentTerm, "selection")) === "required";
    const required = isTermRequired && !!core.getAttribute(node, "required");

    return new Property(name, schema, required);
  }
}

type SelectionConstraint = "required" | "recommended" | "optional";
export class Term {
  name: string;
  selectionConstraint: SelectionConstraint;
  schema: TermSchema;

  constructor(
    name: string,
    schema: TermSchema,
    selectionConstraint: SelectionConstraint,
  ) {
    this.name = name;
    this.schema = schema;
    this.selectionConstraint = selectionConstraint;
  }

  isRequired(): boolean {
    return this.selectionConstraint === "required";
  }

  isRecommended(): boolean {
    return this.selectionConstraint === "recommended";
  }

  isOptional(): boolean {
    return !this.isRecommended() && !this.isRequired();
  }

  getInstance(schema: TermSchema | FieldSchema = this.schema): any {
    if ("anyOf" in schema) {
      return this.getInstance(schema.anyOf[0]);
    } else if (schema.type === "object") {
      const entries = Object.entries(schema.properties).map(([k, v]) => [
        k,
        this.getInstance(v),
      ]);

      return Object.fromEntries(entries);
    } else if ("default" in schema) {
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
