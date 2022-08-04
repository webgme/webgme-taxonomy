<script lang="ts">
	import TaxonomyFilterTree from './TaxonomyFilterTree.svelte';
	export let trees;
	// TODO: add event handler for changes? Or a button to apply them?
</script>

<main>
	{#each trees as tree}
		<TaxonomyFilterTree tree={tree} />
	{/each}
</main>
