import { GmeCore } from "./types";
import type { Taxonomy } from "./exchange/Taxonomy";
import { VocabularyData } from "./exchange/VocabularyData";
import {
  getPrototype,
  InvalidVariantError,
  parseEnum,
  toString,
} from "./Utils";
import { Term } from "./exchange/Term";
import { Field } from "./exchange/Field";
import { FieldContent } from "./exchange/FieldContent";
import { FloatContent } from "./exchange/FloatContent";
import { IntegerContent } from "./exchange/IntegerContent";
import { SelectionConstraint } from "./exchange/SelectionConstraint";
import { ReleaseState } from "./exchange/ReleaseState";
import { Variant } from "./exchange/Variant";
import {
  getBoolAttribute,
  getFloatAttribute,
  getIntAttribute,
  getName,
  getStringAttribute,
  isTypeNamed,
  loadChildren,
} from "./GmeHelpers";
import { BooleanContent } from "./exchange/BooleanContent";
import { TextContent } from "./exchange/TextContent";
import { UriContent } from "./exchange/UriContent";

/**
 * Create a dictionary of node values by node name.
 */
async function toNameDict<T>(
  core: GmeCore,
  nodes: Core.Node[],
  valueFn: (n: Core.Node) => Promise<T> | T,
): Promise<{ [name: string]: T }> {
  const entries = await Promise.all(nodes.map(async (node) => {
    const name = getName(core, node);
    return [name, await valueFn(node)];
  }));
  return Object.fromEntries(entries);
}

function parseEnumAttribute<T>(
  core: GmeCore,
  node: Core.Node,
  attr: string,
  values: T[],
): T {
  const value = toString(core.getAttribute(node, attr));
  try {
    return parseEnum(value, values);
  } catch (err) {
    if (err instanceof InvalidVariantError) {
      // TODO: make this an InvalidAttributeError
      throw new Error(
        `Invalid ${attr} "${value}" in ${core.getPath(node)}`,
      );
    }
    throw err;
  }
}

function getSelectionConstraint(
  core: GmeCore,
  node: Core.Node,
): SelectionConstraint {
  const values: SelectionConstraint[] = ["optional", "recommended", "required"];
  return parseEnumAttribute(core, node, "selection", values);
}

function getReleaseState(core: GmeCore, node: Core.Node): ReleaseState {
  const values: ReleaseState[] = ["prerelease", "released", "deprecated"];
  return parseEnumAttribute(core, node, "releaseState", values);
}

async function exportVariant(
  core: GmeCore,
  node: Core.Node,
): Promise<Variant> {
  const fieldNodes = await core.loadChildren(node);
  const fields = await toNameDict(
    core,
    fieldNodes,
    (n) => exportField(core, n),
  );
  return {
    id: getProtoGuid(core, node),
    name: getName(core, node),
    fields,
  };
}

async function getFieldContent(
  core: GmeCore,
  fieldNode: Core.Node,
): Promise<FieldContent> {
  const metaType = core.getMetaType(fieldNode) || fieldNode;
  const typeName = getName(core, metaType);

  switch (typeName) {
    case "TextField": {
      const data = getStringAttribute(core, fieldNode, "value")
        .map((value): TextContent => ({ value }))
        .unwrapOrElse(() => ({}));
      return {
        Text: data,
      };
    }
    case "IntegerField": {
      const data = getIntAttribute(core, fieldNode, "value")
        .map((value): IntegerContent => ({ value }))
        .unwrapOrElse(() => ({}));
      return { Integer: data };
    }
    case "FloatField": {
      const data = getFloatAttribute(core, fieldNode, "value")
        .map((value): FloatContent => ({ value }))
        .unwrapOrElse(() => ({}));
      return {
        Float: data,
      };
    }
    case "BooleanField": {
      const data = getBoolAttribute(core, fieldNode, "value")
        .map((value): BooleanContent => ({ value }))
        .unwrapOrElse(() => ({}));
      return {
        Boolean: data,
      };
    }
    case "UriField": {
      const data = getStringAttribute(core, fieldNode, "value")
        .map((value): UriContent => ({ value }))
        .unwrapOrElse(() => ({}));
      return {
        Uri: data,
      };
    }
    case "EnumField": {
      const variantNodes = await loadChildren(core, fieldNode, "CompoundField");
      return {
        Enum: {
          variants: await Promise.all(
            variantNodes.map((n) => exportVariant(core, n)),
          ),
        },
      };
    }
    case "SetField": {
      const variantNodes = await loadChildren(core, fieldNode, "CompoundField");
      return {
        Set: {
          variants: await Promise.all(
            variantNodes.map((n) => exportVariant(core, n)),
          ),
        },
      };
    }
    case "CompoundField": {
      const fieldNodes = await loadChildren(core, fieldNode, "Field");
      const fields = await toNameDict(
        core,
        fieldNodes,
        (n) => exportField(core, n),
      );
      return { Compound: { fields } };
    }
    default:
      throw new Error("Unsupported field type: " + typeName);
  }
}

async function exportField(
  core: GmeCore,
  fieldNode: Core.Node,
): Promise<Field> {
  return {
    id: getProtoGuid(core, fieldNode),
    required: getBoolAttribute(core, fieldNode, "required").unwrapOr(false),
    description: toString(core.getAttribute(fieldNode, "description")),
    content: await getFieldContent(core, fieldNode),
  };
}

async function exportTerm(
  core: GmeCore,
  termNode: Core.Node,
): Promise<Term> {
  const fieldNodes = await loadChildren(core, termNode, "Field");
  const fields = await toNameDict(
    core,
    fieldNodes,
    (n) => exportField(core, n),
  );

  const isSystemTerm = isTypeNamed(
    core,
    core.getMetaType(termNode),
    "SystemTerm",
  );
  const selection = isSystemTerm
    ? "optional"
    : getSelectionConstraint(core, termNode);
  return {
    id: getProtoGuid(core, termNode),
    description: toString(core.getAttribute(termNode, "description")),
    selection,
    releaseState: getReleaseState(core, termNode),
    readOnly: isSystemTerm,
    fields,
  };
}

async function exportVocabulary(
  core: GmeCore,
  vocabNode: Core.Node,
): Promise<VocabularyData> {
  const termNodes = await loadChildren(core, vocabNode, "TermBase");
  const terms = await toNameDict(
    core,
    termNodes,
    (n) => exportTerm(core, n),
  );
  return {
    id: getProtoGuid(core, vocabNode),
    description: toString(core.getAttribute(vocabNode, "description")),
    releaseState: getReleaseState(core, vocabNode),
    terms,
  };
}

/**
 * Get the GUID of the prototype of the given node.
 */
function getProtoGuid(core: GmeCore, node: Core.Node): string {
  const prototype = getPrototype(core, node);
  return core.getGuid(prototype);
}

export default async function exportTaxonomy(
  core: GmeCore,
  taxonomyNode: Core.Node,
): Promise<Taxonomy> {
  // TODO: get the current version of the taxonomy
  // TODO: current tag...?
  const vocabNodes = await loadChildren(core, taxonomyNode, "Vocabulary");
  const vocabularies = await toNameDict(
    core,
    vocabNodes,
    (n) => exportVocabulary(core, n),
  );
  return {
    version: "todo!", // FIXME:
    vocabularies,
  };
}
