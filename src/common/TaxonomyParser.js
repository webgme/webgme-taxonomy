function factory() {
  const DEFAULT_TYPE = "Term";
  const CATEGORY_TYPE = "Term";
  const UNKNOWN_FIELD_TYPE = "TextOrEnumField";
  const OptionFieldTypes = ["EnumField", "SetField"];
  const FieldTypes = [
    "TextField",
    "IntegerField",
    "FloatField",
    "BooleanField",
    "CompoundField",
    "ReferenceField",
    ...OptionFieldTypes,
  ];
  const Types = FieldTypes.concat([DEFAULT_TYPE, CATEGORY_TYPE]);

  class CellWithText {
    constructor(text, depth = 0, description = "") {
      this.text = text;
      this.depth = depth;
      this.description = description;

      const hasParenType = this.getExplicitType();
      this.name = hasParenType
        ? this.text.replace(/\((.*)\)/, "").trim()
        : this.text;
    }

    /// Convert to webgme-json-importer format
    toWJI(parentType, hasChildren) {
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

    /// Explicit types are types specified in parentheses in the cell
    getExplicitType() {
      const parenText = this.getParentheticalText();
      if (parenText && parenText.length > 2) {
        const text = parenText.toLowerCase();
        if (text === "field") {
          return UNKNOWN_FIELD_TYPE;
        } else {
          return (
            Types.find((type) => type.toLowerCase().startsWith(text)) ||
            DEFAULT_TYPE
          );
        }
      }
    }

    getMetaType(parentType, hasChildren) {
      // Force options to be compound fields
      if (OptionFieldTypes.includes(parentType)) {
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
      if (!parentType) {
        return "Vocabulary";
      }

      return DEFAULT_TYPE;
    }

    getParentheticalText(text = this.text) {
      const parenMatch = text.match(/\((.*)\)/);
      return parenMatch ? parenMatch[1].trim() : null;
    }

    static findInRow(row) {
      const contentTuple = row
        .map((text, index) => [text, index])
        .find(([text, _]) => !!text);
      if (contentTuple) {
        const [text, depth] = contentTuple;
        const cell = new CellWithText(text, depth, row[depth + 1]);
        return cell;
      }
    }
  }

  function parseCSVRow(line) {
    const cols = [];
    let currentChars = [];
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

  const TaxonomyParser = {};
  TaxonomyParser.fromCSV = (csvContent) => {
    const rows = csvContent.split("\n").map((line) => parseCSVRow(line.trim()));
    const cells = rows.map(CellWithText.findInRow).filter((cell) => !!cell);

    // Remove the empty columns
    const baseDepth = cells.reduce(
      (depth, cell) => Math.min(cell.depth, depth),
      Infinity,
    );
    cells.forEach((cell) => (cell.depth -= baseDepth));

    // Create the taxonomy nodes (recursively)
    const hcell = HierarchicalCell.fromCells(cells);
    return hcell.toWJI();
  };

  class HierarchicalCell {
    constructor(data, child, next) {
      this.data = data;
      this.child = child;
      this.next = next;
    }

    toWJI(parentType) {
      const wjiData = this.data.toWJI(parentType, !!this.child);
      if (this.child) {
        const metaType = wjiData.pointers.base.replace("@meta:", "");
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

    static fromCells(cells) {
      let child;
      let next;
      let i = 0;

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

  return TaxonomyParser;
}

if (typeof define !== "undefined") {
  define([], factory);
} else {
  module.exports = factory();
}
