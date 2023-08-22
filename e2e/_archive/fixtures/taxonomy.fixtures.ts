import test from "@playwright/test";
import { TestTaxonomy } from "./TestTaxonomy";

type test_taxonomy = {
  test_taxonomy: TestTaxonomy;
};

/**
 * Extension of test to include taxonomy fixture
 */
export const baseTest = test.extend<test_taxonomy>({
  test_taxonomy: async ({}, use) => {
    await use(new TestTaxonomy());
  },
});
