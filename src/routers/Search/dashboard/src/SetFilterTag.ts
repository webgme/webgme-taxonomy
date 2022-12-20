import { FilterTag, ItemTag } from "./FilterTag";
import { arraysEqual } from "./Utils";

const typeName = "SetField";

/**
 * A `FilterTag` subclass for the "SetField" type -- overrides matching to match array of values.
 */
export default class SetFilterTag extends FilterTag {
  type: typeof typeName;

  constructor(id: string, name: string, type: typeof typeName, value: any | null, children: FilterTag[]) {
    super(id, name, type, value, children);
  }

  /**
   * Gets whether the items in this filter's value array match the items in the given `itemTag`'s
   * corresponding array value.
   * 
   * @param itemTag The `ItemTag` to match against.
   * @returns `true` if the `itemTag`'s array values equal this filter's values.
   */
  override isMatch(itemTag: Required<ItemTag>): boolean {
    const filterValue = this.value ?? [];
    const itemValue = (ItemTag.valueForId(itemTag, this.id) ?? [])
      .map(item => item.ID);
    return arraysEqual(filterValue, itemValue, { ignoreOrder: true });
  }
}

// Register the `SetFilterTag` class for the "SetField" type.
FilterTag.register(typeName, SetFilterTag);
