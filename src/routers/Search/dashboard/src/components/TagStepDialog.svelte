<!--
  @component
  A dialog for tagging and uploading content to a repository.
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import type { default as Storage } from "../Storage";
  import { deepMerge } from "../Utils";

  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Button, { Label, Icon } from "@smui/button";
  import Paper, { Subtitle, Content as PContent } from "@smui/paper";
  import FileButton from "./FileButton.svelte";
  import SchemaForm from "./SchemaForm.svelte";

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
  let tagsFiles: FileList | null = null;

  $: mergeTagsFile(tagsFiles?.[0]);

  function submit(event: CustomEvent) {
    const performDefault = dispatch('submit', async function(busy: () => Promise<boolean | void>) {
      working = true;
      const done = await busy() ?? true;
      if (done) {
        open = false;
      }
      else {
        working = false;
      }
    });
    if (performDefault && !working) {
      open &&= false;
    }
  }

  async function mergeTagsFile(file: File | undefined) {
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        const json = JSON.parse(reader.result as string);
        tags = deepMerge(tags, json.tags ?? json);
      };
      reader.readAsText(file);
    }
  }

  function closeHandler(event: CustomEvent<{ action: string }>) {
    tagging ||= true;
    working &&= false;
    dispatch('close', event);
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
  <div class:step-tags={tagging} class:step-next={!tagging}>
    <Content id={`${id}-content`}>

      {#if tagging}
        <Paper variant="unelevated" class="tags-step">
          <Subtitle>
            <span>Select Tags</span>
            <FileButton
              accept="application/json"
              tooltip="Populate from tags file"
              disabled={working}
              bind:files={tagsFiles}
            />
          </Subtitle>
          <Content>
            <SchemaForm bind:data={tags} />
          </Content>
        </Paper>

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
        <Button default disabled={working} action={null} on:click={submit}>
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

  :global(.jsonschema-form > .smui-paper--raised) {
    box-shadow: none !important;
    padding: 0 !important;

    > :global(.smui-paper__title) {
      display: none;
    }
  }

  :global(.tags-step.smui-paper) {
    padding: 0;
  }

  :global(.tags-step .smui-paper__subtitle) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :global(.tags-step .smui-accordion__header__title--with-description) {
    max-width: unset !important;
  }
</style>