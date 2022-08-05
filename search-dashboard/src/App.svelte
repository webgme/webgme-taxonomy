<script lang="ts">
	import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
	import Textfield from '@smui/textfield';
	import Chip from '@smui/chips';
	import List, {Item, Text, PrimaryText, SecondaryText} from '@smui/list';
	import Drawer, {Content, AppContent} from '@smui/drawer';
	import TaxonomyFilter from './TaxonomyFilter.svelte';
	import TaxonomyData from './TaxonomyData.ts';

	export let title: string = 'Digital Phenotyping Dashboard ';
	let searchKeyword: string = '';

	import testData from './TestTaxonomyData.js';
	let vocabularies: TaxonomyData[] = testData.children[0].children;

	$: console.log('vocab changed:', vocabularies);
	import testDataItems from './TestResultData.js';
	let items = testDataItems;

	function isTypeOfTag(tag, typeTag) {
			// TODO: check if tag is type of typeTag (add inheritance)
			// TODO: handle inheritance
			return tag.id === typeTag.id && typeTag.value == tag.value;
	}

	function onFilterUpdate(event) {
		const {filterTags} = event.detail;
		const filter = item => {
			const [{taxonomyTags}] = item.Data;

			const missingTag = filterTags
					.find(filterTag => !!taxonomyTags.find(tag => isTypeOfTag(tag, filterTag)));

			return !missingTag;
		};

		console.log('filter updated!');
		items = testDataItems.filter(item => filter(item));
	}
</script>

<TopAppBar variant="static">
	<Row>
	  <Section>
		<Title>{title}</Title>
	  </Section>
	</Row>
</TopAppBar>

<!-- TODO: make sure the drawer is collapsible -->
<div class="drawer-container">
	<Drawer>
		<Content>
			<Textfield label="Search..." bind:value={searchKeyword}/>
			<span class="filter-header">Advanced Filters</span>
			<TaxonomyFilter trees={vocabularies} on:change={onFilterUpdate}/>
		</Content>
	</Drawer>
	<AppContent>
		<main>
			<List twoLine avatarList>
				{#each items as item}
					<Item>
						<Text>
							<PrimaryText>{item.Data[0].Label}</PrimaryText>
							<SecondaryText>{Math.floor(Math.random()*10) + 1} revisions. <a>Earlier versions.</a> </SecondaryText>
						</Text>
						{#each item.Data[0].taxonomyTags as tag}
						<Chip chip={tag.id}>
						{#if tag.value}
								<Text>{tag.name}: {tag.value}</Text>
						{:else}
								<Text>{tag.name}</Text>
						{/if}
						</Chip>
						{/each}
					</Item>
				{/each}
			</List>
		</main>
	</AppContent>
</div>

<!-- Material Icons -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
<!-- Roboto -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
/>
<!-- Roboto Mono -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto+Mono"
/>
<!-- TODO: move this from the CDN to our own style sheet -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/svelte-material-ui@6.0.0/bare.min.css"
/>

<style>
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.filter-header {
		display: block;
		padding-top: 10px;
	}

	/* FIXME: this is an annoying hack to get the placement/size right*/
	.drawer-container {
		position: relative;
		display: flex;
		height: 100%;
	}

	  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }
</style>
