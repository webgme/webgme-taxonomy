<script lang="ts">
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";
  /*import Chip from "@smui/chips";*/
  import List, { Item, Text, PrimaryText, SecondaryText } from "@smui/list";
  import Drawer, { Content, AppContent } from "@smui/drawer";
  import LinearProgress from "@smui/linear-progress";
  import Dialog, {
    Content as DialogContent,
    Title as DialogTitle,
    Actions,
  } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import Dropzone from "svelte-file-dropzone";
  import TaxonomyFilter from "./TaxonomyFilter.svelte";
  import type TaxonomyData from "./TaxonomyData.ts";

  export let title: string = "Digital Phenotyping Dashboard ";
  let searchKeyword: string = "";
  let vocabularies: TaxonomyData[] = [];

  import Storage from "./Storage.ts";
  const storage = new Storage();
  let allItems = [];
  let items = [];

  function isTypeOfTag(tag, typeTag) {
    // TODO: check if tag is type of typeTag (add inheritance)
    // TODO: handle inheritance
    return tag.id === typeTag.id && typeTag.value == tag.value;
  }

  function onFilterUpdate(filterTags = []) {
    const filter = (item) => {
      const [{ label, taxonomyTags }] = item.data;

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

    items = allItems.filter((item) => filter(item));
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

  let isLoading = false;
  async function fetchData() {
    vocabularies = await fetchVocabularies();
    isLoading = true;
    allItems = await storage.listArtifacts();
    isLoading = false;
    console.log({ allItems });
    onFilterUpdate();
  }

  class EmbeddedEvent {
    type: string;
    data: string;

    constructor(type: string, data: any) {
      this.type = type;
      this.data = data;
    }
  }

  class SelectEvent extends EmbeddedEvent {
    constructor(item: any) {
      super("ItemSelected", item);
    }
  }

  const listeners = [];
  let selectedItem;
  function receiveMessage(event) {
    const { data } = event;
    if (data.type === "subscribe") {
      listeners.push([event.source, event.origin]);
      if (selectedItem) {
        event.source.postMessage(new SelectEvent(selectedItem), event.origin);
      }
    }
  }

  window.addEventListener("message", receiveMessage, false);
  function onItemClicked(item) {
    selectedItem = item;
    listeners.forEach(([listener, origin]) =>
      listener.postMessage(new SelectEvent(item), origin)
    );
  }

  fetchData();

  async function downloadItem(item) {
    const url = await storage.getDownloadUrl(item);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.click();
  }

  ////// Dataset Upload //////
  let uploadingArtifact = false;
  let artifactFile;
  let uploadTags;

  function onFileDrop(event) {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length) {
      artifactFile = acceptedFiles[0];
    }
    // TODO: handle rejections
  }

  async function onTagsFileDrop(event) {
    const [tagsFile] = event.detail.acceptedFiles;
    if (tagsFile) {
      uploadTags = JSON.parse(await readFile(tagsFile));
      console.log(uploadTags);
      // TODO: send the tags somewhere...
    }
  }

  async function readFile(file: File) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.error) {
          console.log("error:", reader.error);
          return rej(reader.error);
        } else {
          return res(reader.result);
        }
      };
      reader.readAsText(file);
    });
  }

  async function onUploadClicked() {
    if (!uploadTags) {
      // TODO: validate tags
    }
    if (!artifactFile) {
    }
    await storage.createArtifact(uploadTags, artifactFile);
  }

  let artifactName = "";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<Dialog
  bind:open={uploadingArtifact}
  aria-labelledby="title"
  aria-describedby="content"
>
  <DialogTitle id="title">Create new dataset</DialogTitle>
  <DialogContent id="content">
    <Textfield label="Name" bind:value={artifactName} />
    <!-- TODO: create process -->
    <p>
      Dataset file:
      {artifactFile ? artifactFile.name : ""}
    </p>
    <Dropzone on:drop={onFileDrop}>
      <p>Select dataset to upload.</p>
    </Dropzone>
    <p>
      Taxonomy Terms:
      {uploadTags
        ? uploadTags.taxonomyTags.map((tag) => tag.Tag).join(", ")
        : ""}
    </p>
    <Dropzone on:drop={onTagsFileDrop} accept=".json">
      <p>Select tags file for dataset.</p>
    </Dropzone>
    <a
      target="_blank"
      href={window.location.href.replace("/Search/", "/TagCreator/")}
      >Click to select tags for your dataset.</a
    >
  </DialogContent>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => onUploadClicked()}>
      <Label>Upload</Label>
    </Button>
  </Actions>
</Dialog>
<TopAppBar variant="static">
  <Row>
    <Section>
      <Title>{title}</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton
        class="material-icons"
        aria-label="Upload dataset"
        ripple={false}
        on:click={() => (uploadingArtifact = true)}>file_upload</IconButton
      >
    </Section>
  </Row>
</TopAppBar>
{#if isLoading}
  <LinearProgress indeterminate />
{/if}

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
          <Item on:SMUI:action={() => onItemClicked(item)}>
            <Text>
              <PrimaryText>{item.data[0].label}</PrimaryText>
              <SecondaryText
                >{item.version + 1} revisions.
                <a on:click={downloadItem(item)}>Download</a>
              </SecondaryText>
            </Text>
            {#each item.data[0].taxonomyTags as tag}
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
