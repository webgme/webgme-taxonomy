Evolving Taxonomies
===================
Taxonomies can be used to tag data stored via some persistence layer (like Premonition Data Platform or MongoDB) and to tag data -- either programmatically or via tags files downloaded from the tag form.
As a result, taxonomy evolution can be complicated as changes to a taxonomy may have implications for each of these use-cases.

Taxonomy Semantic Versioning
----------------------------
Taxonomy version numbers are designed to be semantically meaningful and follow a convention similar to `semantic versioning <https://semver.org>`_ in software development.
Every taxonomy release has an associated version which consists of 3 numbers (like in semver): a major number, minor number, and a patch number.

- The *major* number is incremented if the taxonomy undergoes breaking changes which require updates to the tags already stored on the persistence layer.
- The *minor* number is incremented if the taxonomy undergoes breaking changes which require updates to a user's tag files or scripts.
- The *patch* number is incremented for updates without any breaking changes.

Breaking and Non-Breaking Changes
---------------------------------
Listed below are types of changes and the minimum version bump required. If multiple changes are made, the maximum version bump must be used:

- Term/Field Deletion: major release.
- Term Move: major release. In the future, this could possibly be converted to a minor release.
- Term/Field Rename: minor release. If the term name is made an alias, then this can be a patch release.
- Making optional field required: minor release. (Thoughts welcome!)
- (Optional) Term/Field Addition: patch release.
- Deprecating a field/term: patch release.
- Making required field optional: patch release.
- Adding alias for term/field: patch release.

Techniques to Avoiding Breaking Changes
---------------------------------------
Some of the breaking changes above have non-breaking alternatives to use for taxonomy evolution:

- Term/Field Deletion: Deprecate the term instead.
- Term Move: Deprecate the original and add a new term.
- Term/Field Rename: Add alias for original name and rename.


