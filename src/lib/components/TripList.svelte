<script lang="ts">
 import { goto } from '$app/navigation';
 import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileSolid } from 'flowbite-svelte-icons';
 import { getVehicleTrips } from '$lib/data/vehicleData';

 export let vehicleId = 1;

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
                <div class="pr-1">
                  {leg.preTrip}.pdf
                </div>
                <div>
                  <FileSolid />
                </div>
              </div>
            </TableBodyCell>
            <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
              <div class="flex items-center">
                <div class="pr-1">
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
