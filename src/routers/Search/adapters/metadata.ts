// Define a graph db wrapper to be used w/ all storage adapters
// How do we configure the metadata adapter? It should probably be in the model somewhere...

import gremlin from "gremlin";
import fsp from "fs/promises";
import path from "path";
import os from "os";
import type { Request } from "express";
import TagFormatter from "../../../common/TagFormatter";
import { AppendResult } from "./common/AppendResult";
import { UnsupportedMethodFormat } from "./common/StorageError";
import {
  addNodeData,
  AttrDict,
  ContentLabel,
  EdgeLabel,
  Prop,
  toGraph,
} from "./graphml";
import type { Option } from "oxide.ts";
import type {
  Adapter,
  Artifact,
  ArtifactMetadata,
  ArtifactMetadatav2,
  ContentReservation,
  DisableResult,
  DownloadInfo,
  FileStreamDict,
  RepoReservation,
  Repository,
  UpdateReservation,
  UpdateResult,
} from "./common/types";
import { toArtifactMetadatav2 } from "../Utils";
import { Taxonomy } from "../../../common/exchange/Taxonomy";

export class StorageWithGraphSearch<
  C extends Adapter,
  M extends MetadataAdapter,
> implements Adapter {
  private content: C;
  private metadata: M;

  constructor(content: C, metadata: M) {
    this.content = content;
    this.metadata = metadata;
  }

  async createArtifact(
    res: RepoReservation,
    metadata: ArtifactMetadata,
  ): Promise<string> {
    await this.metadata.create(new ContentReference(res.repoId), metadata);
    return await this.content.createArtifact(res, metadata);
  }

  async appendArtifact(
    res: ContentReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<AppendResult> {
    await this.metadata.create(
      new ChildContentReference(res.repoId, res.contentId),
      metadata,
    );
    return this.content.appendArtifact(res, metadata, filenames);
  }

  async updateArtifact(
    res: UpdateReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<UpdateResult> {
    // FIXME: for now, we can only update content but we should be able to update repos, too...
    await this.metadata.create(
      new UpdatedChildContentReference(
        res.repoId,
        res.targetContentId,
        res.contentId,
      ),
      metadata,
    );
    return this.content.updateArtifact(res, metadata, filenames);
  }

  async disableArtifact(
    repoId: string,
    contentId: string,
  ): Promise<DisableResult> {
    await this.metadata.delete(new ChildContentReference(repoId, contentId));
    return this.content.disableArtifact(repoId, contentId);
  }

  // Pass through the rest of the functions to the content
  listRepos(): Promise<Repository[]> {
    return this.content.listRepos();
  }

  getFileStreams(
    repoId: string,
    id: string,
  ): Promise<FileStreamDict> {
    return this.content.getFileStreams(
      repoId,
      id,
    );
  }

  downloadFileURLs(
    repoId: string,
    contentIds: string[],
  ): Promise<DownloadInfo[]> {
    return this.content.downloadFileURLs(
      repoId,
      contentIds,
    );
  }

  getMetadata(
    repoId: string,
    contentId: string,
  ): Promise<Option<ArtifactMetadatav2>> {
    return this.content.getMetadata(
      repoId,
      contentId,
    );
  }

  getBulkMetadata(
    repoId: string,
    contentIds: string[],
    formatter: TagFormatter,
  ): Promise<any[]> {
    return this.content.getBulkMetadata(
      repoId,
      contentIds,
      formatter,
    );
  }

  uploadFile(
    repoId: string,
    index: string,
    fileId: string,
    req: Request,
  ): Promise<void> {
    if (this.content.uploadFile) {
      return this.content.uploadFile(
        repoId,
        index,
        fileId,
        req,
      );
    } else {
      throw new UnsupportedMethodFormat(
        this.content.constructor.name,
        "uploadFile",
      );
    }
  }

  resolveUri(uri: string): [string, string] {
    return this.content.resolveUri(uri);
  }

  withRepoReservation<T>(
    fn: (res: RepoReservation) => Promise<T>,
  ): Promise<T> {
    return this.content.withRepoReservation(
      fn,
    );
  }

  withContentReservation<T>(
    fn: (res: ContentReservation) => Promise<T>,
    repoId: string,
  ): Promise<T> {
    return this.content.withContentReservation(
      fn,
      repoId,
    );
  }

  withUpdateReservation<T>(
    fn: (res: UpdateReservation) => Promise<T>,
    repoId: string,
    contentId: string,
  ): Promise<T> {
    return this.content.withUpdateReservation(
      fn,
      repoId,
      contentId,
    );
  }

  async getRepoMetadata(repoId: string): Promise<Repository> {
    return this.content.getRepoMetadata(repoId);
  }

  async listArtifacts(repoId: string): Promise<Artifact[]> {
    return this.content.listArtifacts(repoId);
  }
}

type GraphTraversal = gremlin.process.GraphTraversal;
type GremlinGraph = gremlin.process.GraphTraversalSource<GraphTraversal>;
// FIXME: what is a better type for the nodes queried from the graph?
type GraphNode = IteratorResult<any, any>;

/**
 * This is an object that references a specific node in a graph. This
 * can be used to search for a node w/ the given relationships, etc, in
 * the graph or it can be used to establish the given relationships with
 * an existing node.
 */
interface NodeInContext {
  /**
   * Get the ID of the given node.
   */
  id: string;
  find(
    g: GraphTraversal,
  ): GraphTraversal;
  /**
   * Apply the given relationships to the given node(s).
   */
  apply(g: GremlinGraph, node: GraphNode): Promise<void>;
}

class ContentReference implements NodeInContext {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  find(g: GraphTraversal): GraphTraversal {
    return g
      .has(ContentLabel, Prop.ContentId, this.id);
  }

  async apply(_g: GremlinGraph, _node: GraphNode): Promise<void> {
    // explicitly a no-op since there are no relationships here and
    // the ID has been set in the original import
  }
}

class InEdgeContentReference implements NodeInContext {
  id: string;
  private sourceId: string;
  private label: string;

  constructor(label: string, sourceId: string, id: string) {
    this.label = label;
    this.id = id;
    this.sourceId = sourceId;
  }

  find(g: GraphTraversal): GraphTraversal {
    return g
      .has(ContentLabel, Prop.ContentId, this.sourceId)
      .out(this.label)
      .has(ContentLabel, Prop.ContentId, this.id);
  }

  async apply(g: GremlinGraph, node: GraphNode): Promise<void> {
    g.V()
      .has(ContentLabel, Prop.ContentId, this.sourceId)
      .addE(this.label)
      .to(node);
  }
}

// TODO: it would be nice to have more composable versions of these...
class ChildContentReference implements NodeInContext {
  id: string;
  private parentId: string;

  constructor(parentId: string, id: string) {
    this.id = id;
    this.parentId = parentId;
  }

  find(g: GraphTraversal): gremlin.process.GraphTraversal {
    return g
      .has(ContentLabel, Prop.ContentId, this.parentId)
      .out(EdgeLabel.Contains)
      .has(ContentLabel, Prop.ContentId, this.id);
  }

  async apply(g: GremlinGraph, node: GraphNode): Promise<void> {
    const parent = await g.V()
      .has(ContentLabel, Prop.ContentId, this.parentId)
      .next();

    await g.V(parent.value)
      .addE(EdgeLabel.Contains)
      .to(node.value).iterate();
  }
}

class UpdatedChildContentReference extends ChildContentReference
  implements NodeInContext {
  private prevId: string;

  constructor(parentId: string, prevId: string, id: string) {
    super(parentId, id);
    this.prevId = prevId;
  }

  find(g: GraphTraversal): gremlin.process.GraphTraversal {
    return super.find(g).where(
      g.has(ContentLabel, Prop.ContentId, this.prevId)
        .out(EdgeLabel.NextVersion)
        .has(ContentLabel, Prop.ContentId, this.id),
    );
  }

  async apply(g: GremlinGraph, node: GraphTraversal): Promise<void> {
    super.apply(g, node);

    // Add the version edge
    const prev = await g.V()
      .has(ContentLabel, Prop.ContentId, this.prevId)
      .next();

    await g.V(prev.value)
      .addE(EdgeLabel.NextVersion)
      .to(node.value).iterate();
  }
}

export interface MetadataAdapter {
  create(context: NodeInContext, metadata: ArtifactMetadata): Promise<void>;
  //createChild(metadata: ArtifactMetadata): Promise<void>;
  delete(context: NodeInContext): Promise<void>;
}

// TODO: load the configuration for this...
// maybe it should be its own metamodel?
const GREMLIN_ENDPOINT = "ws://localhost:8182/gremlin"; // TODO: make this configurable
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
export class GremlinAdapter implements MetadataAdapter {
  private taxonomy: Taxonomy;
  constructor(taxonomy: Taxonomy) {
    this.taxonomy = taxonomy;
  }

  async create(node: NodeInContext, metadata: ArtifactMetadata): Promise<void> {
    const contentAttributes: AttrDict = {};
    contentAttributes[Prop.ContentId] = node.id; // This ID is not guaranteed to be unique!
    contentAttributes[Prop.Delete] = false;

    const graph = addNodeData(
      this.taxonomy,
      toGraph(toArtifactMetadatav2(metadata), contentAttributes),
    );
    const g = traversal().withRemote(
      new DriverRemoteConnection(GREMLIN_ENDPOINT),
    );
    const addGraphStep = graph.instantiate(g.inject(0));

    // set up any relationships defined in the node's context (NodeInContext)
    const contentNode = graph.nodes[0];
    console.log("connecting to node with UUID:", contentNode.attributes.uuid);
    const graphNode = await g.V().has(
      ContentLabel,
      Prop.Uuid,
      contentNode.attributes.uuid,
    ).next();
    console.log({ graphNode });

    node.apply(
      addGraphStep,
      graphNode,
    );

    console.log("imported data into graphdb!");
  }

  /**
   * Mark the content as deleted
   */
  async delete(context: NodeInContext): Promise<void> {
    const g = traversal().withRemote(
      new DriverRemoteConnection(GREMLIN_ENDPOINT),
    );

    const node = await context.find(g.V())
      .next();

    console.log("about to set", Prop.Delete, "on", node.value);
    await g.V(node.value)
      .property(Prop.Delete, true).iterate();

    console.log("deleted metadata", context);
    // TODO: Should we capture the user ID who disabled it and the timestamp?
  }

  async runGremlin(query: string): Promise<any> {
    const g = traversal().withRemote(
      new DriverRemoteConnection(GREMLIN_ENDPOINT),
    );
    throw new Error("Unimplemented!");
    //g.withStrategies(ReadOnlyStrategy.instance());
    //g.eval
  }
}
