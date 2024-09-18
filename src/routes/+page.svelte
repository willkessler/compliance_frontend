<!-- Main Dashboard -->

<script lang="ts">
 import { onMount, afterUpdate } from 'svelte';
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { Badge, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
 import { CircleAlert, Truck, UsersRound } from "lucide-svelte";;
 import { LandmarkOutline, ShieldCheckSolid } from 'flowbite-svelte-icons';
 import ComplianceBarChart from '$lib/components/ComplianceBarChart.svelte';
 import ComplianceHistoryChart from '$lib/components/ComplianceHistoryChart.svelte';
 import DonutChart from '$lib/components/DonutChart.svelte';
 import ChatBot from  '$lib/components/ChatBot.svelte';

 const actionItems = [
   { type: "Federal Filings", openItems: 3, url: '/manage/filings/federal' },
   { type: "State Filings", openItems: 2, url: '/manage/filings/state' },
   { type: "Vehicles", openItems: 8, url: '/manage/fleet/drivers' },
   { type: "Drivers", openItems: 13, url: '/manage/fleet/vehicles' },
   { type: "Connections", openItems: 1, url: '/manage/integrations' },
 ];

 interface NewsItem {
   title: string;
   image: string;
   url: string;
  }

 const newsItems: NewsItem[] = [
    {
      title: 'California Supreme Court upholds AB5 exemption for gig workers',
      subtitle: 'Case on independent contractor law involved workers’ comp and ballot initiative Prop 22 that granted carve-out',
      synopsis: 'Uber and Lyft drivers in California will continue to be protected from the state\’s AB5 independent contractor classification law following a decision by the state’s Supreme Court.',
      site: 'Freightwaves',
      image: 'https://www.freightwaves.com/uploads/2024/07/25/021223-76-1200x675.jpg',
      url: 'https://www.freightwaves.com/news/california-supreme-court-upholds-ab5-exemption-for-gig-workers',
    },
    {
      title: 'From voluntary to mandatory: Consultative expertise in sustainability compliance',
      subtitle: 'Sustainability reporting is quickly shifting from a voluntary initiative to a mandatory undertaking',
      synopsis: 'Governments and consumers alike have placed an increased emphasis on environmental concerns over the past several years. As a result, sustainability reporting is quickly shifting from a voluntary initiative to a mandatory undertaking. Strong relationships with transportation and logistics providers are going to be more important than ever as shippers learn to work within the regulations and expectations that come along with this “new normal."',
      site: 'Freightwaves',
      image: '/images/news/consultative.png',
      url: 'https://www.freightwaves.com/news/from-voluntary-to-mandatory-consultative-expertise-in-sustainability-compliance',
    },
    {
      title: '4 steps to improving compliance and operations in 2023',
      subtitle: 'New regulations and proposals shouldn’t be the only things on fleets\’ minds this year',
      synopsis: 'Compliance and operations work hand in hand, and this year, fleets have put improving in both categories on their New Year’s resolutions lists.',
      site: 'Freightwaves',
      image: 'https://www.freightwaves.com/uploads/2023/02/22/Petro_Joplin_44_Aerial-155_IF-1-1200x674.jpg',
      url: 'https://www.freightwaves.com/news/4-steps-to-improving-compliance-and-operations-in-2023',
    },
    {
      title: 'CARB\'s Clean Truck Check testing pushed back to 2025',
      subtitle: 'This delay is only for required inspections, meaning fleets and owner/operators are still expected to register and pay fees.',
      synopsis: 'Noregon reported that The California Air Resources Board (CARB) announced that it has pushed back the date for required Clean Truck Check Act inspections until January 1, 2025. This delay is only for required inspections, meaning fleets and owner/operators are still expected to register and pay fees.',
      site: 'Fleet Equipment Magazine',
      image: 'https://marvel-b1-cdn.bc0a.com/f00000000269980/s18391.pcdn.co/wp-content/uploads/2019/01/truck-lights-generic.jpg',
      url: 'https://www.fleetequipmentmag.com/carbs-clean-truck-check-delayed/',
    },
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
  .news ul {
    list-style-type: none;
    padding-left: 20px;
  }
  .news li {
    position: relative;
  }
  .news li::before {
    content: "◆";  /* Unicode character for a diamond */
    position: absolute;
    left: -20px;
    color: #000;  /* Change color as needed */
  }
 .news li:hover {
   color:blue;
 }
 .compliance-stats {
   color:red;
   font-size:48px;
 }
 .compliance-stats .statistic {
   font-size:48px;
 }
 .compliance-stats .status {
   font-size:20px;
   color:#ff6666;
   width:100%;
 }
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

 .fixed-height-card {
   height: 500px;
   display: flex;
   flex-direction: column;
 }

 .card-content {
   flex: 1;
   overflow-y: auto;
   padding-right: 1rem;
 }

 .news-item {
   margin-bottom: 1rem;
 }

 .news-item:last-child {
   margin-bottom: 0;
 }

 .news-item-card {
    margin-bottom: 20px;
 }

.news-item-card:last-child {
  margin-bottom: 0;
 }

  .charts-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .chart {
    width: 100%;
    height: 300px;
  }

</style>

<main class="flex-1 overflow-auto">

  <div class="grid grid-cols-2 gap-6 mb-6">
    <div class="grid gap-2">
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
    <Card>
      <CardHeader class="pb-2">
	<CardTitle>Summary of action items</CardTitle>
      </CardHeader>
      <CardContent style="card-content">
        <Table hoverable={true}>
          <TableHead>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Open items</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableHead>
          <TableBody class="bg-white divide-y divide-gray-200">
            {#each actionItems as item}
              <TableBodyRow>
                <TableBodyCell class="px-6 whitespace-nowrap text-sm font-large text-gray-600">{item.type}</TableBodyCell>
                <TableBodyCell class="px-6 whitespace-nowrap text-sm font-large text-gray-600">{item.openItems}</TableBodyCell>
                <TableBodyCell class="px-6 whitespace-nowrap text-sm font-medium">
                  <Button href={item.url} color="light" class="text-grey-600 hover:text-gray-900 p-2">See details →</Button>
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>

  <div class="dashboard-grid">
    <Card class="fixed-height-card">
      <CardContent style="card-content">
        <div class="font-bold pl-4 pt-4 pb-0">
          Ask the AI!
        </div>
        <ChatBot />
      </CardContent>
    </Card>

    <Card class="fixed-height-card">
      <CardHeader>
        <h2 class="text-lg font-bold">Latest news</h2>
      </CardHeader>
      <CardContent class="card-content">
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
</main>
