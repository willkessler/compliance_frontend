<script lang="ts">
 import { Badge, Button,
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";;
 import { CheckCircleOutline } from 'flowbite-svelte-icons';
 import { DownloadOutline } from 'flowbite-svelte-icons';
 import { BellActiveSolid } from 'flowbite-svelte-icons';
 import { getStatusColor, displayDueDate, filings } from '$lib/data/filingData';

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
	{#each filings.state.main as filing}
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
              {#if filing.status.toLowerCase() === 'complete'}
                <CheckCircleOutline class="h-4 w-4 ml-2" />&nbsp;
              {:else}
	        <CircleAlert class="h-4 w-4 ml-2" />&nbsp;
              {/if}
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
	{#each filings.state.historical as filing}
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
