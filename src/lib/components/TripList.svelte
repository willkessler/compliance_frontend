<script lang="ts">
 import { goto } from '$app/navigation';
 import { Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileSolid } from 'flowbite-svelte-icons';
 import { getVehicleById, getVehicleTrips, getVehicleDvir } from '$lib/data/vehicleData';

 export let vehicleId = 1;
 let showModal = false; // whether the modal is visible
 let whichTripId, whichLegId, whichInsp, whichDate;

</script>

<Table class=" ml-0 cursor-pointer hover:bg-transparent" hoverable>
    <TableHead class="bg-customGray/15 whitespace-nowrap">
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Trip Id</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Leg Id</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Started On</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Ended On</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Pre Trip DVIR</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Post Trip DVIR</TableHeadCell>
    </TableHead>
    <TableBody>
      {#if getVehicleTrips(vehicleId).length > 0 }
        {#each getVehicleTrips(vehicleId) as leg}
          <TableBodyRow>
            <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
              {leg.tripId}
            </TableBodyCell>
            <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
              {leg.id}
            </TableBodyCell>
            <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
              {leg.startDate}
            </TableBodyCell>
            <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
              {leg.endDate}
            </TableBodyCell>
            <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
              <div class="flex items-center">
                <div class="pr-1" on:click={() => { 
                                           whichDate = leg.startDate;
                                           whichTripId = leg.tripId;
                                           whichLegId = leg.id;
                                           whichInsp = 'pre';
                                           showModal = true;
                                           }} >
                  {leg.preTrip}.pdf
                </div>
                <div>
                  <FileSolid />
                </div>
              </div>
            </TableBodyCell>
            <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
              <div class="flex items-center">
                <div class="pr-1" on:click={() => { 
                                           whichTripId = leg.tripId;
                                           whichLegId = leg.id;
                                           whichInsp = 'post';
                                           showModal = true;
                                           }} >
                  {leg.postTrip}.pdf
                </div>
                <div>
                  <FileSolid />
                </div>
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      {:else}
        <div class="p-5 italic text-md">
          No trips recorded to date.
        </div>
      {/if}
    </TableBody>
</Table>

<Modal bind:open={showModal} autoclose outsideclose>
  <h1 class="text-lg font-bold mb-0 mt-6">Driver Vehicle Inspection Report &mdash; {whichDate}</h1>

  <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
      <div>
        <p class="font-semibold text-customGray uppercase">Type</p>
        <p>{whichInsp}-trip</p>
      </div>
      <div>
        <p class="font-semibold text-customGray uppercase">Inspection AUTHOR</p>
        <p>{getVehicleDvir(vehicleId, whichTripId, whichLegId, whichInsp).authorName}</p>
      </div>
      <div>
        <p class="font-semibold text-customGray uppercase">Inspection Date</p>
        <p>{whichDate}</p>
      </div>
      <div>
        <p class="font-semibold text-customGray uppercase">Location</p>
        <p>{getVehicleDvir(vehicleId, whichTripId, whichLegId, whichInsp).location}</p>
      </div>
      <div>
        <p class="font-semibold text-customGray uppercase">Duration</p>
        <p>{getVehicleDvir(vehicleId, whichTripId, whichLegId, whichInsp).duration}</p>
      </div>
      <div>
        <p class="font-semibold text-customGray uppercase">Vehicle Id</p>
        <p>{vehicleId}</p>
      </div>
      <div>
        <p class="font-semibold text-customGray uppercase">Trailer Name</p>
        <p>B341</p>
      </div>
      <div>
        <p class="font-semibold text-customGray uppercase">Odometer</p>
        <p>{getVehicleDvir(vehicleId, whichTripId, whichLegId, whichInsp).odometer}</p>
      </div>
      <div>
        <p class="font-semibold text-customGray uppercase">License Plate</p>
        <p>{getVehicleById(vehicleId).licensePlate}</p>
      </div>
    </div>
  </div>

  <div class="bg-gray-100 mt-4 p-4 rounded-lg shadow-sm">
    <h4 class="text-md font-bold mb-0">Issue(s) reported:</h4>
    <ul>
      {#each getVehicleDvir(vehicleId, whichTripId, whichLegId, whichInsp).defects as defect}
        <li>
          {defect}
        </li>
      {/each}
    </ul>
  </div>

</Modal>

<style>
ul {
  display: block;
  margin-left: 30px;
  margin-top:10px;
}

ul li {
  display: block;
  position: relative;
}

ul li:not(:last-child) {
  margin-bottom: 2px;
}

ul li:before {
  content: "";
  position: absolute;
  top: 1.2em;
  left: -20px;
  margin-top: -.8em;
  background: #ccc;
  height: 12px;
  width: 12px;
  border-radius: 50%;
}
</style>
