/**
 * This generates a schema of the taxonomy as required by the search dashboard. The format is basically:
 *
 *     {
 *       "id": "GUID",
 *       "name": "display name",
 *       "type": "meta name",
 *       "children": [...child nodes]
 *     }
 */
function factory() {
    class SearchFilterDataExporter {
        constructor(core) {
            this.core = core;
        }

        async toSchema(node) {
            const base = this.core.getBase(node);
            const children = await this.core.loadChildren(node);

            return {
                id: this.core.getGuid(node),
                name: this.core.getAttribute(node, 'name'),
                type: this.core.getAttribute(base, 'name'),
                children: await Promise.all(
                    children.map(child => this.toSchema(child))
                ),
            };
        }

        async toSchemaSingleTaxonomyProject(root) {
            const children = await this.core.loadChildren(root);
            let node = null;
            children.forEach(child => {
                const meta = this.core.getMetaType(child);
                if (this.core.getAttribute(meta, 'name') === 'Taxonomy') {
                    node = child;
                }
            });

            if (node) {
                return await this.toSchema(node);
            } else {
                throw new Error('Cannot find taxonomy node!');
            }
        }
    }

    return SearchFilterDataExporter;
}

if (typeof define !== 'undefined') {
    define([], factory);
} else {
    module.exports = factory();
}
