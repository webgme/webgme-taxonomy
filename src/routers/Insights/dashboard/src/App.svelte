<script lang="ts">
  import { setContext } from "svelte";
  import Textfield from "@smui/textfield";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";
  /*import Chip from "@smui/chips";*/
  import List, {
    Item,
    Text,
    PrimaryText,
    SecondaryText,
  } from "@smui/list";
  import Drawer, { Content, AppContent } from "@smui/drawer";
  import LinearProgress from "@smui/linear-progress";
  import Paper, { Content as PaperContent } from "@smui/paper";
  import {
    AppHeader,
    Chart,
   } from "./components";
  import type {ArtifactMetadatav2} from "../../Search/src/adapters/common/types";
  import { groupBy } from "../../Search/src/Utils";

  const projectId = decodeURIComponent(location.href.split('/Insights/').pop().split('/').shift());
  let title: string = `Platform Insights: ${projectId.split('+').pop()}`;

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
      data: [],
    },
    yAxis: {},
    series: [
      {
        name: "sales",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };

  async function fetchData(): Promise<ArtifactMetadatav2[]> {
    const url = location.href.replace(/static\/$/, 'metadata/');
    const response = await fetch(url);
    const metadata: ArtifactMetadatav2[] = await response.json();

    return metadata;
  }

  async function initialize(): Promise<void> {
    metadata = await fetchData();
    console.log({metadata});
    // TODO: convert the metadata to the correct format

    // TODO: groupBy userId
    // TODO: For each group, count within given time windows
    // TODO: maybe weeks?

    // TODO:
    const timeDates = metadata
      .map(md => new Date(md.tags.Base.uploadedAt.time))
      .sort();
    const uploadsByUser = groupBy(metadata, md => md.tags.Base.uploadedBy?.user);
    const userIds = Object.keys(uploadsByUser);

    // TODO: add label to y axis about cumulative uploads
    // TODO: start time, end time
    const now = new Date();
    const startTime = Math.min(now, ...timeDates);
    const endTime = Math.max(now, ...timeDates);
    const timestamps = getTimepoints(startTime, endTime);

    options.legend.data = userIds;
    options.xAxis.data = timestamps.map(ts => new Date(ts));
    options.series // TODO

    isLoading = false
  }

  function getTimepoints(startTime: number, endTime: number): number[] {
    const day = 1000 * 60 * 60 * 24;
    // TODO: get a reasonable x-axis
    const times = [startTime];
    let last = startTime;

    while (last !== endTime) {
      last = Math.min(last + day, endTime);
      times.push(last);
    }
    return times;
  }
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
