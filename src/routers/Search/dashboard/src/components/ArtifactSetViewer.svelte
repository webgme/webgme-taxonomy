<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { capitalize, getDefaultContentType, getTagValue } from "../Utils";
  import TagFormatter from "../Formatter";
  import Card, { Content, Actions } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import Menu from "@smui/menu";
  import IconButton from "@smui/icon-button";
  import List, {
    Item,
    Text,
    PrimaryText,
    SecondaryText,
    Meta,
  } from "@smui/list";
  import Checkbox from "@smui/checkbox";
  import DisplayTagsDialog from "./DisplayTagsDialog.svelte";
  import { LoadState, type Artifact, type PopulatedRepo } from "../Storage";
  import type { ContentTypeConfiguration } from "../../../../../common/SearchFilterDataExporter";

  export let artifactSet: PopulatedRepo;
  export let contentType: ContentTypeConfiguration = getDefaultContentType('content');
  export let initSelected: string|null;
  let numArtifacts = 10;
  let shownArtifacts = [];
  let selected = [];

  let menu: Menu;
  const formatter = new TagFormatter();
  const dispatch = createEventDispatcher();

  async function onDownloadClicked() {
    dispatch("download", {
      artifactSet: artifactSet,
      artifactIds: [...selected],
    });
  }

  let displayedTags = null;
  let displayedName = null;
  let displayTags = false;
  async function showTags(artifact: Artifact) {
    displayedTags = await formatter.toHumanFormat(artifact.tags);
    displayedName = artifact.displayName;
    displayTags = true;
  }

  async function getUri(content: Artifact, tags=null) {
    tags = tags ?? await formatter.toHumanFormat(content.tags);
    return getTagValue(tags, 'Base', 'URI', 'value');
  }

  async function onCopyLink(content: Artifact) {
    const tags = await formatter.toHumanFormat(content.tags);
    const uri = await getUri(content, tags);

    try {
      await navigator.clipboard.writeText(uri || getDeprecatedID(content));
      dispatch("copyUri", {
        uri: uri || getDeprecatedID(content),
        name: getTagValue(tags, 'Base', 'name', 'value') || content.displayName
      })
    } catch (e) {
      console.error(`Unable to copy URI to clipboard:`, e);
      // TODO - we should probably limit the clipboard to regular use
    }
  }

  async function onDeleteArtifact() {
    const contents = selected
      .map(id => artifactSet.children.find(content => content.id === id));

    dispatch("delete", {
      repo: artifactSet,
      contents,
    });
  }

  async function onUpdateArtifact(artifact: Artifact) {
    dispatch("upload", {
      repo: artifactSet,
      artifact: artifact,
    });
  }

  async function onSelectContent() {
    if (selected.length === 1) {
      const content = artifactSet.children.find(content => content.id === selected[0]);
      const uri = await getUri(content);
      const id = getDeprecatedID(content);
      parent.postMessage({type:'selectArtifact', value: id, uri}, "*");
    } else {
      const repoId = getDeprecatedID();
      parent.postMessage({type:'selectArtifact', value: repoId}, "*");
    }
  }

  function getDeprecatedID(content?: Artifact) {
    return content ? artifactSet.id + '_' + content.id : artifactSet.id;

  }

  async function onUploadClicked() {
    dispatch("upload", {
      repo: artifactSet,
      artifact: null,
    });
  }

  let artifactSetId = null;
  let artifactSetChildrenIds: string[] = [];
  $: artifactSet, onArtifactSetChange();

  function onArtifactSetChange() {
    console.log('onArtifactSetChange');
    if (!artifactSet || artifactSet.loadState === LoadState.Pending) {
      artifactSetId = null;
      artifactSetChildrenIds = [];
      return;
    }

    const prevSelectedId = artifactSetId;
    const prevChildrenIds = new Set(artifactSetChildrenIds);
    artifactSetId = artifactSet.id;
    artifactSetChildrenIds = artifactSet.children.map((artifact) => artifact.id);

    if (initSelected) {
      // In initial load and content was set from url query param and passed in here..
      numArtifacts = artifactSet.children.length; // expand all
      if (artifactSetChildrenIds.includes(initSelected)) {
        selected = [ initSelected ];
      } else {
        const [idx] = initSelected.split('_');
        selected = [];
        for (const childId of artifactSetChildrenIds) {
          if (childId.split('_')[0] === idx) {
            selected = [ childId ];
            break;
          }
        }

        console.error("TODO: This will be handled differently when versions are displayed.");
        alert(selected.length > 0 ?
          "Different version of artifact from URI will be selected" : "Could not find matching artifact for URI.");
      }

      initSelected = null;
    } else {
      if (prevChildrenIds.size !== artifactSetChildrenIds.length) {
        numArtifacts = Math.min(artifactSet.children.length, 10);
      } else if (artifactSetChildrenIds.some((id) => !prevChildrenIds.has(id))) {
        setShownArtifacts(numArtifacts);
      }

      if (prevSelectedId !== artifactSetId || selected.some(id => !artifactSetChildrenIds.includes(id))) {
        // Switched artifact set or some where deleted.
        setTimeout(()=> {
          console.log('selected reset');
          selected = [];
        });
      }
    }
  }

  $: console.log("selected", JSON.stringify(selected));

  $: setShownArtifacts(numArtifacts);

  function setShownArtifacts(numArtifacts: number) {
    if (artifactSet) {
      const start = artifactSet.children.length - numArtifacts;
      shownArtifacts = artifactSet.children.slice(start, start + numArtifacts);
    }
  }

  function formatTime(timeString: string) {
    const date = new Date(timeString);
    const formatOpts = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    } as const;
    return date.toLocaleDateString("en-us", formatOpts);
  }
