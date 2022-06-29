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

        render (schema, uiSchema, formData, taxonomyPath) {
            // TODO: what about the initial case
            const onChange = (event) => formData = event.formData;
            const children = React.createElement('div', null, [
                React.createElement('button', {
                    className: 'btn btn-info',
                    onClick: () => this.addTags(taxonomyPath, formData.taxonomyTags),
                }, 'Apply tags'),
                React.createElement('button', {
                    type: 'submit',
                    className: 'btn btn-secondary',
                    onClick: () => this.downloadJSON(formData),
                }, 'Download'),
            ]);
            this.root.render(React.createElement(Form, {schema, onChange, uiSchema, formData}, children));
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
