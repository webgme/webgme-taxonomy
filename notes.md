# To Do

- [ ] add support for hierarchical content types
  - [x] what exactly would this look like?
    - it seems to make sense
  - I should be able to add support for this without supporting webgme storage (and transformations)
  - [x] make a simple test project
  - [ ] does anything else need to be updated?
    - [ ] content type dashboard
      - show all content types with storage
      - the content type dashboard could be the data dashboard updated to be viewing the content type listing
  - [ ] update data dashboard
    - [ ] how to handle the differences btwn repo & data in the dashboard?
      - presence of files, for example
    - [ ] make one without nested children
    - how do we add new data?
      - atomic is pretty easy
      - what about compound?
        - for repositories, we also want to be able to restrict creation
        - should compounds support file uploads?

      - can we define files as part of the content type?
        - we could have a flag to restore the current support
        - would we want to specify that files are required
        - we could also just assume there are data files only for atomic data
          - in the future, we could represent this explicitly

      - how does it currently work?
        - repo creation:
          - name
          - tags (to add)
        - data upload/creation:
          - name
          - tags
          - files


    - [ ] ensure everything works with 2-level hierarchy?
      - [x] update configuration
      - [x] update tag form link to open correct content type
      - [x] use the correct type field
      - [x] update TaxonomyData.fromDict
        - 
    - [ ] update the UI to support other levels of hierarchy
    - [ ] throw errors if hierarchy depth != 2

- [ ] update UI to support arbitrary depth?
  - or maybe just up to depth 2 for now
  - what actions/buttons need to be available for items/repos/etc?
    - upload/append
    - download
    - copy ID (only 1 can be copied)
      - is this restricted to a specific level?

  - the UI can be like ranger: up to 3 columns at a time
    - small screens will hide the previous columns and only show 1 or 2 at a time
    - how to go up a directory?
    - what if we select multiple?
      - hide the subsequent panes
      - add download all button? Or make the download button download all of them?
    - paginate/filter each column like currently done
      - top level has a higher default threshold (maybe paginate?)

- [ ] update PDP to support arbitrary depth
  - how is arbitrary depth handled in PDP?
    - repositories are represented by index 0
    - so, depth of 1 could simply be editing index 0
    - depth of 2 is handled like currently done
    - depth of 3+ is a little tricky since we need to edit observations to add children
      - each observation contains additional data elements
      - we will need to bump the version of an observation to add new elements
      - however, bumping the version also is used to update the tags for an individual element in the observation
        - I think this should be fine...

- [ ] add support for WebGME storage
  - this should really define a mapping from the contained WebGME nodes to the expected format for the data dashboard
  - what is the format expected by the data dashboard?
    - name (or use base vocabulary?)
    - additional tags (human or guid?)
    - files
  - [ ] define the data dashboard format in the metamodel

- [ ] add support for webgme storage across time?
    - fetch across versions
    - probably should have a transformation, too
    - Run the transformation on each commit?
      - diff the outputs?
      - cache the outputs in mongodb?
    - use the latest version of the transformation?

- [ ] Tag set support

- [ ] selection constraint support

- [ ] required file fields

- [ ] support for profiles
  - how do we know the project to use for the profiles?
    - require it to be made by an admin?
    - or requested by name
    - can a profile refer to other profiles?
  - the CLI can just bake it in for now (the same way the deployment URL is handled)

- [ ] dependency management
  - how do you query (following links)?

- [ ] how to query

- [ ] how to tag within webgme...
  - this needs to be revisited...

- [ ] model data dashboard explicitly
  - should a data dashboard should be able to load multiple content types?
    - probably
  - it should have support for multiple types of backends
  - what if we supported a single dashboard?
    - we probably want multiple though, right?

- [ ] finish up tree viz
  - [x] update pointer support in the engine
  - [ ] update webgme visualizer to detect them

- [ ] automating dev environment:
  - [ ] generate TaxonomyProject automatically when taxonomy seed updates
  - [ ] improve tests
    - test the browser
  - [x] add npm prepublish step
  - [x] add typescript
    - Sean took care of this
  - [x] add github action to publish

- [ ] add explicit tags for repositories and for data uploads
  - I think this is mostly configured...
  - [-] We need to add support for tagging repositories
    - this can be a later PR...
  - [ ] change this to allow content types to have other content types

- [ ] We need to add support for tagging repositories

- [ ] Can we just add content types in content types?
  - this could mean that the content type contains some other type
    - could we have multiple child content types?

