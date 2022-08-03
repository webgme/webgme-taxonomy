<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	}
</script>
<script lang="ts">
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	export let tree
	const {name, children} = tree

	let expanded = _expansionState[name] || false
	const toggleExpansion = () => {
		expanded = _expansionState[name] = !expanded
	}
	$: arrowDown = expanded
	// TODO: keep track if we are checked or not
	let checked = false;

	// TODO: select checkbox -> select all children; partial select all parents (if false)
	// TODO: unselect checkbox -> unselect all children
	export function setSelection(selected: boolean) {
		checked = selected;
	}

	// TODO: get the state of the tag and all the children
	// mutate the existing data
	$: tree.selected = checked;
	$: checked && console.log({tree});
</script>

<ul>
	<li>
		{#if children}
		<FormField>
			<Checkbox bind:checked indeterminate={checked === null} />
			<span slot="label">
				{name}
			</span>
		</FormField>
		<div class="arrow" class:arrowDown on:click={toggleExpansion}>&#x25b6</div>
			{#if expanded}
				{#each children as child}
					<svelte:self tree={child} />
				{/each}
			{/if}
		{:else}
			<span>
				{name}
				<span class="no-arrow"/>
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem; 
		user-select: none;
	}
	.no-arrow { padding-left: 1.0rem; }
	.arrow {
		cursor: pointer;
		display: inline-block;
		padding-left: 20px;
		/* transition: transform 200ms; */
	}
	.arrowDown { transform: rotate(90deg); }
</style>

