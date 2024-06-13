<!--
  @component
  The "tags" step of the append artifact dialog.
-->
<script lang="ts">
  import Paper, { Subtitle, Content } from "@smui/paper";
  import CircularProgress from "@smui/circular-progress";
  import FileButton from "../FileButton.svelte";
  import SchemaForm, { ValidationError, type JSONSchema7 } from "svelte-jsonschema-form";

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

<Paper variant="unelevated" class="tags-step">
  <Subtitle>
    <span>Select Tags for the Content</span>
    <FileButton accept="application/json" tooltip="Populate from tags file" />
  </Subtitle>

  <Content>
    {#await schema}
      <CircularProgress indeterminate />
      <p>Loading schema...</p>
    {:then schema}
      <SchemaForm {schema} bind:data={data} bind:this={schemaForm} on:error={handleSchemaFormError} />
    {:catch error}
      <div class="error">ERROR: {error.message}</div>
    {/await}
  </Content>
</Paper>


<style lang="scss">
  :global(.jsonschema-form > .smui-paper--raised) {
    box-shadow: none !important;
    padding: 0 !important;

    > :global(.smui-paper__title) {
      display: none;
    }
  }

  :global(.tags-step .smui-paper__subtitle) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :global(.tags-step.smui-paper) {
    padding: 0;
  }
</style>