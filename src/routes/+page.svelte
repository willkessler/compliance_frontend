<script lang="ts">
 import { goto } from '$app/navigation';
 import { onMount, afterUpdate } from 'svelte';
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { Badge, Button, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
 import { CircleAlert, Truck, UsersRound } from "lucide-svelte";;
 import { LandmarkOutline, ShieldCheckSolid } from 'flowbite-svelte-icons';

 import CSAScoreHistoryChart from '$lib/components/CSAScoreHistoryChart.svelte';
 import SafetyScoreHistoryChart from '$lib/components/SafetyScoreHistoryChart.svelte';
 import ChatBot from  '$lib/components/ChatBot.svelte';

 import { filings, reviewItems, getReviewCounts, getSoonestDaysRemaining } from '$lib/data/filingData';
 import { newsItems } from '$lib/data/newsItemsData';
 import { X, WandSparkles } from 'lucide-svelte';

 let showModal = false;

 const cardStyle = "height: 500px; display: flex; flex-direction: column; overflow: hidden";
 const contentStyle = "flex: 1; overflow-y: auto; padding-right: 1rem;";
 const csaRange = { range:15, buffer:15, today: 15};
 const todaysSafetyScore = 'Satisfactory';

 function navigateToRelevantActionPage(url) {
   goto(url, { replaceState: false });
 }

</script>

<main class="flex-1 overflow-auto m-4">
  <div class="grid grid-cols-2 gap-6 mb-6">
      <Card>
	<CardContent style="padding-top: 1rem;">
          <div class="flex items-center">
              <div class="flex items-center csa-score">
                <div class="ml-4 mr-4" style="scale:2"><LandmarkOutline /></div>
                <div class="score-label ml-2">Today's CSA Score</div>
                <div class="score ml-2 font-semibold">{csaRange.today}</div>
              </div>
          </div>
          <div>
            <div class="flex items-center">
              <div class="chart">
                <CSAScoreHistoryChart
                  chartTitle="CSA Score by week"
                  dataRange={csaRange}
                  color="green"
                />
              </div>
            </div>
          </div>
	</CardContent>
      </Card>
      <Card>
	<CardContent style="padding-top: 1rem;">
          <div class="flex items-center">
              <div class="flex items-center safety-score">
                <div class="mr-4" style="scale:2"><ShieldCheckSolid /></div>
                <div class="score-label pl-2 text-nowrap">Today's Safety Score</div>
                <div class="score ml-2 font-semibold text-nowrap">{todaysSafetyScore}</div>
              </div>
          </div>
          <div>
            <div class="flex items-center">
              <div class="chart">
                <SafetyScoreHistoryChart
                  chartTitle="Safety rating by week"
                  color="orange"
                />
              </div>
            </div>
          </div>
	</CardContent>
      </Card>
  </div>

    <Card>
      <CardHeader class="pb-4">
	<CardTitle>Important Actions to Take</CardTitle>
      </CardHeader>
      <CardContent>
        <Table hoverable>
          <TableHead>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Open items</TableHeadCell>
            <TableHeadCell>Time Sensitive</TableHeadCell>
            <TableHeadCell>Days remaining</TableHeadCell>
            <TableHeadCell>&nbsp;</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each reviewItems as item}
              <TableBodyRow class="cursor-pointer" on:click={() => navigateToRelevantActionPage(item.url)}>
                <TableBodyCell class="whitespace-nowrap text-sm font-large text-gray-600 p-2">{item.name}</TableBodyCell>
                <TableBodyCell class="whitespace-nowrap text-sm font-large text-gray-600 p-2p-2">{item.openItems}</TableBodyCell>
                <TableBodyCell class="whitespace-nowrap text-sm font-large font-bold text-red-600 m-0">
                  {#if (item.openItems > 0) }
                    <a href={item.url}>
                      <Badge class="px-2 py-1.5 rounded rounded-[6px] min-w-32 text-gray-900 bg-red-100 text-gray-700} cursor-pointer uppercase">
                        {item.openItems} item{item.openItems > 1 ? 's' : ''} to review
                      </Badge>
                    </a>
                  {/if}
                </TableBodyCell>
                <TableBodyCell >
                  {getSoonestDaysRemaining(item) > 0 ? getSoonestDaysRemaining(item) + ' days' : ''} 
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

      <Card class="mt-4" style="height:500px;overflow:auto;">
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



  <Modal
    bind:open={showModal}
    backdropClass="fixed inset-0 z-40 bg-white/70"
    size="custom"
    class="w-[35vw] h-[90vh] rounded-lg overflow-hidden fixed right-20 top-1/2 -translate-y-1/2 bg-gray-100"
    autoclose
    outsideclose
    border
  >
    <div class="h-full bg-gray-100">
      <button
        on:click={() => showModal = false}
        class="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
      </button>
      <div class="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
        Ask the AI!
      </div>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <ChatBot />
      </p>
    </div>
  </Modal>

  <div class="fixed top-4 right-4"> <!-- AI button -->
    <Button
      on:click={() => showModal = true}
      class="p-3 bg-gray-300 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gray-400 transition-colors duration-200"
      >
      <WandSparkles class="text-gray-600 group-hover:text-gray-800" size={15} />
    </Button>
  </div>


</main>

<style>
 .score {
   font-size: 45px;
 }
 .score-label {
   font-size: 25px;
   font-weight:600;
 }
 .csa-score {
   color: green;
 }
 .safety-score {
   color: green;
 }

 .chart {
   width: 100%;
   height: 300px;
 }

</style>
