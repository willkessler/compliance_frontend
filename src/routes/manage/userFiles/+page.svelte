<script lang="ts">
  import { run } from 'svelte/legacy';

 import { Badge, Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, ChevronLeftOutline, ChevronRightOutline, ExclamationCircleSolid, MapPinAltSolid, ThumbsUpSolid } from 'flowbite-svelte-icons';
 import { Pagination, PaginationItem, Label, Select } from 'flowbite-svelte';
 import { page } from '$app/stores';
 import { userFiles, getFileById } from '$lib/data/userFilesData';
 import { modalStore } from '$lib/stores/modalStore.ts';
 import ConfirmModal from '$lib/components/ConfirmModal.svelte';
 
 let filters = [
   { value: 'federal', name: 'Federal files' },
   { value: 'state', name: 'State files' },
   { value: 'vehicle', name: 'Vehicle files' },
   { value: 'driver', name: 'Driver files' },
   { value: 'all', name: 'All' },
 ];
 let selectedFilter = $state('all');
 
 let activeUrl = $derived($page.url.searchParams.get('page'));
 const paginatorJumpPage = '/manage/userFiles';
 let pages = $state([
   { name: 1, href: paginatorJumpPage },
   { name: 2, href: paginatorJumpPage },
   { name: 3, href: paginatorJumpPage },
   { name: 4, href: paginatorJumpPage },
 ]);
 
 run(() => {
   pages.forEach((page) => {
     let splitUrl = page.href.split('?');
     let queryString = splitUrl.slice(1).join('?');
     const hrefParams = new URLSearchParams(queryString);
     let hrefValue = hrefParams.get('page');
     if (hrefValue === activeUrl && false) { // defeated for WSTA demo
       page.active = true;
     } else {
       page.active = false;
     }
   });
   pages = pages;
 });
 
 const previous = () => {
   console.log('Previous btn clicked. Make a call to your server to fetch data.');
 };
 const next = () => {
   console.log('Next btn clicked. Make a call to your server to fetch data.');
 };

 function handleViewFilesClick() {
   modalStore.open({
     title: '',
     isConfirm:false,
     message: 'You do not have permission to view this file in the demo environment.',
     onConfirm: () => {
       console.log('Confirm modal dismissed');
     },
   });
 }

</script>
   
<div class="m-4">

  <div class="flex items-end justify-between pr-4">
    <div>
      <h1 class="text-3xl font-bold ">Your Files</h1>
    </div>
    <div>
      <Label class="text-customGray">
        Filter selections
        <Select class="text-xs text-gray-400 mt-2 min-w-64" items={filters} bind:value={selectedFilter} />
      </Label>
    </div>
  </div>

  <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0">
    <TableHead class="bg-gray-50 whitespace-nowrap">
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">File</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Type</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Category</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Date added</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Take Action</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each userFiles as file}
        {#if selectedFilter === 'all' || file.category.toLowerCase() == selectedFilter}
          <TableBodyRow>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{file.name}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{file.type}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{file.category}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">
              <div class="flex cursor-pointer">
                <div>{file.acquisitionDate}</div>
                <!-- <div><MapPinAltSolid class="ml-2" /></div> -->
              </div>
            </TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Button
                color="light" 
                on:click={handleViewFilesClick}
                class="text-customGray hover:text-customGray p-2 min-w-32">
                View file
              </Button>
            </TableBodyCell>
          </TableBodyRow>
        {/if}
      {/each}
    </TableBody>
  </Table>


  <div class="w-full flex justify-end pr-4 mt-4">
    <Pagination {pages} on:previous={previous} on:next={next} icon>
      {#snippet prev()}
          
          <span class="sr-only">Previous</span>
          <ChevronLeftOutline class="w-6 h-6" />
        
          {/snippet}
      {#snippet next()}
          
          <span class="sr-only">Next</span>
          <ChevronRightOutline class="w-6 h-6" />
        
          {/snippet}
    </Pagination>
  </div>
</div>

<ConfirmModal />
