Considerations for Taxonomy Design
==================================

The core use-case for taxonomies in UDCP is to make artifacts delivered by the program participants findable, accessible, integratable and reusable for creating end-to-end models. While this goal is limited to the scope of the MCpsych program, the significant heterogeneity of content types and the potential role of taxonomy-based search in rapidly configuring diagnosis and prognosis for clinical workflows makes the taxonomy formation challenging and necessarily iterative. In this guide we summarize considerations while shaping taxonomies from three directions:  

1. *Top-down direction* where we proceed from the starting point of defining content types for repositories  and progress with  designing/selecting vocabularies that are the basic building blocks of taxonomies. Vocabularies characterize content types from different viewpoints by specifying a set of terms and defining the ways individual  terms can be instantiated when assigning them  as tags to content elements. 
2. *Bottom-up direction* where the starting point is a specific content to be loaded in a repository. The thinking process starts with searching for tags that could be useful for characterizing the content for other users to help its integration with other related contents. These tags then abstracted into terms with multiple possible valuations that seem to be useful for creating alternative tags for other content instances. Instead of growing the taxonomy by adding more and more terms, the terms are grouped into vocabularies, that capture a  “view” of related contents. Finally, content types are created by selecting a set of vocabularies that are used for differentiating among contents elements in a repository.  
3. *Evolution direction* focuses on the modification of existing taxonomies. The key consideration in taxonomy evolution is to understand the impact of changes on content instances that have already been tagged and on content management software that utilize taxonomies. While taxonomy evolution is challenging (particularly in large projects), the use of rigid, pre-defined taxonomies that do not fit the evolving needs of a research program is worst. 

The establishment of taxonomies in small project with clearly defined use cases is relatively simple. In large, complex  domains, (like MCpsych) that includes heterogeneous, evolving content with use cases that are exploratory by nature, effective content management is harder, but  can make significant difference. The core content management capability that taxonomy must support is content filtering. It is needed for finding relevant content elements for exploratory research and for tracking rich relationships among content elements. Below we clarify terminology and concepts of content organization and highlight considerations that are useful while designing taxonomy for MCpsych. 

Repositories and Content Types
------------------------------

1. *Repositories* collect content that have some shared characteristics such as the organization that created  the content  in the repository, common access rights to all content, or  the nature of the content (dataset, workflow or models). Since the scope of content filtering is a repository (and not across repositories), too many repositories decrease the power of content filtering, and too few repositories allow less freedom in assigning access authorization to content.
2. The *Content Type* of a repository determines the relevant set of vocabularies that must be used for tagging the individual content instances. Increasing the heterogeneity of the  stored content comes with increasing the number of vocabularies associated with the repository that necessarily slows down content filtering. Arbitrary number of repositories can be created using the same content type. This is needed if access right constraints require their separation. 

Vocabularies
------------

1. A vocabulary represents a  particular “semantic view” of the content in a repository. The vocabulary is defined by a group of terms that can be structured in a hierarchy.  A good rule of thumb is that unless the vocabulary is known for users, the number of terms involved should be kept under 30-40. The same vocabulary can be re-used in arbitrary number of content types.  
2. Selection of tags from one vocabulary should not constrain the selection of tags from another vocabulary. If this interdependence is unavoidable, the interdependent terms must be included in the same vocabulary.

Terms
-----

1. Terms have types that determine how they are instantiated in tags that are finally assigned to content elements. While the simplest type of terms are labels, they are frequently not sufficient for expressing richer characterization. In these cases terms may have attributes that can evaluate to complex types. In general, complex terms have strong performance penalty while doing content filtering. 
2. Decision about a term to be mandatory, recommended or optional is an important step helping tag assignment during content upload.

Taxonomy Evolution
------------------

There is only one thing worse than continual evolution of taxonomies, to decide it early and making wrong choices. Taxonomy evolution will be helped in UDCP the following manner:

1. Taxonomies are also a specific content type that are uploaded into the taxonomy repository. As such, taxonomies can be indexed, versioned and  each uploaded content explicitly linked to the taxonomy version under which its tags were created.
2. The impact of updates to taxonomies can vary significantly from minimal to breaking existing code or not finding existing content. Therefore we keep taxonomy updates centralized and use a semantic versioning scheme widely adopted in software that differentiates between major, minor and patch releases. 
