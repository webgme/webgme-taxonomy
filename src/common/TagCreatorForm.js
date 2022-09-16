function factory() {
  let React, ReactDOM, JSONSchemaForm;

  class TagCreatorForm {
    constructor(element) {
      this.root = ReactDOM.createRoot(element);
    }

    render(data) {
      const Form = JSONSchemaForm.default;
      const { formatter } = data;
      const children = React.createElement("div", null, [
        ...data.buttons,
        React.createElement(
          "button",
          {
            type: "submit",
            className: "btn btn-secondary",
            onClick: async () => {
              const formData = deepCopy(
                this.setMissingDefaults(data.schema, data.formData)
              );
              const downloadData = await this.formatData(formatter, formData);
              this.downloadJSON(downloadData);
            },
          },
          "Download"
        ),
      ]);
      this.root.render(
        React.createElement(Form, data.getProperties(), children)
      );
    }

    async formatData(formatter, formData) {
      formData.taxonomyTags = await formatter.toHumanFormat(
        formData.taxonomyTags
      );
      return formData;
    }

    /**
     * This is a workaround for a bug in the form editor.
     * If the dropdown (selecting the "anyOf" item) is not changed,
     * then the default values are not set. If the ID property is
     * missing, we inherit the defaults for the first (default)
     * item.
     */
    setMissingDefaults(schema, metadata) {
      const defID = schema.properties.taxonomyTags.items.anyOf[0].$ref
        .split("/")
        .pop();
      const defaultDef = schema.definitions[defID];
      const defaults = Object.fromEntries(
        Object.entries(defaultDef.properties)
          .filter(([id, def]) => def.default)
          .map(([id, def]) => [id, def.default])
      );

      metadata.taxonomyTags = metadata.taxonomyTags.map((tag) => {
        if (!tag) {
          tag = {};
        }
        if (!tag.ID) {
          return Object.assign({}, defaults, tag);
        }
        return tag;
      });
      return metadata;
    }

    downloadJSON(object, name = "tags") {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(object));
      const element = document.createElement("a");
      element.setAttribute("href", dataStr);
      element.setAttribute("download", name + ".json");
      document.body.appendChild(element);
      element.click();
      element.remove();
    }

    static inject(_React, _ReactDOM, _JSONSchemaForm) {
      // dependency injection
      React = _React;
      ReactDOM = _ReactDOM;
      JSONSchemaForm = _JSONSchemaForm;
    }
  }

  class FormRenderData {
    constructor(schema, uiSchema, formData, formatter = DefaultFormatter) {
      this.schema = schema;
      this.uiSchema = uiSchema;
      this.formData = formData || { taxonomyTags: [] };
      this.formatter = formatter;
      this.buttons = [];
    }

    addButton(name, action, clazz = "btn-info") {
      this.buttons.push(
        React.createElement(
          "button",
          {
            type: "submit",
            className: `btn ${clazz}`,
            onClick: () => {
              action(this.formData);
            },
          },
          name
        )
      );
    }

    getProperties() {
      let formData = this.formData;
      const onChange = (event) => (this.formData = event.formData);
      return {
        schema: this.schema,
        onChange,
        uiSchema: this.uiSchema,
        formData,
      };
    }
  }

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  const DefaultFormatter = {
    toHumanFormat(tag) {
      return tag;
    },
  };

  TagCreatorForm.FormRenderData = FormRenderData;
  return TagCreatorForm;
}

if (typeof define !== "undefined") {
  define([], factory);
} else {
  this.TagCreatorForm = factory();
}
