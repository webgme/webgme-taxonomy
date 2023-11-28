/*globals define*/
/*eslint-env node, browser*/

import PluginBase from "plugin/PluginBase";
import JSONSchemaExporter from "../../common/JSONSchemaExporterv1";
import { GmeCore } from "../../common/types";
import pluginMetadata from "./metadata.json";
export default class ExportToJSONSchema extends PluginBase {
  static metadata: GmeCommon.Metadata;
  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
    const exporter = new JSONSchemaExporter(this.core as GmeCore, this.META);
    // TODO: Check if it is a taxonomy node. If so, export the children
    // TODO: else, export the associated vocabularies
    const { schema, uiSchema } = await exporter.getSchemas(this.activeNode);
    const files = {
      "schema.json": JSON.stringify(schema, null, 2),
      "uischema.json": JSON.stringify(uiSchema, null, 2),
    };
    const taxonomyName = this.core.getAttribute(this.activeNode, "name");
    /// @ts-ignore
    await this.addArtifact(taxonomyName, files);
    this.result.setSuccess(true);
  }
}

ExportToJSONSchema.metadata = pluginMetadata;
