# Index to Code Pieces Developed under Effort (but not used yet)

<style>
    div {
        font-family: Verdana
    }
    div.pre {
        white-space: pre; font-size:1.2em;
    }
</style>

## Archive

<div class="pre">
_archive
|-- common                          
|   `-- test-methods.ts
|-- designer.spec.ts.bak
|-- dev-pages
|   `-- repo_dev_page.ts
|-- fixtures
|   |-- ITaxonomy.ts
|   |-- RepoImpl.ts
|   |-- TestTaxonomy.ts
|   |-- mock-taxonomy.fixtures.ts
|   |-- taxonomy.fixtures.ts
|   `-- test-config.fixtures.ts
`-- tests
    `-- repo-test.ts
</div>

## Description

### test-methods.ts

Started as a bucket for helper methods

#### project_name_generator

#### generate_test_taxonomy_file

Dynamic generation of a mock taxonomy file for use in upload, removing need for a pre-generated scenario.  

Calls 

    - create_temp_taxonomy_file
    - create_temp_file

#### create_temp_taxonomy_file

Wrapper tp create a temporary taxonomy file in the system temp directory.

Calls

    - get_static_taxonomy_csv
    - create_temp_file

#### get_static_taxonomy_csv

Creates an in-memory sample CSV

#### create_temp_file

Create a temporary file in the local operating system of the form
<name><cryptostring>.<extension>

This is just a helper method, so no checking (e.g., validating the extension
is more like 'csv' and not '.csv')

Call the text_generator if supplied to populate the file

#### setPageListener

Creates a listener on socket.io calls (helper to track issue where
split on empty cookie in socket was throwing an error)

Calls

    - prettyPrintJson

#### prettyPrintJson

Basic wrapper to perform consistent JSON.stringify to pretty-print

### designer.spec.ts.bak

Previous initial attempt downt the wrong path; may contain some potential code to mine for mouse events.

### repo_dev_page.ts

Class meant to wrap access to a page, meant to start as a page reference
for repo page.  No immediate value.

### ITaxonomy.ts

Interface to describe mutable object holding taxonomy file generator

### RepoImpl.ts

Class meant to wrap the definition of a repo for use as a fixture (commented out in repo-test.ts)

### TestTaxonomy.ts

Class wrapping generation of a mock taxonomy file

### mock-taxonomy.fixtures.ts

Implmentation of the MockTaxonomy; creates a one-time wrapper
on a promise to produce a taxonomy
    - to produce a CSV representation on the (temp) file system,
    - to translate into a usuable taxonomy via TaxonomyParser.fromCSV, and
    - to return a string path to the temp file.

### taxonomy.fixtures.ts

Extension of test to include taxonomy fixture

### test-config.fixtures.ts

Contains extention of text to create a "configured_test", intended to provide
access to fixtures specific to the toolset.
