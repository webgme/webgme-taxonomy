import { isDefined, isObject } from "../Utils";

interface ItemTag {
  ID: string;
  value: any;
}

namespace ItemTag {
  export function valueForKey(itemTag: ItemTag, key: string) {
    if (itemTag.hasOwnProperty(key)) {
      return itemTag[key];
    }
    let value: any;
    Object.values(itemTag)
      .filter(isObject)
      .some((obj) => {
        value = valueForKey(obj, key);
        return isDefined(value);
      });
    return value;
  }
}

export default ItemTag;
