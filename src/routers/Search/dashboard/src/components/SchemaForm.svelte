<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CircularProgress from "@smui/circular-progress";
  import SchemaForm, { ValidationError, type JSONSchema7, type UISchema } from "svelte-jsonschema-form";
  import { deepMerge } from "../Utils";

  export let data: any;
  export let readonly = false;

  const dispatch = createEventDispatcher();
  const schema = fetchSchema();
  let uischema = { ":ui:": { "collapse": "unrequired" }} as UISchema;
  let schemaForm: SchemaForm;
  let schemaError: string | Error | ValidationError | null = null;

  $: updateUischema(readonly);

  async function fetchSchema(): Promise<JSONSchema7> {
    const url = "../schema.json";    
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(await response.text());
    }
  }

  function updateUischema(disabled: boolean) {
    uischema = deepMerge(uischema, <UISchema>{ ":ui:": { readonly }});
  }

  function handleSchemaFormError(event: CustomEvent<Error | ValidationError>) {
    console.error(event.detail);
    if (event.detail instanceof ValidationError) {
      schemaError = event.detail;
    }
    else {
      schemaError = "Invalid JSON Schema. Please check the configuration file.";
    }
    dispatch("error", schemaError);
  }

  export function download(filename: string, opts?: any) {
    schemaForm.download(filename, opts);
  }
</script>


{#await schema}
  <CircularProgress indeterminate />
  <p>Loading schema...</p>
{:then schema}
  <SchemaForm {schema} {uischema} bind:data={data} bind:this={schemaForm} on:error={handleSchemaFormError} />
{:catch error}
  <div class="error">ERROR: {error.message}</div>
{/await}


<style lang="scss">
  :global(.jsonschema-form > .smui-paper--raised) {
    box-shadow: none !important;
    padding: 0 !important;

    > :global(.smui-paper__title) {
      display: none;
    }
  }
</style>