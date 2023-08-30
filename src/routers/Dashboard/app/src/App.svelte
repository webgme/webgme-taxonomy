<script lang="ts">
  import { getProjectInfo } from "./data";
  import { AppHeader, ContentTypeCard } from "./components";
  import LayoutGrid, { Cell } from "@smui/layout-grid";

  let apiBaseUrl = window.location.href.split("/").slice(0, -2).join("/");
  let projectInfo = getProjectInfo(apiBaseUrl);
  let title = "";

  $: projectInfo.then(({ name }) => (title = name));
</script>

<main>
  <AppHeader {title} />
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
