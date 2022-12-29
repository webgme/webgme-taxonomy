import FilterTag from "./FilterTag";
import SetFilterTag from "./SetFilterTag";

namespace fromDict {
  export interface Data {
    id: string
    name: string
    type: string
    value: any
    children?: Data[]
  }
}

function fromDict<T extends string>(data: fromDict.Data) {
  const { id, name, type, value, children } = data;
  const childTags = children?.map(fromDict) ?? [];
  const constructor = fromDict.types[type] || FilterTag;
  return new constructor(id, name, type, value, childTags);
}

type FilterTagConstructor = new (...args: ConstructorParameters<typeof FilterTag>) => FilterTag;

/**
 * A map of all the registered `FilterTag` classes by it's "type" string.
 * Used by the `fromDicts` method to create the correct class.
 */
fromDict.types = {
  "SetField": SetFilterTag
} as { [name: string]: FilterTagConstructor };

export default fromDict;
