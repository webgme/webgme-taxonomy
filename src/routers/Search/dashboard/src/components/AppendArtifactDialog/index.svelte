<!--
  @component
  A dialog for tagging and uploading content to a repository.
-->
<script lang="ts">
  import type { Artifact, PopulatedRepo, UploadPromise } from "../../Storage";
  import type { default as ContentType } from "../../ContentType";

  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Paper, { Subtitle } from "@smui/paper";
  import Button, { Label, Icon } from "@smui/button";
  import DatasetStep from "./DatasetStep.svelte";
  import TagsStep from "./TagsStep.svelte";

  /** The repo to upload a new artifact to. Null to hide dialog.*/
  export let repo: PopulatedRepo | null = null;
  /** The content type name for the artifact set to append to. */
  export let contentType: ContentType;
  /** The content ID to update. If null, then append instead */
  export let content: Artifact | null = null;

  let open = false;
  let title = "";
  let artifactName = "";
  let tagging = true;
  let uploads: UploadPromise[] | null = null;

  /** The files to append as an artifact to this artifact set. */
  let files: File[] = [];

  $: setOpen(repo != null);
  $: setNameAndTitle(repo, content);

  function setOpen(value: boolean) {
    if (value !== open) open = value;
  }

  function setNameAndTitle(repo: PopulatedRepo, content: Artifact | null) {
    const repoName = repo?.displayName ?? "";
    artifactName = content?.displayName ?? repoName;
    title = (content != null) ? `Update ${content.displayName}`: `Append data to ${repoName}`;
  }

  async function upload() {
    console.log("TODO: upload the files and metadata to the repo");
  }
</script>
  
<Dialog
  bind:open
  aria-labelledby="upload-artifact-title"
  aria-describedby="upload-artifact-content"
>
  <Title id="upload-artifact-title">{title}</Title>
  <Content id="upload-artifact-content">

    {#if tagging}
      <Paper variant="outlined">
        <Subtitle>Select Tags for the Content</Subtitle>
        <Content>
          <TagsStep schema={{}}></TagsStep>
        </Content>
      </Paper>
    {:else}
      <Paper variant="outlined">
        <Subtitle>Name and Select Content</Subtitle>
        <Content>
          <DatasetStep
            contentType={contentType.name}
            bind:name={artifactName}
            bind:files={files}
            bind:uploads={uploads}
          />
        </Content>
      </Paper>
    {/if}

  </Content>
  <Actions id="upload-artifact-actions">
    <div class="actions-group">
      {#if !tagging}
        <Button action={null} on:click={(e) => { tagging = true }}>
          <Icon class="material-icons">arrow_back</Icon>
          <Label>Back</Label>
        </Button>
      {/if}
    </div>
    
    <div class="actions-group">
      <Button>
        <Label>Cancel</Label>
      </Button>
      {#if tagging}
        <Button default action={null} on:click={(e) => { tagging = false }}>
          <Label>Next</Label>
          <Icon class="material-icons">arrow_forward</Icon>
        </Button>
      {:else}
        <Button default  action={null} on:click={() => upload()}>
          <Label>Upload</Label>
          <Icon class="material-icons">upload</Icon>
        </Button>
      {/if}
    </div>
  </Actions>
</Dialog>

<style lang="scss">
  :global(#upload-artifact-actions) {
    justify-content: space-between;
  }
</style>