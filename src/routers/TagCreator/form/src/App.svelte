<script lang="ts">
  import 'svelte-jsonschema-form/theme/default';
  import SchemaForm, { ValidationError } from 'svelte-jsonschema-form';
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Button, { Label } from '@smui/button';
  import Snackbar, { Label as SBLabel, Actions } from '@smui/snackbar';
  import IconButton from '@smui/icon-button';
  import SchemaLoading from './SchemaLoading.svelte';

  let configuration = fetchSchema();
  const defaultUischema = { ":ui:": { "collapse": "unrequired" }} as const;

  let schemaForm: SchemaForm;
  let errorSnackbar: Snackbar;
  let schemaError: string | Error | ValidationError | null = null;

  $: if (schemaError != null) errorSnackbar.open();

  async function fetchSchema() {
    const url = "../configuration.json";    
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.text());
    }
  }

  function download(taxonomyVersion: { [key: string]: string }) {
    try {
      schemaForm.download("tags", {
        transform: (tags: any) => ({ tags, taxonomyVersion })
      });
    } catch (error) {
      schemaError = error as Error | ValidationError;
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

<main>
  {#await configuration}
    <TopAppBar variant="static">
      <Row>
        <Section>
          <Title>Metadata Tag Creator</Title>
        </Section>
      </Row>
    </TopAppBar>
    <SchemaLoading />
  {:then {schema, taxonomyVersion, formData: data = {}, uiSchema}}
    {@const uischema = {...defaultUischema, ...uiSchema} }
    <TopAppBar variant="static">
      <Row>
        <Section>
          {#if schema.title}
            <Title>{schema.title}</Title>
          {/if}
        </Section>
      </Row>
    </TopAppBar>
    <SchemaForm {schema} {uischema} {data} bind:this={schemaForm} on:error={handleSchemaFormError}>
      <Button on:click={() => download(taxonomyVersion)} type="button" variant="raised">
        <Label>Download</Label>
      </Button>
    </SchemaForm>
  {:catch error}
    <div class="error">ERROR: {error.message}</div>
  {/await}

  <Snackbar class="schema-error" bind:this={errorSnackbar}>
    <SBLabel>
        {#if typeof schemaError === 'string'}
          {schemaError}
        {:else if schemaError instanceof Error}
          {schemaError.message}
        {:else}
          Unknown error
        {/if}
        {#if schemaError instanceof ValidationError}
          <ul>
            {#each schemaError.errors as error}
              <li>{error.message}</li>
            {/each}
          </ul>
        {/if}
    </SBLabel>
    <Actions>
      <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
  </Snackbar>
</main>

<style lang="scss">
  :global(.schema-loading),
  :global(.jsonschema-form) {
    padding: 8px;
  }

  :global(.jsonschema-form > .smui-paper > .smui-paper__title) {
    display: none;
  }
</style>
