<script lang="ts">
  export let options;
  let chartEl;
  let chart;

  $: console.log(options);
  async function render() {
  console.log('render!');
    chart = echarts.init(chartEl);
  }

</script>

<div bind:this={chartEl} style="width:100%;height:100%"></div>
<svelte:head>
  <script src="./echarts.min.js" on:load={render} ></script>
</svelte:head>
