// TODO: make formatter
// TODO: add css
const FormRenderData = TagCreatorForm.FormRenderData;
let form;

window.onload = function () {
  TagCreatorForm.inject(React, ReactDOM, JSONSchemaForm);

  const container = document.getElementById("form-container");
  form = new TagCreatorForm(container);

  renderForm();
};

async function renderForm() {
  const { schema, uiSchema } = await fetchSchemas();
  const formatter = new RESTTagFormatter();
  const formData = new FormRenderData(schema, uiSchema, {}, formatter);
  form.render(formData);
}

async function fetchSchemas() {
  const url = "../schemas.json";
  const response = await fetch(url);
  return await response.json();
}

/**
 * Format tags as human-readable using the REST endpoint.
 */
class RESTTagFormatter {
  constructor() {
    this.baseUrl = window.location.href
      .replace("TagCreator", "TagFormat")
      .replace(/[^/]*\/static.*$/, "human");
  }

  async toHumanFormat(tags) {
    const encodedTags = encodeURIComponent(JSON.stringify(tags));
    const url = `${this.baseUrl}?tags=${encodedTags}`;
    const response = await fetch(url, { credentials: "include" });
    return await response.json();
  }
}
