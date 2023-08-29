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

  function getTagsDisplayNames(tags, prefix = null): string[] {
    const names = Object.entries(tags).flatMap(([name, value]) => {
      if (isObject(value)) {
        const isOption = Object.keys(value).length === 0;  // for an enum/set/list/etc
        if (isOption) {
          return [name];
        } else {
          return getTagsDisplayNames(value, name);
        }
      } else {
          return [`${name}: ${value}`];
      }
    });

    return names.map(name => {
      if (prefix) {
        return prefix + '.' + name;
      } else {
        return name;
      }
    });
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
    <!-- TODO: Check if they are actually optional -->
    <p>
      Taxonomy Terms <span style="font-style:italic">(optional)</span>:<br />
      {metadata && metadata.tags ? getTagsDisplayNames(metadata.tags) : ""}
      <!-- TODO: how to show these? -->
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

