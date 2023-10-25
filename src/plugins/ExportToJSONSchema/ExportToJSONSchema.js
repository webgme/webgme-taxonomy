/*globals define*/
/*eslint-env node, browser*/

define([
  "text!./metadata.json",
  "plugin/PluginBase",
  "module",
], function (
  pluginMetadata,
  PluginBase,
  module,
) {
  "use strict";

  const path = require.nodeRequire("path");
  const SRC_DIR = path.join(path.dirname(module.uri), "..", "..");
  const JSONSchemaExporter = require.nodeRequire(
    path.join(SRC_DIR, "common", "JSONSchemaExporter"),
  );
  const Utils = require.nodeRequire(
    path.join(SRC_DIR, "common", "Utils"),
  );
  pluginMetadata = JSON.parse(pluginMetadata);

  class ExportToJSONSchema extends PluginBase {
    constructor() {
      super();
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      const { onlyReleased, sugarLevel } = this.getCurrentConfig();
      const exporter = new JSONSchemaExporter(this.core, this.META, sugarLevel);
      const taxonomyName = this.core.getAttribute(this.activeNode, "name");
      let schema, uiSchema;

      if (this.core.isTypeOf(this.activeNode, this.META.Taxonomy)) {
        const schemas = await exporter.getSchemas(
          this.activeNode,
          onlyReleased,
        );
        schema = schemas.schema;
        uiSchema = schemas.uiSchema;
      } else { // assume content type-like thing
        const vocabs = await Utils.getVocabulariesFor(
          this.core,
          this.activeNode,
        );
        const schemas = await exporter.getVocabSchemas(
          vocabs,
          taxonomyName,
          onlyReleased,
        );
        schema = schemas.schema;
        uiSchema = schemas.uiSchema;
      }
      const files = {
        "schema.json": JSON.stringify(schema, null, 2),
        "uischema.json": JSON.stringify(uiSchema, null, 2),
      };
      await this.addArtifact(taxonomyName, files);
      this.result.setSuccess(true);
    }
  }

  ExportToJSONSchema.metadata = pluginMetadata;

  return ExportToJSONSchema;
});
