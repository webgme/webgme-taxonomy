import type { Field } from "../../../common/exchange/Field";
import type { Taxonomy } from "../../../common/exchange/Taxonomy";
import type { Term } from "../../../common/exchange/Term";
import type { Variant } from "../../../common/exchange/Variant";
import { isObject } from "../Utils";
import { ArtifactMetadatav2 } from "./common/types";
import { v4 as uuidv4 } from "uuid";

export class Graph {
  readonly nodes: Node[];
  readonly edges: Edge[];

  constructor(nodes: Node[], edges: Edge[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

  toGraphMl(): string {
    const nodeKeysXml = getKeyTypes(this.nodes.map((n) => n.attributes))
      .map(([name, type]) =>
        `<key id="${name}" for="node" attr.name="${name}" attr.type="${type}"/>`
      ).join("\n");
    const edgeKeysXml = getKeyTypes(this.edges.map((n) => n.attributes))
      .map(([name, type]) =>
        `<key id="${name}" for="edge" attr.name="${name}" attr.type="${type}"/>`
      ).join("\n");
    const nodeXml = this.nodes.map((node) => node.toGraphMl()).join("\n");
    const edgeXml = this.edges.map((edge) => edge.toGraphMl()).join("\n");
    return `
      <graphml xmlns="http://graphml.graphdrawing.org/xmlns" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.1/graphml.xsd">
        ${nodeKeysXml}
        ${edgeKeysXml}
        <graph edgedefault="directed">
          ${nodeXml}
          ${edgeXml}
        </graph>
      </graphml>
      `;
  }
}

type AttrTypeDict = { [name: string]: AttrTypeName };
function getKeyTypeDict(attrDicts: AttrDict[]): AttrTypeDict {
  return attrDicts
    .reduce((keyDict: { [name: string]: AttrTypeName }, attrDict) => {
      // Try to merge the node's attributes (possibly updating the type)
      Object.entries(attrDict).forEach(([name, value]) => {
        let type = getGraphMlType(value);
        if (keyDict[name]) {
          type = inferType(keyDict[name], type);
        }
        keyDict[name] = type;
      });
      return keyDict;
    }, {});
}

type AttrTypeName = "string" | "int" | "double" | "boolean" | "float" | "long";
function inferType(t1: AttrTypeName, t2: AttrTypeName): AttrTypeName {
  if (t1 === t2) {
    return t1;
  }
  // If they are both numbers, cast to double
  const numberTypes = ["int", "double", "float", "long"];
  if ([t1, t2].every((t) => numberTypes.includes(t))) {
    return "double";
  }
  // otherwise consider them both to be strings
  return "string";
}

function getGraphMlType(value: string | number | boolean): AttrTypeName {
  const jsType = typeof value;
  if (jsType === "number") {
    if (isWholeNumber(value as number)) {
      return "int";
    } else {
      return "double";
    }
  }

  if (jsType === "boolean") {
    return "boolean";
  }

  return "string"; // this is the only other type it can be
}

function isWholeNumber(value: number): boolean {
  return Math.floor(value) === value;
}

function getKeyTypes(attrDicts: AttrDict[]): [string, string][] {
  return Object.entries(getKeyTypeDict(attrDicts));
}

export type AttrDict = { [name: string]: string | number | boolean };
class Node {
  readonly id: NodeId;
  readonly attributes: AttrDict;
  constructor(attributes: { [name: string]: any }) {
    this.id = newId();
    this.attributes = attributes;
    this.attributes[Prop.Uuid] = this.id;
  }

  toGraphMl(): string {
    const attrs = Object.entries(this.attributes).map(([name, value]) =>
      `<data key="${name}">${value}</data>`
    ).join("\n");
    return `<node id="${this.id}">
      ${attrs}
    </node>`;
  }
}

class Edge {
  private id: EdgeId;
  private sourceId: NodeId;
  private targetId: NodeId;
  readonly attributes: AttrDict;

  constructor(
    sourceId: NodeId,
    targetId: NodeId,
    attributes: AttrDict = {},
  ) {
    this.id = newId();
    this.sourceId = sourceId;
    this.targetId = targetId;
    this.attributes = attributes;
  }

  toGraphMl(): string {
    const attrs = Object.entries(this.attributes).map(([name, value]) =>
      `<data key="${name}">${value}</data>`
    ).join("\n");
    return `<edge id="${this.id}" source="${this.sourceId}" target="${this.targetId}">
      ${attrs}
    </edge>`;
  }
}

type NodeId = string;
type EdgeId = string;
function newId(): NodeId {
  return uuidv4();
}

class NamedNode extends Node {
  constructor(
    label: string,
    tagId?: string,
    value?: string | number | boolean,
  ) {
    const attrDict: AttrDict = {
      labelV: label,
    };
    if (value !== undefined) {
      attrDict.value = value;
    }
    if (tagId !== undefined) {
      attrDict.tagId = tagId;
    }
    super(attrDict);
  }
}

class LabeledEdge extends Edge {
  constructor(
    label: string,
    sourceId: NodeId,
    targetId: NodeId,
  ) {
    const attrDict: AttrDict = {
      labelE: label,
    };
    super(sourceId, targetId, attrDict);
  }
}

export const ContentLabel = "Content";
export const Prop = {
  Uuid: "uuid",
  Delete: "disabled",
  ContentId: "contentId",
};
export const EdgeLabel = {
  NextVersion: "nextVersion",
  TaggedWith: "taggedWith",
  Contains: "contains",
};

/**
 * Get a graph representation of the given metadata.
 *
 * *The node representing the content is the first node in the graph.*
 */
export function toGraph(
  metadata: ArtifactMetadatav2,
  attrs: AttrDict = {},
): Graph {
  const contentNode = new NamedNode(ContentLabel);
  contentNode.attributes.originalName = metadata.displayName;

  Object.entries(attrs)
    .forEach(([name, value]) => contentNode.attributes[name] = value);

  const [nodes, edges] = fromTags(contentNode.id, metadata.tags);

  // Return the content node as the first element in the nodes list
  return new Graph([contentNode, ...nodes], edges);
}

/**
 * Add node data ("originalName", "labelV") to the nodes in the graph.
 *
 * The original name is recorded for easier debugging. It is explicitly recorded
 * as "originalName" to be clear that renames will get this out of sync.
 *
 * Do not use the originalName for queries.
 */
export function addNodeData(taxonomy: Taxonomy, graph: Graph): Graph {
  // Build a dictionary of IDs to display names
  const nodeData = getNameTypeDict(taxonomy);
  console.log({ nodeData });

  // for each node, add the original name and set the label
  // TODO: rename id to tagId?
  graph.nodes.forEach((node) => {
    if (typeof node.attributes.tagId === "string") {
      const data = nodeData[node.attributes.tagId];
      if (data) {
        if (data.name) {
          node.attributes.originalName = data.name;
        }
        node.attributes.labelV = data.type;
      }
    }
  });
  return graph;
}

type NodeType =
  | "Vocabulary"
  | "Term"
  | "Text"
  | "Integer"
  | "Float"
  | "Boolean"
  | "Uri"
  | "Enum"
  | "Set"
  | "Compound";
interface NameTypeData {
  name: string;
  type: NodeType;
}

export function getNameTypeDict(taxonomy: Taxonomy): NameDict {
  const vocabTuples: NameTuple = Object.entries(taxonomy.vocabularies)
    .map(([name, data]) => [data.id, { name, type: "Vocabulary" }]);
  const termTuples: NameTuple = Object.values(taxonomy.vocabularies)
    .flatMap((vocab) =>
      Object.entries(vocab.terms).flatMap(([name, term]) =>
        getTermNameTuples(name, term)
      )
    );

  return Object.fromEntries(vocabTuples.concat(termTuples));
}

type NameDict = { [tagId: string]: NameTypeData };
type ID = string;
type NameTuple = [ID, NameTypeData][];
export function getTermNameTuples(
  name: string,
  term: Term | Variant,
): NameTuple {
  const namePairs: NameTuple = Object.entries(term.fields)
    .flatMap(([name, field]) => getFieldNameTuples(name, field));

  const type = isVariant(term) ? "Compound" : "Term";
  namePairs.push([term.id, { name, type }]);
  return namePairs;
}

function isVariant(t: Term | Variant): t is Variant {
  return "name" in t;
}

export function getFieldNameTuples(
  name: string,
  field: Field,
): NameTuple {
  const type = Object.keys(field.content)[0] as NodeType; // it would be nice if TS could figure this out on its own...
  let tuples: NameTuple = [[field.id, { name, type }]];

  // Handle children, if they exist
  if ("Compound" in field.content) {
    tuples.push(
      ...Object.entries(field.content.Compound.fields)
        .flatMap(([name, field]) => getFieldNameTuples(name, field)),
    );
  } else if ("Enum" in field.content) {
    const variants = field.content.Enum.variants;
    tuples.push(
      ...variants
        .flatMap((variant) => getTermNameTuples(variant.name, variant)),
    );
  } else if ("Set" in field.content) {
    const variants = field.content.Set.variants;
    tuples.push(
      ...variants
        .flatMap((variant) => getTermNameTuples(variant.name, variant)),
    );
  }

  return tuples;
}

// FIXME: use the exchange format to use better types
export function fromTags(parentId: NodeId, tags: any): [Node[], Edge[]] {
  return Object.entries(tags).reduce(
    ([nodes, edges]: [Node[], Edge[]], [guid, data]: [string, any]) => {
      const tagNode = isObject(data)
        ? new NamedNode("TagData", guid)
        : new NamedNode("TagData", guid, data); // FIXME: get the actual types

      nodes.push(tagNode);
      edges.push(new LabeledEdge(EdgeLabel.TaggedWith, parentId, tagNode.id));

      if (isObject(data)) {
        const [children, subEdges] = fromTags(tagNode.id, data);
        nodes.push(...children);
        edges.push(...subEdges);
      }

      return [nodes, edges];
    },
    [[], []],
  );
}
