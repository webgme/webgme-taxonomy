import ItemTag from "./ItemTag";
import LeanTag from "./LeanTag";
import { isDefined } from "../Utils";

/*
 * A FilterTag is a tag that can be used to filter the search results.
 */
export default class FilterTag<T extends string = string> {
  selected: boolean = false;
  expanded: boolean = false;

  constructor(
    public id: string,
    public name: string,
    public type: T,
    public value: any,
    public children: FilterTag[],
  ) {
    value ??= null;
  }

  select() {
    this.selected = true;
  }

  expand() {
    this.expanded = true;
  }

  findPath(tagId: string) {
    const path = this.id === tagId ? [] : this.children.reduce(
      (path, child) => path || child.findPath(tagId),
      null,
    );

    if (path) {
      path.unshift(this);
    }

    return path;
  }

  isLabel() {
    return !isDefined(this.value);
  }

  canMatch(itemTag: ItemTag) {
    const value = ItemTag.valueForKey(itemTag, this.id);
    return isDefined(value);
  }

  isMatch(itemTag: ItemTag) {
    const value = ItemTag.valueForKey(itemTag, this.id);
    const foundTag = isDefined(value);
    const tagValuesMatch = this.value === value;
    return this.isLabel() ? foundTag : tagValuesMatch;
  }

  lean(): LeanTag {
    return new LeanTag(this.id, this.value);
  }
}
