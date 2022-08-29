function factory() {
  let React, ReactDOM, JSONSchemaForm;

  class TagCreatorForm {
    constructor(element) {
      this.root = ReactDOM.createRoot(element);
    }

    render(data) {
      const Form = JSONSchemaForm.default;
      const { schema, uiSchema, formatter } = data;
      const children = React.createElement("div", null, [
        ...data.buttons,
        React.createElement(
          "button",
          {
            type: "submit",
            className: "btn btn-secondary",
            onClick: async () => {
              const downloadData = await this.formatData(formatter, data.formData);
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
      formData.taxonomyTags = await formatter.getHumanFormat(
        formData.taxonomyTags
      );
      return formData;
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
      this.formData = formData || {taxonomyTags: []};
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

  const DefaultFormatter = {
    getHumanFormat(tag) {
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
