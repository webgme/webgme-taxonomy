import { Taxonomy } from "./exchange/Taxonomy";

/**
 * This file defines a transformation on taxonomies that renames duplicate names with
 * (minimally) qualified versions to resolve the collisions.
 */
interface Renameable {
  rename(name: string): void;
}

class RenameableDict<T> implements Renameable {
  name: string;
  targetDict: { [name: string]: T };

  rename(newName: string): void {
    const data = this.targetDict[this.name];
    delete this.targetDict[this.name];
    this.targetDict[newName] = data;
    this.name = newName;
  }
  // TODO
}

class RenameableData<T> implements Renameable {
  data: NamedElement;

  rename(newName: string): void {
    this.data.name = newName;
  }
}

// TODO: support a list of vocabularies or a taxonomy?
interface NamedElement {
  name: string;
}

interface NameTargetData {
  names: string[];
  data: NamedElement;
}
type NameData = { [name: string]: NameTargetData[] };

/**
 * Collect named elements in the taxonomy in a dictionary by name.
 */
function collectNameData(name: string, data: NamedElement): NameData {
  // This is needed for variants...
  // How do I handle when the name isn't in the data but is a dictionary instead?
  // TODO:
}

export default function renameDuplicates(taxonomy: Taxonomy) {
  // Make a dictionary of all names with:
  //  - the definition (with the "name" field)
  //  - the list of names from the root
  // TODO
  // TODO: Extract the renameables from the taxonomy
  const renameables = [];
  taxonomy.vocabularies;
}
