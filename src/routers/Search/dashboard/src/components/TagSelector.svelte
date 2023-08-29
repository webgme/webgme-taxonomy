<!--
  @component
  A component for selecting tags for a repository or content.
-->
<script lang="ts">
  import type { default as ContentType } from "../ContentType";
  import Dropzone from "svelte-file-dropzone";
  import {
    isObject,
    readFile,
  } from "../Utils";

  export let metadata;
  export let contentType: ContentType;
  export let displayTypeName: string = 'content';
  export let disabled: boolean = false;

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

  async function onTagsFileDrop(event) {
    const [tagsFile] = event.detail.acceptedFiles;
    console.log('file dropped', tagsFile);
    if (tagsFile) {
      metadata = JSON.parse(await readFile(tagsFile));
      console.log({metadata})
    }
  }

</script>

<div>
    <p> <!-- TODO: Check if they are actually optional -->
      Taxonomy Terms <span style="font-style:italic">(optional)</span>:<br />
      {metadata && metadata.taxonomyTags ? metadata.taxonomyTags.map(getTagDisplayName).join(", ") : ""}
    </p>

    {#if disabled}
      <Dropzone disabled accept=".json">
        <p>Select tags file for the {displayTypeName}.</p>
      </Dropzone>
    {:else}
      <Dropzone on:drop={onTagsFileDrop} accept=".json">
        <p>Select tags file for the {displayTypeName}.</p>
      </Dropzone>
    {/if}

    <a
      target="_blank"
      href={window.location.href
        .replace("/Search/", "/TagCreatorv1/") // FIXME: use the correct content type
        .replace(
          /[^\/]*\/static\//,
          `${encodeURIComponent(contentType.nodePath)}/static/`
        )}>Click to select tags for the {displayTypeName}.</a
    >
    <br/>
    <a
      target="_blank"
      href={window.location.href
        .replace("/Search/", "/TagCreatorv1/") // FIXME: use the correct content type
        .replace(
          /[^\/]*\/static\//,
          `${encodeURIComponent(contentType.nodePath)}/static/`
        )}>Click to try the new tag form (experimental).</a
    >
</div>

