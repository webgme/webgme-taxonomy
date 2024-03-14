Extending the Metamodel
=======================
When extending the taxonomy metamodel, such as defining a new field type, there are a number of implications this has on the code base:
- the exchange format needs to be updated to be able to represent this (`types/src/lib.rs`)
- the exporter logic (`src/common/TaxonomyExporter`)
- the JSON schema generator needs to be updated (`src/common/JSONSchemaExporter.ts`)
- the taxonomy parser - which imports from CSV (`src/common/TaxonomyParser.ts`)
- the filters on the data dashboard need to use the appropriate widget (`src/routers/Search/dashboard/src/components/TaxonomyFilterTree.svelte`)

Usually, I simply grep for an existing field, like `UriField` to see where it is used in the code base when reminding myself of the places that need updating. :)

