import { FilterTag } from "./FilterTag";

export enum TaxonomyType {
  Term = "Term",
  IntegerField = "IntegerField",
  TextField = "TextField",
  // TODO
}
export default class TaxonomyData extends FilterTag {
  type: TaxonomyType;
  children: TaxonomyData[];
}
