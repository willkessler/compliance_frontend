<script lang="ts">
 import { Badge, Button, Card,  Modal, Label, Input, Textarea,  Select, Pagination, PaginationItem, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileSolid, FileImageSolid, CirclePlusSolid, 
        TruckSolid, 
        UsersOutline,
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

 let vehicles = [
   { id: 4396, name: "4396 (TX)", operatingTime: "100h 52m",    mileage: "75,743", status: "Blocked", icon: ExclamationCircleSolid, },
   { id: 4385, name: "4385 (TX)", operatingTime: "97h 46m",     mileage: "47,573", status: "In progress", icon: ClockSolid },
   { id: 2348, name: "2348 (CA)", operatingTime: "89h 02m",     mileage: "83,543", status: "Clear", icon: ThumbsUpSolid, },
   { id: 6354, name: "6354 (TX)", operatingTime: "110h 33m",    mileage: "95,322", status: "Clear", icon: ThumbsUpSolid,},
   { id: 5322, name: "5322 (TX)", operatingTime: "10h 02m",     mileage: "7,433", status: "Clear", icon: ThumbsUpSolid,},
   { id: 5323, name: "5323 (TX)", operatingTime: "50h 55m",     mileage: "28,009", status: "Clear", icon: ThumbsUpSolid,},
   { id: 5331, name: "5331 (TX)", operatingTime: "10h 52m",     mileage: "1,431", status: "Clear", icon: ThumbsUpSolid,},
   { id: 9822, name: "9822 (AR)", operatingTime: "70h 12m",     mileage: "7,743", status: "Clear", icon: ThumbsUpSolid,},
   { id: 9282, name: "9282 (AR)", operatingTime: "1,040h 14m",  mileage: "115,098", status: "Clear", icon: ThumbsUpSolid,},
   { id: 9283, name: "9283 (AR)", operatingTime: "1,382h 49m", mileage: "153,887", status: "Clear", icon: ThumbsUpSolid,},
 ];

 function getVehicleById (id) {
   for (let vehicle of vehicles) {
     console.log(id, vehicle.id);
     if(vehicle.id === parseInt(id)) {
       return vehicle;
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
    <h1 class="text-3xl font-bold mb-2">Vehicle #{getVehicleById(id).name}</h1>
  </div>

  <ActionItems />
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
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Level:</span><Badge class="ml-2 bg-gray-100"> {incident.level}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Driver:</span><Badge class="ml-2 bg-gray-100"> <UsersOutline />{incident.driver}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Vehicle:</span><Badge class="ml-2 bg-gray-100"><TruckSolid />{incident.vehicle}</Badge></p>
      <div class="flex justify-start items-middle mb-0">
        <div class="mt-4 font-semibold text-nowrap mr-2">Due date:</div>
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
      <Card class="p-2 m-0 mt-2 divide-y shadow-none">
          <p class="text-sm">{incident.description}</p>
          <div class="flex justify-end items-center mt-2 pt-2 ml-2">
            <div class="pr-3 cursor-pointer"><MapPinAltSolid /></div>
            <div class="cursor-pointer"><FileImageSolid /></div>
          </div>
      </Card>
    </div>
  </div>
  
</IncidentLayout>

