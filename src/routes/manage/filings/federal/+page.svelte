<!-- http://svelte0.dev/ui/66e1d2bbc8a8ce12e8276942 -->
<script lang="ts">
 import { Badge, Button,
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { Card,  CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";;
 import { DownloadOutline } from 'flowbite-svelte-icons';
 import { CheckCircleOutline, BellActiveSolid } from 'flowbite-svelte-icons';
 import { getStatusColor, displayDueDate, filings } from '$lib/data/filingData';

</script>


<div class="flex h-screen bg-background">

  <main class="flex-1 p-8 pl-4 overflow-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Federal filings</h1>
      <Button class="bg-blue-500 hover:bg-blue-600 text-white">Start Review</Button>
    </div>
    <p class="text-muted-foreground mb-6">Based on your business, these are all of the necessary filings. Historical filings are available for download.</p>

    <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
      <TableHead class="bg-gray-50 whitespace-nowrap text-gray-500">
	<TableHeadCell class="text-gray-500">Filing name</TableHeadCell>
	<TableHeadCell class="text-gray-500">Due date</TableHeadCell>
	<TableHeadCell class="text-gray-500">Urgency</TableHeadCell>
	<TableHeadCell class="text-gray-500">Status</TableHeadCell>
	<TableHeadCell class="text-gray-500">Take Action</TableHeadCell>
      </TableHead>
      <TableBody>
	{#each filings.federal.main as filing}
	  <TableBodyRow>
	    <TableBodyCell class="text-gray-500">{filing.name}</TableBodyCell>
	    <TableBodyCell class="text-gray-500">{filing.dueDate}</TableBodyCell>
	    <TableBodyCell class="text-gray-500">
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
                {#if filing.status === 'Complete'}
                  <CheckCircleOutline class="h-4 w-4 ml-2" />&nbsp;
                {:else}
	          <CircleAlert class="h-4 w-4 ml-2" />&nbsp;
                {/if}
	        {filing.status}
	      </Badge>
            </TableBodyCell>

            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Button href="/manage/filings/federal" color="light" class="hover:text-gray-500 p-2 min-w-32 text-gray-500">See details →</Button>
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
      <TableHead class="bg-gray-50 whitespace-nowrap text-gray-500">
	<TableHeadCell class="text-gray-500">Filing type</TableHeadCell>
	<TableHeadCell class="text-gray-500">Date</TableHeadCell>
	<TableHeadCell class="text-gray-500">Action</TableHeadCell>
      </TableHead>
      <TableBody>
	{#each filings.federal.historical as filing}
	  <TableBodyRow>
	    <TableBodyCell class="text-gray-500">{filing.type}</TableBodyCell>
	    <TableBodyCell class="text-gray-500">{filing.date}</TableBodyCell>
	    <TableBodyCell class="text-gray-500">
              <a href={'/documents/' + filing.filename} target="_blank" rel="noopener noreferrer">
		<Button class="text-gray-500 bg-gray-300 hover:bg-gray-400 py-1 min-w-32 text-xs"><DownloadOutline />Download</Button>
              </a>
	    </TableBodyCell>
	  </TableBodyRow>
	{/each}
      </TableBody>
    </Table>
  </div>

</div>
