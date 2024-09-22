<!-- http://svelte0.dev/ui/66e1d2bbc8a8ce12e8276942 -->
<script lang="ts">
 import { Badge, Button,
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";;
 import { DownloadOutline } from 'flowbite-svelte-icons';
 import { BellActiveSolid } from 'flowbite-svelte-icons';

  const stateFilings = [
  { name: "International Fuel Tax Agreement (IFTA)", dueDate: "Sep 17, 2024", status: "Incomplete" },
  { name: "International Registration Plan (IRP)", dueDate: "Oct 1, 2024", status: "Incomplete" },
  { name: "Heavy Highway Vehicle Use Tax (HVUT)", dueDate: "Oct 31, 2024", status: "Review details" },
  { name: "CA MCP renewal", dueDate: "Jan 31, 2025", status: "Review details" },
  { name: "CA DOT renewal", dueDate: "Dec 31, 2024", status: "Complete" },
  { name: "TX DOT renewal", dueDate: "Dec 31, 2024", status: "Complete" },
  { name: "CARB", dueDate: "Oct 15, 2024", status: "Complete" },
  ];

  const historicalFilings = [
  { type: "CA MCP renewal", date: "Mar 23, 2024" },
  { type: "Heavy Highway Vehicle Use Tax (HVUT)", date: "Aug 31, 2023" },
  { type: "CA DOT renewal", date: "Sep 14, 2024" },
  ];

 function getStatusColor(status) {
   return (status === "Complete" ? 
           "bg-green-100 text-green-800" : (status === "Review details" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800")
   );
 }

 function displayDueDate(filing: { dueDate: string | Date }): { text: string; color: string } {
   const dueDate = new Date(filing.dueDate);
   const now = new Date();
   const differenceInDays = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
   const formattedDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

   //console.log(`Due date: ${formattedDate}, Difference in days: ${differenceInDays}`);

   if (differenceInDays < 0) {
     console.log("Returning: red (late)");
     return {
       text: `${Math.abs(differenceInDays)} days overdue`,
       color: 'red',
       show: true,
     };
   } else if (differenceInDays <= 30) {
     console.log("Returning: red (within 30 days)");
     return {
       text: `${differenceInDays} days left`,
       color: 'yellow',
       show: true
     };
   } else {
     console.log("Returning: black (more than 30 days)");
     return {
       show: false,
     };
   }
 }

</script>

<div class="flex h-screen bg-background">
  <main class="flex-1 p-8 pl-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">State filings</h1>
      <Button class="bg-blue-500 hover:bg-blue-600 text-white">Start Review</Button>
    </div>
    <p class="text-muted-foreground mb-6">Based on your business, these are all of the necessary filings. Historical filings are available for download.</p>

    <Table>
      <TableHead>
	<TableHeadCell>Filing name</TableHeadCell>
	<TableHeadCell>Due date</TableHeadCell>
	<TableHeadCell>Time left</TableHeadCell>
	<TableHeadCell>Status</TableHeadCell>
	<TableHeadCell >Take Action</TableHeadCell>
      </TableHead>
      <TableBody>
	{#each stateFilings as filing}
	<TableBodyRow>
	  <TableBodyCell>{filing.name}</TableBodyCell>
	  <TableBodyCell>{filing.dueDate}</TableBodyCell>
	  <TableBodyCell>
              {#if displayDueDate(filing).show}
                <div class="flex font-medium text-{displayDueDate(filing).color}-400">
                  <div>
                    <BellActiveSolid class="mr-2 text-{displayDueDate(filing).color}-400" />
                  </div>
                  <div>
                    {displayDueDate(filing).text}
                  </div>
                </div>
              {/if}
          </TableBodyCell>
	  <TableBodyCell>
            <Badge class="{getStatusColor(filing.status)} px-2 py-1.5 rounded rounded-[6px] min-w-32">
	      <CircleAlert class="h-4 w-4 mr-2" />
	      {filing.status}
	    </Badge>
	  </TableBodyCell>

          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <Button href="/manage/filings/federal" color="light" class="text-grey-600 hover:text-gray-900 p-2 min-w-32">See details →</Button>
          </TableBodyCell>

	</TableBodyRow>
	{/each}
      </TableBody>
    </Table>

  <div class="w-full mt-20">
    <hr />
  </div>

  <div class="flex-1 py-6">
    <h1 class="text-xl font-bold mb-3">Historical filings</h1>
    <Table hoverable={true}>
      <TableHead>
	<TableHeadCell>Filing type</TableHeadCell>
	<TableHeadCell>Date</TableHeadCell>
	<TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody>
	{#each historicalFilings as filing}
	  <TableBodyRow>
	    <TableBodyCell>{filing.type}</TableBodyCell>
	    <TableBodyCell>{filing.date}</TableBodyCell>
	    <TableBodyCell >
              <a href={'/documents/' + filing.filename} target="_blank" rel="noopener noreferrer">
		<Button class="text-gray-800 bg-gray-300 hover:bg-gray-400 py-1 min-w-32 text-xs"><DownloadOutline />Download</Button>
              </a>
	    </TableBodyCell>
	  </TableBodyRow>
	{/each}
      </TableBody>
    </Table>
  </div>

</div>
