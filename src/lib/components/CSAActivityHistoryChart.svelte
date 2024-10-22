<script lang="ts">
 import { Chart, Svg, Bars, Axis, Tooltip, Rule, Text, } from "layerchart";
 import { scaleBand, scaleLinear } from "d3-scale";
 import { timeFormat, timeParse } from "d3-time-format";
 import { mean } from "d3-array";

 export let chartTitle = "Activities Over Time";

 const parseDate = timeParse('%Y-%m-%d');
 const formatDate = timeFormat('%b %d');

 // Generate sample data for the past 8 weeks with categories
 const generateSampleData = () => {
   const data = [];
   const today = new Date();
   for (let i = 7; i > 0; i--) {
     const date = new Date(today);
     date.setDate(today.getDate() - i * 7);
     data.push({
       date: date.toISOString().split('T')[0],
       accident: Math.round(Math.random() * 10 + 1),
       maintenance: Math.round(Math.random() * 10 + 5),
       driverIssue: Math.round(Math.random() * 10 + 10),
       recordKeeping: Math.round(Math.random() * 10 + 2),
       other: Math.round(Math.random() * 10 + 1),
     });
   }
   data.push({
     date: today.toISOString().split('T')[0],
     accident: Math.round(Math.random() * 10 + 1),
     maintenance: Math.round(Math.random() * 10 + 5),
     driverIssue: Math.round(Math.random() * 10 + 10),
     recordKeeping: Math.round(Math.random() * 10 + 2),
     other: Math.round(Math.random() * 10 + 1),
   });
   return data;
 };

 let data = generateSampleData();
 let dataKeys: ['accident', 'maintenance', 'driverIssue', 'recordKeeping', 'other'];


 $: chartData = data.map(d => ({
   date: parseDate(d.date),
   values: [ d.accident, d.maintenance, d.driverIssue, d.recordKeeping, d.other ],
   labels: ['Accidents', 'Maintenance', 'Driver Issues', 'Record Keeping', 'Other'],
   accident: d.accident,
   maintenance: d.maintenance,
   driverIssue: d.driverIssue,
   recordKeeping: d.recordKeeping,
   other: d.other
 }));

 const colors = {
   accident: "#ccffcc",
   maintenance: "#aaeeaa",
   driverIssue: "#99cc99",
   recordKeeping: "#559955",
   other: "#114411",
 };

 function format(date: Date | null): string {
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
      y="values"
      xScale={scaleBand().padding(0.4)}
      yDomain={[0, null]}
      yNice={5}
      padding={{ left: 40, bottom: 30, right: 60, top: 0 }}
      let:width
      let:yScale
      tooltip={{ mode: 'bisect-x' }}
    >
      <Svg>
        <Axis placement="left" grid={{ class: "stroke-gray-200" }} ticks={5} />
        <Axis
          placement="bottom"
          format={format}
          ticks={chartData.map(d => d.date)}
          />
          {#each Object.keys(colors) as category}
            <Bars 
              y={category}
              fill={colors[category]}
              strokeWidth={0}
              rounded="top"
            />
          {/each}
      </Svg>

      <Tooltip.Root let:data>
        <Tooltip.Header>{format(data.date, "eee, MMMM do")}</Tooltip.Header>
        <Tooltip.List>
          <Tooltip.Item label="Accidents" value={data.accident} color={colors.accident} />
          <Tooltip.Item label="Maintenance" value={data.maintenance} color={colors.maintenance} />
          <Tooltip.Item label="Driver Issues" value={data.driverIssue} color={colors.driverIssue} />
          <Tooltip.Item label="Record Keeping" value={data.recordKeeping} color={colors.recordKeeping} />
          <Tooltip.Item label="Other" value={data.other} color={colors.other} />
        </Tooltip.List>
      </Tooltip.Root>

    </Chart>
    <div class="font-semibold ml-4 text-center text-green-700">{chartTitle}</div>
  </div>
</div>

<style>
 .chart-container {
   width: 100%;
   height: 100%;
 }

:global(.layerchart-tooltip) {
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  backdrop-filter: none;
}

</style>
