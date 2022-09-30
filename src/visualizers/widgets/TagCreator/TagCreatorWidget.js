/*globals define, WebGMEGlobal*/

define([
  "./lib/react-jsonschema-form",
  "./lib/react-dom.production.min",
  "react",
  "q",
  "webgme-taxonomy/TagCreatorForm",
  "css!./styles/TagCreatorWidget.css",
], function (JSONSchemaForm, ReactDOM, React, Q, TagCreatorForm) {
  "use strict";

  const WIDGET_CLASS = "tag-creator";
  TagCreatorForm.inject(React, ReactDOM, JSONSchemaForm);
  const FormRenderData = TagCreatorForm.FormRenderData;
  class TagForm extends TagCreatorForm {
    async formatData(formatter, formData) {
      formData = await super.formatData(formatter, formData);
      formData.taxonomyVersion = await this._getTaxonomyVersion();
      return formData;
    }

    async _getTaxonomyVersion() {
      const client = WebGMEGlobal.Client;
      const taxonomyVersion = {
        id: client.getActiveProjectId(),
      };
      const tagDict = await Q.ninvoke(client, "getTags", taxonomyVersion.id);
      const commitHash = client.getActiveCommitHash();
      const [tag] =
        Object.entries(tagDict).find(([_tag, hash]) => hash === commitHash) ||
        [];
      const branch = client.getActiveBranchName();

      if (tag) {
        taxonomyVersion.tag = tag;
      } else if (branch) {
        taxonomyVersion.branch = branch;
      } else {
        taxonomyVersion.commit = commitHash;
      }
      return taxonomyVersion;
    }
  }

  class TagCreatorWidget {
    constructor(logger, container) {
      this._logger = logger.fork("Widget");

      this._el = container;
      this.form = new TagForm(this._el[0]);
      this._logger.debug("ctor finished");
    }

    onWidgetContainerResize(width, height) {
      this._logger.debug("Widget is resizing...");
    }

    render(schema, uiSchema, formData, taxonomyPath, formatter) {
      const renderData = new FormRenderData(
        schema,
        uiSchema,
        formData,
        formatter
      );
      if (taxonomyPath) {
        renderData.addButton(
          "Apply tags",
          (tags) => this.addTags(taxonomyPath, tags),
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
