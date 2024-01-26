<script lang="ts">
  import 'svelte-jsonschema-form/theme/default';
  import SchemaForm, { type ValidationError, type JSONSchema7 } from 'svelte-jsonschema-form';
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Button, { Label } from '@smui/button';
  import Snackbar, { Label as SBLabel, Actions } from '@smui/snackbar';
  import IconButton from '@smui/icon-button';
  import SchemaLoading from './SchemaLoading.svelte';

  let configuration = fetchSchema();
  const defaultUischema = { collapse: "unrequired" } as const;

  let schemaForm: SchemaForm;
  let errorSnackbar: Snackbar;
  let validationError: ValidationError | null = null;

  $: if (validationError != null) errorSnackbar.open();

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
      validationError = error as ValidationError;
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
    <SchemaForm {schema} {uischema} {data} bind:this={schemaForm}>
      <Button on:click={() => download(taxonomyVersion)} type="button" variant="raised">
        <Label>Download</Label>
      </Button>
    </SchemaForm>
  {:catch error}
    <div class="error">ERROR: {error.message}</div>
  {/await}

  <Snackbar class="schema-error" bind:this={errorSnackbar}>
    <SBLabel>
      {#if validationError}
        {validationError.message}
        <ul>
          {#each validationError.errors as error}
            <li>{error.message}</li>
          {/each}
        </ul>
      {:else}
        Unknown error
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
