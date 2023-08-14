<!--
  @component
  A dialog for creating new repositories
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import TagSelector from "./TagSelector.svelte";
  import Textfield from "@smui/textfield";
  import type { default as ContentType } from "../ContentType";

  const dispatch = createEventDispatcher();

  export let open;
  export let contentType: ContentType;
  let displayName;
  let metadata = {taxonomyTags: []};

  $: metadata.displayName = displayName;

  async function onCreateRepo() {
    const status = await storage.createRepo(metadata);
    dispatch('create', {status});
  }

</script>

<Dialog
  bind:open={open}
  aria-labelledby="title"
  aria-describedby="content"
>
  <Title id="title">Create new repository</Title>
  <Content id="content">
    <Textfield label="Name" bind:value={displayName} />
    <TagSelector 
      bind:metadata={metadata}
      bind:contentType={contentType}
    />
  </Content>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => onCreateRepo()}>
      <Label>Submit</Label>
    </Button>
  </Actions>
</Dialog>
