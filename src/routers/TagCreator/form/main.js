const FormRenderData = TagCreatorForm.FormRenderData;
let form;
class RequestError extends Error {}

window.onload = async function () {
  const { Form, validator } = JSONSchemaForm;
  TagCreatorForm.inject(React, ReactDOM, Form, validator);

  const container = document.getElementById("form-container");
  form = new TagCreatorForm(container);

  try {
    await renderForm();
  } catch (err) {
    const prefix = "Unable to render form";
    if (err instanceof RequestError) {
      // TODO: clean this code up (better style and remove html in string)
      container.innerHTML =
        `<h5>${prefix}: ${err.message}<br/><br/>Is the URL correct?<h5>`;
    } else {
      container.innerText = `${prefix}: ${err.message}`;
    }
  }
};

async function renderForm() {
  const {
    schema,
    uiSchema,
    taxonomy,
    formData: initData,
  } = await fetchConfig();
  console.log({ initData });
  const formData = new FormRenderData(schema, uiSchema, initData, { taxonomy });
  form.render(formData);
}

async function fetchConfig() {
  const url = "../configuration.json";
  const response = await fetch(url);
  if (response.status > 399) {
    throw new RequestError(await response.text());
  } else {
    return await response.json();
  }
}
