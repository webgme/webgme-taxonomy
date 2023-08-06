import test from "@playwright/test";
import { TestTaxonomy } from "./TestTaxonomy";

type test_taxonomy = {
  test_taxonomy: TestTaxonomy;
};

export const baseTest = test.extend<test_taxonomy>({
  test_taxonomy: async ({}, use) => {
    await use(new TestTaxonomy());
  },
});
