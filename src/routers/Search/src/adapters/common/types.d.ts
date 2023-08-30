import type { AppendResult } from "./AppendResult";
import type TagFormatter from "../../../../../common/TagFormatter";
import type { WebgmeContext, WebgmeRequest } from "../../../../../common/types";

export interface Adapter {
  listRepos(): Promise<Repository[]>;
  listArtifacts(repoId: string): Promise<Artifact[]>;
  createArtifact(
    res: UploadReservation,
    metadata: ArtifactMetadata,
  ): Promise<string>;
  appendArtifact(
    res: UploadReservation,
    metadata: ArtifactMetadata,
    filenames: string[],
  ): Promise<AppendResult>;
  // returns fileUploadInfo
  download(
    repoId: string,
    ids: string[],
    formatter: TagFormatter,
    downloadDir: string,
  ): Promise<void>;
  downloadFileURLs(
    repoId: string,
    contentIds: string[],
  ): Promise<DownloadInfo[]>;
  getMetadata(
    repoId: string,
    contentId: string,
    formatter: TagFormatter,
  ): Promise<any>;
  getBulkMetadata(
    repoId: string,
    contentIds: string[],
    formatter: TagFormatter,
  ): Promise<any[]>;
  uploadFile?(
    repoId: string,
    index: string,
    fileId: string,
    req: WebgmeRequest,
  ): Promise<void>;
  /*
   * RAII-style reservations for uploading data
   */
  withRepoReservation<T>(
    fn: (res: UploadReservation) => Promise<T>,
  ): Promise<T>;
  withContentReservation<T>(
    fn: (res: UploadReservation) => Promise<T>,
    repoId: string,
  ): Promise<T>;
}

export interface UploadReservation {
  repoId?: string;
  uri: string | undefined;
}

export interface AdapterStatic {
  from(
    gmeContext: WebgmeContext,
    storageNode: Core.Node,
    request: WebgmeRequest,
    config: any,
  ): Promise<Adapter>;
  getUriPatterns(): string[];
}

export interface Artifact {
  parentId?: string;
  id?: string;
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyVersion;
  time: string;
  files?: string[];
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

export interface ArtifactMetadatav2 {
  displayName: string;
  tags: any;
  taxonomyVersion: TaxonomyVersion;
  time: string;
}

export interface ArtifactMetadatav1 {
  displayName: string;
  taxonomyTags: any[];
  taxonomyVersion: TaxonomyVersion;
  time: string;
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
