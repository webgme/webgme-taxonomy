/*globals define*/
/*eslint-env node, browser*/

define([
], function(
) {

    class JSONSchemaExporter {
        constructor(core, META) {
            this.core = core;
            this.META = META;
        }

        async getSchemas(node) {
            const defEntries = await this.getDefinitionEntries(node);
            const definitions = Object.fromEntries(defEntries);
            const taxonomyName = this.core.getAttribute(node, 'name');
            const termNodes = await this.getTermNodes(node);
            const properties = {
                taxonomyTags: {
                    title: taxonomyName,
                    type: 'array',
                    uniqueItems: true,
                    minItems: 1,
                    items: {
                        type: 'object',
                        anyOf: termNodes.map(node => {
                            const guid = this.core.getGuid(node);
                            return {$ref: `#/definitions/${guid}`};
                        }),
                    }
                }
            };
            const schema = {
                type: 'object',
                properties,
                definitions
            };

            const uiSchema = {
                taxonomyTags: {
                    items: Object.fromEntries(
                        this.getConstantProperties().map(([name,]) => [
                            name,
                            {
                                'ui:widget': 'hidden'
                            }
                        ])
                    )
                }
            };
            return {schema, uiSchema};
        }

        async getTermNodes(node) {
            return (await this.core.loadSubTree(node))
                .filter(node => this.core.isTypeOf(node, this.META.Term));
        }

        async getDefinitionEntries(node) {
            const children = await this.core.loadChildren(node);
            const tagsAndCompounds = children
                .filter(child => this.core.isTypeOf(child, this.META.Term) ||
                    this.core.isTypeOf(child, this.META.CompoundField)
                );

            const childDefs = (await Promise.all(children.map(node => this.getDefinitionEntries(node))))
                .flat();
            const myDefs = 
            await Promise.all(
                tagsAndCompounds.map(async node => [this.core.getGuid(node), await this.getDefinition(node)])
            );
            return myDefs.concat(childDefs);
        }

        async getDefinition(node) {
            const properties = await this.getProperties(node);
            return {
                title: this.core.getAttribute(node, 'name'),
                properties,
                required: Object.keys(properties)
            };
        }

        async getProperties(node) {
            const isTerm = this.core.isTypeOf(node, this.META.Term);
            const properties = isTerm ? this.getConstantPropertiesFor(node) : [];
            const fieldNodes = (await this.core.loadChildren(node))
                .filter(child => this.core.isTypeOf(child, this.META.Field));

            // TODO: if parent is a term, add it as a property
            const parent = this.core.getParent(node);
            if (this.core.isTypeOf(parent, this.META.Term)) {
                const guid = this.core.getGuid(parent);
                properties.push([guid, {$ref: `#/definitions/${guid}`}]);
            }

            return Object.fromEntries([
                ...properties,
                ...await Promise.all(fieldNodes.map(node => this.getFieldSchema(node)))
            ]);
        }

        getConstantProperties() {
            return [
                ['ID', node => this.core.getGuid(node)],
            ];
        }

        getConstantPropertiesFor(node) {
            return this.getConstantProperties().map(
                ([name, valueFn]) => this.getConstantProperty(name, valueFn(node)),
            );
        }

        getConstantProperty(name, value) {
            return [name, {
                type: 'string',
                const: value,
                default: value,
            }];
        }

        async getFieldSchema(node) {
            const baseNode = this.core.getMetaType(node);
            const name = this.core.getAttribute(node, 'name');
            const guid = this.core.getGuid(node);
            const baseName = this.core.getAttribute(baseNode, 'name');

            let fieldSchema = {
                title: name,
                type: 'string'
            };
            switch (baseName) {
                case 'IntegerField':
                    fieldSchema.type = 'integer';
                    break;
                case 'FloatField':
                    fieldSchema.type = 'number';
                    break;
                case 'BooleanField':
                    fieldSchema.type = 'boolean';
                    break;
                case 'EnumField':
                    fieldSchema.enum = (await this.core.loadChildren(node))
                        .map(node => this.core.getAttribute(node, 'name'));
                    break;
                case 'CompoundField':  // TODO: use guid?
                    fieldSchema = {"$ref": `#/definitions/${guid}`};
                    break;
            }
            return [guid, fieldSchema];
        }
    }

    function normalize(text) {
        return text.split(/[^a-zA-Z]/)
            .filter(chunk => chunk)
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join('')
    }

    return JSONSchemaExporter;
});
