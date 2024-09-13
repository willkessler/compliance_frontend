<!-- Main Dashboard -->

<script lang="ts">
 import { onMount, afterUpdate } from 'svelte';
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
 import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
 import { Button } from "$lib/components/ui/button";
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
      title: "Could east coast port strike spread to West Coast?",
      subtitle: 'ILWU has pledged to support ILA in contract fight',
      synopsis: 'Could a work stoppage by East Coast longshoremen spread to West Coast ports? That’s the nontrivial question facing shipping lines, terminal operators and the country at large as U.S. East and Gulf Coast port employers nervously wait out an Oct. 1 strike deadline set by the International Longshoremen’s Association',
      site: 'Freightwaves',
      image: "https://www.freightwaves.com/uploads/2024/09/11/000000-Boating-As-Of-010824-ONLY-44-1200x675.jpg",
      url: 'https://www.freightwaves.com/news/could-east-coast-port-strike-spread-to-west-coast',
    },
    {
      title: "Uber Freight announces new tech offerings, reaches $20B in managed freight",
      subtitle: 'Company now uses Uber Direct to offer to offer same day and scheduled deliveries',
      synopsis: 'Managed transportation provider Uber Freight announced Tuesday at its annual Deliver conference in Frisco, Texas, a number of new features available to customers and said the company’s freight under management has grown to $20 billion',
      site: 'Freightwaves',
      image: "https://www.freightwaves.com/uploads/2024/09/10/Screenshot-2024-09-10-093335.png",
      url: 'https://www.freightwaves.com/news/uber-freight-announces-new-tech-offerings-reaches-20b-in-managed-freight',
    },
    {
      title: "Swissport is certified for pharma in Madrid and Barcelona",
      subtitle: 'Swissport\’s cargo centers in Madrid (MAD) and Barcelona (BCN) have achieved Good Distribution Practice (GDP) certification for pharmaceutical handling',
      synopsis: 'The ground handler said in a LinkedIn post today that the certification would strengthen its pharmaceutical logistics business.',
      site: 'Freightwaves',
      image: "https://www.aircargonews.net/wp-content/uploads/2023/03/Swissport-cargo-handling-Photo-Swissport.jpg",
      url: 'https://www.aircargonews.net/services/ground-handler/swissport-is-certified-for-pharma-in-madrid-and-barcelona',
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
