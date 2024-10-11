<script>
 import { onMount } from 'svelte';
 import { createChart } from './SafetyScoreCore.js';

 export let chartTitle = "Score by week";
 export let color = "var(--color-primary)";
 let chartContainer;
 let containerWidth;
 let containerHeight;

 // Generate sample data for the past 8 weeks
 const generateSampleData = () => {
   const data = [];
   const today = new Date();
   for (let i = 7; i > 0; i--) {
     const date = new Date(today);
     date.setDate(today.getDate() - i * 7);
     data.push({
       date: date.toISOString().split('T')[0],
       score: Math.round(Math.random() * 2),
     });
   }
   data.push({
     date: today.toISOString().split('T')[0],
     score: 2,
   });
   return data;
 };

 let data = generateSampleData();

 onMount(() => {
   containerWidth = chartContainer.offsetWidth;
   containerHeight = chartContainer.offsetHeight;
   const svg = createChart(data, containerWidth, containerHeight);
   chartContainer.innerHTML = '';  // Clear any existing content
   chartContainer.appendChild(svg);
 });
</script>

<div class="chart-container">
  <div class="h-[300px] p-2">
    <div bind:this={chartContainer} class="w-full h-[250px]"></div>
    <div class="font-semibold text-center text-black mb-2">{chartTitle}</div>
  </div>
</div>

<style>
  .chart-container {
    padding-top:30px;
    width: 100%;
    height: 100%;
  }
</style>
