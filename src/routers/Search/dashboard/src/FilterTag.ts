interface ItemTag {
  ID: string;
  value: any;
}

namespace ItemTag {
  export function valueForId(itemTag: ItemTag, id: string) {
    return (itemTag.ID === id) ? itemTag.value : itemTag[id];
  }
}

export { ItemTag }

/*
 * A stripped down version of FilterTag that contains the minimal required information
 * (assuming that the corresponding FilterTag can be found). Used for saving the current
 * tags in the URL.
 */
export class LeanTag {
  id: string;
  value: any | null;

  constructor(id: string, value: any) {
    this.id = id;
    this.value = value;
  }
}

/*
 * A FilterTag is a tag that can be used to filter the search results.
 */
export class FilterTag {
  id: string;
  name: string;
  type: string;
  children: FilterTag[];
  value: any | null = null;
  selected: boolean = false;
  expanded: boolean = false;

  constructor(id: string, name: string, type: string, value: any | null, children: FilterTag[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.value = value;
    this.children = children;
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

  isMatch(itemTag: Required<ItemTag>) {
    const isMatchingTag = itemTag.ID === this.id && itemTag.value == this.value;
    if (isMatchingTag) {
      return true;
    }

    const tagHasAttribute =
      itemTag.hasOwnProperty(this.id) && itemTag[this.id] === this.value;
    return tagHasAttribute;
  }

  lean(): LeanTag {
    return new LeanTag(this.id, this.value);
  }

  static fromDict(infoDict: Required<FilterTag>): FilterTag {
    const children = infoDict.children.map(FilterTag.fromDict);
    return new FilterTag(infoDict.id, infoDict.name, infoDict.type, infoDict.value, children);
  }
}
