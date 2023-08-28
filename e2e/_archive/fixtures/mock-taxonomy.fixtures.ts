import TestMethods from "../test-methods";
import TaxonomyParser from "../../../src/common/TaxonomyParser";
import { configured_test } from "./test-config.fixtures";

export interface IMockTaxonomy {
  /**
   * Async property to return path to mock taxonomy in the temp file system
   *
   * @type {Promise<string>}
   * @memberof IMockTaxonomy
   */
  mock_taxonomy_file_path: Promise<string>;
}

/**
 * Implmentation of the MockTaxonomy; creates a one-time wrapper
 * on a promise to produce a taxonomy
 * - to produce a CSV representation on the (temp) file system,
 * - to translate into a usuable taxonomy via TaxonomyParser.fromCSV, and
 * - to return a string path to the temp file.
 *
 * @export
 * @class MockTaxonomyImpl
 * @implements {IMockTaxonomy}
 */
export class MockTaxonomyImpl implements IMockTaxonomy {
  mock_taxonomy_file_path: Promise<string>;

  constructor() {
    /**
     * Several of the following pieces need to be estabished
     * as something like fixtures in order to abstract this
     * effort outside the test to isolate just the GUI
     * interaction.
     */

    const fs = require("fs");

    this.mock_taxonomy_file_path = TestMethods.create_temp_taxonomy_file()
      .then((temp_taxonomy_file) => {
        const csvContent = fs.readFileSync(temp_taxonomy_file, "utf8");
        const tags = TaxonomyParser.fromCSV(csvContent);
        return {
          pointers: {
            base: "@meta:Taxonomy",
          },
          children: tags,
        };
      })
      .then((taxonomy) => {
        return TestMethods.create_temp_file("taxonomy", "json", async () => {
          return JSON.stringify(taxonomy);
        });
      });
  }

  async get(): Promise<string> {
    return this.mock_taxonomy_file_path;
  }
}

type test_taxonomy = {
  mock_taxonomy: MockTaxonomyImpl;
};

export const test_with_taxonomy = configured_test.extend<test_taxonomy>({
  mock_taxonomy: async ({}, use) => {
    await use(new MockTaxonomyImpl());
  },
});
