<!--
  @component
  A dialog for appending artifacts to a set.
-->
<script lang="ts">
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Textfield from "@smui/textfield";
  import Dropzone from "svelte-file-dropzone";
  import Button, { Label } from "@smui/button";
  import LinearProgress from "@smui/linear-progress";
  import IconButton from "@smui/icon-button";

  import { createEventDispatcher, getContext } from "svelte";
  import { fade } from "svelte/transition";
  import type { Unsubscriber } from "svelte/store";
  import { isObject, readFile } from "../Utils";
  import TagFormatter, { FormatError } from "../Formatter";
  import type { default as Storage, UploadPromise } from "../Storage";
  import type { default as ContentType } from "../ContentType";

  /** Event type for dropping files onto a dropzone. */
  type DropEvent = CustomEvent<{ acceptedFiles: File[] }>;

  const dispatch = createEventDispatcher();
  const storage: Storage = getContext("storage");
  const formatter = new TagFormatter();

  /** The artifact set to append a new artifact to. Null to hide dialog.*/
  export let set: { displayName: string; tags: object } | null = null;
  /** The content type name for the artifact set to append to. */
  export let contentType: ContentType;

  /** The files to append as an artifact to this artifact set. */
  let files: File[] = [];
  let metadata: any;
  let open = false;
  let uploading: Promise<UploadPromise[]> | null = null;

  $: displayName = set?.displayName ?? "";
  $: appendName = displayName;
  $: setOpen(set != null);
  $: progresses = uploading ? Array(files.length).fill(0) : [];

  function setOpen(value: boolean) {
    if (value !== open) open = value;
  }

  function onAppendFileDrop(event: DropEvent) {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length) {
      files = files.concat(acceptedFiles);
    }
    // TODO: handle rejections
  }

  async function onAppendTagsFileDrop(event: DropEvent) {
    const [tagsFile] = event.detail.acceptedFiles;
    if (tagsFile) {
      metadata = JSON.parse(await readFile(tagsFile));
    }
  }

  async function onAppendClicked() {
    if (!files.length) {
      dispatchError(`${contentType.name} file required.`);
    }

    metadata.displayName = appendName;
    dispatch("upload");
    let unsubscribers: Unsubscriber[] = [];
    try {
      uploading = storage.appendArtifact(set, metadata, files);
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

  function getTagsDisplayNames(tags, prefix = null): string[] {
    const names = Object.entries(tags).flatMap(([name, value]) => {
      if (isObject(value)) {
        const isOption = Object.keys(value).length === 0;  // for an enum/set/list/etc
        if (isOption) {
          return [name];
        } else {
          return getTagsDisplayNames(value, name);
        }
      } else {
          return [`${name}: ${value}`];
      }
    });

    return names.map(name => {
      if (prefix) {
        return prefix + '.' + name;
      } else {
        return name;
      }
    });
  }

  function closeHandler(e: CustomEvent<{ action: string }>) {
    if (set != null) set = null;
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
  <Title id="append-artifact-title">Append data to {displayName}</Title>
  <Content id="append-artifact-content">
    <Textfield label="Name" bind:value={appendName} disabled={!!uploading} />
    <p>{contentType.name} file(s):</p>

    <ul class="append-files">
      {#each files as file, index (file.name + "-" + file.lastModified)}
        <li transition:fade={{ duration: 200 }}>
          <div class="append-file">
            <span class="append-file-name">{file.name}</span>
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

    {#if !uploading}
      <Dropzone on:drop={onAppendFileDrop} multiple={true}>
        <p>Select dataset to upload.</p>
      </Dropzone>
    {:else}
      <Dropzone disabled multiple={true}>
        <p>Select dataset to upload.</p>
      </Dropzone>
    {/if}

    <p>
      Taxonomy Terms <span style="font-style:italic">(optional)</span>:<br />
      {metadata ? getTagsDisplayNames(metadata.tags) : ""}
      <!-- TODO: how to show these? -->
    </p>

    {#if !uploading}
      <Dropzone on:drop={onAppendTagsFileDrop} accept=".json">
        <p>Select tags file for dataset.</p>
      </Dropzone>
    {:else}
      <Dropzone disabled accept=".json">
        <p>Select tags file for dataset.</p>
      </Dropzone>
    {/if}

    <a
      target="_blank"
      href={window.location.href
        .replace("/Search/", "/TagCreator/") // FIXME: use the correct content type
        .replace(
          /[^\/]*\/static\//,
          `${encodeURIComponent(contentType.nodePath)}/static/`
        )}>Click to select tags for your dataset.</a
    >
  </Content>
  <div class="dialog-actions">
    <Button disabled={uploading} on:click={() => close()}>
      <Label>Cancel</Label>
    </Button>
    <Button disabled={uploading} on:click={() => onAppendClicked()}>
      <Label>Upload</Label>
    </Button>
  </div>
</Dialog>

<style>
  .append-file {
    display: inline-flex;
    width: 100%;
    align-items: center;
  }

  .append-file .append-file-name {
    flex: 1;
  }

  .append-file :global(button) {
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
