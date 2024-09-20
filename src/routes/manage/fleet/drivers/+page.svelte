<script lang="ts">
 import { Badge, Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, ThumbsUpSolid, ExclamationCircleSolid, ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
 import { Pagination, PaginationItem } from 'flowbite-svelte';
 import { page } from '$app/stores';
 import { drivers } from '$lib/data/driverData';

 let sortColumn = "";
 let sortDirection = "asc";

 function getStatusColor(status) {
   switch (status.toLowerCase()) {
     case 'clear':
     case 'completed':
       return 'green';
     case 'in progress':
       return 'blue';
     case 'blocked':
       return 'red';
     default:
       return 'gray';
   }
 }

 // boilerplate from https://flowbite-svelte.com/docs/components/pagination
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

<h1 class="text-3xl font-bold mb-6">Drivers</h1>
<Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
  <TableHead class="bg-gray-50 whitespace-nowrap">
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total drive time</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total miles driven</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHeadCell>
  </TableHead>
  <TableBody class="bg-white divide-y divide-gray-200">
    {#each drivers as driver}
      <TableBodyRow>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{driver.name}</TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{driver.totalDriveTime}</TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{driver.totalMiles}</TableBodyCell>
        <TableBodyCell>
          <Badge large rounded color={getStatusColor(driver.status)} class="px-2 py-1.5 rounded rounded-[6px] min-w-32">
              {#if driver.icon !== undefined}
                <svelte:component this={driver.icon} class=" text-{getStatusColor(driver.status)}-500 mr-2 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              {/if}
            {driver.status}
          </Badge>
        </TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <Button href="/manage/fleet/drivers/driver/{driver.id}" color="light" class="text-grey-600 hover:text-gray-900 p-2 min-w-32">See details →</Button>
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
