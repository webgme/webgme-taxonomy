<!--
  @component
  A dialog for tagging and uploading content to a repository.
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import type { default as Storage } from "../Storage";
  import { deepMerge, isBoolean } from "../Utils";
  import { ErrorObject } from "ajv";

  import type { toast as Toast } from "@zerodevx/svelte-toast";
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Button, { Label, Icon } from "@smui/button";
  import IconButton from "@smui/icon-button";
  import Tooltip, { Wrapper } from "@smui/tooltip"
  import Paper, { Subtitle, Content as PContent } from "@smui/paper";
  import Snackbar, { Actions as SBActions, Label as SBLabel } from "@smui/snackbar";
  import FileButton from "./FileButton.svelte";
  import SchemaForm from "./SchemaForm.svelte";

  const IconButtonExt: (typeof IconButton) &  (typeof Button) = <any>IconButton;

  export let open = false;
  export let nodePath: string | undefined = undefined;
  export let title = "";
  export let tags: any;
  export let submitLabel = "Submit";
  export let submitIcon = "check";
  export let validate = true;

  const dispatch = createEventDispatcher();
  const storage: Storage = getContext("storage");
  const toast = getContext<typeof Toast>("toast");
  // generate a unique id attr, since there can be multiple instances of this component
  const id = 'tag-step-dialog-' + Math.random().toString(36).substring(2);

  let schemaForm: SchemaForm;
  let snackbar: Snackbar;
  let tagging = true;
  let working = false
  let tagsFiles: FileList | null = null;
  let validationErrors: ErrorObject[] | null = null;
  let validationProceedFn: () => void = () => {};

  $: mergeTagsFile(tagsFiles?.[0]);

  function checkValidation(fn: () => void) {
    const validation = validate && schemaForm.validate();
    if (!isBoolean(validation)) {
      console.log("Validation errors:", validation);
      working ||= true;
      validationProceedFn = () => {
        fn();
        working &&= false;
      };
      validationErrors = validation;
      snackbar.open();
    }
    else {
      fn();
    }

  }

  function next() {
    tagging = false;
  }

  function submit() {
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

  function download() {
    try {
      const filename = `${title}${title && " - "}tags`;
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

  function clearTags() {
    tags = {};
  }

  function closeHandler(event: CustomEvent<{ action: string }>) {
    snackbar.close();
    tagging ||= true;
    working &&= false;
    dispatch('close', event);
  }
</script>
  
<Dialog
  fullscreen
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
            <Wrapper>
              <IconButtonExt
                class="material-icons"
                on:click={clearTags}
                disabled={working}
                type="button"
                tabindex={-1}
                aria-label="Clear all tags"
              >backspace</IconButtonExt>
              <Tooltip yPos="above">Clear all tags</Tooltip>
            </Wrapper>
          </Subtitle>
          <Content>
            <SchemaForm bind:this={schemaForm} bind:data={tags} {nodePath} />
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
          <Icon class="material-icons" aria-hidden="true">arrow_back</Icon>
          <Label>Back</Label>
        </Button>
      {/if}
    </div>
    
    <div class="actions-group">
      <Button disabled={working}>
        <Label>Cancel</Label>
      </Button>
      {#if tagging}
        <Button disabled={working} action={null} on:click={() => checkValidation(download)}>
          <Label>Download</Label>
          <Icon class="material-icons" aria-hidden="true">download</Icon>
        </Button>
        <Button autofocus disabled={working} action={null} on:click={() => checkValidation(next)} aria-labelledby={`${id}-next`}>
          <Label id={`${id}-next`}>Next</Label>
          <Icon class="material-icons" aria-hidden="true">arrow_forward</Icon>
        </Button>
      {:else}
        <Button autofocus disabled={working} action={null} on:click={submit}>
          <Label>{ submitLabel }</Label>
          <Icon class="material-icons" aria-hidden="true">{ submitIcon }</Icon>
        </Button>
      {/if}
    </div>
  </Actions>
</Dialog>

<Snackbar class="error" bind:this={snackbar} timeoutMs={-1}>
  <SBLabel>
    <p>Tag validation failed:</p>
    {#if validationErrors}
      <ul>
        {#each validationErrors as error}
          <li>{error.message}</li>
        {/each}
      </ul>
    {/if}
  </SBLabel>
  <SBActions>
    <Button on:click={() => {snackbar.close(); working = false;}}>Cancel</Button>
    <Button on:click={validationProceedFn}>Proceed</Button>
  </SBActions>
</Snackbar>

<style lang="scss">
  :global(.tag-step-dialog.mdc-dialog--fullscreen .mdc-dialog__title) {
    padding: 0 24px;
  }

  :global(.tag-step-dialog-actions.mdc-dialog__actions) {
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

    > span {
      flex: 1;
    }
  }

  :global(.tags-step .smui-accordion__header__title--with-description) {
    max-width: unset !important;
  }
</style>