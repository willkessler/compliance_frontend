<!-- http://svelte0.dev/ui/66e1d2bbc8a8ce12e8276942 -->
<script lang="ts">
 import { Badge, Button,
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { Card,  CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";;
 import { DownloadOutline } from 'flowbite-svelte-icons';
 import { CheckCircleSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';

  const federalFilings = [
  { name: "Unified Carrier Registration (UCR)", dueDate: "Jan 31, 2025", status: "Incomplete" },
  { name: "MCS-150", dueDate: "Jan 12, 2024", status: "Review details" },
  { name: "BOC-3", dueDate: "Apr 9, 2024", status: "Review details" },
  { name: "US DOT renewal", dueDate: "March 13, 2024", status: "Completed" },
  ];

  const historicalFilings = [
  { type: "BOC-3", date: "Aug 31, 2023", filename: 'BOC-3Form.pdf' },
  { type: "Unified Carrier Registration (UCR)", date: "May 22, 2023", filename: 'UCR-2Form.pdf' },
  { type: "MCS-150", date: "Jan 2, 2024", filename: 'MCS-150Form.pdf' },
  { type: "EIN registration", date: "Dec 13, 2023", filename: "MCS-150Form.pdf" },
  ];

 function getStatusColor(status) {
   return (status === "Completed" ? 
           "bg-green-100 text-green-800" : (status === "Review details" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800")
   );
 }

</script>


<div class="flex h-screen bg-background">

  <main class="flex-1 p-8 pl-4 overflow-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Federal filings</h1>
      <Button class="bg-blue-500 hover:bg-blue-600 text-white">Start Review</Button>
    </div>
    <p class="text-muted-foreground mb-6">Based on your business, these are all of the necessary filings. Historical filings are available for download.</p>

    <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
      <TableHead class="bg-gray-50 whitespace-nowrap">
	<TableHeadCell>Filing name</TableHeadCell>
	<TableHeadCell>Due date</TableHeadCell>
	<TableHeadCell>Priority</TableHeadCell>
	<TableHeadCell >Status</TableHeadCell>
      </TableHead>
      <TableBody>
	{#each federalFilings as filing}
	  <TableBodyRow>
	    <TableBodyCell>{filing.name}</TableBodyCell>
	    <TableBodyCell>{filing.dueDate}</TableBodyCell>
	    <TableBodyCell><div class="flex text-red-500 font-bold"><ExclamationCircleSolid class="text-red-400 mr-2" />{filing.dueDate} (4 days left!)</div></TableBodyCell>
	    <TableBodyCell >
              <Badge class="{getStatusColor(filing.status)} px-2 py-1.5 rounded rounded-[6px] min-w-32">
                {#if filing.status === 'Completed'}
                  <CheckCircleSolid class="h-4 w-4 ml-2" />&nbsp;
                {:else}
	          <CircleAlert class="h-4 w-4 ml-2" />&nbsp;
                {/if}
	        {filing.status}
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
		<Button class="text-gray-800 bg-gray-300 hover:bg-gray-400 py-1 min-w-32 text-xs"><DownloadOutline />Download</Button>
              </a>
	    </TableBodyCell>
	  </TableBodyRow>
	{/each}
      </TableBody>
    </Table>
  </div>

</div>
