import type { AppendResult, UploadRequest } from "./AppendResult";
import type TagFormatter from "../../../../common/TagFormatter";
import type { Request } from "express";
import type {
  AzureGmeConfig,
  GmeContentContext,
} from "../../../../common/types";
import type { Option } from "oxide.ts";

type DisableResult = void;
interface UpdateResult {
  contentId: string;
  files: UploadRequest[];
}

/**
 * Interface for storage-adapter.
 */
export interface Adapter {
  listRepos(): Promise<Repository[]>;
  getRepoMetadata(repoId: string): Promise<Repository>;
  listArtifacts(repoId: string): Promise<Artifact[]>;
  createArtifact(
    res: RepoReservation,
    metadata: ArtifactMetadata,
  ): Promise<string>;
  appendArtifact(
    res: ContentReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<AppendResult>;
  /**
   * Push an updated version of the content.
   */
  updateArtifact(
    res: UpdateReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<UpdateResult>;
  /**
   * List the file-names from the previously uploaded version.
   */
  listPreviousFileNames(res: UpdateReservation): Promise<string[]>;

  /**
   * Disable the content. Metadata will still be available when requested explicitly
   * but content is inaccessible.
   */
  disableArtifact(repoId: string, contentId: string): Promise<DisableResult>;

  // returns fileUploadInfo
  getFileStreams(
    repoId: string,
    id: string,
  ): Promise<FileStreamDict>;
  downloadFileURLs(
    repoId: string,
    contentIds: string[],
  ): Promise<DownloadInfo[]>;
  getMetadata(
    repoId: string,
    contentId: string,
  ): Promise<Option<ArtifactMetadatav2>>;
  getBulkMetadata(
    repoId: string,
    contentIds: string[],
    formatter: TagFormatter,
  ): Promise<any[]>;
  uploadFile?(
    repoId: string,
    index: string,
    fileId: string,
    req: Request,
  ): Promise<void>;
  /**
   * Convert a URI to a repo and content ID.
   */
  resolveUri(uri: string): [string, string];
  /*
   * RAII-style reservations for uploading data
   */
  withRepoReservation<T>(
    fn: (res: RepoReservation) => Promise<T>,
  ): Promise<T>;
  withContentReservation<T>(
    fn: (res: ContentReservation) => Promise<T>,
    repoId: string,
  ): Promise<T>;
  withUpdateReservation<T>(
    fn: (res: UpdateReservation) => Promise<T>,
    repoId: string,
    contentId: string,
  ): Promise<T>;
}

export interface RepoReservation {
  readonly repoId: string;
  readonly uri: string | undefined;
}

export interface ContentReservation {
  readonly repoId: string;
  readonly contentId: string;
  readonly uri: string | undefined;
}

export interface UpdateReservation extends ContentReservation {
  readonly repoId: string;
  /**
   * ID to be issued to the new (updated) content.
   */
  readonly contentId: string;
  /**
   * ID of the content to update.
   */
  readonly targetContentId: string;
  readonly uri: string;
}

export interface AdapterStatic<A extends Adapter> {
  from(
    gmeContext: GmeContentContext,
    storageNode: Core.Node,
    request: Request,
    config: any,
  ): Promise<A>;
  fromUri(
    config: AzureGmeConfig,
    req: Request,
    uri: string,
  ): Promise<A>;
  getUriPatterns(): string[];
  resolveUri(uri: string): [string, string];
}

export interface Artifact {
  parentId?: string;
  id?: string;
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyVersion;
  time: string;
  files?: string[];
  disabled?: DisabledInfo;
}

// Tags are stored in a tag dictionary like below (example is human-readable):
// {
//   Base: {
//     name: {
//       value: "hello world!"
//     }
//   }
// }
type TagDict = { [vocab: string]: { [term: string]: any } };
export interface Repository {
  id: string;
  displayName: string;
  tags: TagDict;
  taxonomyVersion: TaxonomyVersion;
}

/*
 * Metadata exposed to the end user via the tag form and downloading archives
 * from the storage endpoints
 */
export interface Metadata {
  tags: TagDict;
  taxonomyVersion: TaxonomyVersion;
}

export type ArtifactMetadata = ArtifactMetadatav1 | ArtifactMetadatav2;

export interface DisabledInfo {
  time: string;
  userId?: string;
}

export interface ArtifactMetadatav2 {
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyVersion;
  time: string;
  disabled?: DisabledInfo;
}

export interface ArtifactMetadatav1 {
  displayName: string;
  taxonomyTags: any[];
  taxonomyVersion: TaxonomyVersion;
  time: string;
  disabled?: DisabledInfo;
}

export type TaxonomyVersion = TaxonomyRelease | TaxonomyBranch | TaxonomyCommit;

export interface TaxonomyRelease {
  id: string;
  tag: string;
  commit: string;
}

export interface TaxonomyBranch {
  id: string;
  branch: string;
  commit: string;
}

export interface TaxonomyCommit {
  id: string;
  commit: string;
}

export interface DownloadInfo {
  repoId: string;
  id: string;
  files: FileURLInfo[];
}

export interface FileURLInfo {
  name: string;
  url: string;
}

export type FileStreamDict = { [filename: string]: NodeJS.ReadableStream };

export interface MetadataStorageConfig {
  enable: boolean;
  gremlinEndpoint: string;
}
