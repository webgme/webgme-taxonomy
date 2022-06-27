/*globals define, WebGMEGlobal*/

define([
    './lib/react-jsonschema-form',
    './lib/react-dom.production.min',
    'react',
    'css!./styles/TagCreatorWidget.css'
], function (
    JSONSchemaForm,
    ReactDOM,
    React,
) {
    'use strict';

    console.log({JSONSchemaForm});
    const WIDGET_CLASS = 'tag-creator';
    const Form = JSONSchemaForm.default;

    class TagCreatorWidget {
        constructor(logger, container) {
            this._logger = logger.fork('Widget');

            this._el = container;
            this.root = ReactDOM.createRoot(this._el[0]);
            this._logger.debug('ctor finished');
        }

        onWidgetContainerResize (width, height) {
            this._logger.debug('Widget is resizing...');
        }

        // Adding/Removing/Updating items
        onFormSubmit(eventData) {
            // TODO: emit an event with the tag data
            const {formData} = eventData;
            const tags = formData.taxonomyTags;
            console.log('downloading tag data!', tags);
            this.downloadJSON(tags);
        }

        render (schema, uiSchema) {
            const onSubmit = this.onFormSubmit.bind(this);
            this.root.render(React.createElement(Form, {schema, onSubmit, uiSchema}, null));
        }

        downloadJSON(object, name = 'tags') {
            const dataStr = "data:text/json;charset=utf-8," +
                encodeURIComponent(JSON.stringify(object));
            const element = document.createElement('a');
            element.setAttribute("href", dataStr);
            element.setAttribute("download", name + ".json");
            document.body.appendChild(element);
            element.click();
            element.remove();
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
