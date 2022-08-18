<script lang="ts">
	import TaxonomyFilterTree from './TaxonomyFilterTree.svelte';
	export let trees;
	import {createEventDispatcher} from 'svelte';
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
		dispatch('change', {filterTags});
	}

</script>

<main>
	{#each trees as tree}
		<TaxonomyFilterTree tree={tree} on:change={onChange}/>
	{/each}
</main>
