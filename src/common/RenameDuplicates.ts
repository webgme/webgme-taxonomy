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
  private targetDict: { [name: string]: T };

  constructor(name: string, targetDict: { [name: string]: T }) {
    this.name = name;
    this.targetDict = targetDict;
  }

  rename(newName: string): void {
    const data = this.targetDict[this.name];
    delete this.targetDict[this.name];
    this.targetDict[newName] = data;
    this.name = newName;
  }

  static fromDict(data: {[name: string]: T}): RenameableDict[] {
    return Object.keys(data).map(name => new RenameableDict(name, data));
  }
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

function getRenameables(taxonomy: Taxonomy): Renameable[] {
  // First, get the vocabularies
  const renameables = RenameableDict.fromDict(taxonomy.vocabularies);

  // Next, get the terms
  const termDicts = Object.values(taxonomy.vocabularies).map(v => v.terms);
  renameables.push(...termDicts.flatMap(termDict => RenameableDict.fromDict(termDict)));

  // Finally, recursively get the fields
  const terms = termDicts.flatMap(termDict => Object.values(termDict));
  renameables.push(...terms.flatMap(term => getFieldRenameables(term)));

  return renameables;
}

interface HasFields {
  fields: Record<FieldName, Field>;
}

function getFieldRenameables(termVariantOrCompound: HasFields): Renameable[] {
  const renameables = RenameableDict.fromDict(termOrVariant.fields);

  // Extract the renameables from 
  const nestedRenameables = Object.values(termOrVariant.fields)
    .flatMap(({content}) => {
      if ("Compound" in content) {
        return getFieldRenameables(content.Compound);
      } else if ("Set" in content) {
        return content.Set.variants.map(variant => getVariantRenameables(variant));
      } else if ("Enum" in content) {
        return content.Enum.variants.map(variant => getVariantRenameables(variant));
      }
      return [];
  });

  return renameables;
}

function getVariantRenameables(variant: Variant): Renameable[] {
    return [
      new RenameableData(variant),
      ...getFieldRenameables(variant)
    ];
}

export default function renameDuplicates(taxonomy: Taxonomy) {
  // Make a dictionary of all names with:
  //  - the definition (with the "name" field)
  //  - the list of names from the root
  // TODO
  // TODO: Extract the renameables from the taxonomy
  const renameables = RenameableDict.fromDict(taxonomy.vocabularies)
    .concat(Object.values(taxonomy.vocabularies)
    .flatMap(v => RenameableDict.fromDict(v.terms));

  // TODO: actually collect the names and do the renaming!
}
