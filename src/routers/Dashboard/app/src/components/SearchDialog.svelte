
<!--
  @component
  A dialog for searching (currently only based on uri)
-->
<script lang="ts">
  import { createEventDispatcher} from "svelte";
  import Dialog, { Content, Title } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import type { API } from "../data";
  // FIXME: Current build fails when trying to add this component
  // import Textfield from "@smui/textfield";

  const dispatch = createEventDispatcher();

  export let api: API;
  export let open = true;
  let searchStr = '';

  function onClose() {
    dispatch('close');
  }

  async function onSearch() {
    try {
      const res = await api.getDashboardUrlFromUri(searchStr);
      window.location.href = `${res.host}${res.url}`;
    } catch (err: any) {
      alert(err.message);
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
    <!-- <Textfield variant="outlined" bind:value={searchStr} label="Enter or paste URI ...">
      <Icon class="material-icons" slot="leadingIcon">search</Icon>
    </Textfield> -->
    <input
      class="search-input"
      type="text"
      placeholder="Enter or paste URI ..."
      bind:value={searchStr}
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
      height: 24px;
      border-radius: 5px;
      border-width: 1px;
      padding: 8px;
      width: 85%;
    }
</style>
