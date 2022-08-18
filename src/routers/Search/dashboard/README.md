This is a starter standalone project for searching PDP. It will be eventually migrated to the Search router.


## Questions
- Can this be made generic enough to be a useful search dashboard in general?
	- We will need a custom adapter for querying the database given the taxonomy query
		- PDP -> fetch metadata and filter JSONL
		- other backends may be able to be more clever
			- maybe a path in the component settings or something?
		- should this be defined in the source code or as part of the model?
			- model would be more expressive but trickier. Probably both:
				- model -> select existing adapter
				- components.json -> define more adapters for the deployment

## To Do
- [ ] update parent/child checkbox state on click
	- parents become indeterminate; children match parent (except for fields)

- [ ] add autoformatting like prettier

## Done
- [x] generate the schema for the taxonomy
	```javascript
	[
		{
			"id": "tag id",
			"name": "Subject",
			"type": "Term",
			"children": [
				{
					"id": "prop id",
					"name": "age",
					"type": "IntegerField",
				}
			],
		}
	]
	```
	- fields:
		- integers
			- in min, max (equal?)
		- strings
			- includes
		- boolean
		- enum
			- checkboxes

- [x] show the list of results in the main area (not below)

- [x] generate an example dataset

- [x] receive updates when the filter changes
	- this isn't entirely clear to me...
	- [-] create a filter object to actually perform the filtering?

