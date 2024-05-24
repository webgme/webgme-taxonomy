import { iso, Newtype } from "newtype-ts";
import type { ArtifactMetadata } from "../common/types";

export interface ProcessID
  extends Newtype<{ readonly ProcessID: unique symbol }, string> { }

export function newtype<T extends Newtype<any, any>>(value: any): T {
  const factory = iso<T>();
  return factory.wrap(value);
}

export interface Process {
  processType: string;
  processId: ProcessID;
}

export interface Observation {
  isFunction: boolean;
  processType: string;
  processId: ProcessID;
  isMeasure: boolean;
  index: number;
  version: number;
  observerId: string;
  startTime: string;
  endTime: string;
  data: [ObservationData];
  dataFiles: string[];
  applicationDependencies: [];
  processDependencies: [];
}

export type ObservationData =
  | ArtifactMetadata
  | ContentUpdate
  | ContentDeletion;

export interface ContentUpdate {
  metadata: ArtifactMetadata;
  validVersions: number[];
}

export interface ContentDeletion {
  version: number; // What version??
  validVersions: number[];
  /**
   * A reference to the latest metadata after the content has been deleted.
   *
   * This is merely an optimization so we don't need O(n) runtime to look
   * up a single content item.
   */
  latest?: LatestMetadata;
}

export type ContentEvent = ContentUpdate | ContentDeletion;

export interface LatestMetadata {
  metadata: ArtifactMetadata;
  version: number;
}

export interface AppendObservationResponse extends Observation {
  uploadDataFiles: {
    files: UploadDataFile[];
  } | null;
}

export interface UploadDataFile {
  name: string;
  sasUrl: string;
}

export interface GetObservationFilesResponse {
  processId: ProcessID;
  directoryId: string;
  transferId: string;
  expiresOn: string;
  files: ObservationFile[];
}

export interface ObservationFile {
  name: string;
  sasUrl: string;
  length: number;
  hash: string;
}

export enum TransferStatus {
  Success = "Succeeded",
  Pending = "Pending", // FIXME: what are the other options???
}

type DateTimeString = string;
export interface TransferState {
  operation: string;
  files: any[];
  runStart: DateTimeString;
  runEnd: DateTimeString;
  lastUpdate: DateTimeString;
  runDurationMs: number;
  status: TransferStatus;
}

export interface ProcessState {
  isFunction: boolean;
  processType: string;
  processId: ProcessID;
  numObservations: number;
  /**
  * The latest verison across all observations in the process. Note that all observations in a process share 
  * version counter. With the exception that a new index always starts at 0.
  */
  lastVersionIndex: number;
}
