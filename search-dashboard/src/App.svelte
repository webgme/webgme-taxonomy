<script lang="ts">
	import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
	import Textfield from '@smui/textfield';
	import List, {Item, Text, PrimaryText, SecondaryText} from '@smui/list';
	import Drawer, {Content, AppContent} from '@smui/drawer';
	import TaxonomyFilter from './TaxonomyFilter.svelte';
	import TaxonomyData from './TaxonomyData.ts';

	export let title: string = 'Search Dashboard';
	let searchKeyword: string = '';

	import testData from './TestTaxonomyData.js';
	export let taxonomy: TaxonomyData = testData;
</script>

<TopAppBar variant="static">
	<Row>
	  <Section>
		<Title>{title}</Title>
	  </Section>
	</Row>
</TopAppBar>
<!--<Textfield label="Search..." bind:value={searchKeyword}/>-->

<!-- TODO: make sure the drawer is collapsible -->
	<Drawer>
		<!-- TODO: make the taxonomy view -->
		<!-- TODO: make them all checkboxes?? -->
		<Content>
			<span>Filters</span>
			<TaxonomyFilter tree={taxonomy} />
		</Content>
	</Drawer>
	<AppContent>
		<main>
			<List twoLine avatarList singleSelection>
				<!-- TODO: populate this dynamically -->
				<Item>
					<Text>
						<PrimaryText>Title</PrimaryText>
						<PrimaryText>Subtitle</PrimaryText>
					</Text>
				</Item>
			</List>
		</main>
	</AppContent>

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
</style>
