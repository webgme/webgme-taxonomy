<script lang="ts">
  import type { FilterTag } from "../tags";
  import TaxonomyFilterTree from "./TaxonomyFilterTree.svelte";
  export let trees: FilterTag[] = [];
  export let tags = [];
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  $: filterTreeProps = trees.map((tree) => ({
    tree,
    tags: tags.filter((tag) => tree.canMatch(tag)),
  }));

  function getSelectedTags(node) {
    const tags = node.children.flatMap(getSelectedTags);
    if (node.selected) {
      tags.push(node);
    }
    return tags;
  }

  function onChange() {
    const filterTags = trees.flatMap(getSelectedTags);
    dispatch("change", { filterTags });
  }
</script>

<main>
  {#each filterTreeProps as props (props.tree.id)}
    <TaxonomyFilterTree {...props} on:change={onChange} />
  {/each}
</main>
