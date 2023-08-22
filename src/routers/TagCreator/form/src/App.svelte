<script lang="ts">
  import SchemaForm from 'svelte-jsonschema-form';
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Button, { Label } from '@smui/button';

  let configuration = fetchSchema();
  let data = {};

  async function fetchSchema() {
    const url = "../configuration.json";    
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.text());
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
    <p>Loading schema...</p>
  {:then {schema}}
    <TopAppBar variant="static">
      <Row>
        <Section>
          {#if schema.title}
            <Title>{schema.title}</Title>
          {/if}
        </Section>
      </Row>
    </TopAppBar>
    <SchemaForm {schema} {data} let:actions={actions}>
      <Button on:click={() => actions.download("tags")} type="button" variant="raised">
        <Label>Download</Label>
      </Button>
    </SchemaForm>
  {:catch error}
    <div class="error">ERROR: {error.message}</div>
  {/await}
</main>

<style lang="scss">
  :global(.jsonschema-form > .smui-paper > .smui-paper__title) {
    display: none;
  }
</style>
