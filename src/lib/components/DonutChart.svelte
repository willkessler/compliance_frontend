<script>
 // adapted from https://svelte.dev/repl/257ba782208740038e04badd0b1c5ef5?version=4.1.1
  import { scaleOrdinal } from "d3-scale";
  import { pie, arc } from "d3-shape";

  /**
   * @typedef {Object} Props
   * @property {string} [title]
   * @property {any} [data]
   * @property {boolean} [showPercentages]
   */

  /** @type {Props} */
  let { title = "Donut Chart", data = [
    { label: "A", value: 9, color: "#ff6384" },
    { label: "B", value: 20, color: "#36a2eb" },
    { label: "C", value: 30, color: "#ffce56" },
    { label: "D", value: 8, color: "#4bc0c0" }
  ], showPercentages = true } = $props();

  let width = 300;
  let height = 300;
  let margin = 20;

  let radius = $derived(Math.min(width, height) / 2 - margin);
  let innerRadius = $derived(radius * 0.6); // Increased for thicker donut
  let outerRadius = $derived(radius * 0.95); // Decreased for smaller overall size

  let color = $derived(scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(data.map(d => d.color)));

  let pieGenerator = $derived(pie()
    .sort(null)
    .value(d => d.value));

  let arcsData = $derived(pieGenerator(data));

  let arcGenerator = $derived(arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius));

  let total = $derived(data.reduce((sum, d) => sum + d.value, 0));

  function getPercentage(value) {
    return ((value / total) * 100).toFixed(1) + '%';
  }

  function getLabelText(d) {
    return (showPercentages ? getPercentage(d.value) : d.value.toString())
  }
</script>

<div class="chart-container">
  <svg
    viewBox="{-width / 2} {-height / 2} {width} {height}"
  >
    <g>
      {#each arcsData as arc}
        <path d={arcGenerator(arc)} fill={color(arc.data.label)} />
        {@const [x, y] = arcGenerator.centroid(arc)}
        <text
          x={x}
          y={y}
          text-anchor="middle"
          dominant-baseline="central"
          fill="white"
          font-size="18px"
          font-weight="bold"
        >
          {getLabelText(arc.data)}
        </text>
      {/each}
    </g>
    
    <text
      x="0"
      y="0"
      text-anchor="middle"
      dominant-baseline="central"
      fill="black"
      font-size="24px"
      font-weight="bold"
    >
      {title}
    </text>
  </svg>
</div>

<style>
  .chart-container {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  svg {
    width: 100%;
    height: auto;
  }
</style>
