import { JSONSchema7 } from "json-schema";
import { VerifiedProjectContext } from "../../common/types";

export type TaxonomyVersion = VerifiedProjectContext & { url?: string };

export interface TagFormConfig {
  schema: JSONSchema7;
  uiSchema: any;
  formData: any;
  taxonomyVersion: TaxonomyVersion;
}
