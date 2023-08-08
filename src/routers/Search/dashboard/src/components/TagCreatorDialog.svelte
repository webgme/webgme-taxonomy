<!--
  @component
  A dialog for creating a dataset tags file.
-->
<script lang="ts">
  import Dialog, { Header, Content, Title, Actions } from "@smui/dialog";
  import SchemaForm/*, { type JSONSchema7 }*/ from "svelte-jsonschema-form";

  export let open = false;
  export let nodePath: string = "";

  let schema = fetchSchema();

  async function fetchSchema() {
    const url = `../../${encodeURIComponent(nodePath)}/schema.json`
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.text());
    }
  }
</script>

<Dialog bind:open>
  <Header>
    <Title>Create a new tag file</Title>
  </Header>
  <Content>
    {#await schema}
      <p>Loading schema...</p>
    {:then schema}
      <SchemaForm {schema} />
    {:catch error}
      <div class="error">ERROR: {error.message}</div>
    {/await}
  </Content>
  <Actions></Actions>
</Dialog>
