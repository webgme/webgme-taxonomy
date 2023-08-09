import type { AppendResult } from "./AppendResult";
import type TagFormatter from "../../../../../common/TagFormatter";
import type { WebgmeContext, WebgmeRequest } from "../../../../../common/types";

export interface Adapter {
  listArtifacts(): Promise<Repository[]>;
  createArtifact(metadata: ArtifactMetadata): Promise<string>;
  appendArtifact(
    repoId: string,
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
}

export interface AdapterStatic {
  from(
    gmeContext: WebgmeContext,
    storageNode: Core.Node,
    request: WebgmeRequest,
    config: any,
  ): Promise<Adapter>;
}

export interface Artifact {
  parentId?: string;
  id?: string;
  displayName: string;
  taxonomyTags: any[];
  taxonomyVersion: TaxonomyVersion;
  time: string;
  files?: string[];
}

export interface Repository {
  id: string;
  displayName: string;
  taxonomyTags: any[];
  taxonomyVersion: TaxonomyVersion;
  children: Artifact[];
}

export interface ArtifactMetadata {
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
