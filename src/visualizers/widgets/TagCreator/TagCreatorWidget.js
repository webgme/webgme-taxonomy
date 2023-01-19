/*globals define, WebGMEGlobal*/

define([
  "./lib/jsonschema-form.umd",
  "./lib/react-dom.production.min",
  "react",
  "webgme-taxonomy/TagCreatorForm",
  "css!./styles/TagCreatorWidget.css",
], function (JSONSchemaForm, ReactDOM, React, TagCreatorForm) {
  "use strict";

  const WIDGET_CLASS = "tag-creator";
  const { Form, validator } = JSONSchemaForm;
  TagCreatorForm.inject(React, ReactDOM, Form, validator);
  const FormRenderData = TagCreatorForm.FormRenderData;

  class TagCreatorWidget {
    constructor(logger, container) {
      this._logger = logger.fork("Widget");

      this._el = container;
      this.form = new TagCreatorForm(this._el[0]);
      this._logger.debug("ctor finished");
    }

    onWidgetContainerResize(width, height) {
      this._logger.debug("Widget is resizing...");
    }

    render(schema, uiSchema, formData, downloadData, taxonomyPath) {
      const renderData = new FormRenderData(
        schema,
        uiSchema,
        formData,
        downloadData
      );
      if (taxonomyPath) {
        renderData.addButton(
          "Apply tags",
          (tags) => {
            this.form.setMissingDefaults(schema, tags);
            this.addTags(taxonomyPath, tags);
          },
          "btn-info"
        );
      }
      this.form.render(renderData);
    }

    destroy() {}

    onActivate() {
      this._logger.debug("TagCreatorWidget has been activated");
    }

    onDeactivate() {
      this._logger.debug("TagCreatorWidget has been deactivated");
    }
  }

  return TagCreatorWidget;
});
