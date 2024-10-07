<script lang="ts">
 import { Badge, Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, ChevronLeftOutline, ChevronRightOutline, ExclamationCircleSolid, MapPinAltSolid, ThumbsUpSolid } from 'flowbite-svelte-icons';
 import { Pagination, PaginationItem, Label, Select } from 'flowbite-svelte';
 import { page } from '$app/stores';
 import { userFiles, getFileById } from '$lib/data/userFilesData';
 
 let filters = [
   { value: 'filter1', name: 'Federal files' },
   { value: 'filter2', name: 'State files' },
   { value: 'filter3', name: 'Vehicle files' },
   { value: 'filter4', name: 'Driver files' },
   { value: 'filter5', name: 'All' },
 ];
 let selectedFilter;
 
 $: activeUrl = $page.url.searchParams.get('page');
 let pages = [
   { name: 1, href: '/components/pagination?page=1' },
   { name: 2, href: '/components/pagination?page=2' },
   { name: 3, href: '/components/pagination?page=3' },
   { name: 4, href: '/components/pagination?page=4' },
   { name: 5, href: '/components/pagination?page=5' }
 ];
 
 $: {
   pages.forEach((page) => {
     let splitUrl = page.href.split('?');
     let queryString = splitUrl.slice(1).join('?');
     const hrefParams = new URLSearchParams(queryString);
     let hrefValue = hrefParams.get('page');
     if (hrefValue === activeUrl) {
       page.active = true;
     } else {
       page.active = false;
     }
   });
   pages = pages;
 }
 
 const previous = () => {
   alert('Previous btn clicked. Make a call to your server to fetch data.');
 };
 const next = () => {
   alert('Next btn clicked. Make a call to your server to fetch data.');
 };
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
            <Button href="/manage/fleet/files/file/{file.id}" color="light" class="text-customGray hover:text-customGray p-2 min-w-32">View file</Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>


  <div class="w-full flex justify-end pr-4 mt-4">
    <Pagination {pages} on:previous={previous} on:next={next} icon>
      <svelte:fragment slot="prev">
        <span class="sr-only">Previous</span>
        <ChevronLeftOutline class="w-6 h-6" />
      </svelte:fragment>
      <svelte:fragment slot="next">
        <span class="sr-only">Next</span>
        <ChevronRightOutline class="w-6 h-6" />
      </svelte:fragment>
    </Pagination>
  </div>
</div>
