<script lang="ts">
  import type { FilterTag } from "./FilterTag";
  import TaxonomyFilterTree from "./TaxonomyFilterTree.svelte";
  export let trees: FilterTag[];
  export let tags = [];
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

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

  function treeOptions(tree: FilterTag) {
    return tree.matchable(tags).map(({ value }) => value);
  }

</script>

<main>
  {#each trees as tree}
    <TaxonomyFilterTree {tree} options={treeOptions(tree)} on:change={onChange} />
  {/each}
</main>
