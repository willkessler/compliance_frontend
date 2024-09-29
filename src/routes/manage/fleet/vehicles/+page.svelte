<script lang="ts">
 import { goto } from '$app/navigation';
 import { Badge, Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, ChevronLeftOutline, ChevronRightOutline, ExclamationCircleSolid, MapPinAltSolid, ThumbsUpSolid } from 'flowbite-svelte-icons';
 import { Pagination, PaginationItem, Label, Select } from 'flowbite-svelte';
 import { page } from '$app/stores';
 import { vehicles, getVehicleById } from '$lib/data/vehicleData';
 import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
 import CustomBadge from '$lib/components/CustomBadge.svelte';

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

 function upgradeStatus(vehicle) {
   if (vehicle.status.toLowerCase() === 'blocked') {
     return '4 Blockers';
   }
   return vehicle.status;
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

 function navigateToVehicleDetails(vehicleId) {
   goto(`/manage/fleet/vehicles/vehicle/${vehicleId}`);
 }

</script>

<header class="pt-6 pl-4">
  <Breadcrumbs />
</header>

<div class="flex items-end justify-between pl-4 pr-4">
  <div>
    <h1 class="text-3xl font-bold ">Vehicles</h1>
  </div>
  <div>
    <Label>
      Filter selections:
      <Select class="text-xs mt-2 min-w-64" items={filters} bind:value={selectedFilter} />
    </Label>
  </div>
</div>

<div class="ml-4 mr-4">
  <Table hoverable class="relative overflow-x-auto sm:rounded-lg mt-5">
    <TableHead class=" bg-customGray/15 whitespace-nowrap">
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Vehicle</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Mileage</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Operating time</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Status</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Vehicle Location</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Take Action</TableHeadCell>
    </TableHead>
    <TableBody class="bg-white divide-y divide-gray-200">
      {#each vehicles as vehicle}
        <TableBodyRow on:click={() => navigateToVehicleDetails(vehicle.id)} class="cursor-pointer">
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">Truck #{vehicle.name}</TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">{vehicle.mileage}</TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">{vehicle.operatingTime}</TableBodyCell>
          <TableBodyCell class="pl-2">
            <CustomBadge 
              context="status"
              secondaryContext="general"
              data={vehicle} 
              dataField="status"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
            <div class="flex cursor-pointer">
              <div>{vehicle.city}, {vehicle.state}</div>
              <div><MapPinAltSolid class="ml-2" /></div>
            </div>
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-medium">
            <Button 
              on:click={() => navigateToVehicleDetails(vehicle.id)} 
              color="light" 
              class="text-customGray hover:text-customGray p-2 min-w-32">
              See details →
            </Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>

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
