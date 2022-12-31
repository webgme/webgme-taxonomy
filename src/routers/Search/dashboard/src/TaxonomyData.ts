import FilterTag from "./tags/FilterTag";
import type fromDict from "./tags/fromDict";

export enum TaxonomyType {
  Term = "Term",
  IntegerField = "IntegerField",
  TextField = "TextField",
  // TODO
}

export default class TaxonomyData extends FilterTag<TaxonomyType> {
  children: TaxonomyData[];

  static fromDict(data: fromDict.Data<TaxonomyType>) {
    const { id, name, type, value, children } = data;
    const childTags = children?.map(TaxonomyData.fromDict) ?? [];
    return new TaxonomyData(id, name, type, value, childTags);
  }
}

