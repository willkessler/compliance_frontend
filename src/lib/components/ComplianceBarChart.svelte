<script>
  import { LayerCake, Svg } from 'layercake';
  import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { writable, derived } from 'svelte/store';
  import { onMount } from 'svelte';

  export let chartTitle = "Your statistics";
  export let trucksOutOfCompliance = 0;
  export let totalTrucks = 0;
  export let driversOutOfCompliance = 0;
  export let totalDrivers = 0;

  let chart;
  let dimensions = writable({ width: 300, height: 80 });

  const data = writable([
    { category: 'Trucks', outOfCompliance: trucksOutOfCompliance, total: totalTrucks },
    { category: 'Drivers', outOfCompliance: driversOutOfCompliance, total: totalDrivers }
  ]);

  $: {
    data.set([
      { category: 'Trucks', outOfCompliance: trucksOutOfCompliance, total: totalTrucks },
      { category: 'Drivers', outOfCompliance: driversOutOfCompliance, total: totalDrivers }
    ]);
  }

  const xScale = derived([data, dimensions], ([$data, $dimensions]) => 
    scaleLinear()
      .domain([0, Math.max(...$data.map(d => d.total))])
      .range([0, $dimensions.width - 50])
  );

 const yScale = derived([data, dimensions], ([$data, $dimensions]) => 
   scaleBand()
     .domain($data.map(d => d.category))
     .range([0, $dimensions.height - 10]) // Adjusted range
     .padding(0.4)  // Adjusted padding
  );

  const colorScale = scaleOrdinal()
    .domain(['outOfCompliance', 'inCompliance'])
    .range(['#FFA500', '#00bb00']);

  const tweenedData = tweened($data, {
    duration: 500,
    easing: cubicOut
  });

  $: tweenedData.set($data);

  onMount(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        dimensions.set({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    resizeObserver.observe(chart);

    return () => {
      resizeObserver.disconnect();
    };
  });
</script>

<div class="chart-container" bind:this={chart}>
  <h3 class="chart-title">{chartTitle}</h3>
  <LayerCake
    x={d => d.total}
    y={d => d.category}
    data={$tweenedData}
    xScale={$xScale}
    yScale={$yScale}
    padding={{ top: 5, right: 20, bottom: 10, left: 10 }}
    width={$dimensions.width}
    height={$dimensions.height}
  >
    <Svg>
      <g class="bars">
        {#each $tweenedData as d, i}
          <text
            x={$xScale(0)}
            y={$yScale(d.category) - 2}
            font-size="12"
            font-weight="600"
            fill="#333"
          >{d.category}</text>
          <rect
            x={$xScale(0)}
            y={$yScale(d.category)}
            width={$xScale(d.outOfCompliance) - $xScale(0)}
            height={$yScale.bandwidth()}
            fill={colorScale('outOfCompliance')}
          />
          <rect
            x={$xScale(d.outOfCompliance)}
            y={$yScale(d.category)}
            width={$xScale(d.total) - $xScale(d.outOfCompliance)}
            height={$yScale.bandwidth()}
            fill={colorScale('inCompliance')}
          />
          <text
            x={$xScale(0)}
            y={$yScale(d.category) + $yScale.bandwidth() + 10}
            font-size="10"
            fill="#333"
          >{d.outOfCompliance} / {d.total} out of compliance</text>
        {/each}
      </g>
    </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }
  .chart-title {
    margin: 0 0 2px 0;
    font-size: 16px;
    font-weight: 500;
  }
</style>
