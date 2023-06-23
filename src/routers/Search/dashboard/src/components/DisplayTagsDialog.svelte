<!--
  @component
  A dialog for displaying tags for content.
-->
<script lang="ts">
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import List, {
    Item,
    Text,
    PrimaryText,
    SecondaryText,
    Meta,
    Graphic,
  } from "@smui/list";
  import {getNestedValue} from '../Utils';
  import TagItem from './TagItem.svelte';

  export let displayName: string = '';
  export let taxonomyTags: any[] = [];

  let open = true;
  function close() {
    open = false;
  }

  // TODO: notify when it is closed
</script>

<Dialog
  bind:open
  aria-labelledby="title"
  aria-describedby="content"
>
  <Title id="display-tags-title">Metadata for {displayName}</Title>
  <Content id="display-tags-content">
    <List>
      {#each taxonomyTags as tag}
        <TagItem tag={tag}/>
      {/each}
    </List>
  </Content>
  <div class="dialog-actions">
    <Button on:click={close}>
      <Label>Close</Label>
    </Button>
  </div>
</Dialog>

<style>
  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
  }
</style>
