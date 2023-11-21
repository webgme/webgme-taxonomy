import { GmeLogger, UserProject } from "../../../src/common/types";

interface MemoryStorage {
  openDatabase(): Promise<void>;
  closeDatabase(): Promise<void>;
}

interface TestAuth {
  unload(): Promise<void>;
}

interface ImportResult {
  commitHash: string;
  project: UserProject;
}

interface ImportParams {
  projectSeed: string;
  projectName: string;
  branchName: string;
  logger: GmeLogger;
  gmeConfig: GmeConfig.GmeConfig;
}

export function requirejs(path: string): any;
export function getGmeConfig(): GmeConfig.GmeConfig;
export function clearDBAndGetGMEAuth(
  gmeConfig: GmeConfig.GmeConfig,
  projectName: string,
): Promise<TestAuth>;
export function importProject(
  storage: MemoryStorage,
  params: ImportParams,
): Promise<ImportResult>;
export function getMemoryStorage(
  logger: GmeLogger,
  gmeConfig: GmeConfig.GmeConfig,
  auth: TestAuth,
): MemoryStorage;
export function getLogger(name: string): GmeLogger;
