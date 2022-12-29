import FilterTag from "./FilterTag";
import ItemTag from "./ItemTag";
import { arraysEqual } from "../Utils";

/**
 * A `FilterTag` subclass for the "SetField" type -- overrides matching to match array of values.
 */
export default class SetFilterTag extends FilterTag<"SetField"> {

  /**
   * Gets whether the items in this filter's value array match the items in the given `itemTag`'s
   * corresponding array value.
   * 
   * @param itemTag The `ItemTag` to match against.
   * @returns `true` if the `itemTag`'s array values equal this filter's values.
   */
  override isMatch(itemTag: ItemTag): boolean {
    const filterValue = this.value ?? [];
    const itemValue = (ItemTag.valueForId(itemTag, this.id) ?? [])
      .map(item => item.ID);
    return arraysEqual(filterValue, itemValue, { ignoreOrder: true });
  }
}
