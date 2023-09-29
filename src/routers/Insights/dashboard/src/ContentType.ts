type NodePath = string;
type GUID = string;

export enum TaxonomyType {
  Term = "Term",
  IntegerField = "IntegerField",
  TextField = "TextField",
  // TODO
}

export interface Vocabulary {
  id: GUID;
  name: string;
  type: string;
  children: Vocabulary[];
}

export default interface ContentType {
  nodePath: NodePath;
  name: string;
  vocabularies: Vocabulary[];
}
