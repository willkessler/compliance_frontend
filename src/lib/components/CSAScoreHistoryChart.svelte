<script>
 // cf https://dev.to/dev_michael/the-hunt-for-the-perfect-svelte-charting-library-a-happy-ending-o0p
 import { Chart, Svg, Bars, Axis, Tooltip, Rule, Text } from "layerchart";
 import { scaleBand } from "d3-scale";
 import { timeFormat, timeParse } from "d3-time-format";
 import { mean } from "d3-array";

 export let chartTitle = "CSA Score Over Time";
 export let color = "var(--color-primary)";
 export let dataRange = {range:50, buffer:50, today:100};

 const parseDate = timeParse('%Y-%m-%d');
 const formatDate = timeFormat('%b %d');

 // Generate sample data for the past 8 weeks
 const generateSampleData = () => {
   const data = [];
   const today = new Date();
   for (let i = 7; i > 0; i--) {
     const date = new Date(today);
     date.setDate(today.getDate() - i * 7);
     const csaVariance = Math.round(Math.random() * 5 - 10);
     const safetyVariance = Math.round(Math.random() * 100 - 100);
     data.push({
       date: date.toISOString().split('T')[0],
       csaScore: Math.max(0, dataRange.today * i / 6 + csaVariance + dataRange.today),
     });
   }
   data.push({
     date: today.toISOString().split('T')[0],
     csaScore: dataRange.today,
   });
   return data;
 };

 let data = generateSampleData();

 $: chartData = data.map(d => ({
   date: parseDate(d.date),
   value: d['csaScore']
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
          class="stroke-2 stroke-[#008000]} [stroke-dasharray:4] [stroke-linecap:round]"
        />
        <Text
          x={width}
          y={yScale(avgScore)}
          dy={-4}
          value="Average: {parseInt(avgScore)}"
          textAnchor="end"
          verticalAnchor="baseline"
          class="text-sm fill-[#008000] stroke-white stroke-2 paint-order-stroke"
        />
      </Svg>
    </Chart>
    <div class="font-semibold ml-4 text-center text-green-600">{chartTitle}</div>
  </div>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
