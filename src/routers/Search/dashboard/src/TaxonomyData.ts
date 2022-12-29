import FilterTag from "./tags/FilterTag";

export enum TaxonomyType {
  Term = "Term",
  IntegerField = "IntegerField",
  TextField = "TextField",
  // TODO
}
export default class TaxonomyData extends FilterTag<TaxonomyType> {
  children: TaxonomyData[];
}
