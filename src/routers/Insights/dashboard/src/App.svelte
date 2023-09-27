<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  /*import Chip from "@smui/chips";*/
  import LinearProgress from "@smui/linear-progress";
  import {
    AppHeader,
    Chart,
   } from "./components";
  import type {ArtifactMetadatav2} from "../../Search/src/adapters/common/types";
  import { getTimepoints, groupBy, shiftWhile } from "../../../Search/src/Utils";

  const projectId = decodeURIComponent(location.href.split('/Insights/').pop().split('/').shift());
  let title: string = `Content Insights: ${projectId.split('+').pop()}`;

  let isLoading = true;
  let metadata = [];
  let options = {
    title: {
      text: "Content Uploads by User",
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [],
    },
    xAxis: {
      name: 'Uploaded At',
      nameLocation: 'middle',
      nameTextStyle: {fontWeight: 'bold'},
      data: [],
    },
    yAxis: {
      name: 'Uploads (Cumulative)',
      nameLocation: 'middle',
      minInterval: 1,  // integers only
      nameTextStyle: {fontWeight: 'bold'},
    },
    series: []
  };

  async function fetchData(): Promise<ArtifactMetadatav2[]> {
    const url = location.href.replace(/static\/$/, 'metadata/');
    const response = await fetch(url);
    const metadata: ArtifactMetadatav2[] = await response.json();

    return metadata;
  }

  async function initialize(): Promise<void> {
    const allMetadata = await fetchData();
    metadata = allMetadata.filter(md => md.tags.Base?.uploadedAt?.time && md.tags.Base?.uploadedBy?.user);
    console.log('Found', allMetadata.length, 'content items (' + (allMetadata.length - metadata.length), 'missing required Base terms)');

    const timeDates = metadata
      .map(md => new Date(md.tags.Base.uploadedAt.time))
      .sort();
    const uploadsByUser = groupBy(metadata, md => md.tags.Base.uploadedBy.user);
    const userIds = Object.keys(uploadsByUser);

    // TODO: add label to y axis about cumulative uploads
    // TODO: start time, end time
    const timestamps = getTimepoints(timeDates);

    options.legend.data = userIds;
    options.xAxis.data = timestamps.map(ts => new Date(ts).toString());
    options.series = Object.entries(uploadsByUser).map(([userId, uploads]) => {
      const uploadTimes = uploads
        .map(upload => new Date(upload.tags.Base.uploadedAt.time));

    let total = 0;
    const counts = timestamps
        .map(timestamp => shiftWhile(uploadTimes, time => time < timestamp).length);

    const cumulative = counts.map(c => total += c);

    return {
      name: userId,
      type: 'line',
      stack: 'Total',
      data: cumulative,
    };
  });

    isLoading = false
  }

  // TODO: finish this and test it
  initialize();

</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<!-- Main app -->
<main id="app">
  <AppHeader
    {title}
  />
  {#if isLoading}
    <LinearProgress indeterminate />
  {:else}
    <Chart {options} />
  {/if}
  <SvelteToast options={{ classes: ["log"] }} />
  <!-- TODO: make the drawer collapsible? -->
</main>

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
<link rel="stylesheet" href="build/smui.css" />

<style>
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  main#app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  * :global(.app-content),
  * :global(.mdc-drawer-app-content) {
    flex: 1;
    overflow: auto;
    display: flex;
  }

  :global(.mdc-drawer-app-content) > main {
    min-height: 0;
    overflow-y: auto;
  }

  :global(.log.info) {
    --toastBackground: var(--mdc-theme-success);
  }
  :global(.log.warn) {
    --toastBackground: var(--mdc-theme-error);
  }

  :global(.empty) {
    opacity: 50%;
    font-style: italic;
  }
</style>
