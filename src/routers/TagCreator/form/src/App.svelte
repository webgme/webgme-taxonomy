<script lang="ts">
  import SchemaForm from 'svelte-jsonschema-form';
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
    <p>Loading schema...</p>
  {:then {schema}}
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
</style>
