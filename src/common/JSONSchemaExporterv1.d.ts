import { GmeCore } from "./types";

type VocabSchemas = {
  schema: any;
  uiSchema: any;
  formData: any;
};

export default class JSONSchemaExporter {
  constructor(core: GmeCore, META: any);
  getSchemas(
    taxonomyNode: Core.Node,
    onlyReleased?: boolean,
  ): Promise<VocabSchemas>;
  getVocabSchemas(
    vocabNodes: Core.Node[],
    taxonomyName?: string,
    onlyReleased?: boolean,
  ): Promise<VocabSchemas>;

  static from(core: GmeClasses.Core, node: Core.Node): JSONSchemaExporter;
}
