/*globals define*/
/*eslint-env node, browser*/

define([
  "webgme-taxonomy/TaxonomyParser",
  "webgme-json-importer/JSONImporter",
  "common/util/assert",
  "text!./metadata.json",
  "plugin/PluginBase",
], function (TaxonomyParser, WJIImporter, assert, pluginMetadata, PluginBase) {
  "use strict";

  pluginMetadata = JSON.parse(pluginMetadata);

  class ImportVocabulary extends PluginBase {
    constructor() {
      super();
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      const config = this.getCurrentConfig();
      assert(config.csv, "Vocabulary file is required.");

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
          vocabs.map((v) => importer.import(this.activeNode, v))
        );
      }

      const vocabularyNames = vocabs.map((v) => v.attributes.name).join(", ");
      await this.save(`Imported vocab(s): ${vocabularyNames}`);
      this.result.setSuccess(true);
    }
  }

  ImportVocabulary.metadata = pluginMetadata;

  return ImportVocabulary;
});
