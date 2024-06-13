<!--
  @component
  A simple button that prompts the user to select file(s).
-->
<script lang="ts">
  import IconButton from "@smui/icon-button";
  import Tooltip, { Wrapper } from "@smui/tooltip"

  export let accept: string | undefined = undefined;
  export let multiple = false;
  export let tooltip: string | null = null;
  export let files: FileList | null = null;
</script>

<Wrapper>
  <label class="file-button">
    <IconButton tag="div" class="material-icons"><slot>upload_file</slot></IconButton>
    <input type="file" {accept} {multiple} bind:files />
  </label>
  {#if tooltip != null}
    <Tooltip yPos="above">{tooltip}</Tooltip>
  {/if}
</Wrapper>

<style lang="scss">
  .file-button input {
    display: none;
  }
</style>