- [ ] default values for content type, repository, artifact
  - how can we model this?
    - what if we add children to a content type representing repositories and
      artifacts?
      - ContentType
        - Repository
        - Artifacts
    - [ ] we could define vocabularies on the repositories and artifacts
          individually
      - for now, this wouldn't really affect the repos since there isn't yet a
        mechanism for setting tags on a repo

    - [ ] how can we represent default values?
      - [ ] defaults can be defined on the terms themselves
      - [ ] defaults for a content type (ie, repo or artifact)?
        - member attribute seems like the only option...
          - reuse the attribute meta from the term itself?
          - this would need a new visualizer...

          - this approach could be used for optional/mandatory terms, too
          - basically, the member attribute would be an option to
            shadow/override attributes for the terms themselves

        - the problem with a member attribute is that it would be owned by the
          vocabulary node and not the arbitrary child...
        - another option would be to create an instance instead of using a set
          member
          - would we still inherit children as expected (ie, added after the
            vocab is added?)
            - editing the defaults would be a little clunky

        - this should work...

- [ ] update the graph viz code?
  - can we make a new visualizer for this, too?

- how would tags for repos vs artifacts affect search filters?
  - they can consist of the union of the vocabularies defined for the repos and
    artifacts

- [ ] change the card to a modal if screen is small?

