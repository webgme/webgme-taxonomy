<script lang="ts">
  import { getContext } from "svelte";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import SearchDialog from "./SearchDialog.svelte";
  import type DashboardAPI from '../DashboardAPI';

  export let title: string | null = null;
  export let taxonomyInfo: string | null = null;

  const api: DashboardAPI = getContext("dashboard-api");

  let canPopulateGraph = false;

  api.getDeploymentConfig()
    .then((config) => {
      canPopulateGraph = config.graphDbEnabled && config.isAdmin;
    })
    .catch(console.error);

  let showSearchDialog = false;
  function openSearchDialog() {
    showSearchDialog = true;
  }

  async function graphDbClicked() {
    const data = await api.populateGraphDb();

    console.log(data);
  }
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
      {#if canPopulateGraph}
      <IconButton
        class="material-icons"
        aria-label="GraphDB"
        title="Populate GraphDB"
        ripple={false}
        on:click={graphDbClicked}>archive
      </IconButton>
      {/if}
    </Section>
  </Row>
</TopAppBar>
