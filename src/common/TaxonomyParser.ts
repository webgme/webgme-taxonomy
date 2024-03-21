import { filterMap } from "./Utils";

type OptionField = "EnumField" | "SetField";
type TermField =
  | "TextField"
  | "UriField"
  | "ReferenceField"
  | "IntegerField"
  | "FloatField"
  | "BooleanField"
  | "CompoundField"
  | OptionField;
type MetaType = TermField | "Term" | "Vocabulary" | "Taxonomy";
type ExplicitFieldType = MetaType | "TextOrEnumField";

const DEFAULT_TYPE: MetaType = "Term";
const CATEGORY_TYPE: MetaType = "Term";
const UNKNOWN_FIELD_TYPE = "TextOrEnumField";

const FieldTypes: TermField[] = [
  "TextField",
  "UriField",
  "ReferenceField",
  "IntegerField",
  "FloatField",
  "BooleanField",
  "CompoundField",
  // option fields

  "EnumField",
  "SetField",
];
const Types: MetaType[] = (FieldTypes as MetaType[]).concat([
  DEFAULT_TYPE,
  CATEGORY_TYPE,
]);

function isOptionField(name: MetaType): boolean {
  return name === "EnumField" || name === "SetField";
}

// TODO: move this to WJI?
interface WJI {
  id: string;
  attributes?: { [name: string]: string | number };
  pointers: { [name: string]: string }; // needed since we at least need to specify "base"
  children?: WJI[];
}

class CellWithText {
  text: string;
  depth: number;
  description: string;
  name: string;

  constructor(text: string, depth = 0, description = "") {
    this.text = text;
    this.depth = depth;
    this.description = description;

    const hasParenType = this.getExplicitType();
    this.name = hasParenType
      ? this.text.replace(/\((.*)\)/, "").trim()
      : this.text;
  }

  /// Convert to webgme-json-importer format
  toWJI(parentType: MetaType, hasChildren: boolean): WJI {
    const metaType = this.getMetaType(parentType, hasChildren);
    return {
      id: `@name:${this.name}`,
      attributes: {
        name: this.name,
        description: this.description,
      },
      pointers: {
        base: `@meta:${metaType}`,
      },
      children: [],
    };
  }

  /**
   * Explicit types are types specified in parentheses in the cell.
   */
  getExplicitType(): ExplicitFieldType | undefined {
    const parenText = this.getParentheticalText();
    if (parenText && parenText.length > 2) {
      const text = parenText.toLowerCase();
      if (text === "field") {
        return UNKNOWN_FIELD_TYPE;
      } else {
        return (
          FieldTypes.find((type) => type.toLowerCase().startsWith(text)) ||
          DEFAULT_TYPE
        );
      }
    }
  }

  getMetaType(parentType: MetaType, hasChildren: boolean): MetaType {
    // Force options to be compound fields
    if (isOptionField(parentType)) {
      return "CompoundField";
    }

    // Use the explicit type
    const explicitType = this.getExplicitType();
    if (explicitType) {
      if (explicitType === UNKNOWN_FIELD_TYPE) {
        if (hasChildren) {
          return "EnumField";
        } else {
          return "TextField";
        }
      }
      return explicitType;
    }

    // Guess the type using the context
    if (parentType === "Taxonomy") {
      return "Vocabulary";
    }

    return DEFAULT_TYPE;
  }

  getParentheticalText(text = this.text) {
    const parenMatch = text.match(/\((.*)\)/);
    return parenMatch ? parenMatch[1].trim() : null;
  }

  static findInRow(row: string[]) {
    const contentTuple = row
      .map((text, index): [string, number] => [text, index])
      .find(([text, _]) => !!text);
    if (contentTuple) {
      const [text, depth] = contentTuple;
      const cell = new CellWithText(text, depth, row[depth + 1]);
      return cell;
    }
  }
}

function parseCSVRow(line: string) {
  const cols = [];
  let currentChars: string[] = [];
  let isQuoted = false;
  let isEscaped = false;
  const specialChars = [",", "\\", '"'];
  line.split("").forEach((char) => {
    if (isEscaped || !specialChars.includes(char)) {
      currentChars.push(char);
    } else if (char === ",") {
      if (isQuoted) {
        currentChars.push(char);
      } else {
        cols.push(currentChars.join(""));
        currentChars = [];
      }
    } else if (char === '"') {
      isQuoted = !isQuoted;
    }
    isEscaped = char === "\\" && !isEscaped;
  });
  cols.push(currentChars.join(""));
  return cols;
}

export default {
  fromCSV(csvContent: string): WJI[] {
    const rows = csvContent.split("\n").map((line) => parseCSVRow(line.trim()));
    const cells = filterMap(rows, CellWithText.findInRow);

    // Remove the empty columns
    const baseDepth = cells.reduce(
      (depth, cell) => Math.min(cell.depth, depth),
      Infinity,
    );
    cells.forEach((cell) => (cell.depth -= baseDepth));

    // Create the taxonomy nodes (recursively)
    const hcell = HierarchicalCell.fromCells(cells);
    return hcell.toWJI("Taxonomy");
  },
};

class HierarchicalCell {
  data: CellWithText;
  child: HierarchicalCell | null;
  next: HierarchicalCell | null;

  constructor(
    data: CellWithText,
    child: HierarchicalCell | null,
    next: HierarchicalCell | null,
  ) {
    this.data = data;
    this.child = child;
    this.next = next;
  }

  toWJI(parentType: MetaType): WJI[] {
    const wjiData = this.data.toWJI(parentType, !!this.child);
    if (this.child) {
      const metaType = wjiData.pointers.base.replace("@meta:", "") as MetaType;
      const children = this.child.toWJI(metaType);
      wjiData.children = children;
    }

    if (this.next) {
      const wjiNodes = this.next.toWJI(parentType);
      wjiNodes.unshift(wjiData);
      return wjiNodes;
    }

    return [wjiData];
  }

  static fromCells(cells: CellWithText[]): HierarchicalCell {
    let child = null;
    let next = null;

    if (cells.length > 1) {
      const currentDepth = cells[0].depth;
      if (cells[1].depth > currentDepth) {
        child = HierarchicalCell.fromCells(cells.slice(1));

        let prev = child;
        next = prev.next;
        while (next && next.data.depth > currentDepth) {
          prev = next;
          next = prev.next;
        }
        prev.next = null;
      } else {
        next = HierarchicalCell.fromCells(cells.slice(1));
      }
    }

    return new HierarchicalCell(cells[0], child, next);
  }
}
