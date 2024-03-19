Tag Formats
===========

Content metadata contains tags defined by the vocabularies.
When uploading, tags are first defined in **human-readable format**.
This format uses the term and field names in the JSON.
An example is shown below::

	{
		"Base": {
			"name": "SomeContentName"
		}
	}

On upload, the server will convert the tags into **GUID format**. 
This format represents terms and fields using their GUIDs (rather than display names).
Unlike the human-readable format, this format is invariant to renames.
As a result, this ensures that data stored on the platform does not need to be migrated when a term or field is renamed. 
The above example, represented in GUID format, is shown below::

	{
		"<Base GUID>": {
			"<name GUID>": "SomeContentName"
		}
	}
