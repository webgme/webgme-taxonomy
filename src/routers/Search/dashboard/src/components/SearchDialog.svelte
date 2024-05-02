
<!--
  @component
  A dialog for searching (currently only based on uri)
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import Dialog, { Content, Title } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import type DashboardAPI from '../DashboardAPI';

  const dispatch = createEventDispatcher();

  export let open = true;
  let searchStr = '';
  const api: DashboardAPI = getContext("dashboard-api");

  function onClose() {
    dispatch('close');
  }

  async function onSearch() {
    try {
      const res = await api.getDashboardUrlFromUri(searchStr);
      window.location.href = `${res.host}${res.url}`;
    } catch (err: any) {
      if (err.statusCode === 400) {
        alert('Invalid URI provided!');
      } else {
        alert(err.message);
      }
    }
  }
  $: if (!open) {
    searchStr = '';
  }
</script>


<Dialog
  open={open}
  surface$style="width: 800px; max-width: calc(100vw - 32px);"
  on:SMUIDialog:closed={() => {
    if (open) {
      onClose();
    }
  }}
>
  <Title>Search</Title>
  <Content>
    <input
      class="search-input"
      type="text"
      placeholder="Enter or paste URI ..."
      bind:value={searchStr}
      on:keydown={(e) => {
        if (e.key === "Enter") {
          onSearch();
        }}}
    />
    <Button on:click={onSearch}>
      <Label>Go</Label>
    </Button>
  </Content>
  <div class="search-dialog-actions">
    <Button on:click={onClose}>
      <Label>Cancel</Label>
    </Button>
  </div>
</Dialog>

<style>
  .search-dialog-actions {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
  }

  .search-input {
      box-sizing: unset;
      font-size: 12px;
      height: 24px;
      border-radius: 5px;
      border: 1px solid black;
      padding: 8px;
      width: 85%;
    }
</style>
