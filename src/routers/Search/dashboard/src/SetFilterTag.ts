import { FilterTag, ItemTag } from "./FilterTag";
import { arraysEqual } from "./Utils";

const typeName = "SetField";

export default FilterTag.register(typeName, class SetFilterTag extends FilterTag {
  type: typeof typeName;

  constructor(id: string, name: string, type: typeof typeName, value: any | null, children: FilterTag[]) {
    super(id, name, type, value, children);
  }

  override isMatch(itemTag: Required<ItemTag>): boolean {
    const filterValue = this.value ?? [];
    const itemValue = (ItemTag.valueForId(itemTag, this.id) ?? [])
      .map(item => item.ID);
    return arraysEqual(filterValue, itemValue, { ignoreOrder: true });
  }
});