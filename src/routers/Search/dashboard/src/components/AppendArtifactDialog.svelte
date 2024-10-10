<!--
  @component
  A dialog for tagging and uploading content to a repository.
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { fade } from "svelte/transition";
  import type { default as Storage, Artifact, PopulatedRepo, UploadPromise } from "../Storage";
  import type { default as ContentType } from "../ContentType";
  import TagFormatter from "../Formatter";

  import TagStepDialog from "./TagStepDialog.svelte";
  import Paper, { Subtitle, Content } from "@smui/paper";
  import Textfield from "@smui/textfield";
  import UploadFile from "./UploadFile.svelte";
  import Dropzone from "svelte-file-dropzone";

  /** Event type for dropping files onto a dropzone. */
  type DropEvent = CustomEvent<{ acceptedFiles: File[] }>;

  /** The repo to upload a new artifact to. Null to hide dialog.*/
  export let repo: PopulatedRepo | null = null;
  /** The content type name for the artifact set to append to. */
  export let contentType: ContentType;
  /** The content ID to update. If null, then append instead */
  export let content: Artifact | null = null;

  const dispatch = createEventDispatcher();
  const storage: Storage = getContext("storage");
  const configuration: Promise<any> = getContext<Promise<any>>("configuration");

  let open = false;
  let title = "";
  let displayName = "";
  let tags: any;
  let uploads: UploadPromise[] | null = null;
  let uploading = false
  let isReference = false;
  /** The files to append as an artifact to this artifact set. */
  let files: File[] = [];

  $: updateUploading(uploads);
  $: setOpen(repo != null);
  $: setNameAndTitle(repo, content);
  $: setTags(repo, content);
  $: updateIsReference(tags);

  function setOpen(value: boolean) {
    if (value !== open) open = value;
  }

  function setNameAndTitle(repo: PopulatedRepo | null, content: Artifact | null) {
    const repoName = repo?.displayName ?? "";
    displayName = content?.displayName ?? repoName;
    title = (content != null) ? `Update ${content.displayName}`: `Append data to ${repoName}`;
  }

  async function setTags(repo: PopulatedRepo | null, content: Artifact | null) {
    const inhumanTags = content?.tags ?? repo?.tags;
    tags = (inhumanTags == null) ? {} :
      await (new TagFormatter()).toHumanFormat(inhumanTags);
  }

  function updateUploading(uplods: UploadPromise[] | null) {
    const isUploading = !!uploads?.length;
    if (uploading != isUploading) {
      uploading = isUploading;
    }
  }

  function updateIsReference(tags: any) {
    const updatedIsReference = !!tags?.Base?.Location;
    if (updatedIsReference != isReference) {
      isReference = updatedIsReference;
    }
  }

  async function confirmUpload() {
    if (!files.length && !isReference) {
      const [title, prompt] = (content == null) ? 
        [
          'Upload without files?',
          'Are you sure you want to upload without attaching any files?'
        ] : [
          'Reuse existing files?',
          'Are you sure you only want to update the metadata?'
        ];

      dispatch('confirm', { title, prompt, action: upload });
      return false;
    } else {
      await upload();
    }
  }

  async function upload() {
    const taxonomyVersion = (await configuration)?.project;
    const metadata = { tags, displayName, taxonomyVersion };
    dispatch("upload");
    try {
      uploads = (content != null) ? 
        await storage.updateArtifact(repo.id, content.id, metadata, files):
        await storage.appendArtifact(repo, metadata, files);
      await Promise.allSettled(uploads);
      dispatch("complete");
    } catch (err) {
      console.error(err);
      dispatchError(`Unable to upload: ${err.message}`);
    } finally {
      uploads = null;
      open = false;
    }
  }

  function dispatchError(error: string) {
    return dispatch("error", { error });
  }

  function closeHandler(_e: CustomEvent<{ action: string }>) {
    if (repo != null) repo = null;
    if (files.length) files = [];
  }

  function removeFileAt(index: number) {
    files = (files.splice(index, 1), files);
    if (uploads != null) {
      uploads[index]?.abort();
      uploads = (uploads.splice(index, 1), uploads);
    }
  }

  function onFileDrop(event: DropEvent) {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length) {
      files = files.concat(acceptedFiles);
    }
    // TODO: handle rejections
  }
</script>


<TagStepDialog
  submitLabel="Upload"
  submitIcon="upload"
  {title} {open}
  nodePath={contentType.nodePath}
  bind:tags
  on:submit={({ detail }) => detail(confirmUpload)}
  on:close={closeHandler}
  let:working={working}
>
  <Paper variant="unelevated">
    <Subtitle>Name and Select Content</Subtitle>
    <Content>
      <Textfield label="Name" bind:value={displayName} disabled={!!uploads} />
      <p>{contentType.name} file(s):</p>
      <ul class="upload-files">
        {#each files as file, index (file.name + "-" + file.lastModified)}
          {@const upload = uploads?.[index]}
          <li transition:fade={{ duration: 200 }}>
            <UploadFile {file} {upload} on:remove={() => removeFileAt(index)} />
          </li>
        {/each}
      </ul>
    </Content>
  </Paper>

  <Dropzone
    disabled={isReference || !!uploads } 
    multiple
    on:drop={onFileDrop}
  >
    {#if isReference}
      <p>Tags reference existing data</p>
    {:else}
      <p>Select dataset to upload.</p>
    {/if}
  </Dropzone>
</TagStepDialog>


<style lang="scss">
  :global(.tags-step.smui-paper) {
    padding: 0;
  }
</style>