/*globals define, WebGMEGlobal*/

define([
    './lib/react-jsonschema-form',
    './lib/react-dom.production.min',
    'react',
    'webgme-taxonomy/TagCreatorForm',
    'css!./styles/TagCreatorWidget.css'
], function (
    JSONSchemaForm,
    ReactDOM,
    React,
    TagCreatorForm,
) {
    'use strict';

    const WIDGET_CLASS = 'tag-creator';
    TagCreatorForm.inject(React, ReactDOM, JSONSchemaForm);

    class TagCreatorWidget {
        constructor(logger, container) {
            this._logger = logger.fork('Widget');

            this._el = container;
            this.form = new TagCreatorForm(this._el[0]);
            this._logger.debug('ctor finished');
        }

        onWidgetContainerResize (width, height) {
            this._logger.debug('Widget is resizing...');
        }

        render (schema, uiSchema, formData, taxonomyPath, formatter) {
            const renderData = new FormRenderData(schema, uiSchema, formData, formatter);
            if (taxonomyPath) { 
                renderData.addButton(
                    'Apply tags',
                    tags => this.addTags(taxonomyPath, tags),
                    'btn-info'
                );
            }
            this.form.render(renderData);
        }

        destroy() {
        }

        onActivate() {
            this._logger.debug('TagCreatorWidget has been activated');
        }

        onDeactivate() {
            this._logger.debug('TagCreatorWidget has been deactivated');
        }
    }

    return TagCreatorWidget;
});
