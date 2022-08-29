# webgme-taxonomy
## Installation
First, install the webgme-taxonomy following:
- [NodeJS](https://nodejs.org/en/) (LTS recommended)
- [MongoDB](https://www.mongodb.com/)

Second, start mongodb locally by running the `mongod` executable in your mongodb installation (you may need to create a `data` directory or set `--dbpath`).

Then, run `webgme start` from the project root to start . Finally, navigate to `http://localhost:8888` to start using webgme-taxonomy!

## Misc To Do
- [ ] errors in validation when creating tags... Why?
- [ ] update PDP integration (Yogesh, right?)
- [ ] use it for webgme libraries?
	- publish from within webgme
	- define a taxonomy
	- storage adapter?
		- mongodb, right?
			- MongoDB+Blob
		- configuration opts:
			- collection name
				- validation so not colliding with others

## Done
- [x] router for the form download
	- [x] add TagCreator router
	- [x] refactor the visualizer form...
		- [ ] should I wrap it all and use FormRenderData?
			- [ ] yeah, let's do this
			- [ ] I need to load with requirejs...
				- this is a little annoying bc then I need requirejs on the client. Probably fine...
				- how hard is it to configure requirejs?
		- [ ] how about we just allow some code duplication for now
	- [x] how to embed?
		- [ ] it would be great if we could build a single static file (svelte) and just include that
- [x] update form download to use the human-readable format
	- [x] add logic to visualizer
	- [x] missing ID field...
		- I see it in the schema, I think
	- [x] need to merge the format logic then should be about there
