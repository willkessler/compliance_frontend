<script>
  import { LayerCake, Svg } from 'layercake';
  import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
  import { timeParse } from 'd3-time-format';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { writable, derived } from 'svelte/store';
  import { onMount } from 'svelte';

  export let chartTitle = "Scores History, Past 30 Days";
  
  // Generate sample data for the past 30 days
  const generateSampleData = () => {
    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        csaScore: Math.random() * 50 + 50, // Random score between 50-100
        safetyScore: Math.random() * 50 + 50 // Random score between 50-100
      });
    }
    return data;
  };

  let chart;
  let dimensions = writable({ width: 600, height: 300 });
  
  const data = writable(generateSampleData());

  const parseDate = timeParse('%Y-%m-%d');

  const xScale = derived([data, dimensions], ([$data, $dimensions]) => 
    scaleBand()
      .domain($data.map(d => d.date))
      .range([0, $dimensions.width - 20])
      .padding(0.1)
  );

  const yScale = derived(dimensions, ($dimensions) => 
    scaleLinear()
      .domain([0, 200]) // Max possible sum of csaScore and safetyScore
      .range([$dimensions.height - 40, 0])
  );

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
    x={d => d.date}
    y={d => d.csaScore + d.safetyScore}
    data={$tweenedData}
    xScale={$xScale}
    yScale={$yScale}
    padding={{ top: 20, right: 20, bottom: 40, left: 20 }}
    width={$dimensions.width}
    height={$dimensions.height}
  >
    <Svg>
      <g class="bars">
        {#each $tweenedData as d, i}
          <rect
            x={$xScale(d.date)}
            y={$yScale(d.csaScore + d.safetyScore)}
            width={$xScale.bandwidth()}
            height={$dimensions.height - 40 - $yScale(d.csaScore + d.safetyScore)}
            fill="#00bb00"
          />
          <rect
            x={$xScale(d.date)}
            y={$yScale(d.csaScore + d.safetyScore)}
            width={$xScale.bandwidth()}
            height={$dimensions.height - 40 - $yScale(d.safetyScore)}
            fill="#ffa500"
          />
        {/each}
      </g>
      <!-- X-axis -->
      <g class="x-axis">
        {#each $tweenedData.filter((_, i) => i % 5 === 0) as d, i}
          <text
            x={$xScale(d.date) + $xScale.bandwidth() / 2}
            y={$dimensions.height - 10}
            text-anchor="middle"
            font-size="10"
          >{d.date.slice(-5)}</text>
        {/each}
      </g>
      <!-- Y-axis -->
      <g class="y-axis">
        {#each [0, 50, 100, 150, 200] as tick}
          <text
            x="5"
            y={$yScale(tick)}
            text-anchor="start"
            font-size="10"
            dy="0.3em"
          >{tick}</text>
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
    margin: 10px 0 5px 0px;
    font-size: 16px;
    font-weight: 500;
  }
</style>
