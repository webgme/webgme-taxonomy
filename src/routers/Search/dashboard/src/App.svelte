<script lang="ts">
  import { setContext } from "svelte";
  import { FilterTag, LeanTag, fromDict } from "./tags";
  import { filterMap, getDefaultContentType } from "./Utils";
  import type {ConfirmData} from './ConfirmData';
  import {
    openUrl,
    encodeQueryParams,
  } from "./Utils";
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";
  import { SvelteToast, SvelteToastOptions, toast } from "@zerodevx/svelte-toast";
  /*import Chip from "@smui/chips";*/
  import List, {
    Item,
    Meta,
    Text,
    PrimaryText,
    SecondaryText,
  } from "@smui/list";
  import Drawer, { Content, AppContent } from "@smui/drawer";
  import LinearProgress from "@smui/linear-progress";
  import Paper, { Content as PaperContent } from "@smui/paper";
  import {
    AppHeader,
    AppendArtifactDialog,
    ArtifactSetViewer,
    TaxonomyFilter,
    CreateRepoDialog,
    Confirm,
   } from "./components";

  import TaxonomyData from "./TaxonomyData";
  import TaxonomyReference from "../../../../common/TaxonomyReference";
  import Storage, { LoadState, ModelError, RequestError, ModelContext } from "./Storage";
  import type { Artifact, PopulatedRepo } from "./Storage";
  import type {ContentTypeConfiguration}  from "../../../../common/SearchFilterDataExporter";

  let confirmData: ConfirmData | null = null;
  let title: string;
  let contentType: ContentTypeConfiguration = getDefaultContentType('Data');
  $: title = `${contentType.name} Dashboard`;
  let vocabularies: TaxonomyData[] = [];

  const storage = setContext("storage", new Storage());


  let allItems: PopulatedRepo[] = [];
  let items: PopulatedRepo[] = [];

  const params = new URLSearchParams(location.search);
  let searchQuery: string = params.get("searchQuery") || "";
  let filterTags: FilterTag[] = [];

  let initialRepoId = params.get("repoId");
  let initialContentId = params.get("contentId");

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
      const { displayName, tags = {} } = item;

      const matchingTags = FilterTag.applyFilters(tags, filterTags);
      const hasMatchingArtifact = item.children.find((child) => {
        const { displayName, tags = {} } = child;
        return FilterTag.applyFilters(tags, filterTags);
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

  // FIXME: what should this be?
  $: itemTags = items.flatMap((item) => item.tags ?? {});

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

  function trimTaxonomy(vocabs: TaxonomyData[]) {
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

  function clearMessage(id: number) {
    return toast.pop(id);
  }

  function displayMessage(msg: string, opts: SvelteToastOptions = {}): number {
    opts.classes = opts.classes || ['info'];  // background green
    return toast.push(msg, opts);
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
  let currentTaxonomy: TaxonomyReference;
  async function initialize() {
    configuration = await fetchConfiguration();
    currentTaxonomy = TaxonomyReference.from(configuration.project);
    // FIXME: Only 2-level depth is currently supported
    let depth = 1;
    let contentTypeIter = configuration.content;
    while (contentTypeIter.content) {
      contentTypeIter = contentTypeIter.content;
      depth++;
    }
    if (depth !== 2) {
      const context = new ModelContext(
        configuration.project.id,
        configuration.project.branch,
        configuration.content.nodePath
      );
      const error = new ModelError(
        `Depth of ${depth} not supported. Please update your content type to have depth of 2.`,
        context
      );
      return displayError(error);
    }

    // FIXME: update this when we support arbitrary depth. Just grabbing the data vocabs for now
    const dataVocabs = configuration.content.content.vocabularies.map(
      TaxonomyData.fromDict
    );
    vocabularies = trimTaxonomy(dataVocabs);
    filterTags = parseTagParams(params.get("filterTags"));
    contentType = configuration.content;
    await fetchData();
    selectedArtifactSetId = initialRepoId || null;
  }

  async function onTryCreateRepo(event) {
    const {status} = event.detail;
    displayMessage(status);
    if (status.includes("Created!")) {
      // FIXME: replace this with a proper enum
      await fetchData();
    }
  }

  async function loadContents(repo: PopulatedRepo) {
    repo.loadState = LoadState.Pending;
    const children = await storage.listArtifacts(repo.id);
    // TODO: keep all and just show if they are valid or not...
    const validArtifacts = children.filter(
      (content) => content.taxonomyVersion && currentTaxonomy.supports(content.taxonomyVersion)
    );
    repo.children = validArtifacts;
    repo.loadState = LoadState.Complete;

    // FIXME: Does this make sense?
    // if (selectedArtifactSet?.id === repo.id) {
    //   selectedArtifactSet = selectedArtifactSet;
    // }
  }

  async function fetchData() {
    isLoading = true;
    try {
      allItems = (await storage.listRepos(currentTaxonomy))
        .map(repo => ({
          id: repo.id,
          displayName: repo.displayName,
          tags: repo.tags,
          taxonomyVersion: repo.taxonomyVersion,
          children: [],
          loadState: LoadState.Pending,
        }));

      await Promise.all(allItems.map((repo) => loadContents(repo)));
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
    selectedArtifactSetId = item.id;
  }

  initialize();

  ////// Item actions //////
  let appendItem;
  let updateTarget: Artifact | null = null;
  let appendMsgId;

  async function onUpdateContent(repo: PopulatedRepo, content: Artifact) {
    appendItem = repo;
    updateTarget = content;
  }

  function onAppendFinish(event: CustomEvent<{ error?: string }>) {
    const error = event.detail?.error;
    if (error == null) {
      displayMessage("Upload complete!");
      fetchData().catch(displayError);
    } else {
      displayError(error);
    }
    if (appendMsgId != null) {
      clearProgressMessage(appendMsgId);
      appendMsgId = null;
    }
  }

  ////// Artifact Upload //////
  const queryDict = parseQueryString(window.location.href);
  let creatingRepo = queryDict.action === "create";
  let artifactFiles = [];

  function onFileDrop(event) {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length) {
      artifactFiles = acceptedFiles;
    }
    // TODO: handle rejections
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
    if (artifactIds.length === 0) {
      return displayError("Nothing to download: No data found.");
    }
    const msgId = displayMessage(
      `Downloading ${artifactIds.length} from ${artifactSet.displayName}...`,
      {initial: 0}
    );

    try {
      const url = await storage.getDownloadUrl(artifactSet.id, ...artifactIds);
      openUrl(url);

    } catch (err) {
      clearMessage(msgId);
      return displayError(err);
    }
  }

  //////// Artifact Sets ////////
  let selectedArtifactSetId = null;
  let selectedArtifactSet = null;
  console.log(items.length, selectedArtifactSetId, selectedArtifactSet);
  $: console.log(selectedArtifactSetId, selectedArtifactSet);
  $: if(items.some(({ id }) => id === selectedArtifactSetId)) {
    selectedArtifactSet = items.find(({ id }) => id === selectedArtifactSetId);
  } else {
    selectedArtifactSet = null;
    selectedArtifactSetId = null;
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
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if configuration && configuration.content.content}
  <AppendArtifactDialog
    contentType={configuration.content.content}
    bind:repo={appendItem}
    bind:content={updateTarget}
    on:upload={() =>
      (appendMsgId = displayProgressMessage("Upload in progress"))}
    on:complete={onAppendFinish}
    on:confirm={event => confirmData = event.detail}
    on:error={onAppendFinish}
  />
{/if}

<!-- Repo creation dialog -->
<CreateRepoDialog
  bind:open={creatingRepo}
  bind:contentType
  on:create={onTryCreateRepo}
/>

<Confirm
  open={confirmData !== null}
  title={confirmData?.title}
  prompt={confirmData?.prompt}
  on:confirm={() => {
    confirmData.action();
    confirmData = null;
  }}
/>

<!-- Main app -->
<main id="app">
  <AppHeader
    {title}
    on:createArtifact={() => (creatingRepo = true)}
    on:openEditor={onOpenInEditor}
  />
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
      <main style="display: inline-block; vertical-align: top; min-width: 33%">
        <!-- Artifact list -->
        {#if items.length}
          <List twoLine avatarList>
            {#each items as item (item.id)}
              <Item
                data-testid={item.displayName}
                selected={item.id === selectedArtifactSetId}
                on:SMUI:action={() => onItemClicked(item)}
              >
                <Text>
                  <PrimaryText>{item.displayName}</PrimaryText>
                  <SecondaryText>{item.id}</SecondaryText>
                </Text>
                <Meta>
                    <IconButton
                      on:click$stopPropagation={() => {
                        navigator.clipboard.writeText(item.id);
                        displayMessage(`ID copied to Clipboard`);
                      }}
                      class="material-icons"
                      size="mini"
                      title="Copy ID to Clipboard"
                    >content_copy</IconButton>
                  </Meta>
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
      {#if selectedArtifactSetId}
        <ArtifactSetViewer
          initSelected={initialContentId ? [initialContentId] : []}
          bind:artifactSet={selectedArtifactSet}
          bind:contentType
          on:download={(event) => onDownload(event.detail)}
          on:upload={(event) => {
            const {repo, artifact} = event.detail;
            updateTarget = artifact;
            appendItem = repo;
          }}
          on:delete={(event) => {
              const {repo, contents} = event.detail;
              const prompt = contents.length === 1 ?
                `Are you sure you want to delete ${contents[0].displayName}?` :
                `Are you sure you want to delete the ${contents.length} items?`;

              confirmData = {
                title: 'Delete Content?',
                prompt,
                action: async () => {
                  const results = await Promise.allSettled(
                    contents.map(content => storage.disableArtifact(repo.id, content.id))
                  );
                  const failures = results.filter(res => res.status !== 'fulfilled');
                  filterMap(results, (res, i) => {
                    if (res.status !== 'fulfilled') {
                      return contents[i];
                    }
                  });
                  if (failures.length > 0) {
                    const msg = failures.map(f => f.reason).join('\n');
                    const error = new Error(msg);
                    console.error(error);
                    displayError(error);
                  }
                  loadContents(repo);
                }
              };
          }}
          on:copyUri={(event) => displayMessage("Copied URI: " + event.detail.name)}
          on:repoChange={(event) => loadContents(event.detail.repo)}
        />
      {/if}
    </AppContent>
  </div>
</main>

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

  main#app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .filter-header {
    display: block;
    padding-top: 10px;
  }

  /* FIXME: this is an annoying hack to get the placement/size right*/
  .drawer-container {
    position: relative;
    padding: 0 8px;
    flex: 1;
    min-height: 0;
    display: flex;
  }

  * :global(.app-content),
  * :global(.mdc-drawer-app-content) {
    flex: 1;
    overflow: auto;
    display: flex;
  }

  :global(.mdc-drawer-app-content) > main {
    min-height: 0;
    overflow-y: auto;
  }

  :global(.log.info) {
    --toastBackground: var(--mdc-theme-success);
  }
  :global(.log.warn) {
    --toastBackground: var(--mdc-theme-error);
  }

  :global(.empty) {
    opacity: 50%;
    font-style: italic;
  }
</style>
