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
import { addNodeData, AttrDict, ContentLabel, Prop, toGraph } from "./graphml";
import type { Option } from "oxide.ts";
import type {
  Adapter,
  Artifact,
  ArtifactMetadata,
  ArtifactMetadatav2,
  DisableResult,
  DownloadInfo,
  FileStreamDict,
  Repository,
  UpdateReservation,
  UpdateResult,
  UploadReservation,
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
    res: UploadReservation,
    metadata: ArtifactMetadata,
  ): Promise<string> {
    await this.metadata.create(res.repoId, metadata);
    return await this.content.createArtifact(res, metadata);
  }
  async appendArtifact(
    res: UploadReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<AppendResult> {
    //await this.metadata.create(metadata);
    // TODO: connect the content item to the parent (child relationship)
    return this.content.appendArtifact(res, metadata, filenames);
  }

  async updateArtifact(
    res: UpdateReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<UpdateResult> {
    await this.metadata.update(
      new ChildContentReference(res.repoId, res.contentId), // FIXME: this is the new content's ID - Not the existing one!
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
    fn: (res: UploadReservation) => Promise<T>,
  ): Promise<T> {
    return this.content.withRepoReservation(
      fn,
    );
  }
  withContentReservation<T>(
    fn: (res: UploadReservation) => Promise<T>,
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

type GremlinGraph = gremlin.process.GraphTraversalSource<
  gremlin.process.GraphTraversal
>;
interface ImplicitGraphQuery {
  getVertices(
    g: GremlinGraph,
  ): gremlin.process.GraphTraversal;
}

class ContentReference implements ImplicitGraphQuery {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getVertices(g: GremlinGraph): gremlin.process.GraphTraversal {
    return g.V()
      .has(ContentLabel, Prop.ContentId, this.id);
  }
}

class ChildContentReference implements ImplicitGraphQuery {
  private id: string;
  private parentId: string;

  constructor(parentId: string, id: string) {
    this.id = id;
    this.parentId = parentId;
  }

  getVertices(g: GremlinGraph): gremlin.process.GraphTraversal {
    return g.V()
      .has(ContentLabel, Prop.ContentId, this.parentId)
      .out("contains")
      .has(ContentLabel, Prop.ContentId, this.id);
  }
}

export interface MetadataAdapter {
  create(id: string, metadata: ArtifactMetadata): Promise<void>;
  //createChild(metadata: ArtifactMetadata): Promise<void>;
  update(query: ImplicitGraphQuery, metadata: ArtifactMetadata): Promise<void>;
  delete(query: ImplicitGraphQuery, parentId?: string): Promise<void>;
}

// TODO: load the configuration for this...
// maybe it should be its own metamodel?
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
export class GremlinAdapter implements MetadataAdapter {
  private taxonomy: Taxonomy;
  constructor(taxonomy: Taxonomy) {
    this.taxonomy = taxonomy;
  }

  async create(id: string, metadata: ArtifactMetadata): Promise<void> {
    const contentAttributes: AttrDict = {};
    contentAttributes[Prop.ContentId] = id;
    const graph = addNodeData(
      this.taxonomy,
      toGraph(toArtifactMetadatav2(metadata), contentAttributes),
    );
    const content = graph.toGraphMl();
    console.log("GraphML content:");
    console.log(content);

    const g = traversal().withRemote(
      new DriverRemoteConnection("ws://localhost:8182/gremlin"),
    );

    // Unfortunately, gremlin imports graphml only as files
    // so we will write the graph to a file then pass the
    // filename to the API...
    const tmpDir = await fsp.mkdtemp(
      path.join(os.tmpdir(), "webgme-taxonomy-"),
    );
    await fsp.chmod(tmpDir, 0o777);
    // TODO: use a volume shared by the graph db server
    const filename = path.join(tmpDir, "graph.xml");
    await fsp.writeFile(filename, content);

    console.log("saved graphml:", filename);
    try {
      await g.io(filename).read().iterate();
      //await fsp.rm(tmpDir, { recursive: true });
    } catch (err) {
      console.log("---------------- ERROR ----------------");
      console.log(err);
      //await fsp.rm(tmpDir, { recursive: true });
      throw err;
    }

    console.log("imported data into graphdb!");
  }
  async update(
    query: ImplicitGraphQuery,
    metadata: ArtifactMetadata,
  ): Promise<void> {
    // create the given node and connect it to the prior one
    // TODO
    // create the given node and connect it to the prior one
    // TODO
  }

  /**
   * Mark the content as deleted
   */
  async delete(query: ImplicitGraphQuery, parentId?: string): Promise<void> {
    const g = traversal().withRemote(
      new DriverRemoteConnection("ws://localhost:8182/gremlin"),
    );

    query.getVertices(g)
      .property(Prop.Delete, true);

    console.log("deleted metadata", query);
    // TODO: Should we capture the user ID who disabled it and the timestamp?
  }

  async runGremlin(query: string): Promise<any> {
    const g = traversal().withRemote(
      new DriverRemoteConnection("ws://localhost:8182/gremlin"),
    );
    throw new Error("Unimplemented!");
    //g.withStrategies(ReadOnlyStrategy.instance());
    //g.eval
  }
}
