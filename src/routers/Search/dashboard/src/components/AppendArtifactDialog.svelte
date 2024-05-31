<!--
  @component
  A dialog for uploading content to a repository.
-->
<script lang="ts">
  import TagSelector from "./TagSelector.svelte";
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Textfield from "@smui/textfield";
  import Dropzone from "svelte-file-dropzone";
  import Button, { Label } from "@smui/button";
  import LinearProgress from "@smui/linear-progress";
  import IconButton from "@smui/icon-button";

  import { createEventDispatcher, getContext } from "svelte";
  import { fade } from "svelte/transition";
  import type { Unsubscriber } from "svelte/store";
  import TagFormatter from "../Formatter";
  import type { Artifact, PopulatedRepo, default as Storage, UploadPromise } from "../Storage";
  import type { default as ContentType } from "../ContentType";
    import type { ConfirmData } from "../ConfirmData";

  /** Event type for dropping files onto a dropzone. */
  type DropEvent = CustomEvent<{ acceptedFiles: File[] }>;

  const dispatch = createEventDispatcher();
  const storage: Storage = getContext("storage");
  const formatter = new TagFormatter();

  /** The repo to upload a new artifact to. Null to hide dialog.*/
  export let repo: PopulatedRepo | null = null;
  /** The content type name for the artifact set to append to. */
  export let contentType: ContentType;
  /** The content ID to update. If null, then append instead */
  export let content: Artifact | null = null;

  /** The files to append as an artifact to this artifact set. */
  let files: File[] = [];
  let metadata: any;
  let open = false;
  let uploading: Promise<UploadPromise[]> | null = null;
  let selectTagDisabled = false;
  let isReference = false;
  let newName = '';
  let title = '';

  $: isReference = !!metadata?.tags?.Base?.Location;
  $: setOpen(repo != null);
  $: progresses = uploading ? Array(files.length).fill(0) : [];
  $: selectTagDisabled = !!uploading;

  $: setContext(repo, content);

  function setContext(repo: PopulatedRepo, content: Artifact | null) {
    const repoName = repo?.displayName ?? "";
    newName = content?.displayName ?? repoName;
    title = isContentUpdate() ? `Update ${content.displayName}`: `Append data to ${repoName}`;
  }

  function isContentUpdate(): boolean {
    return !!content;
  }

  function setOpen(value: boolean) {
    if (value !== open) open = value;
  }

  function onFileDrop(event: DropEvent) {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length) {
      files = files.concat(acceptedFiles);
    }
    // TODO: handle rejections
  }


  async function onUploadClicked() {
    if (!files.length && !isReference) {
      const confirmData: ConfirmData = {
        title: 'Upload without files?',
        prompt: 'Are you sure you want to upload without attaching any files?',
        action: uploadContent,
      };

      if (isContentUpdate()) {
        confirmData.title = 'Reuse existing files?';
        confirmData.prompt = 'Are you sure you only want to update the metadata?';
      }
      return dispatch('confirm', confirmData);
    } else {
      uploadContent();
    }
  }

  async function uploadContent() {
    const uploadMetadata = metadata ?? {};
    uploadMetadata.displayName = newName;
    dispatch("upload");
    let unsubscribers: Unsubscriber[] = [];
    try {
      uploading = isContentUpdate() ? 
        storage.updateArtifact(repo.id, content.id, uploadMetadata, files):
        storage.appendArtifact(repo, uploadMetadata, files);
      const uploads = await uploading;
      unsubscribers = uploads.map((upload, index) => {
        return upload.subscribe((progress) => (progresses[index] = progress));
      });
      await Promise.allSettled(uploads);
      dispatch("complete");
    } catch (err) {
      console.log(err);
      dispatchError(`Unable to upload: ${err.message}`);
    } finally {
      unsubscribers.forEach((unsubscriber) => unsubscriber());
      uploading = null;
      close();
    }
  }

  function removeFileAt(index: number) {
    files.splice(index, 1);
    files = files;
  }

  function close() {
    open = false;
  }

  function dispatchError(error: string) {
    return dispatch("error", { error });
  }

  function closeHandler(_e: CustomEvent<{ action: string }>) {
    if (repo != null) repo = null;
    files = [];
  }
</script>

<Dialog
  bind:open
  scrimClickAction={uploading ? "" : null}
  escapeKeyAction={uploading ? "" : null}
  aria-labelledby="title"
  aria-describedby="content"
  on:SMUIDialog:closed={closeHandler}
>
  <Title id="upload-artifact-title">{title}</Title>
  <Content id="upload-artifact-content">
    <Textfield label="Name" bind:value={newName} disabled={!!uploading} />
    <TagSelector 
      bind:metadata={metadata}
      bind:contentType
      bind:disabled={selectTagDisabled}
    />

    <p>{contentType.name} file(s):</p>
    <ul class="upload-files">
      {#each files as file, index (file.name + "-" + file.lastModified)}
        <li transition:fade={{ duration: 200 }}>
          <div class="upload-file">
            <span class="upload-file-name">{file.name}</span>
            {#if !uploading}
              <IconButton
                class="material-icons"
                size="button"
                on:click={() => removeFileAt(index)}>close</IconButton
              >
            {/if}
          </div>
          {#if !!uploading}
            {#await uploading}
              <LinearProgress indeterminate />
            {:then uploads}
              {@const upload = uploads[index]}
              {@const progress = progresses[index]}
              {#await upload}
                <LinearProgress {progress} />
              {:then success}
                {#if success}
                  <span class="upload-result success">Done</span>
                {:else}
                  <span class="upload-result  warning">Cancelled</span>
                {/if}
              {:catch error}
                <span class="upload-result  error">Failed</span>
              {/await}
            {:catch error}
              <span style="upload-result  error">Failed</span>
            {/await}
          {/if}
        </li>
      {/each}
    </ul>

    {#if isReference}
      <!-- TODO: show the display name of the ref? -->
      <Dropzone disabled multiple={true}>
        <p>Tags reference existing data</p>
      </Dropzone>
    {:else if !uploading}
      <Dropzone on:drop={onFileDrop} multiple={true}>
        <p>Select dataset to upload.</p>
      </Dropzone>
    {:else}
      <Dropzone disabled multiple={true}>
        <p>Select dataset to upload.</p>
      </Dropzone>
    {/if}
  </Content>
  <div class="dialog-actions">
    <Button disabled={uploading} on:click={() => close()}>
      <Label>Cancel</Label>
    </Button>
    <Button disabled={uploading} on:click={() => onUploadClicked()}>
      <Label>Upload</Label>
    </Button>
  </div>
</Dialog>

<style>
  .upload-file {
    display: inline-flex;
    width: 100%;
    align-items: center;
  }

  .upload-file .upload-file-name {
    flex: 1;
  }

  .upload-file :global(button) {
    margin-bottom: 0;
  }

  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
  }

  .upload-result {
    font-size: 0.8em;
    font-style: italic;
  }

  .success {
    color: var(--mdc-theme-success);
  }

  .warning {
    color: var(--mdc-theme-warning);
  }

  .error {
    color: var(--mdc-theme-error);
  }
</style>
