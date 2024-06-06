<!--
  @component
  The "tags" step of the append artifact dialog.
-->
<script lang="ts">
  import Textfield from "@smui/textfield";
  import SchemaForm, { type JSONSchema7 } from "svelte-jsonschema-form";

  export let schema: JSONSchema7;

  let tagsFile: FileList | null = null;
  let data;

  $: mergeTagsFile(tagsFile?.[0]);

  async function mergeTagsFile(file: File | undefined) {
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        data = JSON.parse(reader.result as string);
      };
      reader.readAsText(file);
    }
  }

</script>

<Textfield bind:files={tagsFile} label="File" type="file" input$accept="application/json" />
<SchemaForm {schema} bind:data={data} />
