// Define a graph db wrapper to be used w/ all storage adapters
// How do we configure the metadata adapter? It should probably be in the model somewhere...

import gremlin from "gremlin";
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
  MetadataStorageConfig,
  RepoReservation,
  Repository,
  UpdateReservation,
  UpdateResult,
} from "./common/types";
import { toArtifactMetadatav2 } from "../Utils";
import { Taxonomy } from "../../../common/exchange/Taxonomy";

export class StorageWithGraphSearch<
  C extends Adapter,
  M extends MetadataAdapter | null,
> implements Adapter {
  private contentStore: C;
  private metadataStore: M;
  private config: MetadataStorageConfig;

  constructor(config: MetadataStorageConfig, content: C, metadata: M) {
    this.config = config;
    this.contentStore = content;
    this.metadataStore = metadata;
  }

  async createArtifact(
    res: RepoReservation,
    metadata: ArtifactMetadata,
  ): Promise<string> {
    if (this.metadataStore) {
      await this.metadataStore.create(
        new ContentReference(res.repoId),
        metadata,
      );
    }

    return await this.contentStore.createArtifact(res, metadata);
  }

  async appendArtifact(
    res: ContentReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<AppendResult> {
    if (this.metadataStore) {
      await this.metadataStore.create(
        new ChildContentReference(res.repoId, res.contentId),
        metadata,
      );
    }

    return this.contentStore.appendArtifact(res, metadata, filenames);
  }

  async listPreviousFileNames(res: UpdateReservation): Promise<string[]> {
    return this.contentStore.listPreviousFileNames(res);
  }

  async updateArtifact(
    res: UpdateReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<UpdateResult> {
    // FIXME: for now, we can only update content but we should be able to update repos, too...
    if (this.metadataStore) {
      await this.metadataStore.create(
        new UpdatedChildContentReference(
          res.repoId,
          res.targetContentId,
          res.contentId,
        ),
        metadata,
      );
    }

    return this.contentStore.updateArtifact(res, metadata, filenames);
  }

  async disableArtifact(
    repoId: string,
    contentId: string,
  ): Promise<DisableResult> {
    if (this.metadataStore) {
      await this.metadataStore.delete(
        new ChildContentReference(repoId, contentId),
      );
    }

    return this.contentStore.disableArtifact(repoId, contentId);
  }

  // Pass through the rest of the functions to the content
  listRepos(): Promise<Repository[]> {
    return this.contentStore.listRepos();
  }

  getFileStreams(
    repoId: string,
    id: string,
  ): Promise<FileStreamDict> {
    return this.contentStore.getFileStreams(
      repoId,
      id,
    );
  }

  downloadFileURLs(
    repoId: string,
    contentIds: string[],
  ): Promise<DownloadInfo[]> {
    return this.contentStore.downloadFileURLs(
      repoId,
      contentIds,
    );
  }

  getMetadata(
    repoId: string,
    contentId: string,
  ): Promise<Option<ArtifactMetadatav2>> {
    return this.contentStore.getMetadata(
      repoId,
      contentId,
    );
  }

  getBulkMetadata(
    repoId: string,
    contentIds: string[],
    formatter: TagFormatter,
  ): Promise<any[]> {
    return this.contentStore.getBulkMetadata(
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
    if (this.contentStore.uploadFile) {
      return this.contentStore.uploadFile(
        repoId,
        index,
        fileId,
        req,
      );
    } else {
      throw new UnsupportedMethodFormat(
        this.contentStore.constructor.name,
        "uploadFile",
      );
    }
  }

  resolveUri(uri: string): [string, string] {
    return this.contentStore.resolveUri(uri);
  }

  withRepoReservation<T>(
    fn: (res: RepoReservation) => Promise<T>,
  ): Promise<T> {
    return this.contentStore.withRepoReservation(
      fn,
    );
  }

  withContentReservation<T>(
    fn: (res: ContentReservation) => Promise<T>,
    repoId: string,
  ): Promise<T> {
    return this.contentStore.withContentReservation(
      fn,
      repoId,
    );
  }

  withUpdateReservation<T>(
    fn: (res: UpdateReservation) => Promise<T>,
    repoId: string,
    contentId: string,
  ): Promise<T> {
    return this.contentStore.withUpdateReservation(
      fn,
      repoId,
      contentId,
    );
  }

  async getRepoMetadata(repoId: string): Promise<Repository> {
    return this.contentStore.getRepoMetadata(repoId);
  }

  async listArtifacts(repoId: string): Promise<Artifact[]> {
    return this.contentStore.listArtifacts(repoId);
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
  apply(g: GraphTraversal, nodeAlias: string): GraphTraversal;
}

export class ContentReference implements NodeInContext {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  find(g: GraphTraversal): GraphTraversal {
    return g
      .has(ContentLabel, Prop.ContentId, this.id);
  }

  apply(g: GraphTraversal, _nodeAlias: string): GraphTraversal {
    // explicitly a no-op since there are no relationships here and
    // the ID has been set in the original import
    return g;
  }
}

// TODO: it would be nice to have more composable versions of these...
export class ChildContentReference implements NodeInContext {
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

  /**
   * Add the containment relationship from the given node to the parent
   */
  apply(g: GraphTraversal, nodeAlias: string): GraphTraversal {
    const addParentAlias = g.V()
      .has(ContentLabel, Prop.ContentId, this.parentId)
      .as(this.parentId);

    return addParentAlias
      .addE(EdgeLabel.Contains)
      .from_(this.parentId)
      .to(nodeAlias);
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

  apply(g: GraphTraversal, nodeAlias: string): GraphTraversal {
    const addChildEdge = super.apply(g, nodeAlias);
    // Add the version edge
    const addPrevAlias = addChildEdge.V()
      .has(ContentLabel, Prop.ContentId, this.prevId)
      .as(this.prevId);

    return addPrevAlias
      .addE(EdgeLabel.NextVersion)
      .from_(this.prevId)
      .to(nodeAlias);
  }
}

export interface MetadataAdapter {
  create(context: NodeInContext, metadata: ArtifactMetadata): Promise<void>;
  //createChild(metadata: ArtifactMetadata): Promise<void>;
  delete(context: NodeInContext): Promise<void>;
}

const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;

/**
 * Metadata storage using with gremlin compatible database.
 */
export class GremlinAdapter implements MetadataAdapter {
  private taxonomy: Taxonomy;
  private config: MetadataStorageConfig;

  constructor(config: MetadataStorageConfig, taxonomy: Taxonomy) {
    this.taxonomy = taxonomy;
    this.config = config;
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
      new DriverRemoteConnection(this.config.gremlinEndpoint),
    );
    const addGraphStep = graph.instantiate(g.inject(0));

    // set up any relationships defined in the node's context (NodeInContext)
    const contentNode = graph.nodes[0];
    console.log("connecting to node with UUID:", contentNode.id);

    const allSteps = node.apply(
      addGraphStep,
      contentNode.id,
    );

    await allSteps.iterate();

    console.log("imported data into graphdb!");
  }

  /**
   * Mark the content as deleted
   */
  async delete(context: NodeInContext): Promise<void> {
    const g = traversal().withRemote(
      new DriverRemoteConnection(this.config.gremlinEndpoint),
    );

    const node = await context.find(g.V())
      .next();

    console.log("about to set", Prop.Delete, "on", node.value);
    await g.V(node.value)
      .property(Prop.Delete, true).iterate();

    console.log("deleted metadata", context);
    // TODO: Should we capture the user ID who disabled it and the timestamp?
  }

  async dropAll() {
    const g = traversal().withRemote(
      new DriverRemoteConnection(this.config.gremlinEndpoint),
    );

    await g.V().drop();
  }

  async runGremlin(query: string): Promise<any> {
    const g = traversal().withRemote(
      new DriverRemoteConnection(this.config.gremlinEndpoint),
    );
    throw new Error("Unimplemented!");
    //g.withStrategies(ReadOnlyStrategy.instance());
    //g.eval
  }
}
