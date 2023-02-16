import {Newtype, iso } from 'newtype-ts';
import type { ArtifactMetadata } from "../common/types";

export interface ProcessID extends Newtype<{ readonly ProcessID: unique symbol }, string> {}

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
  data: ArtifactMetadata[];
  dataFiles: string[];
  applicationDependencies: [];
  processDependencies: [];
}

export interface AppendObservationResponse extends Observation {
  uploadDataFiles: {
    files: UploadDataFile[];
  }
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
