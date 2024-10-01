<script>
 import { goto } from '$app/navigation';
 import { Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, ChevronLeftOutline, ChevronRightOutline, ThumbsUpSolid, CheckCircleSolid, TruckSolid, UsersOutline, FileLinesOutline } from 'flowbite-svelte-icons';
 import { page } from '$app/stores';
 import { Pagination, PaginationItem } from 'flowbite-svelte';
 import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
 import CustomBadge from '$lib/components/CustomBadge.svelte';

 import { activities, getActivityById, getActivityByCategory, 
        getActivityTitle, getTypeColor, getStatusColor, getPriorityColor } from '$lib/data/activityData';
 import { drivers, getDriverById } from '$lib/data/driverData';
 import { vehicles, getVehicleById, getVehicleDriver } from '$lib/data/vehicleData';

 const categories = ['Incidents', 'Maintenance', 'Records', 'All Types' ];
 let activeCategory = 'All Types';

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

 function navigateToActivityDetails(activityId) {
   goto(`/manage/activities/activity/${activityId}`, { replaceState: false });
 }

</script>

<!-- these don't work for some reason -->
<style>
 :global(.flowbite-table) {
   @apply shadow overflow-hidden border-b border-gray-200 sm:rounded-lg;
 }
 :global(.flowbite-table-head) {
   @apply bg-gray-50;
 }
 :global(.badge-purple) {
   background-color: #f3e8ff !important;
   color: #6b21a8 !important;
 }
</style>



<header class="pt-6 pl-4">
  <Breadcrumbs />
</header>

<div class="pl-4 pt-4 mr-0">
  <h1 class="text-3xl font-bold mb-4">Activity Manager</h1>

  <div class="flex justify-start items-center ">

    <div class="inline-block bg-white border rounded-lg p-0">
      {#each categories as category}
        <Button
          class="focus:outline-none focus:ring-2 focus:ring-gray-300 right-transparent text-gray-800 hover:bg-gray-200 min-width-xs mr-2 m-1 p-2 border-none {activeCategory.toLowerCase() === category.toLowerCase() ? 'bg-gray-300' : ''}"
          on:click={() => activeCategory = category.toLowerCase()}
          >
          {category}
        </Button>
      {/each}
    </div>
  </div>
  
  <Table hoverable class="relative overflow-x-auto sm:rounded-lg mt-5 ml-0">
    <TableHead class="bg-gray-50 whitespace-nowrap bg-customGray/15">
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Name of event</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Event Type</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Occurred On</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Due On</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Priority</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Status</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase"></TableHeadCell>
    </TableHead>
    <TableBody class="bg-white divide-y divide-gray-200">
      {#each getActivityByCategory(activeCategory) as activity}
        <TableBodyRow class="cursor-pointer" on:click={() => navigateToActivityDetails(activity.id)}>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-gray-600">
            {getActivityTitle(activity)}
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm text-customGray">
            <CustomBadge
              context="activityType"
              data={activity}
              dataField="type"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm text-customGray">{activity.type.toLowerCase() === 'maintenance' ? '--' : activity.occurrenceDate}</TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm text-customGray">{activity.dueDate}</TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm ">
            <CustomBadge
              context="priority"
              data={activity}
              dataField="priority"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm ">
            <CustomBadge
              context="status"
              secondaryContext="general"
              data={activity}
              dataField="status"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-medium">
            <Button on:click={() => navigateToActivityDetails(activity.id)} color="light" class="text-customGray hover:text-customGray p-2 min-w-32">See details →</Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>

<div class="w-full flex justify-end pr-4">
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
