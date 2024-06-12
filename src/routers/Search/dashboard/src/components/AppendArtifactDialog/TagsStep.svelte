<!--
  @component
  The "tags" step of the append artifact dialog.
-->
<script lang="ts">
  import Textfield from "@smui/textfield";
  import SchemaForm, { type JSONSchema7 } from "svelte-jsonschema-form";

  export let data: any;

  let schema = fetchSchema();
  let tagsFile: FileList | null = null;
  let schemaForm: SchemaForm;
  let schemaError: string | Error | ValidationError | null = null;

  $: mergeTagsFile(tagsFile?.[0]);

  async function fetchSchema(): Promise<JSONSchema7> {
    const url = "../schema.json";    
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(await response.text());
    }
  }

  async function mergeTagsFile(file: File | undefined) {
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        data = JSON.parse(reader.result as string);
      };
      reader.readAsText(file);
    }
  }

  function handleSchemaFormError(event: CustomEvent<Error | ValidationError>) {
    console.error(event.detail);
    if (event.detail instanceof ValidationError) {
      schemaError = event.detail;
    }
    else {
      schemaError = "Invalid JSON Schema. Please check the configuration file.";
    }
  }

</script>

<Textfield bind:files={tagsFile} label="File" type="file" input$accept="application/json" />
<SchemaForm {schema} bind:data={data} />
