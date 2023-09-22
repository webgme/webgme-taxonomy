import FilterTag from "./FilterTag";
import SetFilterTag from "./SetFilterTag";
import EnumFilterTag from "./EnumFilterTag";

namespace fromDict {
  export interface Data<T extends string = string> {
    id: string;
    name: string;
    type: T;
    value: any;
    children?: Data[];
  }
}

function fromDict(data: fromDict.Data) {
  const { id, name, type, value, children } = data;
  const childTags = children?.map(fromDict) ?? [];
  const constructor = fromDict.types[type] || FilterTag;
  return new constructor(id, name, type, value, childTags);
}

type FilterTagConstructor = new (
  ...args: ConstructorParameters<typeof FilterTag>
) => FilterTag;

/**
 * A map of all the registered `FilterTag` classes by it's "type" string.
 * Used by the `fromDicts` method to create the correct class.
 */
fromDict.types = {
  "SetField": SetFilterTag,
  "EnumField": EnumFilterTag,
} as { [name: string]: FilterTagConstructor };

export default fromDict;
