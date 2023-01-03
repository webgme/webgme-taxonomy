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
    toWJI(nextCell) {
      return {
        id: `@name:${this.name}`,
        attributes: {
          name: this.name,
          description: this.description,
        },
        pointers: {
          base: `@meta:${this.getMetaType(nextCell)}`,
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

    getMetaType(nextCell) {
      const explicitType = this.getExplicitType();
      if (explicitType) {
        if (explicitType === UNKNOWN_FIELD_TYPE) {
          const hasChildren = nextCell && nextCell.depth > this.depth;
          if (hasChildren) {
            return "EnumField";
          } else {
            return "TextField";
          }
        }
        return explicitType;
      }

      const hasChild = nextCell && nextCell.depth > this.depth;
      if (hasChild) {
        const childIsField = nextCell.getExplicitType()?.endsWith("Field");
        if (!childIsField) {
          return CATEGORY_TYPE;
        }
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
      Infinity
    );
    cells.forEach((cell) => (cell.depth -= baseDepth));

    // Create the taxonomy nodes
    const parentStack = [];
    const nodes = [];
    const tags = [];
    let lastDepth = baseDepth;
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      // TODO: refactor this so it can be called from addFieldOptions
      const node = cell.toWJI(cells[i + 1]);
      const parent = parentStack[cell.depth - 1];
      if (parent) {
        parent.children.push(node);
      } else {
        nodes.push(node);
      }
      i = addChildCells(node, cells, i);

      if (i < cells.length) {
        parentStack.splice(
          cells[i].depth,
          parentStack.length - cells[i].depth,
          node
        );
      }
    }
    return nodes;
  };

  function hasChildren(cells, i) {
    const cell = cells[i];
    const nextCell = cells[i + 1];
    return !!nextCell && nextCell.depth === cell.depth + 1;
  }

  // skip any fields indented further than 1 additional indent
  function skipOverIndentedRows(cells, i) {
    const cell = cells[i];
    let nextCell = cells[i + 1];
    while (nextCell && nextCell.depth > cell.depth + 1) {
      i++;
      nextCell = cells[i + 1];
    }
    return i;
  }

  function addChildCells(node, cells, i) {
    const cell = cells[i];
    i = skipOverIndentedRows(cells, i);
    if (!hasChildren(cells, i)) {
      return i;
    }

    const cellType = cell.getMetaType(cells[i + 1]);
    if (OptionFieldTypes.includes(cellType)) {
      i = addFieldOptions(node, cells, i);
    } else if (cellType === "Term") {
      i = addCompoundFields(node, cells, i);
    }
    return i;
  }

  function addFieldOptions(node, cells, i) {
    const childOptDepth = cells[i].depth + 1;
    let j;
    for (j = i + 1; j < cells.length; j++) {
      if (cells[j].depth < childOptDepth) {
        j--;
        break;
      }
      const child = cells[j].toWJI(cells[j + 1]);
      node.children.push(child);
      j = addChildCells(child, cells, j);
      child.pointers.base = "@meta:CompoundField";
    }
    return j;
  }

  function addCompoundFields(node, cells, i) {
    // any children that would be a tag are now a CompoundField
    const cell = cells[i];
    const currentDepth = cell.depth;
    let j;
    for (j = i + 1; j < cells.length; j++) {
      if (cells[j].depth <= currentDepth) {
        j--;
        break;
      }
      const child = cells[j].toWJI(cells[j + 1]);
      j = addChildCells(child, cells, j);
      //if (child.pointers.base === '@meta:Term') {
      //child.pointers.base = '@meta:CompoundField';
      //}
      node.children.push(child);
    }
    return Math.min(j, cells.length - 1);
  }

  return TaxonomyParser;
}

if (typeof define !== "undefined") {
  define([], factory);
} else {
  module.exports = factory();
}
