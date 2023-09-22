<script lang="ts">
  export let options;
  let chartEl;
  let chart;

  $: onOptionsChange(options);

  function onOptionsChange(options) {
    if (chart) {
      chart.setOption(options)
    }
    console.log({chart, options})
  }

  async function render() {
    chart = echarts.init(chartEl);
    if (options) {
      onOptionsChange(options);
    }
    console.log({chartEl, chart})
  }

</script>

<div bind:this={chartEl} style="width:100%;height:100%"></div>
<svelte:head>
  <script src="./echarts.min.js" on:load={render} ></script>
</svelte:head>
