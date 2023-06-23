<!--
  @component
  A tag visualized as a hierarchical SMUI item
-->
<script lang="ts">
  import {isObject} from '../Utils';
  import List, {
    Item,
    Text,
  } from "@smui/list";

  export let tag;
  export let depth = 0;
  const levels = getTagValuesList(tag);

  function getTagValuesList(tag) {
    return Object.entries(tag).map(([key, value]: [string, any]) => {
        if (isObject(value)) {
        
        }
    });
  }

</script>

{#each Object.keys(tag) as key}
  {#if isObject(tag[key])}
    <Item><Text>{key}</Text></Item>
    <Item wrapper>
      <List style="padding-left: {10*(depth + 1)}px">
        <svelte:self tag={tag[key]} depth={depth + 1}/>
      </List>
    </Item>
  {:else}
    <Item><Text>{key}: {tag[key]}</Text></Item>
  {/if}
{/each}
