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
  import type { SnackbarComponentDev } from "@smui/snackbar";
  import Snackbar, {
    Actions as SnackbarActions,
    Label as SnackbarLabel,
  } from "@smui/snackbar";
  import Button, { Label } from "@smui/button";
  import Dropzone from "svelte-file-dropzone";
  import TaxonomyFilter from "./TaxonomyFilter.svelte";
  import type TaxonomyData from "./TaxonomyData.ts";

  export let title: string = "Data Dashboard ";
  let vocabularies: TaxonomyData[] = [];

  import Storage, { RequestError } from "./Storage.ts";
  const storage = new Storage();
  let allItems = [];
  let items = [];

  function isTypeOfTag(tag, typeTag) {
    // TODO: check if tag is type of typeTag (add inheritance)
    // TODO: handle inheritance
    const isMatchingTag = tag.ID === typeTag.id && typeTag.value == tag.value;
    if (isMatchingTag) {
      return true;
    }
    const tagHasAttribute =
      tag.hasOwnProperty(typeTag.id) && tag[typeTag.id] === typeTag.value;
    return tagHasAttribute;
  }

  let searchKeyword: string = "";
  let filterTags = [];

  function onFilterUpdate(searchKeyword: string, filterTags) {
    const filter = (item) => {
      const { displayName, taxonomyTags } = item;

      const matchingTags = filterTags.every(
        (filterTag) => !!taxonomyTags.find((tag) => isTypeOfTag(tag, filterTag))
      );

      if (matchingTags) {
        return searchKeyword
          ? displayName.toLowerCase().includes(searchKeyword.toLowerCase())
          : true;
      }

      return false;
    };

    console.log({ filterTags, item: items[0] });
    items = allItems.filter((item) => filter(item));
  }

  $: onFilterUpdate(searchKeyword, filterTags);

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
    const url = chunks.join("/") + "/configuration.json";
    try {
      const response = await fetch(url);
      const config = await response.json();
      const { taxonomy } = config;

      let vocabs = [taxonomy];
      while (vocabs.length === 1) {
        vocabs = vocabs[0].children;
      }

      return vocabs;
    } catch (err) {
      displayError(
        "An error occurred. Please double check the URL and try again."
      );
      throw err;
    }
  }

  let snackbar: SnackbarComponentDev;
  let errorMessage: string;
  $: errorMessage && snackbar.open();

  function displayError(msg: string) {
    errorMessage = msg;
  }

  let isLoading = false;
  async function fetchData() {
    vocabularies = await fetchVocabularies();
    isLoading = true;
    try {
      allItems = await storage.listArtifacts();
    } catch (err) {
      const errMessage =
        err instanceof RequestError
          ? err.message
          : "An error occurred. Please try again later";
      displayError(errMessage);

      if (!(err instanceof RequestError)) {
        throw err;
      }
    }
    isLoading = false;
    console.log({ allItems });
    onFilterUpdate(searchKeyword, filterTags);
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

  ////// Item actions //////
  let appendArtifact = false;
  let appendFiles = [];
  let appendItem;
  async function onAppendItem(item) {
    appendItem = item;
    appendArtifact = true;
  }

  function onAppendFileDrop(event) {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length) {
      appendFiles = acceptedFiles;
    }
    // TODO: handle rejections
  }

  async function onAppendClicked() {
    if (!appendFiles) {
      return displayError("Dataset file required.");
    }

    await storage.appendArtifact(appendItem, appendFiles);
  }

  ////// Dataset Upload //////
  const queryDict = parseQueryString(window.location.href);
  let creatingArtifact = queryDict.action === "create";
  let artifactFiles = [];
  let uploadMetadata;

  function onFileDrop(event) {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length) {
      artifactFiles = acceptedFiles;
    }
    // TODO: handle rejections
  }

  async function onTagsFileDrop(event) {
    const [tagsFile] = event.detail.acceptedFiles;
    if (tagsFile) {
      uploadMetadata = JSON.parse(await readFile(tagsFile));
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
    if (!uploadMetadata) {
      // TODO: require tags?
    }
    // TODO: re-enable this once they can create datasets on their own
    //if (artifactFiles.length === 0) {
    //  return displayError("No dataset files provided");
    //}
    //uploadMetadata.displayName = artifactName;
    //await storage.createArtifact(uploadMetadata, artifactFiles);
    await storage.createArtifact({ displayName: artifactName }, artifactFiles);
    displayError("Submitted creation request."); // FIXME: this isn't really an error...
  }

  let artifactName = "";

  function parseQueryString(url: string) {
    return Object.fromEntries(
      (url.split("?")[1] || "")
        .split("&")
        .map((chunk: string) => chunk.split("="))
    );
  }

  //////// Download ////////
  let downloadArtifacts = false;
  async function onDownloadItem(item) {
    try {
      const url = await storage.getDownloadUrl(item);
      const anchor = document.createElement("a");
      anchor.setAttribute("href", url);
      anchor.setAttribute("target", "_blank");
      anchor.click();
    } catch (err) {
      return displayError(err.message);
    }
  }

  //////// Artifact Sets ////////
  let artifactSets = [];
  $: artifactSets = getArtifactSets(items);

  function getArtifactSets(items) {
    return [];
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<!-- Download Dialog -->
<Dialog
  bind:open={appendArtifact}
  aria-labelledby="title"
  aria-describedby="content"
>
  <DialogTitle id="title"
    >Append data to {appendItem && appendItem.displayName}</DialogTitle
  >
  <DialogContent id="content">
    <p>Dataset files:</p>
    <ul>
      {#each appendFiles as file}
        <li>{file.name}</li>
      {/each}
    </ul>
    <Dropzone on:drop={onAppendFileDrop} multiple={true}>
      <p>Select dataset to upload.</p>
    </Dropzone>
  </DialogContent>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => onAppendClicked()}>
      <Label>Upload</Label>
    </Button>
  </Actions>
</Dialog>

<!-- Artifact append dialog -->
<Dialog
  bind:open={appendArtifact}
  aria-labelledby="title"
  aria-describedby="content"
>
  <DialogTitle id="title"
    >Append data to {appendItem && appendItem.displayName}</DialogTitle
  >
  <DialogContent id="content">
    <p>Dataset files:</p>
    <ul>
      {#each appendFiles as file}
        <li>{file.name}</li>
      {/each}
    </ul>
    <Dropzone on:drop={onAppendFileDrop} multiple={true}>
      <p>Select dataset to upload.</p>
    </Dropzone>
  </DialogContent>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => onAppendClicked()}>
      <Label>Upload</Label>
    </Button>
  </Actions>
</Dialog>

<!-- Artifact creation dialog -->
<Dialog
  bind:open={creatingArtifact}
  aria-labelledby="title"
  aria-describedby="content"
>
  <DialogTitle id="title">Create new dataset</DialogTitle>
  <DialogContent id="content">
    <Textfield label="Name" bind:value={artifactName} />
    <!-- TODO: create process -->
    <!-- TODO: re-enable this when we can automatically create processes
    <p>Dataset files:</p>
    <ul>
      {#each artifactFiles as file}
        <li>{file.name}</li>
      {/each}
    </ul>
    <Dropzone on:drop={onFileDrop} multiple={true}>
      <p>Select dataset to upload.</p>
    </Dropzone>
    <p>
      Taxonomy Terms:
      {uploadMetadata
        ? uploadMetadata.taxonomyTags.map((tag) => tag.Tag).join(", ")
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
    -->
  </DialogContent>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => onUploadClicked()}>
      <Label>Submit</Label>
    </Button>
  </Actions>
</Dialog>
<!-- Main app -->
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
        on:click={() => (creatingArtifact = true)}>file_upload</IconButton
      >
    </Section>
  </Row>
</TopAppBar>
{#if isLoading}
  <LinearProgress indeterminate />
{/if}
<Snackbar bind:this={snackbar} labelText={errorMessage} timeoutMs={-1}>
  <SnackbarLabel />
  <SnackbarActions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </SnackbarActions>
</Snackbar>

<!-- TODO: make the drawer collapsible? -->
<div class="drawer-container">
  <Drawer style="width: 360px">
    <Content>
      <Textfield label="Search..." bind:value={searchKeyword} />
      <span class="filter-header">Advanced Filters</span>
      <TaxonomyFilter
        trees={vocabularies}
        on:change={(event) => (filterTags = event.detail.filterTags)}
      />
    </Content>
  </Drawer>
  <AppContent>
    <main>
      <!-- ArtifactSet list -->
      <List twoLine avatarList>
        {#each artifactSets as item}
          <Item on:SMUI:action={() => onItemClicked(item)}>
            <Text>
              <PrimaryText>{item.displayName}</PrimaryText>
              <SecondaryText>
                <a style="margin-right: 15px" on:click={onDownloadItem(item)}
                  >Download</a
                >
                <!-- TODO: check if they have permissions to append to it -->
                <a style="margin-right: 15px" on:click={onAppendItem(item)}
                  >Append Data</a
                >
              </SecondaryText>
            </Text>
            <!--
            <IconButton class="material-icons" on:click={() => onDownloadItem(item)}>file_download</IconButton>
            <IconButton class="material-icons" on:click={() => onAppendItem(item)}>file_upload</IconButton>
            -->
            {#each item.taxonomyTags as tag}
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
      <!-- Artifact list -->
      <List twoLine avatarList>
        {#each items as item}
          <Item on:SMUI:action={() => onItemClicked(item)}>
            <Text>
              <PrimaryText>{item.displayName}</PrimaryText>
              <SecondaryText>
                <a style="margin-right: 15px" on:click={onDownloadItem(item)}
                  >Download</a
                >
                <!-- TODO: check if they have permissions to append to it -->
                <a style="margin-right: 15px" on:click={onAppendItem(item)}
                  >Append Data</a
                >
              </SecondaryText>
            </Text>
            <!--
            <IconButton class="material-icons" on:click={() => onDownloadItem(item)}>file_download</IconButton>
            <IconButton class="material-icons" on:click={() => onAppendItem(item)}>file_upload</IconButton>
            -->
            {#each item.taxonomyTags as tag}
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

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }
</style>
