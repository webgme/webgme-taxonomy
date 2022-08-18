<script lang="ts">
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Textfield from "@smui/textfield";
  /*import Chip from "@smui/chips";*/
  import List, { Item, Text, PrimaryText, SecondaryText } from "@smui/list";
  import Drawer, { Content, AppContent } from "@smui/drawer";
  import TaxonomyFilter from "./TaxonomyFilter.svelte";
  import type TaxonomyData from "./TaxonomyData.ts";

  export let title: string = "Digital Phenotyping Dashboard ";
  let searchKeyword: string = "";
  let vocabularies: TaxonomyData[] = [];

  import testDataItems from "./TestResultData.js";
  let items = testDataItems;

  function isTypeOfTag(tag, typeTag) {
    // TODO: check if tag is type of typeTag (add inheritance)
    // TODO: handle inheritance
    return tag.id === typeTag.id && typeTag.value == tag.value;
  }

  function onFilterUpdate(filterTags) {
    const filter = (item) => {
      const [{ label, taxonomyTags }] = item.Data;

      const matchingTags = filterTags.every(
        (filterTag) => !!taxonomyTags.find((tag) => isTypeOfTag(tag, filterTag))
      );

      if (matchingTags) {
        return searchKeyword
          ? label.toLowerCase().includes(searchKeyword.toLowerCase())
          : true;
      }

      return false;
    };

    items = testDataItems.filter((item) => filter(item));
  }

  function getTag(id) {
    const queue = vocabularies;
    while (queue.length) {
      const node = queue.shift();
      if (node.id === id) {
        return node;
      }
      queue.push(...node.children);
    }
  }

  async function fetchVocabularies() {
    const chunks = window.location.href.split("/");
    chunks.pop();
    chunks.pop();
    const url = chunks.join("/") + "/taxonomy.json";
    const response = await fetch(url);
    const taxonomy = await response.json();

    let vocabs = [taxonomy];
    while (vocabs.length === 1) {
      vocabs = vocabs[0].children;
    }

    return vocabs;
  }

  async function fetchData() {
    vocabularies = await fetchVocabularies();
  }

  fetchData();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<TopAppBar variant="static">
  <Row>
    <Section>
      <Title>{title}</Title>
    </Section>
  </Row>
</TopAppBar>

<!-- TODO: make sure the drawer is collapsible -->
<div class="drawer-container">
  <Drawer style="width: 360px">
    <Content>
      <Textfield label="Search..." bind:value={searchKeyword} />
      <span class="filter-header">Advanced Filters</span>
      <TaxonomyFilter
        trees={vocabularies}
        on:change={(event) => onFilterUpdate(event.detail.filterTags)}
      />
    </Content>
  </Drawer>
  <AppContent>
    <main>
      <List twoLine avatarList>
        {#each items as item}
          <Item>
            <Text>
              <PrimaryText>{item.Data[0].label}</PrimaryText>
              <SecondaryText
                >{item.Version + 1} revisions. <a>Earlier versions.</a>
              </SecondaryText>
            </Text>
            {#each item.Data[0].taxonomyTags as tag}
              <!--
                                                        <Chip chip={tag.id}>
								{#if tag.type === 'EnumField'}
						<Text>{tag.name}</Text>
                                        {:else if tag.value}
						<Text>{tag.name}: {tag.value}</Text>
								{:else}
						<Text>{tag.name}</Text>
								{/if}
                                                        </Chip>
							-->
            {/each}
          </Item>
        {/each}
      </List>
    </main>
  </AppContent>
</div>

<!-- Material Icons -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
<!-- Roboto -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
/>
<!-- Roboto Mono -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto+Mono"
/>
<link rel="stylesheet" href="build/smui.css" />

<style>
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .filter-header {
    display: block;
    padding-top: 10px;
  }

  /* FIXME: this is an annoying hack to get the placement/size right*/
  .drawer-container {
    position: relative;
    display: flex;
    height: 100%;
  }

  .drawer {
    width: 360px;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }
</style>
