/*globals define*/
/*eslint-env node, browser*/

define([
    'text!./metadata.json',
    'plugin/PluginBase',
    'webgme-taxonomy/JSONSchemaExporter',
], function (
    pluginMetadata,
    PluginBase,
    JSONSchemaExporter,
) {
    'use strict';

    pluginMetadata = JSON.parse(pluginMetadata);

    class ExportToJSONSchema extends PluginBase {
        constructor() {
            super();
            this.pluginMetadata = pluginMetadata;
        }

        async main() {
            const exporter = new JSONSchemaExporter(this.core, this.META);
            const {schema, uiSchema} = await exporter.getSchemas(this.activeNode);
            const files = {
                'schema.json': JSON.stringify(schema, null, 2),
                'uischema.json': JSON.stringify(uiSchema, null, 2),
            };
            await this.addArtifact(taxonomyName, files);
            this.result.setSuccess(true);
        }

    }

    ExportToJSONSchema.metadata = pluginMetadata;

    return ExportToJSONSchema;
});
