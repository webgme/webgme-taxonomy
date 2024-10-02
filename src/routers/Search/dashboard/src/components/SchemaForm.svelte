<!--
  @component
  A component to fetch schema and manage corresponding a SchemaForm.
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import CircularProgress from "@smui/circular-progress";
  import SchemaForm, { DownloadOptions, ValidationError, type JSONSchema7, type UISchema } from "svelte-jsonschema-form";
  import { deepMerge } from "../Utils";

  export let data: any;
  export let nodePath: string | undefined = undefined;
  export let readonly = false;
  export let taxonomyVersion: { [key: string]: string } | null = null

  const dispatch = createEventDispatcher();
  const configTaxVers: { [key: string]: string } | undefined = getContext<any>("configuration")?.taxonomyVersion;
  let schema: Promise<JSONSchema7>;
  let uischema = { ":ui:": { "collapse": "unrequired" }} as UISchema;
  let schemaForm: SchemaForm;
  let schemaError: string | Error | ValidationError | null = null;

  $: schema = fetchSchema(nodePath)
  $: updateUischema(readonly);

  async function fetchSchema(nodePath?: string): Promise<JSONSchema7> {
    const url = (nodePath == null) ? "../schema.json" : `../../${encodeURIComponent(nodePath)}/schema.json`;
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

  export function download(filename: string, opts?: DownloadOptions) {
    const taxVers = taxonomyVersion ?? configTaxVers;
    const transform = (taxVers != null) ? (tags: any) => ({ tags, taxonomyVersion: taxVers }) : undefined;
    schemaForm.download(filename, { transform, ...opts });
  }
</script>


{#await schema}
  <CircularProgress indeterminate />
  <p>Loading schema...</p>
{:then schema}
  <SchemaForm {schema} {uischema} bind:data bind:this={schemaForm} on:error={handleSchemaFormError} />
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