function factory() {
  let React, ReactDOM, JSONSchemaForm, validator;

  class TagCreatorForm {
    constructor(element) {
      this.root = ReactDOM.createRoot(element);
    }

    render(data) {
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
              this.downloadJSON(Object.assign({}, data.downloadData, formData));
            },
          },
          "Download"
        ),
      ]);
      this.root.render(
        React.createElement(JSONSchemaForm, data.getProperties(), children)
      );
    }

    /**
     * This is a workaround for a bug in the form editor.
     * If the dropdown (selecting the "anyOf" item) is not changed,
     * then the default values are not set. If the ID property is
     * missing, we inherit the defaults for the first (default)
     * item.
     */
    setMissingDefaults(schema, metadata) {
      const defaults = this._setMissingDefaults(
        schema,
        schema.definitions,
        metadata
      );
      // We need to mutate the original for form validation to
      // validate the correct version of the object.
      extend(metadata, defaults);
      return defaults;
    }

    /**
     * Set the missing defaults in the metadata given the schema.
     * Unlike the public version (`setMissingDefaults`), this one
     * is written to be recursive and accept `definitions` explicitly.
     */
    _setMissingDefaults(schema, definitions, metadata) {
      if (schema.type === "array") {
        return metadata.map((md) =>
          this._setMissingDefaults(schema.items, definitions, md)
        );
      } else if (schema.type === "object") {
        const properties = this._getObjectProperties(
          schema,
          definitions,
          metadata,
        );
        if (properties) {
          const data = metadata || {};
          return Object.fromEntries(
            Object.entries(properties).map(([id, val]) => [
              id,
              this._setMissingDefaults(val, definitions, data[id]),
            ]),
          );
        } else if (metadata === null || metadata === undefined) {
          return this._getDefaultValue(schema, definitions) || {};
        }
      } else if (metadata === null || metadata === undefined) {
        return this._getDefaultValue(schema, definitions) || metadata;
      }

      return metadata;
    }

    /**
     * Get the properties of an object. Follow references and anyOf defaults.
     *
     * The latter refers to this format:
     *
     *   {
     *     type: "object",
     *     anyOf: [{someDefaultObjectWithProps}]
     *   }
     */
    _getObjectProperties(schema, definitions, metadata) {
      if (schema.properties) {
        return schema.properties;
      }

      if (schema.anyOf) {
        // filter out non-matches and return the first
        const validSchemas = schema.anyOf.filter((s) =>
          !this._hasConflictingProp(s, definitions, metadata)
        );
        return this._getObjectProperties(validSchemas[0], definitions);
      }

      if (schema.$ref) {
        const defId = schema.$ref.split("/").pop();
        return this._getObjectProperties(definitions[defId], definitions);
      }
    }

    _hasConflictingProp(schema, definitions, metadata) {
      const propDict = this._getObjectProperties(
        schema,
        definitions,
        metadata,
      );
      const validProps = Object.keys(propDict);
      const properties = Object.keys(metadata);
      const invalidProp = properties.find((prop) => {
        if (!validProps.includes(prop)) {
          return true;
        }

        const value = metadata[prop];
        if (typeof schema === "object") {
          const valueSchema = propDict[prop];
          return this._hasConflictingProp(valueSchema, definitions, value);
        }

        return false;
      });

      return !!invalidProp;
    }
    /**
     * Get the default value from a JSON schema element. Follow references to definitions.
     */
    _getDefaultValue(schema, definitions) {
      if (!schema) return schema;

      if (schema.default) {
        return schema.default;
      } else if (schema.anyOf) {
        const defItem = schema.anyOf[0];
        if (defItem.$ref) {
          const defID = defItem.$ref.split("/").pop();
          const defaultDef = definitions[defID];
          return this._getDefaultValue(defaultDef, definitions);
        } else {
          return this._getDefaultValue(defItem, definitions);
        }
      } else if (schema.type === "object") {
        const defaults = Object.fromEntries(
          Object.entries(schema.properties).map(([id, def]) => {
            return [id, this._getDefaultValue(def, definitions)];
          })
        );
        return defaults;
      } else if (schema.type === "array") {
        return this._getDefaultValue(schema.items, definitions) || [];
      }
    }

    downloadJSON(object, name = "tags") {
      const dataStr = "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(object));
      const element = document.createElement("a");
      element.setAttribute("href", dataStr);
      element.setAttribute("download", name + ".json");
      document.body.appendChild(element);
      element.click();
      element.remove();
    }

    static inject(_React, _ReactDOM, _JSONSchemaForm, _validator) {
      // dependency injection
      React = _React;
      ReactDOM = _ReactDOM;
      JSONSchemaForm = _JSONSchemaForm;
      validator = _validator;
    }
  }

  class FormRenderData {
    constructor(schema, uiSchema, formData = {}, downloadData = {}) {
      this.schema = schema;
      this.downloadData = downloadData;
      this.uiSchema = uiSchema;
      this.formData = formData || { taxonomyTags: [] };
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
          name,
        ),
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
        validator,
      };
    }
  }

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function extend(target, source) {
    Object.entries(source).forEach(([k, v]) => {
      const isObject = typeof v === "object" && !Array.isArray(v);
      if (isObject) {
        v = extend(target[k], v);
      }
      target[k] = v;
    });
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
} else if (typeof window === "undefined") {
  module.exports = factory();
} else {
  this.TagCreatorForm = factory();
}
