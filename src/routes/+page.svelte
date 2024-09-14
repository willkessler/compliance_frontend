<!-- Main Dashboard -->

<script lang="ts">
 import { onMount, afterUpdate } from 'svelte';
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { Badge, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
 import { CircleAlert, Truck, UsersRound } from "lucide-svelte";;
 
 const actionItems = [
   { type: "Federal Filings", openItems: 3, url: '/manage/filings/federal' },
   { type: "State Filings", openItems: 2, url: '/manage/filings/state' },
   { type: "Drivers", openItems: 1, url: '/manage/fleet/drivers' },
   { type: "Vehicles", openItems: 2, url: '/manage/fleet/vehicles' },
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
 .csa-score {
   color: green;
   font-size: 48px;
 }
 .csa-score-label {
   color:green;
   font-size: 20px;
 }
 .safety-score {
   color: orange;
   font-size: 48px;
 }
 .safety-score-label {
   color:orange;
   font-size: 20px;
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

</style>

<main class="flex-1 overflow-auto">

  <div class="grid grid-cols-3 gap-6 mb-6">
    <Card>
      <CardHeader class="pb-2">
	<CardTitle>Drivers</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center gap-8 pl-2 pr-2 compliance-stats">
          <div class="statistic">14</div>
          <div class="status">out of compliance</div>
        </div>          
        <div class="pl-2 pr-2  pt-4">
          <div class="flex">
            <svelte:component this={UsersRound} class="mr-2" size={20} />
            Ahmad Kakar
          </div>
          <div class="flex">
            <svelte:component this={UsersRound} class="mr-2" size={20} />
            Will Kessler
          </div>
          <div class="pl-8">
            <a href="#">See all...</a>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="pb-2">
	<CardTitle>Trucks</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center gap-8 pl-2 pr-2 compliance-stats">
          <div class="statistic">3</div>
          <div class="status">out of compliance</div>
        </div>          
        <div class="pl-2 pr-2 pt-4">
          <div class="flex">
            <svelte:component this={Truck} class="mr-2" size={20} />
            Reefer: 4129-23
          </div>
          <div class="flex">
            <svelte:component this={Truck} class="mr-2" size={20} />
            Flatbed: 8322-38
          </div>
          <div class="pl-8">
            <a href="#">See all...</a>
          </div>
        </div>
      </CardContent>
    </Card>
    <div class="space-y-6">
      <Card>
	<CardHeader class="pb-0">
	  <CardTitle>CSA score</CardTitle>
	</CardHeader>
	<CardContent class="flex items-center">
          <div class="csa-score">15</div>
          <div class="csa-score-label ml-4">Good!</div>
	</CardContent>
      </Card>
      <Card>
	<CardHeader class="pb-0">
	  <CardTitle>Safety Score</CardTitle>
	</CardHeader>
	<CardContent class="flex items-center">
          <div class="safety-score">153</div>
          <div class="safety-score-label ml-4">Can be improved</div>
	</CardContent>
      </Card>
    </div>
  </div>

  <div class="dashboard-grid">
    <Card style={cardStyle}>
      <CardHeader>
        <CardTitle class="flex items-center justify-between">
          Summary of action items from federal, state, truck and driver pages
          <Avatar class="h-8 w-8 ml-4">
            <AvatarImage src="/images/user.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </CardTitle>
      </CardHeader>
      <CardContent style={contentStyle}>
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
    
    <Card style={cardStyle}>
      <CardHeader>
        <CardTitle>News feed</CardTitle>
      </CardHeader>
      <CardContent style={contentStyle}>
        {#each newsItems as newsItem}
          <a href={newsItem.url} target="_blank" class="news-item">
            <Card class="mb-4 news-item-card">
              <CardHeader class="pb-2">
                <img style="width:100%;" src={newsItem.image} alt={newsItem.title} class="h-30 mb-2" />
                <CardTitle>
                  <div class="text-base">{newsItem.title}</div>
                  <div class="text-sm text-muted-foreground">
                    <span class="italic">{newsItem.subtitle}</span>&nbsp;&nbsp;
                    <span>{newsItem.synopsis}...</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">{newsItem.site}</p>
              </CardContent>
            </Card>
          </a>
        {/each}
      </CardContent>
    </Card>
  </div>
</main>

