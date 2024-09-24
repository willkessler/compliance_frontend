<script lang="ts">
 import { onMount, afterUpdate } from 'svelte';
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { Badge, Button, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
 import { CircleAlert, Truck, UsersRound } from "lucide-svelte";;
 import { LandmarkOutline, ShieldCheckSolid } from 'flowbite-svelte-icons';
 import ComplianceBarChart from '$lib/components/ComplianceBarChart.svelte';
 import ComplianceHistoryChart from '$lib/components/ComplianceHistoryChart.svelte';
 import DonutChart from '$lib/components/DonutChart.svelte';
 import ChatBot from  '$lib/components/ChatBot.svelte';
 import { newsItems } from '$lib/data/newsItemsData';
 import { X, WandSparkles } from 'lucide-svelte';


 let showModal = false;
 
 const actionItems = [
   { type: "Federal Filings", openItems: 3, criticalItems:2, url: '/manage/filings/federal' },
   { type: "State Filings", openItems: 2, criticalItems:1, url: '/manage/filings/state' },
   { type: "Vehicles", openItems: 8, criticalItems:0, url: '/manage/fleet/drivers' },
   { type: "Drivers", openItems: 13, criticalItems:0, url: '/manage/fleet/vehicles' },
   { type: "Connections", openItems: 1, criticalItems:0, url: '/manage/integrations' },
 ];

 const cardStyle = "height: 500px; display: flex; flex-direction: column; overflow: hidden";
 const contentStyle = "flex: 1; overflow-y: auto; padding-right: 1rem;";

 let trucksOutOfCompliance = 8;
 let totalTrucks = 103;
 let driversOutOfCompliance = 3;
 let totalDrivers = 97;

 let donutChartData = 
   { 
   trucks:  [
     { label: "Out of Compliance", value: 8, color: "#ffa500" },
     { label: "Compliant", value: 95, color: "#00bb00" },
   ],
   drivers:  [
     { label: "Out of Compliance", value: 12, color: "#ffa500" },
     { label: "Compliant", value: 94, color: "#00bb00" },
   ],
   };
 let showPercentages = true;
 
</script>

<style>
 .score {
   font-size: 60px;
 }
 .score-label {
   font-size: 25px;
 }
 .csa-score {
   color: green;
 }
 .safety-score {
   color: orange;
 }

 .dashboard-grid {
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 1.5rem;
 }

 .chart {
   width: 100%;
   height: 300px;
 }

</style>

<main class="flex-1 overflow-auto">

  <div class="grid grid-cols-2 gap-6 mb-6">
      <Card>
	<CardHeader class="pb-2">
	  <CardTitle>Your compliance by the numbers</CardTitle>
	</CardHeader>
	<CardContent >
          <div class="flex items-center">
            <div class="grid grid-cols-2 gap-8 pl-2 pr-2 justify-items-stretch">
              <div class="flex items-center csa-score">
                <div class="mr-4" style="scale:3"><LandmarkOutline /></div>
                <div class="score">15</div>
                <div class="score-label pl-2">CSA Score</div>
              </div>
              <div class="flex items-center safety-score">
                <div class="mr-4" style="scale:3"><ShieldCheckSolid /></div>
                <div class="score">153</div>
                <div class="score-label pl-2">Safety Score</div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex items-center">
            <div class="chart">
              <DonutChart
                title="Vehicles"
                data={donutChartData.trucks}
                {showPercentages}
              />
            </div>
            <div class="chart">
              <DonutChart
                title="Drivers"
                data={donutChartData.drivers}
                {showPercentages}
              />
            </div>
          </div>
	</CardContent>
      </Card>
      <Card>
	<CardHeader class="pb-2">
	  <CardTitle>Your compliance by the numbers</CardTitle>
	</CardHeader>
	<CardContent >
          <div class="flex items-center">
            <div class="grid grid-cols-2 gap-8 pl-2 pr-2 justify-items-stretch">
              <div class="flex items-center csa-score">
                <div class="mr-4" style="scale:3"><LandmarkOutline /></div>
                <div class="score">15</div>
                <div class="score-label pl-2">CSA Score</div>
              </div>
              <div class="flex items-center safety-score">
                <div class="mr-4" style="scale:3"><ShieldCheckSolid /></div>
                <div class="score">153</div>
                <div class="score-label pl-2">Safety Score</div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <div class="chart">
                <DonutChart
                  title="Vehicles"
                  data={donutChartData.trucks}
                  {showPercentages}
                />
              </div>
              <div class="chart">
                <DonutChart
                  title="Drivers"
                  data={donutChartData.drivers}
                  {showPercentages}
                />
              </div>
            </div>
	</CardContent>
      </Card>
          </div>

  <div class="dashboard-grid">
    <Card>
      <CardHeader class="pb-2">
	<CardTitle>Summary of action items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table hoverable={true}>
          <TableHead>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Open items</TableHeadCell>
            <TableHeadCell>Critical items</TableHeadCell>
            <TableHeadCell>Days remaining</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each actionItems as item}
              <TableBodyRow>
                <TableBodyCell class="px-6 whitespace-nowrap text-sm font-large text-gray-600">{item.type}</TableBodyCell>
                <TableBodyCell class="px-6 whitespace-nowrap text-sm font-large text-gray-600">{item.openItems}</TableBodyCell>
                <TableBodyCell class="px-6 whitespace-nowrap text-sm font-large font-bold text-red-600">
                  {#if (item.criticalItems > 0) }
                    <a href={item.url}>
                      <Badge class="p-2 uppercase cursor-pointer">{item.criticalItems} item{item.criticalItems > 1 ? 's' : ''} to review</Badge>
                    </a>
                  {/if}
                </TableBodyCell>
                <TableBodyCell>
                  5
                </TableBodyCell>
                <TableBodyCell class="px-6 whitespace-nowrap text-sm font-medium">
                  <Button href={item.url} color="light" class="text-grey-600 hover:text-gray-900 p-2">See details →</Button>
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

      <Card style="height:500px;overflow:auto;">
        <CardHeader>
          <h2 class="text-lg font-bold">Latest news</h2>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            {#each newsItems as newsItem}
              <a href={newsItem.url} class="block">
                <div class="flex space-x-4">
                  <div class="w-1/4 flex-shrink-0">
                    <img src={newsItem.image} alt={newsItem.title} class="w-full h-auto object-cover rounded-md" />
                    <i>{newsItem.site}</i>
                  </div>
                  <div class="flex-grow">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{newsItem.title}</h5>
                    <p class="text-sm text-gray-700 dark:text-gray-400">{newsItem.synopsis}</p>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </CardContent>
      </Card>
  </div>


  <Modal
    bind:open={showModal}
    backdropClass="fixed inset-0 z-40 bg-white/60"
    size="custom"
    class="w-[35vw] h-[90vh] rounded-lg overflow-hidden fixed right-10 top-1/2 -translate-y-1/2 bg-gray-100"
    autoclose
    outsideclose
  >
    <div class="relative h-full p-4 bg-gray-100">
      <button
        on:click={() => showModal = false}
        class="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
      </button>
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Ask the AI!
      </h3>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <ChatBot />
      </p>
    </div>
  </Modal>

  <div class="fixed top-4 right-4">
    <Button
      on:click={() => showModal = true}
      class="p-4 bg-gray-300 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gray-400 transition-colors duration-200"
      >
      <WandSparkles class="text-gray-600 group-hover:text-gray-800" />
    </Button>
  </div>


</main>
