<script lang="ts">
  import { setContext } from "svelte";
  import { FilterTag, LeanTag, fromDict } from "./tags";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import {
    getLatestArtifact,
    filterMap,
    openUrl,
    encodeQueryParams,
    isObject,
    readFile,
  } from "./Utils";
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";
  /*import Chip from "@smui/chips";*/
  import List, {
    Item,
    Text,
    Graphic,
    PrimaryText,
    SecondaryText,
  } from "@smui/list";
  import Drawer, { Content, AppContent } from "@smui/drawer";
  import LinearProgress from "@smui/linear-progress";
  import Select, { Option } from "@smui/select";
  import Dialog, {
    Content as DialogContent,
    Title as DialogTitle,
    InitialFocus,
    Actions,
  } from "@smui/dialog";
  import Radio from "@smui/radio";
  import Button, { Label } from "@smui/button";
  import Paper, { Content as PaperContent } from "@smui/paper";
  import Dropzone from "svelte-file-dropzone";
  import { ArtifactSetViewer, TaxonomyFilter } from "./components";
  import TaxonomyData from "./TaxonomyData";
  import TaxonomyReference from "./TaxonomyReference";

  let title: string;
  let contentType: string = "Data";
  $: title = `${contentType} Dashboard`;
  let vocabularies: TaxonomyData[] = [];

  import TagFormatter, { FormatError } from "./Formatter";
  import Storage, { ModelError, RequestError } from "./Storage";
  const storage = setContext("storage", new Storage());
  
  let allItems = [];
  let items = [];

  const params = new URLSearchParams(location.search);
  let searchQuery: string = params.get("searchQuery") || "";
  let filterTags: FilterTag[] = [];
  function parseTagParams(filterTagString: string | null): FilterTag[] {
    if (filterTagString) {
      const leanTags: LeanTag[] = JSON.parse(filterTagString);
      return filterMap(leanTags, (leanTag) => {
        const filterTagPath = vocabularies.reduce((path, vocab) => {
          if (path) {
            return path;
          } else {
            return vocab.findPath(leanTag.id);
          }
        }, null);

        if (!filterTagPath) {
          console.warn("Could not find tag for", leanTag);
          return;
        }

        const filterTag = filterTagPath.pop();
        filterTag.value = leanTag.value;
        filterTag.select();
        filterTagPath.forEach((parentTag) => parentTag.expand());
        return filterTag;
      });
    }
    return [];
  }

  function onFilterUpdate(searchQuery: string, filterTags: FilterTag[]) {
    const filter = (item) => {
      const { displayName, taxonomyTags = [] } = item;

      const matchingTags = filterTags.every(
        (filterTag) => !!taxonomyTags.find((tag) => filterTag.isMatch(tag))
      );
      const hasMatchingArtifact = item.children.find(child => {
      const { displayName, taxonomyTags = [] } = child;
        return filterTags.every(
          (filterTag) => !!taxonomyTags.find((tag) => filterTag.isMatch(tag))
        );
      });

      if (matchingTags || hasMatchingArtifact) {
        return searchQuery
          ? displayName.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
      }

      return false;
    };

    items = allItems.filter((item) => filter(item));

    const params = new URLSearchParams();
    params.set("searchQuery", searchQuery);
    const strippedTags = filterTags.map((tag) => tag.lean());
    params.set("filterTags", JSON.stringify(strippedTags));
    setQueryStringParams(params);
  }

  $: onFilterUpdate(searchQuery, filterTags);

  $: itemTags = items.flatMap((item) => item.taxonomyTags ?? []);

  function setQueryStringParams(newParams: URLSearchParams) {
    const params = new URLSearchParams(location.search);
    [...newParams.entries()].forEach(([key, value]) => params.set(key, value));
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${params.toString()}`
    );
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

  async function fetchConfiguration() {
    const chunks = window.location.href.split("/");
    chunks.pop();
    chunks.pop();
    const url = chunks.join("/") + "/configuration.json";
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      displayError(
        "An error occurred. Please double check the URL and try again."
      );
      throw err;
    }
  }

  function trimTaxonomy(taxonomy: TaxonomyData) {
    let vocabs = [taxonomy];
    while (vocabs.length === 1) {
      vocabs = vocabs[0].children;
    }

    return vocabs;
  }

  function displayError(err: string | Error) {
    const toastOpts = { initial: 0, classes: ["warn"] }; // background red

    if (err instanceof ModelError) {
      // display clickable dialog
      const url = location.origin + "?" + err.context.toQueryParams();
      const toastHtml = `
        <strong>Configuration Error Detected</strong>
        <br/>
        ${err.message}
        <br/>
        Click <a href="${url}" target="_blank">here</a> to open project.`;
      toast.push(toastHtml, toastOpts);
    } else if (err instanceof Error) {
      // display basic error message
      let msg =
        err instanceof RequestError
          ? err.message
          : "An error occurred. Please try again later";
      toast.push(msg, toastOpts);
    } else {
      // display basic error message
      toast.push(err, toastOpts);
    }
  }

  function displayMessage(msg: string) {
    toast.push(msg, { classes: ["info"] }); // background green
  }

  function displayProgressMessage(msg: string, duration: number = 60000) {
    return toast.push(msg, {
      classes: ["info"],
      dismissable: false,
      duration: duration,
    });
  }
  function clearProgressMessage(id: number) {
    toast.pop(id);
  }

  let isLoading = false;
  let configuration;
  let currentTaxonomy;
  async function initialize() {
    configuration = await fetchConfiguration();
    currentTaxonomy = TaxonomyReference.from(configuration.project);
    const taxonomy = TaxonomyData.fromDict(configuration.taxonomy);
    vocabularies = trimTaxonomy(taxonomy);
    filterTags = parseTagParams(params.get("filterTags"));
    contentType = configuration.name;
    fetchData();
  }

  async function fetchData() {
    isLoading = true;
    try {
      allItems = await storage.listArtifacts();
      allItems.forEach((set) => {
        const validArtifacts = set.children.filter(
          (item) => item.taxonomy && currentTaxonomy.supports(item.taxonomy)
        );
        set.children = validArtifacts;
      });
    } catch (err) {
      displayError(err);

      // TODO: combine request error and model error (shared parent)...
      if (!(err instanceof RequestError || err instanceof ModelError)) {
        throw err;
      }
    }
    isLoading = false;
    onFilterUpdate(searchQuery, filterTags);
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
    selectedArtifactSet = item;
  }

  initialize();

  ////// Item actions //////
  let appendArtifact = false;
  let appendFiles = [];
  let appendItem;
  let appendMetadata;
  let appendName = "";
  let formatter = new TagFormatter();
  async function onAppendItem(item) {
    appendItem = item;
    appendName = appendItem.displayName;
    try {
      appendMetadata = {
        taxonomyTags: await formatter.toHumanFormat(appendItem.taxonomyTags ?? []),
      };
    } catch (err) {
      displayError(err);
      if (err instanceof FormatError) {
        console.warn("Latest artifact has invalid taxonomy tags:", err.message);
      } else {
        console.error(
          "An error occurred while setting default tags",
          err.stack
        );
      }
    }
    appendArtifact = true;
  }

  function onAppendFileDrop(event) {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length) {
      appendFiles = acceptedFiles;
    }
    // TODO: handle rejections
  }

  async function onAppendTagsFileDrop(event) {
    const [tagsFile] = event.detail.acceptedFiles;
    if (tagsFile) {
      appendMetadata = JSON.parse(await readFile(tagsFile));
    }
  }

  async function onAppendClicked() {
    if (!appendFiles) {
      return displayError(`${contentType} file required.`);
    }

    const metadata = appendMetadata;
    metadata.displayName = appendName;
    const updMsgId = displayProgressMessage("Upload in progress");
    try {
      await storage.appendArtifact(appendItem, metadata, appendFiles);
      displayMessage("Upload complete!");
      fetchData();
    } catch (err) {
      displayError(err);
    }
    clearProgressMessage(updMsgId);
  }

  ////// Artifact Upload //////
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
    const status = await storage.createArtifact(
      { displayName: artifactName },
      artifactFiles
    );
    displayMessage(status);
    if (status === "Created!") {
      // FIXME: replace this with a proper enum
      fetchData();
    }
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
  async function onDownload(event) {
    const { artifactSet, artifactIds } = event;
    try {
      if (artifactIds.length === 0) {
        return displayError("Nothing to download: No data found.");
      }
      displayMessage(
        `Downloading ${artifactIds.length} from ${artifactSet.displayName}...`
      );
      const url = await storage.getDownloadUrl(artifactSet.id, ...artifactIds);
      openUrl(url);
    } catch (err) {
      return displayError(err);
    }
  }

  //////// Artifact Sets ////////
  let artifactSets = [];
  $: artifactSets = getArtifactSets(items);
  let selectedArtifactSet;
  $: if (!items.includes(selectedArtifactSet)) {
    selectedArtifactSet = null;
  }

  function getArtifactSets(items) {
    return [];
  }

  //////// Edit taxonomy ////////
  function onOpenInEditor() {
    const baseUrl = window.location.href.replace(/routers\/Search.*/, "");
    const url =
      baseUrl +
      "?" +
      encodeQueryParams({
        project: configuration.project.id,
        commit: configuration.project.commit,
        node: configuration.contentTypePath,
      });
    openUrl(url);
  }

  function getTagDisplayName(tag) {
    // FIXME: there is no way to tell the difference btwn terms and compound fields...
    let currentTag = tag;
    const tagNames = [];
    while (currentTag) {
      const [name, tag] =
        Object.entries(currentTag).find(([, data]) => isObject(data)) || [];
      currentTag = tag;
      if (name) {
        tagNames.push(name);
      }
    }

    return tagNames.pop(); // Only return the most specific one for now...
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
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
    <Textfield label="Name" bind:value={appendName} />
    <p>{contentType} file(s):</p>
    <ul>
      {#each appendFiles as file}
        <li>{file.name}</li>
      {/each}
    </ul>
    <Dropzone on:drop={onAppendFileDrop} multiple={true}>
      <p>Select dataset to upload.</p>
    </Dropzone>
    <p>
      Taxonomy Terms <span style="font-style:italic">(optional)</span>:<br />
      {appendMetadata
        ? appendMetadata.taxonomyTags.map(getTagDisplayName).join(", ")
        : ""}
    </p>
    <Dropzone on:drop={onAppendTagsFileDrop} accept=".json">
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
    <p>{contentType} file(s):</p>
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
      <IconButton
        class="material-icons"
        aria-label="Edit taxonomy"
        ripple={false}
        on:click={onOpenInEditor}>open_in_new</IconButton
      >
    </Section>
  </Row>
</TopAppBar>
{#if isLoading}
  <LinearProgress indeterminate />
{/if}
<SvelteToast options={{ classes: ["log"] }} />
<!-- TODO: make the drawer collapsible? -->
<div class="drawer-container">
  <Drawer style="width: 360px">
    <Content>
      <Textfield label="Search..." bind:value={searchQuery} />
      <span class="filter-header">Advanced Filters</span>
      <TaxonomyFilter
        trees={vocabularies}
        tags={itemTags}
        on:change={(event) =>
          (filterTags = event.detail.filterTags.map(fromDict))}
      />
    </Content>
  </Drawer>
  <AppContent>
    <main style="display: inline-block; vertical-align: top">
      <!-- Artifact list -->
      {#if items.length}
        <List twoLine avatarList>
          {#each items as item (item.hash)}
            <Item on:SMUI:action={() => onItemClicked(item)}>
              <Text>
                <PrimaryText>{item.displayName}</PrimaryText>
                <SecondaryText />
              </Text>
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
      {:else if !isLoading}
        <Paper variant="unelevated" class="empty">
          <PaperContent>
            <p>No results found</p>
          </PaperContent>
        </Paper>
      {/if}
    </main>
    {#if selectedArtifactSet}
      <ArtifactSetViewer
        bind:artifactSet={selectedArtifactSet}
        bind:contentType
        on:download={(event) => onDownload(event.detail)}
        on:upload={(event) => onAppendItem(event.detail.artifactSet)}
      />
    {/if}
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

  :global(.log.info) {
    --toastBackground: green;
  }
  :global(.log.warn) {
    --toastBackground: red;
  }

  :global(.empty) {
    opacity: 50%;
    font-style: italic;
  }
</style>
