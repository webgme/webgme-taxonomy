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
  children: Artifact[];
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
