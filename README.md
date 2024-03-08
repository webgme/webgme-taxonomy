# webgme-taxonomy

## Installation

First, install the webgme-taxonomy following:

- [NodeJS](https://nodejs.org/en/) (LTS recommended)
- [MongoDB](https://www.mongodb.com/)

Second, start mongodb locally by running the `mongod` executable in your mongodb
installation (you may need to create a `data` directory or set `--dbpath`). Alternatively use docker:
```
docker run --name webgme-mongo -d -p 27017:27017 mongo:4.4
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

## Integrated Tools

There are a few integrated tools in the design studio which are automatically
configured using projects in the design studio:

- Search Dashboard: This is a web-based dashboard for viewing data associated
  with terms in the taxonomy. Currently, only Microsoft Premonition Data
  Platform is supported to store artifacts but this shouldn't be hard to
  generalize. (Generalization has been the hopes :).)
  - This is available at:
    `<deployment url>/routers/Search/<projectId>/branch/<branch>/static/index.html`
  - For example, if it is running locally on port 8080, and you want to open a
    dashboard using a taxonomy project named `TaxonomyDemo` and owned by
    `guest`, you can open the dashboard using the master branch with
    [http://localhost:8080/routers/Search/guest%2BTaxonomyDemo/branch/master/static/index.html](http://localhost:8080/routers/Search/guest%2BTaxonomyDemo/branch/master/static/index.html)
- Taxonomy Term Creator (Form): This is a web-based form for selecting terms
  given the taxonomy defined in the studio.
  - This is available at:
    `<deployment url>/routers/TagCreator/<projectId>/branch/<branch>/static/index.html`
  - For example, if it is running locally on port 8080, and you want to open the
    term creator form using a taxonomy project named `TaxonomyDemo` and owned by
    `guest`, you can open the dashboard using the master branch with
    [http://localhost:8080/routers/TagCreator/guest%2BTaxonomyDemo/branch/master/static/index.html](http://localhost:8080/routers/TagCreator/guest%2BTaxonomyDemo/branch/master/static/index.html)

## Misc To Do

- [ ] use it for webgme libraries?
  - publish from within webgme
  - define a taxonomy
  - storage adapter?
    - mongodb, right?
      - MongoDB+Blob
    - configuration opts:
      - collection name
        - validation so not colliding with others
