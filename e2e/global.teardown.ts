import { expect, FullConfig, test as teardown } from "@playwright/test";

async function globalTeardown(config: FullConfig) {
  console.log("Global teardown in e2e/global.teardown.ts");
}

export default globalTeardown;
