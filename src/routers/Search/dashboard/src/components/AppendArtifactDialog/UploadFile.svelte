<!--
  @component
  A component for "managing" upload of a file.
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { UploadPromise } from "../../Storage";

  import IconButton from "@smui/icon-button";
  import LinearProgress from "@smui/linear-progress";

  export let file: File;
  export let upload: UploadPromise | undefined = undefined;

  const dispatch = createEventDispatcher();
  let progress: number | null = null;

  $: trackProgress(upload);

  function remove() {
    dispatch('remove', upload);
  }

  async function trackProgress(upload: UploadPromise | null) {
    if (upload == null) {
      progress = null;
    } else {
      let unsubscribe: (() => void) | null = null;
      try {
        unsubscribe = upload.subscribe(p => progress = p);
        await upload;
      }
      catch (err) {
        console.error(err);
      }
      finally {
        unsubscribe?.();
        dispatch('done', upload);
      }
    }
  }
</script>

<div class="upload-file">
  <span class="upload-file-name">{file.name}</span>
  {#if !upload}
    <IconButton class="material-icons" size="button" on:click={remove}>close</IconButton>
  {/if}
</div>
{#if upload != null}
  {#if progress == null}
    <LinearProgress indeterminate />
  {:else}
    {#await upload}
      <LinearProgress {progress} />
    {:then success}
      {#if success}
        <span class="upload-result success">Done</span>
      {:else}
        <span class="upload-result warning">Cancelled</span>
      {/if}
    {:catch error}
      <span style="upload-result error">Failed</span>
    {/await}
  {/if}
{/if}