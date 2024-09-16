<script lang="ts">
 import { Badge, Button, Card,  Modal, Label, Input, Textarea,  Select, Pagination, PaginationItem, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileSolid, FileImageSolid, CirclePlusSolid, 
        TruckSolid, 
        UsersOutline,
        FloppyDiskOutline,
        ExclamationCircleSolid,
        ClockSolid,
        ThumbsUpSolid,
        ChevronLeftOutline, ChevronRightOutline, MapPinAltSolid } from 'flowbite-svelte-icons';
 import IncidentLayout from '$lib/components/IncidentLayout.svelte';
 import Uploads from '$lib/components/Uploads.svelte';
 import ActionItems from '$lib/components/ActionItems.svelte';

 import { page } from '$app/stores';
 import { onMount } from 'svelte';

 //
 // Date handler
 //
 let dueDate = new Date('2024-08-31');
 let formattedDate;

 function formatDate(date) {
   const d = new Date(date);
   const options = { year: 'numeric', month: 'short', day: 'numeric' };
   return d.toLocaleDateString('en-US', options);
  }

  function handleInput(event) {
    dueDate = event.target.value;
    formattedDate = formatDate(dueDate);
  }

  onMount(() => {
    formattedDate = formatDate(dueDate);
  });

 // Table data
 $: id = parseInt($page.params.id); // get the page id from the url

 let driver = {
   id: $page.params.id,
   license: '6NDW861',
   licenseExpiration: '02/31/2025',
   ssn: '616-55-5555',
   totalDriveTime: '265d 15h 24m',
   mileage: '255,354',
   driver: 'Thomas Payne',
   vehicle: 'Truck #4396',
   date: 'Aug 31, 2024',
   description: 'Thomas left on 7/29/22 and came back 01/01/24.',
 };

 let drivers = [
   { id: 1922, name: 'Thomas Payne', startDate: 'Jan 1, 2024', endDate: 'Ongoing' },
   { id: 1923, name: 'Mark Ingram', startDate: 'Jan 1, 2023', endDate: 'Dec 31, 2023' },
 ];

 let certifications = [
   { item: 'DOT License', expiry: 'Aug 31, 2024', status: 'Clear', action: 'Auto-file' },
   { item: 'CDL License', expiry: 'Aug 31, 2024', status: 'Clear', action: 'Notify driver' },
   { item: 'DOT medical card', expiry: 'Aug 31, 2024', status: 'Blocked', action: 'Notify driver' },
   { item: 'Drug and alcohol test', expiry: 'Aug 31, 2024', status: 'Clear', action: 'Notify driver' },
   { item: 'Clearinghouse registration', expiry: 'Aug 31, 2024', status: 'Clear', action: 'Auto-file' },
 ];
 

 function getDriverById (id) {
   for (let driver of drivers) {
     console.log(id, driver.id);
     if(driver.id === parseInt(id)) {
       return driver;
     }
   }
   return null;
 }
 
</script>

<style>
  input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

</style>

<IncidentLayout>
  <div>
    <h1 class="text-3xl font-bold mb-2">{getDriverById(id).name}</h1>
  </div>


  <!-- Credentials details -->
  <h1 class="text-lg font-bold mb-4 mt-6">Credentials</h1>

  <div>
    <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
      <TableHead class="bg-gray-50 whitespace-nowrap">
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">item</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">expiration date</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">status</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">action</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each certifications as certification}
          <TableBodyRow>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{certification.item}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{certification.expiry}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{certification.status}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{certification.action}</TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>
  
  <div slot="right-panel" class="p-4 space-y-4 bg-white border h-full min-w-80">
    <div class="flex justify-between items-center mb-0 ml-2">
      <h2 class="text-xl font-bold text-gray-500 uppercase text-nowrap">Basic information</h2>
    </div>
    <div>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">License:</span><Badge class="ml-2 bg-gray-100"> {driver.license}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Lic. Expiration:</span><Badge class="ml-2 bg-gray-100"> {driver.licenseExpiration}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">SSN/EIN:</span><Badge class="ml-2 bg-gray-100"> {driver.ssn}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Total Drive time:</span><Badge class="ml-2 bg-gray-100"> {driver.totalDriveTime}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Mileage:</span><Badge class="ml-2 bg-gray-100"> <UsersOutline />{driver.mileage}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Vehicle:</span><Badge class="ml-2 bg-gray-100"><TruckSolid />{driver.vehicle}</Badge></p>

      <div class="mt-6">Description and notes</div>
      <Card class="mt-2 divide-y shadow-none">
          <p class="text-md">{driver.description}</p>
          <div class="flex justify-end items-center mt-2 pt-2 ml-2">
            <div class="pr-3 cursor-pointer"><MapPinAltSolid /></div>
            <div class="cursor-pointer"><FileImageSolid /></div>
          </div>
      </Card>
      <Button class="bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-1.5 w-full mt-4">
        <FloppyDiskOutline class="mr-2" />Save Changes
      </Button>
    </div>
  </div>
  
</IncidentLayout>

