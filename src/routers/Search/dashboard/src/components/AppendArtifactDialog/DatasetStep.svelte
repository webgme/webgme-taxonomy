<!--
  @component
  The "name" and "dataset files" step of the append artifact dialog.
-->
<script lang="ts">
  import { fade } from "svelte/transition";
  import type { UploadPromise } from "../../Storage";

  import Textfield from "@smui/textfield";
  import UploadFile from "./UploadFile.svelte";
  import Dropzone from "svelte-file-dropzone";

  /** Event type for dropping files onto a dropzone. */
  type DropEvent = CustomEvent<{ acceptedFiles: File[] }>;

  export let name = "";
  export let contentType: string = "";
  export let isReference = false;
  /** The files to append as an artifact to this artifact set. */
  export let files: File[] = [];
  /** The upload progress promises for each of the file uploads. */
  export let uploads: UploadPromise[] | null = null;

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

<Textfield label="Name" bind:value={name} disabled={!!uploads} />
<p>{contentType} file(s):</p>
<ul class="upload-files">
  {#each files as file, index (file.name + "-" + file.lastModified)}
    {@const upload = uploads?.[index]}
    <li transition:fade={{ duration: 200 }}>
      <UploadFile {file} {upload} on:remove={() => removeFileAt(index)} />
    </li>
  {/each}
</ul>

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
