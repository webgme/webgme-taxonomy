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
  export let disabled = false;
</script>

<Wrapper>
  <label class="file-button" class:disabled={disabled}>
    <IconButton tag="div" class="material-icons"><slot>upload_file</slot></IconButton>
    <input type="file" {accept} {multiple} {disabled} bind:files />
  </label>
  {#if tooltip != null}
    <Tooltip yPos="above">{tooltip}</Tooltip>
  {/if}
</Wrapper>

<style lang="scss">
  .file-button {
    &.disabled :global(.mdc-icon-button) {
      cursor: default;
      pointer-events: none;
      color: var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38));

      @media (screen) and (prefers-color-scheme: dark) {
        & {
          color: var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5));
        }
      }
    }

    input {
      display: none;
    }
  }
</style>