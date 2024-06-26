<!--
  @component
  A dialog for tagging and uploading content to a repository.
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import type { default as Storage, Artifact, PopulatedRepo, UploadPromise } from "../../Storage";
  import type { default as ContentType } from "../../ContentType";

  import TagStepDialog from "../TagStepDialog/index.svelte";
  import DatasetStep from "./DatasetStep.svelte";

  /** The repo to upload a new artifact to. Null to hide dialog.*/
  export let repo: PopulatedRepo | null = null;
  /** The content type name for the artifact set to append to. */
  export let contentType: ContentType;
  /** The content ID to update. If null, then append instead */
  export let content: Artifact | null = null;

  const dispatch = createEventDispatcher();
  const storage: Storage = getContext("storage");

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
  $: updateIsReference(tags);

  function setOpen(value: boolean) {
    if (value !== open) open = value;
  }

  function setNameAndTitle(repo: PopulatedRepo, content: Artifact | null) {
    const repoName = repo?.displayName ?? "";
    displayName = content?.displayName ?? repoName;
    title = (content != null) ? `Update ${content.displayName}`: `Append data to ${repoName}`;
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

  function confirmUpload() {
    if (!files.length && !isReference) {
      const [title, prompt] = (content == null) ? 
        [
          'Upload without files?',
          'Are you sure you want to upload without attaching any files?'
        ] : [
          'Reuse existing files?',
          'Are you sure you only want to update the metadata?'
        ];

      return dispatch('confirm', { title, prompt, action: upload });
    } else {
      upload();
    }
  }

  async function upload() {
    const metadata = { tags, displayName, taxonomyVersion: repo?.taxonomyVersion };
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
</script>


<TagStepDialog
  submitLabel="Upload"
  submitIcon="upload"
  {title} {open}
  bind:tags={tags}
  on:submit={confirmUpload}
  on:close={closeHandler}
  let:working={working}
>
  <DatasetStep
    contentType={contentType.name}
    bind:name={displayName}
    bind:files={files}
    bind:uploads={uploads}
    {isReference}
  />
</TagStepDialog>


<style lang="scss">
  :global(#upload-artifact-actions) {
    justify-content: space-between;
  }
</style>