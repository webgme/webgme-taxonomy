/*globals define*/
/*eslint-env node, browser*/

define([
  "text!./metadata.json",
  "plugin/PluginBase",
], function (
  pluginMetadata,
  PluginBase,
) {
  "use strict";

  const JSONSchemaExporter = require("../../common/JSONSchemaExporter");
  pluginMetadata = JSON.parse(pluginMetadata);

  class ExportToJSONSchema extends PluginBase {
    constructor() {
      super();
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      const exporter = new JSONSchemaExporter(this.core, this.META);
      // TODO: Check if it is a taxonomy node. If so, export the children
      // TODO: else, export the associated vocabularies
      const { schema, uiSchema } = await exporter.getSchemas(this.activeNode);
      const files = {
        "schema.json": JSON.stringify(schema, null, 2),
        "uischema.json": JSON.stringify(uiSchema, null, 2),
      };
      const taxonomyName = this.core.getAttribute(this.activeNode, "name");
      await this.addArtifact(taxonomyName, files);
      this.result.setSuccess(true);
    }
  }

  ExportToJSONSchema.metadata = pluginMetadata;

  return ExportToJSONSchema;
});
