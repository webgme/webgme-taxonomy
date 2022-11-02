<script lang="ts">
  import { getProjectInfo } from "./data"

  import AppHeader from "./components/AppHeader.svelte"
  import LayoutGrid, { Cell } from "@smui/layout-grid"
  import ContentTypeCard from "./components/ContentTypeCard.svelte"

  let apiBaseUrl = window.location.href.split("/").slice(0, -2).join("/")

  let contentTypes = getProjectInfo(apiBaseUrl)
</script>

<main>
  <AppHeader></AppHeader>
  <LayoutGrid>
    {#await contentTypes}
      <div>Loading content types...</div>
    {:then project}
      {#each project.contentTypes as {name, url, path} (path)}
        <Cell>
          <ContentTypeCard {name} {url}></ContentTypeCard>
        </Cell>
      {/each}
    {:catch error}
      <div class="error">Error retrieving content types</div>
    {/await}
  </LayoutGrid>  
</main>

<style lang="scss">

</style>