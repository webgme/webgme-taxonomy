<script lang="ts">
  import type DashboardAPI from "../DashboardAPI";
  import { getContext } from 'svelte';
  import IconButton from "@smui/icon-button";

  export let data: string | null = null;
  export let format: string | null = null;
  const api: DashboardAPI = getContext("dashboard-api");

  async function openUri(event) {
    event.preventDefault();
    event.stopPropagation();
    const { url } = await api.getDashboardUrlFromUri(data);
    window.open(url);
  }
</script>

{#if (format == "uri") && data}
<IconButton
  class="material-icons"
  aria-label="Open content"
  title="Open content"
  on:click={openUri}
>
open_in_new
</IconButton>
{/if}
