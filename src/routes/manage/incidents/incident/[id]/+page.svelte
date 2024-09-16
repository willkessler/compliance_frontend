<script lang="ts">
 import { Badge, Button, Card,  Modal, Label, Input, Textarea,  Select, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileSolid, FileImageSolid, CirclePlusSolid,
        TruckSolid,
        FloppyDiskOutline,
        UsersOutline,
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

 let incident = {
   id: $page.params.id,
   title: `Payment refund to #00910`,
   date: 'Jul 31, 2024',
   level: 'State',
   driver: 'Thomas Pascal',
   vehicle: 'Truck #4396',
   dueDate: 'Aug 31, 2024',
   description: 'We are working with Tom\'s repair shop here.  Mark is the point of contact and expect to complete the repair on time. Location details below...'
 };

 const incidents = [
   { id: 1292, title: 'Tire rotation for Truck #2348 CAW' },
   { id: 292, title: 'Payment refund to #00910' },
   { id: 33828, title: 'Broken taillight for Truck #4396' },
   { id: 48482, title: 'Payment from Lana Byrd' },
   { id: 59382, title: 'Payment from Jese Leos' },
   { id: 68292, title: 'Payment from THEMSBERG LLC' },
   { id: 79182, title: 'Payment from THEMSBERG LLC' },
   { id: 81829, title: 'Payment from THEMSBERG LLC' },
   { id: 99928, title: 'Payment from THEMSBERG LLC' },
   { id: 10023, title: 'Payment from THEMSBERG LLC' },
 ];


 function getIncidentById (id) {
   for (let incident of incidents) {
     if(incident.id === id) {
       return incident;
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
    <h1 class="text-gray-500 text-sm">Incident #{id}</h1>
    <h1 class="text-3xl font-bold mb-2">{getIncidentById(id).title}</h1>
  </div>

  <ActionItems environment="incident" />

  <div class="w-full mt-24">
    <hr />
  </div>

  <Uploads />

  <div slot="right-panel" class="p-4 space-y-4 bg-white border h-full min-w-80">
    <div class="flex justify-between items-center mb-0 ml-2">
      <h2 class="text-xl font-bold text-gray-500 uppercase">details</h2>
      <p class="font-semibold text-gray-500">{incident.date}</p>
    </div>
    <div class="space-x-2">
      <Badge class="py-1 cursor-pointer"  color="green">Maintenance</Badge>
      <Badge class="py-1 cursor-pointer" color="red">Critical</Badge>
      <Badge class="py-1 cursor-pointer" color="blue">Open</Badge>
    </div>
    <div>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Level</span><span class="ml-2 text-gray-800"> {incident.level}</span></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Driver</span><Badge class="ml-2 text-gray-800 bg-gray-100 text-md"> <UsersOutline />{incident.driver}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Vehicle</span><Badge class="ml-2 text-gray-800 bg-gray-100 text-md"><TruckSolid />{incident.vehicle}</Badge></p>
      <div class="flex justify-start items-middle mb-0">
        <div class="mt-4 font-semibold text-nowrap mr-2">Due date</div>
        <div class="flex items-center">
          <div class="relative inline-block">
            <input
              type="date"
              bind:value={dueDate}
              on:input={handleInput}
              class="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
            />
            <div class="flex items-center bg-gray-100 border border-gray-300 rounded px-2 py-1">
              <svg class="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-sm text-gray-700">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    <div>
      <div class="mt-6">Description and notes</div>
      <div class="p-4 mt-2 divide-y shadow-none border rounded">
          <p class="text-md text-gray-600">{incident.description}</p>
          <div class="text-gray-500 flex justify-end items-center mt-2 pt-2 ml-2">
            <div class="pr-3 cursor-pointer"><MapPinAltSolid /></div>
            <div class="cursor-pointer"><FileImageSolid /></div>
          </div>
      </div>
      <Button class="bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-2 w-full mt-4">
        <FloppyDiskOutline class="mr-2" />Save Changes
      </Button>
    </div>
  </div>

</IncidentLayout>
