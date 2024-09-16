<script>
 import { Badge, Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, ChevronLeftOutline, ChevronRightOutline, ThumbsUpSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
 import { page } from '$app/stores';
 import { Pagination, PaginationItem } from 'flowbite-svelte';

 let activeTab = 'all events';
 const tabs = ['All events', 'Needs attention', 'Upcoming'];

  const events = [
    { id: 1292, name: 'Tire rotation for Truck #2348 CAW', icon: ClockSolid, 
    type: 'Maintenance', status: 'Open', occurrenceDate: 'Apr 23, 2021', dueDate: 'Apr 23, 2021' },
    { id: 33828, name: 'Broken taillight for Truck #4396', icon: ClockSolid, 
    type: 'Accident', status: 'Open', occurrenceDate: 'Apr 18, 2021', dueDate: 'Apr 18, 2021' },
    { id: 81829, name: 'Moving violation, Driver #8878', type: 'Driver issue', status: 'Open', occurrenceDate: 'Apr 11, 2021', dueDate: 'Apr 11, 2021', icon: CheckCircleSolid },
    { id: 99928, name: 'Parking violation, Driver #9219', type: 'Driver issue', status: 'Open', occurrenceDate: 'Apr 11, 2021', dueDate: 'Apr 11, 2021', icon: CheckCircleSolid },
    { id: 10023, name: 'Vehicle conversion to electric', type: 'Documents', status: 'Open', occurrenceDate: 'Apr 11, 2021', dueDate: 'Apr 11, 2021',icon: CheckCircleSolid },

    { id: 48482, name: 'Payment from Lana Byrd', icon: ClockSolid, 
    type: 'Documents', status: 'In progress', occurrenceDate: 'Apr 15, 2021', dueDate: 'Apr 15, 2021' },
    { id: 292, name: 'Payment refund to #00910', icon: ClockSolid, 
    type: 'Documents', status: 'In progress', occurrenceDate: 'Apr 23, 2021', dueDate: 'Apr 23, 2021' },
    { id: 79182, name: 'UCR processing error', type: 'Documents', status: 'Completed', occurrenceDate: 'Apr 11, 2021', dueDate: 'Apr 11, 2021', icon: CheckCircleSolid },
    { id: 59382, name: 'Payment from Jesse Leos', 
    type: 'Documents', status: 'Completed', occurrenceDate: 'Apr 15, 2021', dueDate: 'Apr 15, 2021', icon: CheckCircleSolid },
    { id: 68282, name: 'Contract from Themsberg LLC', type: 'Documents', status: 'Completed', occurrenceDate: 'Apr 11, 2021', dueDate: 'Apr 11, 2021',icon: CheckCircleSolid },
  ];

  function getTypeColor(type) {
    switch (type.toLowerCase()) {
      case 'maintenance':
        return 'gray';
      case 'accident':
      case 'incident':
        return 'red';
      case 'in progress':
      case 'payment':
        return 'blue';
      case 'completed':
        return 'green';
      case 'documents':
        return 'blue';
      default:
        return 'gray';
    }
  }

 function getStatusColor(status) {
   switch (status.toLowerCase()) {
     case 'done':
     case 'completed':
       return 'green';
     case 'open':
       return 'red';
     case 'in progress':
       return 'blue';
     case 'other status':
       return 'blue';
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


<div class="p-4">

  <h1 class="text-3xl font-bold mb-4">Incident manager</h1>

  <div class="inline-block bg-white border rounded-lg p-0">
      {#each tabs as tab}
        <Button
          class="focus:outline-none focus:ring-2 focus:ring-gray-300 right-transparent text-gray-800 hover:bg-gray-200 min-width-xs mr-2 m-1 p-2 border-none {activeTab === tab.toLowerCase() ? 'bg-gray-300' : ''}"
          on:click={() => activeTab = tab.toLowerCase()}
          >
          {tab}
        </Button>
      {/each}
  </div>

  <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0">
    <TableHead class="bg-gray-50 whitespace-nowrap">
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name of event</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type of event</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Occurrence Date</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHeadCell>
    </TableHead>
    <TableBody class="bg-white divide-y divide-gray-200">
      {#each events as event}
        <TableBodyRow>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{event.name}</TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <Badge rounded color={getTypeColor(event.type)} class="px-2 py-1.5 rounded rounded-[6px] min-w-32">
              {#if event.icon !== undefined}
                <svelte:component this={event.icon} class=" text-{getTypeColor(event.type)}-500 mr-2 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              {/if}
                {event.type}
            </Badge>
          </TableBodyCell>
          <TableBodyCell class="whitespace-nowrap text-sm text-gray-500">
            <Badge color={getStatusColor(event.status)} class="px-2 py-1.5 rounded rounded-[6px] min-w-32">
              {event.status}
            </Badge>
          </TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.occurrenceDate}</TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.dueDate}</TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <Button href="/manage/incidents/incident/{event.id}" color="light" class="text-grey-600 hover:text-gray-900 p-2 min-w-32">See details →</Button>
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
