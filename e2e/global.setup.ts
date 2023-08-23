import { expect, FullConfig, test as setup } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("Global setup e2e/global.setup.ts");
}

export default globalSetup;
