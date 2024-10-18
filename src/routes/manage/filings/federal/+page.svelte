<!-- http://svelte0.dev/ui/66e1d2bbc8a8ce12e8276942 -->
<script lang="ts">
 import { Button,
          Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { Card,  CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";;
 import { DownloadOutline } from 'flowbite-svelte-icons';
 import { CheckCircleOutline, BellActiveSolid } from 'flowbite-svelte-icons';
 import { getStatusColor, displayDueDate, filings } from '$lib/data/filingData';
 import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
 import CustomBadge from '$lib/components/CustomBadge.svelte';
 import { modalStore } from '$lib/stores/modalStore.ts';
 import ConfirmModal from '$lib/components/ConfirmModal.svelte';

 function handleSeeDetailsClick() {
   modalStore.open({
     title: '',
     isConfirm:false,
     message: 'You do not have permission to view federal filing documents in the demo environment.',
     onConfirm: () => {
       console.log('Confirm modal dismissed');
     },
   });
 }

</script>

<header class="pt-6 pl-4">
  <Breadcrumbs />
</header>

<div class="flex h-screen bg-background">
  <main class="flex-1 p-2 pl-4 overflow-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Federal filings</h1>
      <Button class="bg-blue-500 hover:bg-blue-600 text-white">Start Review</Button>
    </div>
    <div class="text-muted-foreground mb-2">Based on your business, these are all of the necessary filings. Historical filings are available for download.</div>

    <Table class="relative overflow-x-auto sm:rounded-lg mt-0 ml-0" hoverable>
      <TableHead class="bg-customGray/15 whitespace-nowrap">
	<TableHeadCell class="text-customGray">Filing name</TableHeadCell>
	<TableHeadCell class="text-customGray">Due date</TableHeadCell>
	<TableHeadCell class="text-customGray">Urgency</TableHeadCell>
	<TableHeadCell class="text-customGray">Status</TableHeadCell>
	<TableHeadCell class="text-customGray"></TableHeadCell>
      </TableHead>
      <TableBody>
	{#each filings.federal.main as filing}
	  <TableBodyRow class="cursor-pointer">
	    <TableBodyCell class="text-customGray">{filing.name}</TableBodyCell>
	    <TableBodyCell class="text-customGray">{filing.dueDate}</TableBodyCell>
	    <TableBodyCell class="text-customGray">
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
              <CustomBadge
                context="status"
                secondaryContext="general"
                data={filing}
                dataField="status"
              />
            </TableBodyCell>

            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Button
                color="light"
                on:click={handleSeeDetailsClick}
                class="hover:text-customGray p-2 min-w-32 text-customGray">
                See details →
              </Button>
            </TableBodyCell>

          </TableBodyRow>
	{/each}
      </TableBody>
    </Table>

  <div class="w-full mt-20 mb-4">
    <hr />
  </div>

  <div class="flex-1 py-6 overflow-auto">
    <h1 class="text-xl font-bold mb-3">Historical filings</h1>
    <Table hoverable>
      <TableHead class="bg-customGray/15 whitespace-nowrap">
	<TableHeadCell class="text-customGray">Filing type</TableHeadCell>
	<TableHeadCell class="text-customGray">Date</TableHeadCell>
	<TableHeadCell class="text-customGray"></TableHeadCell>
      </TableHead>
      <TableBody>
	{#each filings.federal.historical as filing}
	  <TableBodyRow class="cursor-pointer">
	    <TableBodyCell class="text-customGray">{filing.type}</TableBodyCell>
	    <TableBodyCell class="text-customGray">{filing.date}</TableBodyCell>
	    <TableBodyCell class="text-customGray">
              <a href={'/documents/' + filing.filename} target="_blank" rel="noopener noreferrer">
		<Button class="text-customGray bg-gray-300 hover:bg-gray-400 py-2 min-w-32 text-xs">
                  <span class="mr-2">
                    <DownloadOutline />
                  </span>
                  Download
                </Button>
              </a>
	    </TableBodyCell>
	  </TableBodyRow>
	{/each}
      </TableBody>
    </Table>
  </div>

</div>

<ConfirmModal />
