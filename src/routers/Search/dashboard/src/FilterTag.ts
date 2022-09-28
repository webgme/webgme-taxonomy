interface ItemTag {
  ID: string;
  value: any;
}

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
  value: any | null;

  constructor(id: string, name: string, type: string, value: any | null, children: FilterTag[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.value = value;
    this.children = children;
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

  static fromLean(tag: LeanTag, tagDict): FilterTag{
    const tagDef = tagDict[tag.id];
    return new FilterTag(tag.id, tagDef.name, tagDef.type, tag.value, tagDef.children);
  }

  static fromDict(infoDict: Required<FilterTag>): FilterTag {
    const children = infoDict.children.map(FilterTag.fromDict);
    return new FilterTag(infoDict.id, infoDict.name, infoDict.type, infoDict.value, children);
  }
}
