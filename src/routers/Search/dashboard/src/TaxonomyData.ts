export enum TaxonomyType {
  Term = "Term",
  IntegerField = "IntegerField",
  TextField = "TextField",
  // TODO
}

export default class TaxonomyData {
  id: string;
  name: string;
  type: TaxonomyType;
  children: TaxonomyData[];

  constructor(id: string, name: string, type: TaxonomyType) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.children = [];
  }
}
