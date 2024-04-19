<script lang="ts">
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import SearchDialog from "./SearchDialog.svelte";
  import type { API } from "../data";

  export let title: string | null = null;
  export let api: API;

  function openSearchDialog() {
    console.log('openSearchDialog', showSearchDialog);
    showSearchDialog = true;
  }

  let showSearchDialog = false;
</script>

<SearchDialog
  {api}
  open={showSearchDialog}
  on:close={() => {
    showSearchDialog = false;
    console.log('on:close', showSearchDialog);
  }}
/>

<TopAppBar variant="static">
  <Row>
    <Section>
      {#if title}
        <Title>{title}</Title>
      {/if}
    </Section>
    <Section align="end" toolbar>
      <IconButton
        class="material-icons"
        aria-label="Search .."
        title="Search .."
        ripple={false}
        on:click={() => {openSearchDialog()}}>search
      </IconButton>
    </Section>
  </Row>
</TopAppBar>
