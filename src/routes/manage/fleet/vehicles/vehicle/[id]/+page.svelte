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

 let asset = {
   id: $page.params.id,
   license: '6NDW861',
   vin: '2345034948345890549',
   driver: 'Thomas Payne',
   vehicle: 'Truck #4396',
   date: 'Aug 31, 2024',
   description: 'This truck is a diesel vehicle that Eric puchased second-hand.',
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

 let drivers = [
   { id: 1922, name: 'Thomas Payne', startDate: 'Jan 1, 2024', endDate: 'Ongoing' },
   { id: 1923, name: 'Mark Ingram', startDate: 'Jan 1, 2023', endDate: 'Dec 31, 2023' },
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

  <ActionItems environment="vehicle" />

  <div class="w-full mt-10">
    <hr />
  </div>

  <!-- driver details -->
  <h1 class="text-lg font-bold mb-4 mt-6">Driver details</h1>

  <div>
    <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
      <TableHead class="bg-gray-50 whitespace-nowrap">
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">End date</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each drivers as driver}
          <TableBodyRow>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{driver.name}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{driver.startDate}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{driver.endDate}</TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>


  <div class="w-full mt-10 text-gray-100">
    <hr />
  </div>

  <Uploads />

  <div slot="right-panel" class="p-4 space-y-4 bg-white border h-full min-w-80">
    <div class="flex justify-between items-center mb-0 ">
      <h2 class="text-xl font-bold text-gray-500 uppercase text-nowrap">asset info</h2>
      <p class="font-semibold text-gray-500 text-nowrap">{asset.date}</p>
    </div>
    <div class="grid grid-cols-2 gap-y-2 gap-x-4">
      <div class="font-semibold">License</div>
      <div>{asset.license}</div>
      
      <div class="font-semibold">VIN</div>
      <div>{asset.vin}</div>
      
      <div class="font-semibold">Driver</div>
      <Badge class="bg-gray-100 text-gray-800">
        <UsersOutline class="inline-block mr-1" />
        {asset.driver}
      </Badge>
      
      <div class="font-semibold">Vehicle</div>
      <Badge class="bg-gray-100 text-gray-800">
        <TruckSolid class="inline-block mr-1" />
        {asset.vehicle}
      </Badge>
      <div class="flex justify-start items-middle mb-0">
        <div class="mt-4 font-semibold text-nowrap mr-2">Registration</div>
      </div>
      <div>
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
    </div>
      <div>
        <div class="mt-6">Description and notes</div>
        <Card class="mt-2 divide-y shadow-none">
          <p class="text-md">{asset.description}</p>
          <div class="flex justify-end items-center mt-2 pt-2 ml-2">
            <div class="pr-3 cursor-pointer"><MapPinAltSolid /></div>
            <div class="cursor-pointer"><FileImageSolid /></div>
          </div>
        </Card>
        <Button class="bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-2 w-full mt-4">
          <FloppyDiskOutline class="mr-2" />Save Changes
        </Button>
      </div>
    </div>
    
</IncidentLayout>

