<script lang="ts">
  import { setContext } from "svelte";
  import DashboardAPI from "./DashboardAPI";
  import { AppHeader, ContentTypeCard } from "./components";
  import LayoutGrid, { Cell } from "@smui/layout-grid";

  let apiBaseUrl = window.location.href.split("/").slice(0, -2).join("/");

  const api: DashboardAPI = setContext("dashboard-api", new DashboardAPI(apiBaseUrl));
  let projectInfo = api.getProjectInfo();
  let packageJson = api.getPackageJSON();
  let title = "";
  let taxonomyInfo = "";

  $: projectInfo.then(({ name }) => (title = name));
  $: packageJson.then(({ name, version }) => (taxonomyInfo = `${name}@v${version}`));
</script>

<main>
  <AppHeader {title} {taxonomyInfo}/>
  <LayoutGrid>
    {#await projectInfo}
      <div class="loading">Loading content types...</div>
    {:then info}
      {#each info.contentTypes as { name, url, path } (path)}
        <Cell>
          <ContentTypeCard {name} {path} />
        </Cell>
      {/each}
    {:catch error}
      <div class="error">Error retrieving content types</div>
    {/await}
  </LayoutGrid>
</main>

<style lang="scss">
</style>
