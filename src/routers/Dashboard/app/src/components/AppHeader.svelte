<script lang="ts">
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import SearchDialog from "./SearchDialog.svelte";

  export let title: string | null = null;
  export let taxonomyInfo: string | null = null;

  function openSearchDialog() {
    showSearchDialog = true;
  }

  let showSearchDialog = false;
</script>

<SearchDialog
  open={showSearchDialog}
  on:close={() => {
    showSearchDialog = false;
  }}
/>

<TopAppBar variant="static">
  <Row>
    <Section>
      {#if title}
        <Title title={taxonomyInfo}>{title}</Title>
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
