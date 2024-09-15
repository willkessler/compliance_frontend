<script lang="ts">
 import { Badge, Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, ThumbsUpSolid, ExclamationCircleSolid, ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
 import { Pagination, PaginationItem } from 'flowbite-svelte';
 import { page } from '$app/stores';

 let drivers = [
   { name: "Eric Tang",    totalDriveTime: "42h 32m", totalMiles: "57,743", status: "Blocked", icon: ExclamationCircleSolid },
   { name: "Mark Taylor",  totalDriveTime: "221h 32m", totalMiles: "77,453", status: "In progress", icon: ClockSolid },
   { name: "Sid Sanger",   totalDriveTime: "89h 02m", totalMiles: "75,743", status: "Clear", icon: ThumbsUpSolid },
   { name: "Joe Jacob",    totalDriveTime: "8h 22m", totalMiles: "7,743", status: "Clear", icon: ThumbsUpSolid  },
   { name: "Joe Jasdeep",  totalDriveTime: "19h 12m", totalMiles: "95,437", status: "Clear", icon: ThumbsUpSolid },
   { name: "Derek Travis", totalDriveTime: "85h 02m", totalMiles: "4,173", status: "Clear", icon: ThumbsUpSolid },
   { name: "Alex Seerman", totalDriveTime: "66h 09m", totalMiles: "93,742", status: "Clear", icon: ThumbsUpSolid },
   { name: "Charlie Topanga", totalDriveTime: "19h 11m", totalMiles: "83,743", status: "Clear", icon: ThumbsUpSolid },
   { name: "Cain Reed",    totalDriveTime: "121h 17m", totalMiles: "18,212", status: "Clear", icon: ThumbsUpSolid },
   { name: "Marcus Miller", totalDriveTime: "209h 57m", totalMiles: "15,283", status: "Clear", icon: ThumbsUpSolid },
 ];

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
          <Badge large rounded color={getStatusColor(driver.status)} class="px-2 py-1.5 rounded rounded-[6px]">
              {#if driver.icon !== undefined}
                <svelte:component this={driver.icon} class=" text-{getStatusColor(driver.status)}-500 mr-2 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              {/if}
            {driver.status}
          </Badge>
        </TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <Button color="light" class="text-grey-600 hover:text-gray-900 p-2">See details →</Button>
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
