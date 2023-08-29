import TestMethods from "../common/test-methods";
import { ITaxonomy } from "./ITaxonomy";
import TaxonomyParser from "../../../src/common/TaxonomyParser";

/**
 * Class wrapping generation of a mock taxonomy file
 */
export class TestTaxonomy implements ITaxonomy {
  taxonomy_file: Promise<string>;
  constructor() {
    /**
     * Several of the following pieces need to be estabished
     * as something like fixtures in order to abstract this
     * effort outside the test to isolate just the GUI
     * interaction.
     */

    const fs = require("fs");

    this.taxonomy_file = TestMethods.create_temp_taxonomy_file()
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
    return this.taxonomy_file;
  }
}
