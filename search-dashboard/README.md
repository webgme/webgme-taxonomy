This is a starter standalone project for searching PDP

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
- [ ] generate the schema for the taxonomy
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
