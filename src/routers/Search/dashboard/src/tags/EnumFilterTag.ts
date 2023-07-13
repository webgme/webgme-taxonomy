import FilterTag from "./FilterTag";
import ItemTag from "./ItemTag";

/**
 * A `FilterTag` subclass for the "EnumField" type -- overrides matching to match key of compound field.
 */
export default class EnumFilterTag extends FilterTag<"EnumField"> {
  /**
   * Check if the enum value is the key of the itemTag value.
   *
   * @param itemTag The `ItemTag` to match against.
   * @returns `true` if the `itemTag` has the given key
   */
  override isMatch(itemTag: ItemTag): boolean {
    const value = ItemTag.valueForKey(itemTag, this.id);
    return !!(value && value[this.value]);
  }
}
