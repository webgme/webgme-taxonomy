# webgme-taxonomy

## Installation

First, install the webgme-taxonomy following:

- [NodeJS](https://nodejs.org/en/) (LTS recommended)
- [MongoDB](https://www.mongodb.com/)

Second, start mongodb locally by running the `mongod` executable in your mongodb
installation (you may need to create a `data` directory or set `--dbpath`).
Alternatively use docker:

```
docker run --name webgme-mongo -d -p 27017:27017 mongo:5
```

Then, run `webgme start` from the project root to start . Finally, navigate to
`http://localhost:8080` to start using webgme-taxonomy!

## Creating a Taxonomy

The easiest way to create a taxonomy is to simply import a CSV file. Here are
the steps:

- First, create a taxonomy in a spreadsheet where properties have `(text)`,
  `(int)`, `(bool)`, `(enum)`, `(set)`, etc, appended to the given property
  name. Each child term/property should be on a line below the parent and
  indented by 1 cell. Next, export the page as a CSV. An example as a CSV is
  shown below:
  ```
  parentTerm,,,
  ,childTerm,,,
  ,,name (text),
  ,,age (int),
  ,,color (enum),
  ,,,red
  ,,,blue
  ,,,green
  ```
- Next, use `./bin/taxonomy-from-csv <path-to-csv> > taxonomy.json` to generate
  a JSON representation that can be imported into the environment.
- Create a new project in the design studio and import the `taxonomy` seed as a
  library.
- Create a new `Taxonomy` node in the root node.
- Enable the `SetStateFromJSON` plugin for this new node.
- Run `SetStateFromJSON` on this new `Taxonomy` node with the `taxonomy.json`
  file generated in the second step.
- All done!

## Development

This project uses rollup to build and bundle the Typescript files (and copy over
the client files for the routers). At a high level, client files are independent
svelte projects served up by routers, all WebGME entrypoints (e.g. routers,
plugins) are bundled with their dependencies (e.g., `src/common/` files).
Information about a few common use-cases can be found below.

### Manually testing

After making changes to any of the server-side source files, run
`npm run build`. For client-side changes, run `npm run prepare`.

### Unit testing

Since rollup bundles all dependencies with the WebGME entrypoints, modules in
`src/common` will not be available in `build/common` unless building for testing
explicitly.

When unit testing non-client code, set `NODE_ENV=test` before running
`npm run build` as below.

```
NODE_ENV=test npm run build
```

As this builds all modules for testing by default, it is recommended to use the
`TEST_TARGETS` environment variable to set the targets to build for testing.
`TEST_TARGETS` does not need to be an exact match and simply builds the files
with the given string in the file path.

For example, if we want to test the `JSONSchemaExporter`, we can build only
these files using:

```
NODE_ENV=test TEST_TARGETS=JSONSchemaExporter npm run build
```

### Adding new WebGME components

Adding WebGME components requires a couple extra steps since this project is
using Typescript. Specifically, the WebGME entrypoints for components is in
`build/` instead of `src/` for plugins and routers. Seeds are stored in `seeds/`
instead of `src/seeds`. For more details, see below.

#### Adding new plugins

1. Create the plugin with `webgme new plugin <name>`.
2. Open webgme-setup.json and change the `src` value in `<plugin name>` to
   `build`. For example, if the plugin is called `TestPlugin` set `src` to
   `build/plugins/TestPlugin`.
3. Copy an existing Typescript plugin source file, say `OpenTagForm`, to the
   plugin source directory and name it `<plugin name>.ts`. Rename `OpenTagForm`
   to the plugin name and start writing your plugin!

#### Adding new routers

1. Create the router with `webgme new router <name>`.
2. Open webgme-setup.json and change the `src` value in `<router name>` to
   `build`. For example, if the router is called `TestRouter` set `src` to
   `build/routers/TestRouter`.
3. If the router includes any static assets, such as client files, add an
   `assets` field to the entry in the webgme-setup.json file.
4. Copy an existing Typescript router source file, say `Insights`, to the router
   source directory and name it `<router name>.ts`. Start writing your router!

#### Adding new seeds

1. Create the seed with `webgme new seed <name>`.
2. Open webgme-setup.json and change `src` in `<seed name>` to
   `seeds/<seed name>`.
3. Move the webgmex file from `src/seeds/<seed name>/<seed name>.webgmex` to
   `seeds/<seed name>/<seed name>.webgmex`.

## Integrated Tools

There are a few integrated tools in the design studio which are automatically
configured using projects in the design studio. However, if you want the
following links to work, you will first need to create the example project with
the following command:

```
npm run import -- seeds/test/test.webgmex -p TaxonomyDemo
```

The main integrated tools are listed below.

- Search Dashboard: This is a web-based dashboard for viewing data associated
  with terms in the taxonomy. Currently, only Microsoft Premonition Data
  Platform is supported to store artifacts but this shouldn't be hard to
  generalize. (Generalization has been the hopes :).)
  - This is available at:
    `<deployment url>/routers/Search/<projectId>/branch/<branch>/<content type>/static/index.html`
  - For example, if it is running locally on port 8080, and you want to open a
    dashboard using a taxonomy project named `TaxonomyDemo` and owned by
    `guest`, you can open the dashboard using the master branch with
    [http://localhost:8080/routers/Search/guest%2BTaxonomyDemo/branch/master/%2Fa/static/index.html](http://localhost:8080/routers/Search/guest%2BTaxonomyDemo/branch/master/%2Fa/static/index.html)
- Taxonomy Term Creator (Form): This is a web-based form for selecting terms
  given the taxonomy defined in the studio.
  - This is available at:
    `<deployment url>/routers/TagCreator/<projectId>/branch/<branch>/<content type>/static/index.html`
  - For example, if it is running locally on port 8080, and you want to open the
    term creator form using a taxonomy project named `TaxonomyDemo` and owned by
    `guest`, you can open the dashboard using the master branch with
    [http://localhost:8080/routers/TagCreator/guest%2BTaxonomyDemo/branch/master/%2Fa/static/index.html](http://localhost:8080/routers/TagCreator/guest%2BTaxonomyDemo/branch/master/%2Fa/static/index.html)

# Making a Release

The process of making a release is pretty straight-forward.

1. make a new branch (so CI will run on the new release before it is confirmed)
   labeled `bump-vX.Y.Z`.
2. bump the version in `package.json` and update the lockfile
3. commit the version bump with commit message `bump to vX.Y.Z`
4. make a PR and merge once all checks have passed
5. create a tag `vX.Y.Z` at main and push it
5. make a GH release (using autogenerated notes) for the new tag. This will trigger a new docker
   image to be published to DockerHub.
