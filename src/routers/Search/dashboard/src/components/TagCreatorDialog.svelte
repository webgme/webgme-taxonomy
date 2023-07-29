<!--
  @component
  A dialog for creating a dataset tags file.
-->
<script lang="ts">
  import Dialog, { Header, Content, Title, Actions } from "@smui/dialog";
  import SchemaForm, { type JSONSchema7 } from "svelte-jsonschema-form";

  export let schema: JSONSchema7 = {};
  export let data: any = {};

  let open = false;
</script>

<Dialog bind:open>
  <Header>
    <Title>Create a new tag file</Title>
  </Header>
  <Content>
    <SchemaForm {schema} {data} />
  </Content>
  <Actions></Actions>
</Dialog>
