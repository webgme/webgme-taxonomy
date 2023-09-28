import crypto from "crypto";
import os from "os";
import path from "path";
// import * as fs from 'fs';
import * as fs from "fs/promises";

export default class TestMethods {
  /**
   * Generator to create random project names based on a modified UUID
   *
   * @static
   * @param {string} [prefix="Project_"]
   * @return {*}  {Generator<string>}
   * @memberof TestMethods
   */
  static *project_name_generator(
    prefix: string = "Project",
  ): Generator<string> {
    // Global hyphen search
    const HYPEN_RE: RegExp = /\-/gi;
    const REPLACEMENT_TOKEN: string = "_";

    let guid: string = crypto.randomUUID().toString();
    guid = guid.replace(HYPEN_RE, REPLACEMENT_TOKEN);
    const project_name: string = `${prefix}_project_${guid}`;
    return project_name;
  }

  /**
   * Create a temporary file in the local operating system of the form
   * <name><cryptostring>.<extension>
   *
   * This is just a helper method, so no checking (e.g., validating the extension
   * is more like 'csv' and not '.csv')
   *
   * Call the text_generator if supplied to populate the file
   *
   * @static
   * @param {string} name
   * @param {string} extension
   * @param {TextGeneratorCall} text_generator
   * @param {string} [tempDir]
   * @return {*}  {string}
   * @memberof TestMethods
   */
  static async create_temp_file(
    name: string,
    extension: string,
    text_generator?: () => Promise<string>,
    tempDir?: string,
  ): Promise<string> {
    tempDir = tempDir ? tempDir : os.tmpdir();
    const temp_file_path = path.join(
      tempDir,
      `${name}${crypto.randomBytes(16).toString("hex")}.${extension}`,
    );
    if (text_generator != null) {
      const generated_text = await text_generator();
      await fs.writeFile(temp_file_path, generated_text);
    }
    return temp_file_path;
  }

  /**
   * Wrapper tp create a temporary taxonomy file in the system temp directory
   *
   * @static
   * @return {*}  {string}
   * @memberof TestMethods
   */
  static async create_temp_taxonomy_file(
    taxonomy_generator: () => Promise<string> =
      TestMethods.get_static_taxonomy_csv,
    name: string = "taxonomy_file",
  ): Promise<string> {
    return TestMethods.create_temp_file(
      "taxonomy_file",
      "csv",
      taxonomy_generator,
    );
  }

  /**
   * Creates an in-memory sample CSV
   * @returns
   */
  static async get_static_taxonomy_csv(): Promise<string> {
    return [
      "parentTerm,,,",
      ",childTerm,,,",
      ",,name (text),",
      ",,age (int),",
      ",,color (enum),",
      ",,,red",
      ",,,blue",
      ",,,green",
    ].join("\n");
  }

  /**
   * Creates a listener on socket.io calls (helper to track issue where
   * split on empty cookie in socket was throwing an error)
   * @param pageref
   */
  static async setPageListener(pageref) {
    await pageref.route(
      new RegExp(".+socket.io.+$"),
      async (route, request) => {
        console.log(
          `********** BEGIN Route - ${request.url()}\nHeaders: ${
            TestMethods.prettyPrintJson(
              request.headers(),
            )
          }`,
        );
        route.continue();
        await request.response();
        console.log(
          `********** END Route - ${request.url()}\nHeaders: ${
            TestMethods.prettyPrintJson(
              request.headers(),
            )
          }`,
        );
      },
    );
  }

  /**
   * Basic wrapper to perform consistent JSON.stringify to pretty-print
   * @param d
   * @returns
   */
  static prettyPrintJson(d) {
    return JSON.stringify(d, null, 2);
  }

  /**
   * Dynamic generation of a mock taxonomy file for use in upload,
   * removing need for a pre-generated scenario.
   * @returns
   */
  static async generate_test_taxonomy_file() {
    const TaxonomyParser = require("../src/common/TaxonomyParser");

    const temp_taxonomy_file = await TestMethods.create_temp_taxonomy_file();

    // Execute process to convert taxonomy from csv (./bin/taxonomy-from-csv <path-to-csv> > taxonomy.json)
    const fs = require("fs");
    const csvContent = fs.readFileSync(temp_taxonomy_file, "utf8");
    const tags = TaxonomyParser.fromCSV(csvContent);

    const taxonomy = {
      pointers: {
        base: "@meta:Taxonomy",
      },
      children: tags,
    };

    const temp_taxonomy_json_file = await TestMethods.create_temp_file(
      "taxonomy",
      "json",
      async () => {
        return JSON.stringify(taxonomy);
      },
    );

    return temp_taxonomy_json_file;
  }
}
