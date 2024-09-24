<script>
 import { Chart, Svg, Bars, Axis, Tooltip, Rule, Text } from "layerchart";
 import { scaleBand } from "d3-scale";
 import { timeFormat, timeParse } from "d3-time-format";
 import { mean } from "d3-array";

 export let chartTitle = "CSA Score Over Time";
 export let metricType = "csaScore"; // or "safetyScore"
 export let color = "var(--color-primary)";
 export let titleColor = "var(--color-primary)";

 // Generate sample data for the past 8 weeks
 const generateSampleData = () => {
   const data = [];
   const today = new Date();
   for (let i = 7; i >= 0; i--) {
     const date = new Date(today);
     date.setDate(today.getDate() - i * 7);
     data.push({
       date: date.toISOString().split('T')[0],
       csaScore: Math.round(Math.random() * 50 + 50),
       safetyScore: Math.round(Math.random() * 50 + 100)
     });
   }
   return data;
 };

 const parseDate = timeParse('%Y-%m-%d');
 const formatDate = timeFormat('%b %d');

 let data = generateSampleData();

 $: chartData = data.map(d => ({
   date: parseDate(d.date),
   value: d[metricType]
 }));

 $: avgScore = mean(chartData, d => d.value);
 
 function format(date) {
   if (date instanceof Date) {
     return formatDate(date);
   }
   return '';
 }
</script>

<div class="chart-container">
  <div class="h-[300px] p-4">
    <Chart
      data={chartData}
      x="date"
      xScale={scaleBand().padding(0.4)}
      y="value"
      yDomain={[0, null]}
      yNice={5}
      padding={{ left: 40, bottom: 30, right: 60, top: 0 }}
      let:width
      let:yScale
    >
      <Svg>
        <Axis placement="left" grid={{ class: "stroke-gray-200" }} ticks={5} />
        <Axis
          placement="bottom"
          format={format}
          ticks={chartData.map(d => d.date)}
          tickSize={0}
          tickRotate={-45}
          />
        <Bars 
          radius={4} 
          strokeWidth={0} 
          fill={color} 
          rounded="top"
        />
        <Rule
          y={avgScore}
          class="stroke-1 stroke-gray-800 [stroke-dasharray:4] [stroke-linecap:round]"
        />
        <Text
          x={width}
          y={yScale(avgScore)}
          dy={-4}
          value="Average"
          textAnchor="end"
          verticalAnchor="baseline"
          class="text-sm fill-black-500 stroke-white stroke-2 paint-order-stroke"
        />
      </Svg>
    </Chart>
    <div class="font-semibold ml-4 text-center text-{titleColor}">{chartTitle}</div>
  </div>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
