type VocabSchemas = {
  schema: any,
  uiSchema: any,
  formData: any
};

export default class JSONSchemaExporter {

  getVocabSchemas(vocabNodes: Core.Node[], taxonomyName: string, onlyReleased?: boolean): Promise<VocabSchemas>;

  static from(core: GmeClasses.Core, node: Core.Node): JSONSchemaExporter;
}
