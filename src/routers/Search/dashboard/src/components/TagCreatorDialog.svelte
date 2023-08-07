<!--
  @component
  A dialog for creating a dataset tags file.
-->
<script lang="ts">
  import Dialog, { Header, Content, Title, Actions } from "@smui/dialog";
  import SchemaForm/*, { type JSONSchema7 }*/ from "svelte-jsonschema-form";

  export let open = false;
  let schema = fetchSchema();

  async function fetchSchema() {
    const url = "../schema.json";
    const response = await fetch(url);
    if (response.ok) {
      const schema = await response.json();
      console.log(schema);
      return schema;
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
      <!-- <SchemaForm {schema} /> -->
      <pre>{JSON.stringify(schema)}</pre>
    {:catch error}
      <div class="error">ERROR: {error.message}</div>
    {/await}
  </Content>
  <Actions></Actions>
</Dialog>
