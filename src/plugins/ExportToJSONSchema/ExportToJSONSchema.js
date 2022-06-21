/*globals define*/
/*eslint-env node, browser*/

define([
    'text!./metadata.json',
    'plugin/PluginBase',
], function (
    pluginMetadata,
    PluginBase,
) {
    'use strict';

    pluginMetadata = JSON.parse(pluginMetadata);

    class ExportToJSONSchema extends PluginBase {
        constructor() {
            super();
            this.pluginMetadata = pluginMetadata;
        }

        async main() {
            const definitions = Object.fromEntries(
                (await this.getSchemaDefinitions(this.activeNode)).map(def => [normalize(def.title), def])
            );
            const taxonomyName = this.core.getAttribute(this.activeNode, 'name');
            const properties = {
                taxonomyTags: {
                    title: taxonomyName,
                    type: 'array',
                    uniqueItems: true,
                    minItems: 1,
                    items: {
                        type: 'object',
                        anyOf: Object.keys(definitions).map(name => ({$ref: `#/definitions/${name}`})),
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
            const files = {
                'schema.json': JSON.stringify(schema, null, 2),
                'uischema.json': JSON.stringify(uiSchema, null, 2),
            };
            await this.addArtifact(taxonomyName, files);
            this.result.setSuccess(true);
        }

        async getSchemaDefinitions(node) {
            const childTags = (await this.core.loadChildren(node))
                .filter(child => this.core.isTypeOf(child, this.META.Tag));
            const isLeafNode = childTags.length === 0;
            if (isLeafNode) {
                const properties = await this.getTagProperties(node);
                return [{
                    title: this.core.getAttribute(node, 'name'),
                    properties,
                    required: Object.keys(properties)
                }];
            } else {
                return (await Promise.all(
                    childTags.map(child => this.getSchemaDefinitions(child))
                )).flat();
            }
        }

        async getTagProperties(node) {
            const properties = this.getConstantPropertiesFor(node);
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

            const fieldSchema = {type: 'string'};
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

    ExportToJSONSchema.metadata = pluginMetadata;

    return ExportToJSONSchema;
});
