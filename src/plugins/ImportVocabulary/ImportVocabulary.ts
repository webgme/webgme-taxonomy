/*globals define*/
/*eslint-env node, browser*/

import PluginBase from "plugin/PluginBase";
import pluginMetadata from "./metadata.json";
import TaxonomyParser from "../../common/TaxonomyParser";
import WJIImporter from "webgme-json-importer/JSONImporter";

export default class ImportVocabulary extends PluginBase {
  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
    const config = this.getCurrentConfig();
    if (!config.csv) throw new Error("Vocabulary file is required.");

    const csvContent = await this.blobClient.getObjectAsString(config.csv);
    const vocabs = TaxonomyParser.fromCSV(csvContent);
    vocabs.forEach((root) => (root.pointers.base = "@meta:Vocabulary"));

    const importer = new WJIImporter(this.core, this.rootNode);
    if (config.overwrite) {
      const newState = {
        children: vocabs,
      };
      await importer.apply(this.activeNode, newState);
    } else {
      await Promise.all(
        vocabs.map((v) => importer.import(this.activeNode, v)),
      );
    }

    const vocabularyNames = vocabs.map((v) => v.attributes.name).join(", ");
    await this.save(`Imported vocab(s): ${vocabularyNames}`);
    this.result.setSuccess(true);
  }
}

ImportVocabulary.metadata = pluginMetadata;
