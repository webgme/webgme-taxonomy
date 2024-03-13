Overview
========
This page will contain an overview of the codebase/development.

Spinning Up Development Environment
-----------------------------------

Extending the Metamodel
-----------------------
- copy typescript

Metadata Storage
----------------

Storage Adapters
----------------
When modeling content types in the design studio (see :ref:`Creating Content Types`), the storage location must be specified, such as MongoDB or PDP.
These storage backends are supported through corresponding storage adapters which implement methods for creating, updating, deleting, or listing content (among others).
All supported storage adapters can be found in `src/routers/Search/adapters/`. More information about specific storage adapters can be found below.

Currently, the storage adapters assume a two-level deep hierarchy of content. That is, they expect repositories to be created which contain content.

PDP
^^^
The PDP adapter stores content on the Premonition Data Platform. The central concepts in PDP are the `Process` which contains `Observations`.
Processes are a list of observations. Each observation is essentially a structured JSON object with both an index and version number. Observations also contain the metadata (in the `data` field) and metadata about the associated files.

In PDP, repository metadata is stored in the first observation (index 0) and content is stored in the subsequent observations.

As PDP is an immutable data store, deletion support is a little more complex. Observations can contain either 1) content metadata, 2) content update events - including the new metadata, or 3) content deletion events. As a result, observations are technically more of an oplog.

MongoDB
^^^^^^^
When storing content using the MongoDB adapter, all repository and content metadata is stored in a document. The document contains the repository metadata along with the metadata for all the content (and every version of each content item). Files are stored using GridFS (which is available out of the box with MongoDB).

Data Organization
>>>>>>>>>>>>>>>>>
