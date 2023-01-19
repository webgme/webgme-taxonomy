<script lang="ts">
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Textfield from "@smui/textfield";
  import Dropzone from "svelte-file-dropzone";
  import Button, { Label } from "@smui/button";

  import { createEventDispatcher, getContext } from "svelte";
  import { isObject, readFile } from "../Utils";
  import TagFormatter, { FormatError } from "../Formatter";
  import type Storage from "../Storage";
  type DropEvent = CustomEvent<{ acceptedFiles: File[] }>;

  const dispatch = createEventDispatcher();
  const storage: Storage = getContext("storage");
  const formatter = new TagFormatter();

  export let set: { displayName: string, taxonomyTags: any[] } | null = null;
  export let contentType: string;

  let files: File[] = [];
  let metadata: any;

  const acccessors = {
    get open() { return set != null },
    set open(val: boolean) { 
      if (!val && (set != null)) {
        set = null;
      }
    }
  };

  $: displayName = set?.displayName ?? "";
  $: appendName = displayName;
  $: if (set != null) setMetadata(set.taxonomyTags ?? []);

  async function setMetadata(tags: any[]) {
    try {
      const taxonomyTags = await formatter.toHumanFormat(tags);
      metadata = { taxonomyTags };
    } catch (err) {
      if (err instanceof FormatError) {
        console.warn("Latest artifact has invalid taxonomy tags:", err.message);
      } else {
        console.error("An error occurred while setting default tags", err.stack);
      }
    }
  }

  function onAppendFileDrop(event: DropEvent) {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length) {
      files = acceptedFiles;
    }
    // TODO: handle rejections
  }

  async function onAppendTagsFileDrop(event: DropEvent) {
    const [tagsFile] = event.detail.acceptedFiles;
    if (tagsFile) {
      metadata = JSON.parse(await readFile(tagsFile));
    }
  }

  async function onAppendClicked() {
    if (!files.length) {
      dispatchError(`${contentType} file required.`);
    }

    metadata.displayName = appendName;
    dispatch("upload");
    try {
      await storage.appendArtifact(set, metadata, files);
      dispatch("complete");
    } catch (err) {
      console.log(err);
      dispatchError(`Unable to upload: ${err.message}`);
    }
  }

  function dispatchError(error: string) {
    return dispatch("error", { error });
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


<Dialog
  bind:open={acccessors.open}
  aria-labelledby="title"
  aria-describedby="content"
>
  <Title id="append-artifact-title">Append data to {displayName}</Title>
  <Content id="append-artifact-content">
    <Textfield label="Name" bind:value={appendName} />
    <p>{contentType} file(s):</p>

    <ul>
      {#each files as file}
        <li>{file.name}</li>
      {/each}
    </ul>

    <Dropzone on:drop={onAppendFileDrop} multiple={true}>
      <p>Select dataset to upload.</p>
    </Dropzone>

    <p>
      Taxonomy Terms <span style="font-style:italic">(optional)</span>:<br />
      {metadata
        ? metadata.taxonomyTags.map(getTagDisplayName).join(", ")
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
  </Content>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => onAppendClicked()}>
      <Label>Upload</Label>
    </Button>
  </Actions>
</Dialog>