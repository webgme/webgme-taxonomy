import PluginBase from "plugin/PluginBase";
import pluginMetadata from "./metadata.json";
import JSONSchemaExporter from '../../common/JSONSchemaExporter';
import Utils, {toString} from '../../common/Utils';

// FIXME: a few of the webgme typings are incorrect and need to be fixed
export default class ExportToJSONSchema extends PluginBase {
  static metadata: GmeCommon.Metadata;

  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
	  /// @ts-ignore
      const { onlyReleased } = this.getCurrentConfig();
	  /// @ts-ignore
      const exporter = new JSONSchemaExporter(this.core, this.META);
      const taxonomyName = toString(this.core.getAttribute(this.activeNode, "name"));
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
	  /// @ts-ignore
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
	  /// @ts-ignore
      await this.addArtifact(taxonomyName, files);
      this.result.setSuccess(true);
    }
  }

  ExportToJSONSchema.metadata = pluginMetadata;
