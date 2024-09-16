<!-- http://svelte0.dev/ui/66e1d2bbc8a8ce12e8276942 -->
<script lang="ts">
 import { Badge, Button,
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";;
 import { DownloadOutline } from 'flowbite-svelte-icons';

  const stateFilings = [
  { name: "CA DOT renewal", dueDate: "Dec 31, 2024", status: "Complete" },
  { name: "TX DOT renewal", dueDate: "Dec 31, 2024", status: "Complete" },
  { name: "International Fuel Tax Agreement (IFTA)", dueDate: "Dec 12, 2024", status: "Incomplete" },
  { name: "International Registration Plan (IRP)", dueDate: "Dec 3, 2024", status: "Incomplete" },
  { name: "CARB", dueDate: "Oct 15, 2024", status: "Complete" },
  { name: "Heavy Highway Vehicle Use Tax (HVUT)", dueDate: "Oct 31, 2024", status: "Review details" },
  { name: "CA MCP renewal", dueDate: "Jan 31, 2025", status: "Review details" },
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

</script>

<div class="flex h-screen bg-background">

  <main class="flex-1 p-8 pl-4 overflow-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">State filings</h1>
      <Button class="bg-blue-500 hover:bg-blue-600 text-white">Start Review</Button>
    </div>
    <p class="text-muted-foreground mb-6">Based on your business, these are all of the necessary filings. Historical filings are available for download.</p>

    <Table>
      <TableHead>
	<TableHeadCell>Filing name</TableHeadCell>
	<TableHeadCell>Due date</TableHeadCell>
	<TableHeadCell>Status</TableHeadCell>
      </TableHead>
      <TableBody>
	{#each stateFilings as filing}
	<TableBodyRow>
	  <TableBodyCell>{filing.name}</TableBodyCell>
	  <TableBodyCell>{filing.dueDate}</TableBodyCell>
	  <TableBodyCell>
            <Badge class="{getStatusColor(filing.status)} px-2 py-1.5 rounded rounded-[6px] min-w-32">
	      {filing.status}
	      <CircleAlert class="h-4 w-4 ml-2" />
	    </Badge>
	  </TableBodyCell>
	</TableBodyRow>
	{/each}
      </TableBody>
    </Table>

  <div class="w-full mt-20">
    <hr />
  </div>


  <div class="flex-1 py-6 overflow-auto">
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
		<Button class="bg-gray-300 hover:bg-gray-400 py-1 min-w-32 text-xs"><DownloadOutline />Download</Button>
              </a>
	    </TableBodyCell>
	  </TableBodyRow>
	{/each}
      </TableBody>
    </Table>
  </div>

</div>
