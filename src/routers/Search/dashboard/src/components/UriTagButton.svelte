<script lang="ts">
  import Fab, { Icon } from '@smui/fab';

  export let data: string | null = null;
  export let format: string | null = null;

  function open() {
    window.open(data ?? "");
  }
</script>

{#if (format == "uri") && data}
  <Fab color="primary" mini on:click={open} action={null}>
    <Icon class="material-icons">open_in_new</Icon>
  </Fab>
{/if}
