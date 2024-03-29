<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";
  /*import Chip from "@smui/chips";*/
  import LinearProgress from "@smui/linear-progress";
  import {
    AppHeader,
    Chart,
   } from "./components";
  import type {ArtifactMetadatav2} from "../../Search/adapters/common/types";
  import { DateTimeInterval, getTimepoints, groupBy, shiftWhile, sortDates } from "../../../Search/Utils";

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

    const timeDates = sortDates(metadata
      .map(md => new Date(md.tags.Base.uploadedAt.time))
      );
    const uploadsByUser = groupBy(metadata, md => md.tags.Base.uploadedBy.user);

    if (Object.keys(uploadsByUser).length > 1) {
      uploadsByUser['Total Uploads'] = metadata.slice();
    }
    const userIds = Object.keys(uploadsByUser);

    const [interval, timestamps] = getTimepoints(timeDates);
    options.legend.data = userIds;
    const showTime = interval < DateTimeInterval.Day;
    const showDay = interval < DateTimeInterval.Month;
    const showMonth = interval < DateTimeInterval.Year;

    options.xAxis.data = timestamps.map(ts => {
      if (showTime) {
          return new Date(ts).toLocaleString();
      } else if (showDay) {
          return new Date(ts).toLocaleDateString();
      } else if (showMonth) {
          return new Date(ts).toLocaleDateString(undefined, {month: 'numeric', year: 'numeric'});
      } else {
          return new Date(ts).toLocaleDateString(undefined, {year: 'numeric'});
      }
    });
    options.series = Object.entries(uploadsByUser).map(([userId, uploads]) => {
      const uploadTimes = sortDates(
        uploads
          .map(upload => new Date(upload.tags.Base.uploadedAt.time))
      );

    const counts = timestamps
        .map(timestamp => shiftWhile(uploadTimes, time => time < timestamp).length);

    let total = 0;
    const cumulative = counts.map(c => total += c);

    return {
      name: userId,
      type: 'line',
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
