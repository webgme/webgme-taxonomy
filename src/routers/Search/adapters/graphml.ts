import { isObject, unique } from "../Utils";
import { ArtifactMetadatav2 } from "./common/types";

export class Graph {
  private nodes: Node[];
  private edges: Edge[];

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

type NodeId = number;
type EdgeId = number;
type AttrDict = { [name: string]: string | number | boolean };
class Node {
  readonly id: NodeId;
  readonly attributes: AttrDict;
  constructor(attributes: { [name: string]: any }) {
    this.id = newId();
    this.attributes = attributes;
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

// TODO: dynamically read the label from the exchange format?
function newId() {
  return Date.now() + Math.floor(10000 * Math.random());
}

type EdgeLabel = "tagged_with" | "using_taxonomy";
class NamedNode extends Node {
  constructor(
    label: string,
    originalName: string,
    value?: string | number | boolean,
  ) {
    const attrDict: AttrDict = {
      labelV: label,
      originalName,
    };
    if (value !== undefined) {
      attrDict.value = value;
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

export function toGraph(metadata: ArtifactMetadatav2): Graph {
  const contentNode = new NamedNode("Content", metadata.displayName);
  const [nodes, edges] = fromTags(contentNode.id, metadata.tags); // TODO: pass the exchange format, too
  return new Graph(nodes.concat(contentNode), edges);
}

// FIXME: use the exchange format to use better types
export function fromTags(parentId: NodeId, tags: any): [Node[], Edge[]] {
  return Object.entries(tags).reduce(
    ([nodes, edges]: [Node[], Edge[]], [guid, data]: [string, any]) => {
      const tagNode = isObject(data)
        ? new NamedNode("TagData", guid)
        : new NamedNode("TagData", guid, data); // FIXME: get the actual types

      nodes.push(tagNode);
      edges.push(new LabeledEdge("tagged_with", parentId, tagNode.id));

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
