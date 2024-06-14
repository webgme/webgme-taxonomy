<!--
  @component
  A dialog for displaying tags for content.
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import type { toast as Toast } from "@zerodevx/svelte-toast";
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import SchemaForm from "./SchemaForm.svelte";

  export let displayName: string = '';
  export let taxonomyTags = {};
  export let open = true;

  const dispatch = createEventDispatcher();
  const toast = getContext<typeof Toast>("toast");
  let schemaForm: SchemaForm;

  // FIXME: check that it shows correct tags when item is changed
  function close() {
    open = false;
  }

  function getVocabName(tag) {
    return Object.keys(tag).pop();
  }

  function download() {
    const filename = `${displayName}_metadata`;
    try {
      schemaForm.download(filename, { validate: false });
    }
    catch(error) {
      console.error(error);
      if (dispatch("error", error)) {
        const msg = error.message ?? error.toString();
        toast.push(msg, { initial: 0, classes: ["warn"] });
      }
    }
  }
</script>

<Dialog
  bind:open
  aria-labelledby="title"
  aria-describedby="content"
>
  <Title id="display-tags-title">Metadata for {displayName}</Title>
  <Content id="display-tags-content">
    <SchemaForm bind:data={taxonomyTags} readonly bind:this={schemaForm} />
  </Content>
  <Actions id="display-tags-actions">
    <Button on:click={close}>
      <Label>Close</Label>
    </Button>
    <Button on:click={download}>
      <Label>Download</Label>
    </Button>
  </Actions>
</Dialog>

<style>
  :global(#display-tags-actions) {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
  }
</style>
