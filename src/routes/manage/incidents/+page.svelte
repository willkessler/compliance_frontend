<script>
 import { Badge, Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid } from 'flowbite-svelte-icons';

  let activeTab = 'all events';
  const tabs = ['All events', 'Needs attention', 'Upcoming'];

  const events = [
    { name: 'Tire rotation for Truck #2348 CAW', icon: ClockSolid, 
    type: 'Maintenance', status: 'Done', occurrenceDate: 'Apr 23, 2021', dueDate: 'Apr 23, 2021' },
    { name: 'Payment refund to #00910', icon: ClockSolid, 
    type: 'Other issue', status: 'Other status', occurrenceDate: 'Apr 23, 2021', dueDate: 'Apr 23, 2021' },
    { name: 'Broken taillight for Truck #4396', icon: ClockSolid, 
    type: 'Incident', status: 'Open', occurrenceDate: 'Apr 18, 2021', dueDate: 'Apr 18, 2021' },
    { name: 'Payment from Lana Byrd', type: 'In progress', status: 'In progress', occurrenceDate: 'Apr 15, 2021', dueDate: 'Apr 15, 2021' },
    { name: 'Payment from Jese Leos', type: 'Completed', status: 'Completed', occurrenceDate: 'Apr 15, 2021', dueDate: 'Apr 15, 2021' },
  ];

  function getTypeColor(type) {
    switch (type.toLowerCase()) {
      case 'maintenance':
        return 'green';
      case 'incident':
        return 'red';
      case 'in progress':
        return 'blue';
      case 'completed':
        return 'green';
      case 'other issue':
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


</script>

<div class="p-4">

  <h1 class="text-3xl font-bold mb-4">Incident manager</h1>

  <div class="inline-block bg-white border rounded-lg p-0">
      {#each tabs as tab}
        <Button
          color={activeTab === tab.toLowerCase() ? 'alternative' : 'light'}
          class="min-width-xs mr-2 m-1 p-2 border-none {activeTab === tab.toLowerCase() ? 'bg-neutral-100' : ''}"
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
            <Badge large rounded color={getTypeColor(event.type)}>
              {#if event.icon !== undefined}
                <svelte:component this={event.icon} class=" text-gray-500 mr-2 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              {/if}
              {event.type}
            </Badge>
          </TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <Badge large rounded color={getStatusColor(event.status)}>
              {event.status}
            </Badge>
          </TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.occurrenceDate}</TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.dueDate}</TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <Button color="light" class="text-grey-600 hover:text-gray-900 p-2">See details →</Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>

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
