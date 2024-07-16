<!--
  @component
  A dialog for creating new repositories
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import TagStepDialog from "./TagStepDialog.svelte";
  import Paper, { Content } from "@smui/paper";
  import Textfield from "@smui/textfield";

  export let open = false;
  export let nodePath: string | undefined = undefined;

  const storage: Storage = getContext("storage");
  const dispatch = createEventDispatcher();
  let displayName = '';
  let tags: any = {};

  async function submit() {
    const metadata = { displayName, tags };
    const status = await storage.createRepo(metadata);
    dispatch('create', {status});
  }
</script>

<div></div>
<TagStepDialog
  title="Create new repository"
  submitLabel="Create"
  {nodePath}
  bind:open={open}
  bind:tags={tags}
  on:submit={({ detail }) => detail(submit) }
  let:working={working}
>
  <Paper variant="unelevated">
    <Content>
      <Textfield label="Name" bind:value={displayName} disabled={working} />
    </Content>
  </Paper>  
</TagStepDialog>
