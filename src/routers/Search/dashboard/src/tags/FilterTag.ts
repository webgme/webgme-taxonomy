import type ItemTag from "./ItemTag";
import LeanTag from "./LeanTag";

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
    public children: FilterTag[]
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
    const path = this.id === tagId ? [] :
      this.children.reduce((path, child) => path || child.findPath(tagId), null);

    if (path) {
      path.unshift(this);
    }

    return path;
  }

  canMatch(itemTag: ItemTag) {
    return (itemTag.ID === this.id) || itemTag.hasOwnProperty(this.id);
  }

  isMatch(itemTag: ItemTag) {
    let matched = (itemTag.ID === this.id) && (itemTag.value == this.value);
    matched ||= itemTag.hasOwnProperty(this.id) && (itemTag[this.id] === this.value);
    return matched;
  }

  lean(): LeanTag {
    return new LeanTag(this.id, this.value);
  }
}
