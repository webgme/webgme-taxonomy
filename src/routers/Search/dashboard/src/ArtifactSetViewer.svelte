<script lang="ts">
  import { capitalize } from "./Utils.ts";
  import Card, { Content, Actions } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import type { ButtonComponentDev } from "@smui/button";
  import Menu from "@smui/menu";
  import type { MenuComponentDev } from "@smui/menu";
  import IconButton from "@smui/icon-button";
  import List, {
    Item,
    Text,
    PrimaryText,
    SecondaryText,
    Meta,
  } from "@smui/list";
  import Checkbox from "@smui/checkbox";
  import type Storage from "./Storage.ts";

  export let artifactSet;
  export let contentType = "artifact";
  let numArtifacts = 10;
  let artifacts = artifactSet ? artifactSet.children : [];
  let selected = [];
  let menu: MenuComponentDev;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  async function onDownloadClicked() {
    dispatch("download", {
      artifactSet: artifactSet,
      artifactIds: selected.slice(),
    });
  }

  async function onUploadClicked() {
    dispatch("upload", {
      artifactSet: artifactSet,
    });
  }

  $: onArtifactSetChange(artifactSet);
  $: console.log({ selected });

  let prevSetHash = artifactSet && artifactSet.hash;
  function onArtifactSetChange() {
    console.log("onArtifactSetChange");
    if (prevSetHash !== artifactSet.hash) {
      artifacts = artifactSet.children;
      if (selected.length) selected = [];
      numArtifacts = Math.min(artifacts.length, 10);
      prevSetHash = artifactSet.hash;
    }
  }

  function formatTime(timeString) {
    const date = new Date(timeString);
    const formatOpts = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString("en-us", formatOpts);
  }
</script>

<div style="display: inline-block; vertical-align: top">
  <!-- TODO: add a header for the observation -->
  <!-- TODO: upload times -->
  <!-- Artifact list -->
  <Card>
    <Content>
      <h2 class="mdc-typography--headline6" style="margin: 0;">
        {capitalize(contentType)}s in {artifactSet.displayName}
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
          title="Options">more_vert</IconButton
        >
        <Menu bind:this={menu} anchorCorner="BOTTOM_RIGHT">
          <Item
            on:SMUI:action={() =>
              (numArtifacts = Math.min(artifacts.length, numArtifacts + 10))}
          >
            <Text>Show more...</Text>
          </Item>
          <Item on:SMUI:action={() => (numArtifacts = artifacts.length)}>
            <Text>Show all...</Text>
          </Item>
        </Menu>
      </h4>
      <!-- add show more button, select all -->
      <List checkList>
        <!-- TODO: check if they have permissions to append to it -->
        {#each artifacts
          .reverse()
          .slice(0, numArtifacts) as artifact (artifact.id)}
          <Item>
            <Text>
              <PrimaryText>{artifact.displayName}</PrimaryText>
              <SecondaryText>
                {artifact.time
                  ? "Uploaded on " + formatTime(artifact.time)
                  : ""}
              </SecondaryText>
            </Text>
            <Meta>
              <Checkbox value={artifact.id} />
            </Meta>
          </Item>
        {/each}
      </List>
    </Content>
    <Actions>
      <Button on:click={onUploadClicked}>
        <Label>Upload</Label>
      </Button>
      <Button on:click={onDownloadClicked} disabled={selected.length == 0}>
        <Label>Download</Label>
      </Button>
    </Actions>
  </Card>
</div>
