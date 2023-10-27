type VocabSchemas = {
  schema: any;
  uiSchema: any;
  formData: any;
};

export enum SugarLevel {
  Sugared = "Sugared",
  Desugared = "Desugared",
  Any = "Any",
}
export default class JSONSchemaExporter {
  getSchemas(
    taxonomyNode: Core.Node,
    onlyReleased?: boolean,
  ): Promise<VocabSchemas>;
  getVocabSchemas(
    vocabNodes: Core.Node[],
    taxonomyName: string,
    onlyReleased?: boolean,
  ): Promise<VocabSchemas>;

  static from(
    core: GmeClasses.Core,
    node: Core.Node,
    sugarLevel: SugarLevel,
  ): JSONSchemaExporter;
}
