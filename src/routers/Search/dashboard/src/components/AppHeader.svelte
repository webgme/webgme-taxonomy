<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte';
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";

  import type DashboardAPI from '../DashboardAPI';
  import SearchDialog from './SearchDialog.svelte';

  export let title: string | null = null;

  const api: DashboardAPI = getContext("dashboard-api");

  const dispatch = createEventDispatcher();
  
  function navigateHome() {
    // location.pathname /routers/Search/guest%2BmongoPipeline/branch/master/%2FM/static/index.html
    // home href: /routers/Dashboard/guest%2BmongoPipeline/branch/master/static/index.html
    window.location.href = api.apiBaseUrl + "/static/index.html";
  }

  function createArtifact() {
    dispatch('createArtifact');
  }

  function openEditor() {
    dispatch('openEditor');
  }
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
        <Title>{title}</Title>
      {/if}
    </Section>

    <Section align="end" toolbar>
      <IconButton
        class="material-icons"
        aria-label="Home"
        title="Home"
        ripple={false}
        on:click={navigateHome}>home
      </IconButton>
      <IconButton
        class="material-icons"
        aria-label="Search .."
        title="Search .."
        ripple={false}
        on:click={() => {openSearchDialog()}}>search
      </IconButton>
      <IconButton
        class="material-icons"
        aria-label="Upload dataset"
        title="Upload dataset"
        ripple={false}
        on:click={createArtifact}>file_upload
      </IconButton>
      <IconButton
        class="material-icons"
        aria-label="Edit taxonomy"
        title="Edit taxonomy"
        ripple={false}
        on:click={openEditor}>open_in_new
      </IconButton>
    </Section>
  </Row>
</TopAppBar>