- [ ] metadata for process
  - name
  - TaxonomyURL (let's just add this to each)

- [ ] add support for Base taxonomy (let's call it **General**)
  - how do we handle required tags?
  - at least some of these need to be handled specially:
    - _Search_ customizations:
      - _name_ is special (display field)
      - hidden: (searchable)
        - _content type_
        - _taxonomy model ID_
        - _content location_?
      - what to call the base vocab in the filter column? **General**
      - [ ] if not searchable, should not be present in the taxonomy schema
            thing
    - _Form_ customizations:
      - autogenerated values (readOnly)
        - content type
        - content location
        - upload time
        - taxonomy model ID
        - files?

      - none of these should be set in the form, should they?

    - Save the data redundantly in the artifacts (search dashboard)

    - which are required? Should required fields be metadata instead?
      - name
      - content type
      - content location
      - description
      - taxonomy reference
      - upload timestamp

    - I have been going about this backwards. Where would the user interact with
      these as a tag?
      - name
        - search (ish)
          - special case in the UI
      - description
        - search?
          - special case in the UI (probably)
      - content location
        - the different options might be used
        - search
      - upload timestamp
        - search?
      - files?
        - search?
      - content type
      - taxonomy reference
      - validity

    - what about for content locations? Would it be useful to set these in the
      taxonomy?
      - how would they

  - autogenerated fields can only be present in a Base vocab

  - it might be better not to worry about it so much and just bake it into the
    system
    - we can add another field, like `metadata` or `base` and store the tags
      there

  - [ ] add it to the metamodel
    - [ ] Make a SystemVocabulary type?
  - [ ] Implement the tags themselves
    - [ ] ignore the tags when generating the JSON schema
    - [ ] ignore the tags when generating the dashboard config
    - [ ] add autogenerated tags when appending data
    - [ ] update dashboard to set these on the artifacts?
  - [ ]

# Done

- [x] not showing all the artifacts...
  - why?
  - the unit tests seem to be passing...
  - bug in test, too

- [x] finish up PR with the observations

- [x] finish the download options
  - [x] update IDs
  - [x] download all observations when loading...
    - [ ] only show the parent IDs in the main artifact
    - I need to make a distinction:
      - ArtifactSet
      - Artifact
  - [x] update ID to have parentID and id (index_version)
  - [x] open modal on download
  - [ ] make download a button instead
  - [x] add options for latest or all

- [x] update URLs to reference the content type
  - [x]

- [x] store the taxonomy info with the tags
  - taxonomyVersion: {id: projectID, tag: tag}
    - prefer taxonomyVersion > taxonomy since it isn't the actual taxonomy
  - [x] this should be added to the tag form so they can be in every tag file
  - [x] this should be added when using the visualizer, too
  - we can implement it different ways. Not ideal but should work

- [x] update form endpoints to support all the different prefixes
  - make a new router? or router builder?

- [x] select multiple and download

- [x] list observations in the card content

- [x] only show the last 10 observations

- [x] add link to the taxonomy project

- [x] fix the artifactsetviewer exception
  - it's an on-mount issue
  - what if I remove conditional mounting?
    - no luck
  - Can I revert (git stash) and see if it will work?

  - simplifying the code and trying again
    - just the name works
    - the meta part is the issue
      - `selected` is updated in an infinite loop
    - what if we remove setting the array?
    - I think something else might be mutating the value
    - we should just refresh if the number of children change or ID...
    - it seems to be coming from the

- [x] if no artifacts, disable the download link

- [x] add a show more button (and select all)
  - [ ] anchor the menu correctly
  - appears to need an html element
  - test both

- [x] add taxonomy URL to the process? Index 0?

- [x] fix enum values
  - it can't really have any child as it doesn't make sense to have a boolean
    field as a selectable item
  - it can really only be an EnumOption or CompoundField
    - in other words, it is either a C-style enum or it has fields
    - should we combine them so they are always a compound field (just sometimes
      without any fields)
      - this would work better for future-proofing
  - will this fix the uiSchema issue?

  - [x] can I hide the ID field?
  - can I hide the title text?
    - not sure but isn't a big deal
  - [ ] update the uischema to hide the ID field for enum value

- [-] how should observations be listed? file name and date?
  - what about multiple files?
  - we need to add files to the observation... Or should we just update them to
    reflect the?
  - they can show their own name. The process name should be from the
    observation at index 0 instead
  - Put this off for the future

- [x] review sean's PR

- [x] add mongodb backend?
  - this will make automated tests easier to add
  - I will probably just get started on this...
  - [x] how to piggy back off of the webgme mongodb instance?
  - Plan:
    - [x] allow the mongo collections to be named (prefix with
          taxonomy_item_storage)
    - [x] update artifact creation
      - allow assigning tags?
    - [ ] update artifact append
      - [-] can I get blob URLs?
      - this is a little trickier...

      - PDP flow:
        - upload the artifact/observation with the file paths
        - upload the files to the given paths
          - _what if the file upload fails?_
      - MongoDB/GridFS flow:
        - upload the files (get IDs)
        - upload the artifact with the file IDs

      - Can we generate the object IDs for files?
        - maybe we can set the artifact ID (or UUID)

      - should we generate upload URLs for other types?
        - how would we verify that they are correct?
        - the URL could contain some secret/signature
          - storage/upload/id/path?token=<signed_token>

      - we should have an enum for different file upload task(s)
        - url for direct upload
        - token for upload via the server
        - can we just use a token?

        - [x] endpoint uploadUrl -> append
        - add endpoint for uploadFile
        - [ ] refactor append for PDP
          - return AppendResult
            - upload the files using
            - upload the files via the server

          - AppendResult
            - index
            - files:
              - name
              - uploadParams
                - headers
                - method
                - url

  - [ ] rename methods
  - [ ] switch to TS
  - [ ] test the adapter features
    - automate tests for PDP, too?
    - mock the adapter for tests?

- [x] check out tag form errors
  - I can disable validation for now, I guess...

- [x] default value w/ props

## URL stuff

## model content type & storage

- [x] refactor storage adapter creation

- [x] check out tag format
  - [/] change the tag format and see how the tag form looks...
    - we can actually start with this; if this
  - [/] let's start by cleaning up the tests
  - [-] make mock example of the human-readable JSON-schema and try it with the
    form editor
  - [ ] update the forms to remove the old data when selecting a new option in a
        dropdown
    - related issue:
      https://github.com/rjsf-team/react-jsonschema-form/issues/1558
    - it looks like it works in the playground... Do I just need to update
      versions?
      - it looks a little clunky to update. Maybe I need to build it myself?
        - JSX namespace not found...
    - [ ] taking another pass at the CDN version
      - why is "exports" not defined? What tool are they using to build it?
      - it looks like babel. Some possible leads here:
        https://github.com/babel/babel/issues/9187
        - this might be a bug...
        - going to pull down the repo and try to build it myself...
        - ran into issue about missing `descriptionId`. Reverting to last stable
          release (v4)
    - [ ] can I get it working on the simple test file?
      - let's dig into babel and such...
      - [x] building the entire monorepo
      - [ ] Can I load each file one at a time?
        - what about the weird ones like lodash dependencies? I doubt they are
          hosted
        - Can I use something like parcel?
      - [ ] Copy the playground setup and build there?

- [x] model errors
  - [x] what status code to use? 422? (Unprocessable Entity)
  - [x] merge the different UserError impls

- [x] capture default values in JSON
  - add automated test?
  - we should be able to test this without much difficulty

- [/] testing infra
  - how to setup test fixtures?
    - like models for example...
  - sean is on this

- [x] import semanticversion
  - build it as a library?
