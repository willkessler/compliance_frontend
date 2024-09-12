<script lang="ts">
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
 import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
 import { Button } from "$lib/components/ui/button";
 import { CircleAlert } from "lucide-svelte";;

 const actionItems = [
   { type: "Federal", openItems: 4, url: '/manage/filings/federal' },
   { type: "State", openItems: 6, url: '/manage/filings/state' },
   { type: "Vehicle", openItems: 1, url: '/manage/fleet/vehicles' },
   { type: "Driver", openItems: 3, url: '/manage/fleet/drivers' },
   { type: "Integration", openItems: 4 },
 ];
</script>

<h1 class="text-3xl mb-5">One-Stop Compliance Dashboard</h1>

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
</style>

<main class="flex-1 overflow-auto">

  <div class="grid grid-cols-3 gap-6 mb-6">
    <Card>
      <CardHeader>
	<CardTitle>Drivers in/out of compliance</CardTitle>
      </CardHeader>
      <CardContent>
	<!-- Add content for drivers compliance -->
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
	<CardTitle>Trucks in/out of service</CardTitle>
      </CardHeader>
      <CardContent>
	<!-- Add content for trucks service status -->
      </CardContent>
    </Card>
    <div class="space-y-6">
      <Card>
	<CardHeader>
	  <CardTitle>CSA score</CardTitle>
	</CardHeader>
	<CardContent>
	  <!-- Add content for CSA score -->
	</CardContent>
      </Card>
      <Card>
	<CardHeader>
	  <CardTitle>Filings status</CardTitle>
	</CardHeader>
	<CardContent>
	  <!-- Add content for filings status -->
	</CardContent>
      </Card>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-6">
    <Card>
      <CardHeader>
	<CardTitle class="flex items-center justify-between">
	  Summary of action items from federal, state, truck and driver pages
	  <Avatar class="h-8 w-8">
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
