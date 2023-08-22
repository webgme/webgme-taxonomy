/**
 * Interface to describe mutable object holding taxonomy file generator
 */
export interface ITaxonomy {
    taxonomy_file: Promise<string>;
}

