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
            const definitions = Object.fromEntries(
                (await this.getSchemaDefinitions(node)).map(def => [normalize(def.title), def])
            );
            const taxonomyName = this.core.getAttribute(node, 'name');
            const tagNames = await this.getTagNames(node);
            const properties = {
                taxonomyTags: {
                    title: taxonomyName,
                    type: 'array',
                    uniqueItems: true,
                    minItems: 1,
                    items: {
                        type: 'object',
                        anyOf: tagNames.map(name => ({$ref: `#/definitions/${normalize(name)}`})),
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

        async getTagNames(node) {
            const tags = (await this.core.loadSubTree(node))
                .filter(node => this.core.isTypeOf(node, this.META.Tag));
            return tags.map(tag => this.core.getAttribute(tag, 'name'));
        }

        async getSchemaDefinitions(node) {
            const tagsAndCompounds = (await this.core.loadSubTree(node))
                .filter(child => this.core.isTypeOf(child, this.META.Tag) ||
                    this.core.isTypeOf(child, this.META.CompoundField)
                );

            // for each of them, we need to record the 
            return await Promise.all(
                tagsAndCompounds.map(node => this.getDefinition(node))
            );
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
            const isTag = this.core.isTypeOf(node, this.META.Tag);
            const properties = isTag ? this.getConstantPropertiesFor(node) : [];
            const fieldNodes = (await this.core.loadChildren(node))
                .filter(child => this.core.isTypeOf(child, this.META.Field));

            return Object.fromEntries([
                ...properties,
                ...await Promise.all(fieldNodes.map(node => this.getFieldSchema(node)))
            ]);
        }

        getConstantProperties() {
            return [
                ['tagID', node => this.core.getGuid(node)],
                ['tagName', node => this.core.getAttribute(node, 'name')],
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
            const baseName = this.core.getAttribute(baseNode, 'name');

            let fieldSchema = {type: 'string'};
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
                case 'CompoundField':
                    fieldSchema = {"$ref": `#/definitions/${normalize(name)}`};
                    break;
            }
            return [name, fieldSchema];
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
