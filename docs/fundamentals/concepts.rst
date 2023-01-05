Terminology and Concepts
========================

The MCpsych modeling and model integration infrastructure, the Unified Data and Compute Platform (UDCP), incorporates data, model and code repositories and tools for supporting the integration, testing and validation and execution of end-to-end models. The core requirements for UDCP are to:

1. provide transparency, reproducibility, and traceability for datasets, model components, integrated models, and modeling pipelines,
2. accommodate heterogeneity of research platforms used by the research teams, and
3. enforce privacy and proprietary restrictions as defined in the Data Use Agreement of the MCpsych program.

UDCP has not been designed to replace MCpsych teams' development platforms. Its role is to make artifacts delivered by the program participants findable, accessible, integratable and reusable for creating end-to-end models.
Since UDCP hosts a large number of heterogeneous and interdependent computational objects (the reposited versions of data, model and code), content organization and dependency tracking are important concerns. 
Content organization in UDCP is built on taxonomies that provide a systematic way of tagging content. Tags are used for searching and tracking dependencies among computational objects. 


- *Content types*. Content uploaded to a repository is categorized by content types. Instances of content types have a set of shared views defined by the MCpsych taxonomy. Examples for content types are datasets, workflows and models that can be further divided into sub-types. The current list of content types can evolve by creating new ones or changing the views used for their categorization. Instances of content types are named Repositories where various contents (such as dataset, records, workflows) are uploaded.
- *Taxonomy*. The MCpsych taxonomy facilitates hierarchical categorization of content with tags (metadata). 
     - A taxonomy is defined by a set of vocabularies capturing different views of a content-type. For example, the Sleep-data content-type that groups together a number of sleep-data files can be associated with a Subject vocabulary designed for categorizing patients and a Collection-site vocabulary categorizing the institutions collecting the data. The same vocabulary can be associated with several content types. The Base vocabulary is used by all content types. 
     - Vocabularies incorporate a set of *terms* that can be arranged in a flat or hierarchical structure. Terms of vocabularies that are associated with a content-type are used for tagging instances of the content type. Vocabularies define if only a single term or multiple terms can be used as content tags from the vocabulary.
     - Terms themselves have several basic types: they can be simple labels or they can have attributes that are set (subject to constraints) when a content is tagged with the term. These attributes can be a number of different types including strings, integers, and enumerations. Terms be declared as mandatory, recommended or optional. Attributes can have a default value; enumeration options can also contain properties.
     - Taxonomies are modeled by a *Taxonomy Studio*. The Taxonomy Studio precisely specifies the taxonomy model and generates representations used by various UDCP tools. The representation of the full MCpsych taxonomy including all vocabularies is also defined as a content-type, and as such, it can be uploaded to UDCP, evolved, traced, and used in dependency chain. 