</script>

{#if displayTags}
  <DisplayTagsDialog
    bind:open={displayTags}
    displayName={displayedName}
    bind:taxonomyTags={displayedTags}/>
{/if}
<div class="card-container">
  <!-- TODO: add a header for the observation -->
  <!-- TODO: upload times -->
  <!-- Artifact list -->
  <Card>
    <Content>
      <h2 class="mdc-typography--headline6" style="margin: 0;">
        {capitalize(contentType.content.namePlural)} in {artifactSet.displayName}
      </h2>
      <h4
        class="mdc-typography--subtitle3"
        style="margin: 0; color: #888;text-align:right"
      >
        Showing {Math.min(1, numArtifacts)}-{numArtifacts} of {artifactSet
          .children.length}
        <IconButton
          class="material-icons"
          style="vertical-align: middle; margin: 0; padding: 0;"
          on:click={() => menu.setOpen(true)}
          title="Options">more_vert
        </IconButton>
          <Menu bind:this={menu} anchorCorner="BOTTOM_RIGHT">
            <List>
              <Item
                on:SMUI:action={() =>
                  (numArtifacts = Math.min(
                    artifactSet.children.length,
                    numArtifacts + 10
                  ))}
              >
                <Text>SHOW MORE</Text>
              </Item>
              <Item
                on:SMUI:action={() =>
                  (numArtifacts = artifactSet.children.length)}
              >
                <Text>SHOW ALL</Text>
              </Item>
            </List>
          </Menu>
      </h4>
      <!-- add show more button, select all -->
      <List checkList twoLine>
        <!-- TODO: check if they have permissions to append to it -->
        {#each shownArtifacts as artifact (artifact.id)}
          <Item
            class="repo-content"
            data-testid={artifact.displayName}
          >
              <Checkbox bind:group={selected} value={artifact.id} />
            <Text>
              <PrimaryText>{artifact.displayName}</PrimaryText>
              <SecondaryText>
                {artifact.time
                  ? "Uploaded on " + formatTime(artifact.time)
                  : ""}
              </SecondaryText>
            </Text>
            <Meta>
              <IconButton
                on:click$stopPropagation={() => onUpdateArtifact(artifact)}
                class="material-icons"
                size="mini"
                title="Edit"
              >edit</IconButton>
              <IconButton
                on:click$stopPropagation={() => showTags(artifact)}
                class="material-icons"
                size="mini"
                title="View Metadata"
              >info</IconButton>
              <IconButton
                on:click$stopPropagation={() => onCopyLink(artifact)}
                class="material-icons"
                size="mini"
                title="Copy URI"
              >link</IconButton>
            </Meta>
          </Item>
        {/each}
      </List>
    </Content>
    <Actions>
      <Button on:click={onUploadClicked}>
        <Label>Upload</Label>
      </Button>
      <Button on:click={onDownloadClicked} disabled={selected.length === 0}>
        <Label>Download</Label>
      </Button>
      <Button on:click={() => onDeleteArtifact()} disabled={selected.length === 0}>
        <Label>Delete</Label>
      </Button>
      {#if window.self !== window.top }
      <Button on:click={() => onSelectContent()} disabled={selected.length !== 1}>
        <Label>Select</Label>
      </Button>
      {/if}
    </Actions>
  </Card>
</div>

<style>
  .card-container {
    display: inline-flex;
    vertical-align: top;
  }

  .card-container > :global(.mdc-card) {
    flex: 1;
  }

  .card-container > :global(.mdc-card .smui-card__content) {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    min-height: 0;
  }

  .card-container > :global(.mdc-card .smui-card__content .mdc-deprecated-list) {
    flex: 0 1 auto;
    overflow-y: auto;
  }
</style>
