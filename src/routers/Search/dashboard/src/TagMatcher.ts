import Fuse from 'fuse.js'
import { ItemTag } from './tags'

/** Fuzzy matching options to pass to Fuse instance
 * 
 * @see {@link https://fusejs.io/api/options.html| Fuse docs} for available options
*/
const fuseOptions: Fuse.IFuseOptions<any> = {
    ignoreLocation: true
};

/**
 * Creates a SMUI Autocomplete search function for item tags.
 *
 * @param valueId - The id of the item tags' values to match against
 * @param tags - The tags to match against
 * @returns An Autocomplete search function
 */
export default function (valueId: string, tags: ItemTag[]) {
  const list = tags
    .map(tag => ItemTag.valueForKey(tag, valueId))
    .sort()
    .filter((val, index, sorted) => (val != null) && (val !== sorted[index - 1]));

  const fuse = new Fuse(list, fuseOptions);

  return async (input: string): Promise<any[] | false> => {
    if (!input)
      return list;
    else
      return fuse.search(input).map(({ item }) => item);
  };
}
