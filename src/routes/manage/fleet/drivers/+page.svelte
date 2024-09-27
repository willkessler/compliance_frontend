<script lang="ts">
 import { goto } from '$app/navigation';
 import { Badge, Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, ThumbsUpSolid, ExclamationCircleSolid, ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
 import { Pagination, PaginationItem, Label, Select } from 'flowbite-svelte';
 import { page } from '$app/stores';
 import { drivers, getDriverStatus } from '$lib/data/driverData';

 let sortColumn = "";
 let sortDirection = "asc";

 let filters = [
   { value: 'filter1', name: 'Local' },
   { value: 'filter2', name: 'All' },
 ];
 let selectedFilter;
 
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

 function upgradeStatus(driver) {
   if (driver.status.toLowerCase() === 'blocked') {
     return '2 Blockers';
   }
   return driver.status;
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

 function navigateToDriverDetails(driverId) {
   goto(`/manage/fleet/drivers/driver/${driverId}`);
 }

</script>


<div class="flex items-end justify-between pr-4">
  <div>
    <h1 class="text-3xl font-bold ">Drivers</h1>
  </div>
  <div>
    <Label>
      Filter selections:
      <Select class="text-xs mt-2 min-w-64" items={filters} bind:value={selectedFilter} />
    </Label>
  </div>
</div>

<Table class="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable>
  <TableHead class=" bg-customGray/15 whitespace-nowrap">
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Name</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Driving Status</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Total drive time</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Total miles driven</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Status</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Take Action</TableHeadCell>
  </TableHead>
  <TableBody class="bg-white divide-y divide-gray-200">
    {#each drivers as driver}
      <TableBodyRow class="cursor-pointer" on:click={() => navigateToDriverDetails(driver.id)}>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{driver.name}</TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">
          <Badge large rounded class="bg-{getStatusColor(driver.status)}-200 px-2 py-1.5 rounded rounded-[6px] min-w-32">
            {getDriverStatus(driver)}
          </Badge>
        </TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{driver.totalDriveTime}</TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{driver.totalMiles}</TableBodyCell>
        <TableBodyCell>
          <Badge large rounded class="text-customGray bg-{getStatusColor(driver.status)}-200 px-2 py-1.5 rounded rounded-[6px] min-w-32">
              {#if driver.icon !== undefined}
                <svelte:component this={driver.icon} class="mr-2 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              {/if}
            {upgradeStatus(driver)}
          </Badge>
        </TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <Button
            on:click={() => navigateToDriverDetails(driver.id)}
            color="light" 
            class="text-customGray hover:text-customGray p-2 min-w-32">
            See details →
          </Button>
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
