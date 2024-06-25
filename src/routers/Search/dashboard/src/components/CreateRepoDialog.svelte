<!--
  @component
  A dialog for creating new repositories
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import { Subtitle } from "@smui/paper";
  import Textfield from "@smui/textfield";
  import SchemaForm from "./SchemaForm.svelte";
  import FileButton from "./FileButton.svelte";
  import Button, { Label } from "@smui/button";

  export let open = false;
  export let disabled = false;

  const storage: Storage = getContext("storage");
  const dispatch = createEventDispatcher();
  let displayName = '';
  let tags: any = {};
  let creating = false;

  async function submit() {
    const metadata = { displayName, tags };
    creating = true;
    const status = await storage.createRepo(metadata);
    dispatch('create', {status});
  }
</script>


<Dialog
  bind:open={open}
  aria-labelledby="create-repo-title"
  aria-describedby="create-repo-content"
>
  <Title id="create-repo-title">Create new repository</Title>
  <Content id="create-repo-content">
    <Textfield label="Name" bind:value={displayName} {disabled} />
  </Content>

  <Subtitle>
    <span>Select Tags for the Content</span>
    <FileButton accept="application/json" tooltip="Populate from tags file" {disabled} />
  </Subtitle>

  <Content>
    <SchemaForm bind:data={tags} />
  </Content>

  <Actions id="create-repo-actions">
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={submit}>
      <Label>Submit</Label>
    </Button>
  </Actions>
</Dialog>