import type {AppendResult} from './AppendResult';
export interface Adapter {
  listArtifacts(): Promise<Repository[]>;
  createArtifact(metadata: ArtifactMetadata): Promise<string>;
  appendArtifact(repoId: string, metadata: ArtifactMetadata, filenames: string[]): Promise<AppendResult>;
    // returns fileUploadInfo
  download(repoId: string, ids: string[], formatter, downloadDir: string): Promise<void>;
}

export interface Artifact {
  parentId: string;
  id: string;
  displayName: string;
  taxonomyTags: any[];
  taxonomy: TaxonomyVersion;
  time: string;
}

export interface Repository {
  id: string;
  displayName: string;
  taxonomyTags: any[];
  taxonomy: TaxonomyVersion;
  children: Artifact[];
}

export interface ArtifactMetadata {
  displayName: string;
  taxonomyTags: any[];
  taxonomyVersion: TaxonomyVersion;
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
