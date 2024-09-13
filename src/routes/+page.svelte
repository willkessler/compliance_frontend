<!-- Main Dashboard -->

<script lang="ts">
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
 import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
 import { Button } from "$lib/components/ui/button";
 import { CircleAlert, Truck, UsersRound } from "lucide-svelte";;

 const actionItems = [
   { type: "Federal", openItems: 4, url: '/manage/filings/federal' },
   { type: "State", openItems: 6, url: '/manage/filings/state' },
   { type: "Vehicle", openItems: 1, url: '/manage/fleet/vehicles' },
   { type: "Driver", openItems: 3, url: '/manage/fleet/drivers' },
   { type: "Integration", openItems: 4 },
 ];
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
   font-size:24px;
 }
 .csa-score {
   color: green;
   font-size: 48px;
 }
 .csa-score-label {
   color:green;
   font-size: 24px;
 }
 .safety-score {
   color: orange;
   font-size: 48px;
 }
 .safety-score-label {
   color:orange;
   font-size: 24px;
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
          <div class="status">Out of Compliance</div>
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
          <div class="status">Out of Compliance</div>
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
          <div class="safety-score-label ml-4">Can improve</div>
	</CardContent>
      </Card>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-6">
    <Card>
      <CardHeader>
	<CardTitle class="flex items-center justify-between">
	  Summary of action items from federal, state, truck and driver pages
	  <Avatar class="h-8 w-8 ml-4">
	    <AvatarImage src="/images/user.png" alt="User" />
	    <AvatarFallback>U</AvatarFallback>
	  </Avatar>
	</CardTitle>
      </CardHeader>
      <CardContent>
	<Table>
	  <TableHeader>
	    <TableRow>
	      <TableHead>Type</TableHead>
	      <TableHead>Open items</TableHead>
	      <TableHead></TableHead>
	    </TableRow>
	  </TableHeader>
	  <TableBody>
	    {#each actionItems as item}
	      <TableRow>
		<TableCell>{item.type}</TableCell>
		<TableCell>{item.openItems}</TableCell>
		<TableCell>
		  <Button variant="link"><a href={item.url}>View details</a></Button>
		</TableCell>
	      </TableRow>
	    {/each}
	  </TableBody>
	</Table>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
	<CardTitle>News feed</CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="news pl-5">
          <li><a href="https://www.freightwaves.com/news/could-east-coast-port-strike-spread-to-west-coast">Could east coast port strike spread to West Coast?</a> (FreightWaves) </li>
          <li><a href="https://www.freightwaves.com/news/uber-freight-announces-new-tech-offerings-reaches-20b-in-managed-freight">Uber Freight announces new tech offerings, reaches $20B in managed freight</a> (FreightWaves) </li>
          <li><a href="https://www.aircargonews.net/services/ground-handler/swissport-is-certified-for-pharma-in-madrid-and-barcelona/">Swissport is certified for pharma in Madrid and Barcelona</a> (Aircargo News) </li>
        </ul>


      </CardContent>
    </Card>
  </div>
</main>
