interface ItemTag {
  ID: string;
  value: any;
}
  
namespace ItemTag {
  export function valueForId(itemTag: ItemTag, id: string) {
    return (itemTag.ID === id) ? itemTag.value : itemTag[id];
  }
}

export default ItemTag;
