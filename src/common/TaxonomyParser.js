function factory() {
	const DEFAULT_TYPE = 'Tag';
	const FieldTypes = [
		'TextField',
		'IntegerField',
		'FloatField',
		'BooleanField',
		'EnumField',
	];

	class CellWithText {
		constructor(text, depth = 0) {
			this.text = text;
			this.depth = depth;
		}

		/// Convert to webgme-json-importer format
		toWJI(nextCell) {
			return {
				attributes: {
					name: this.text,
				},
				pointers: {
					base: `@meta:${this.getMetaType(nextCell)}`,
				},
				children: [],
			};
		}

		getMetaType(nextCell) {
			const parenText = this.getParentheticalText();
			if (parenText && parenText.length > 2) {
				const text = parenText.toLowerCase();
				if (text === 'field') {
					const hasChildren = nextCell.depth > this.depth;
					if (hasChildren) {
						return 'EnumField';
					} else {
						return 'TextField';
					}
				} else {
					return FieldTypes.find(type => type.toLowerCase().startsWith(text)) || DEFAULT_TYPE;
				}
			}
			return DEFAULT_TYPE;
		}

		getParentheticalText(text = this.text) {
			const parenMatch = text.match(/\((.*)\)/);
			return parenMatch ? parenMatch[1].trim() : null;
		}

		static findInRow(row) {
			const contentTuple = row.map((text, index) => [text, index])
				.find(([text, _]) => !!text);
			if (contentTuple) {
				const [text, depth] = contentTuple;
				return new CellWithText(text, depth);
			}
		}
	}

	function parseCSVRow(line) {
		const cols = [];
		let currentChars = [];
		let isQuoted = false;
		let isEscaped = false;
		const specialChars = [',', '\\', '"'];
		line.split('').forEach(char => {
			if (isEscaped || !specialChars.includes(char)) {
				currentChars.push(char);
			} else if (char === ',') {
				if (isQuoted) {
					currentChars.push(char);
				} else {
					cols.push(currentChars.join(''));
					currentChars = [];
				}
			} else if (char === '"') {
				isQuoted = !isQuoted;
			}
			isEscaped = char === '\\' && !isEscaped;
		});
		cols.push(currentChars.join(''));
		return cols;
	}

	const TaxonomyParser = {};
	TaxonomyParser.fromCSV = csvContent => {
		const rows = csvContent.split('\n')
			.map(line => parseCSVRow(line.trim()));
		const cells = rows.map(CellWithText.findInRow)
			.filter(cell => !!cell);

		// Remove the empty columns
		const baseDepth = cells.reduce(
			(depth, cell) => Math.min(cell.depth, depth),
			Infinity
		);
		cells.forEach(cell => cell.depth -= baseDepth);

		// Create the taxonomy nodes
		const parentStack = [];
		const nodes = [];
		const tags = [];
		let lastDepth = baseDepth;
		for (let i = 0; i < cells.length; i++) {
			let cell = cells[i];
			const node = cell.toWJI(cells[i + 1]);
			const parent = parentStack[cell.depth - 1];
			if (parent) {
				parent.children.push(node);
			} else {
				nodes.push(node);
			}
			if (cell.getMetaType(cells[i+1]) === 'EnumField') {
				const childOptDepth = cell.depth + 1;
				let j;
				for (j = i+1; j < cells.length; j++) {
					if (cells[j].depth !== childOptDepth) {
						j--;
						break;
					}
					const child = cells[j].toWJI(cells[j + 1]);
					child.pointers.base = '@meta:EnumOption';
					node.children.push(child);
				}
				i = j;
				cell = cells[i];
			}

			parentStack.splice(cell.depth, parentStack.length - cell.depth, node);
			// TODO: skip any fields indented further than 1 additional indent
			let nextCell = cells[i+1];
			while (nextCell && nextCell.depth > cell.depth + 1) {
				i++;
				nextCell = cells[i+1];
			}
		}
		return nodes;
	};
	
	return TaxonomyParser;
}

if (typeof define !== 'undefined') {
    define([], factory);
} else {
    module.exports = factory();
}
