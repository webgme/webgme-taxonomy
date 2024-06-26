<!--
  @component
  A dialog for tagging and uploading content to a repository.
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import type { default as Storage } from "../../Storage";
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Button, { Label, Icon } from "@smui/button";
  import TagsStep from "./TagsStep.svelte";

  export let open = false;
  export let title = "";
  export let tags: any;
  export let submitLabel = "Submit";
  export let submitIcon = "check";

  const dispatch = createEventDispatcher();
  const storage: Storage = getContext("storage");
  // generate a unique id attr, since there can be multiple instances of this component
  const id = 'tag-step-dialog-' + Math.random().toString(36).substring(2);

  let tagging = true;
  let working = false

  // function setOpen(value: boolean) {
  //   if (value !== open) open = value;
  // }

  function submit() {
    dispatch('submit');
  }

  function closeHandler(event: CustomEvent<{ action: string }>) {
    tagging ||= true;
    dispatch('close', event);
    // if (repo != null) repo = null;
    // files = [];
  }
</script>
  
<Dialog
  bind:open
  scrimClickAction={working ? "" : null}
  escapeKeyAction={working ? "" : null}
  aria-labelledby={`${id}-title`}
  aria-describedby={`${id}-content`}
  on:SMUIDialog:closed={closeHandler}
  {id}
  class="tag-step-dialog"
>
  <Title id={`${id}-title`}>{title}</Title>
  <div class:step-tags={tagging} class:step-dataset={!tagging}>
    <Content id={`${id}-content`}>

      {#if tagging}
        <TagsStep disabled={working} bind:data={tags}></TagsStep>
      {:else}
        <slot {working} />
      {/if}

    </Content>
  </div>

  <Actions class="tag-step-dialog-actions">
    <div class="actions-group">
      {#if !tagging}
        <Button disabled={working} action={null} on:click={(e) => { tagging = true }}>
          <Icon class="material-icons">arrow_back</Icon>
          <Label>Back</Label>
        </Button>
      {/if}
    </div>
    
    <div class="actions-group">
      <Button disabled={working}>
        <Label>Cancel</Label>
      </Button>
      {#if tagging}
        <Button default disabled={working} action={null} on:click={(e) => { tagging = false }}>
          <Label>Next</Label>
          <Icon class="material-icons">arrow_forward</Icon>
        </Button>
      {:else}
        <Button default  disabled={working} action={null} on:click={submit}>
          <Label>{ submitLabel }</Label>
          <Icon class="material-icons">{ submitIcon }</Icon>
        </Button>
      {/if}
    </div>
  </Actions>
</Dialog>

<style lang="scss">
  :global(.tag-step-dialog-actions) {
    justify-content: space-between;
  }
</style>