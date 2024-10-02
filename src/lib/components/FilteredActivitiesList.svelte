<script lang="ts">
 import { goto } from '$app/navigation';
 import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { getActivitiesForVehicle, getActivitiesForDriver } from '$lib/data/activityData';
 import CustomBadge from '$lib/components/CustomBadge.svelte';

 export let mode = 'driver'; // driver, vehicle
 export let showMoreFields = true; // whether to show more action item fields in the table
 export let onlyOpen = false; // only open activities
 export let driverId = null;
 export let vehicleId = null;

 let filteredActivities = [];

 function updateFilteredActivities() {
   if (mode === 'driver' && driverId !== null) {
     filteredActivities = getActivitiesForDriver(driverId, onlyOpen);
   } else if (mode === 'vehicle' && vehicleId !== null) {
     filteredActivities = getActivitiesForVehicle(vehicleId, onlyOpen);
   } else {
     filteredActivities = [];
   }
 }

 $: {
   updateFilteredActivities();
 }
 
 function navigateToActivityDetails(activityId) {
   goto(`/manage/activities/activity/${activityId}`, { replaceState: false });
 }


</script>

<Table class=" ml-0 cursor-pointer" hoverable>
  {#if showMoreFields}
    <TableHead class="bg-customGray/15 whitespace-nowrap">
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Status</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Priority</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Date</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Details</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase"></TableHeadCell>
    </TableHead>
    <TableBody>
      {#each filteredActivities as activity}
        <TableBodyRow on:click={() => navigateToActivityDetails(activity.id)}>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
            <CustomBadge
              context="status"
              secondaryContext="general"
              data={activity}
              dataField="status"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
            <CustomBadge
              context="priority"
              data={activity}
              dataField="priority"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">{activity.occurrenceDate}</TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">{activity.title}</TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
            <Button color="light" class="text-customGray hover:text-customGray p-2">
              See details...
            </Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
{:else}
    <TableHead class="bg-customGray/15 whitespace-nowrap">
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Priority</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Details</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase"></TableHeadCell>
    </TableHead>
    <TableBody>
      {#each filteredActivities as activity}
        <TableBodyRow on:click={() => navigateToActivityDetails(activity.id)}>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
            <CustomBadge
              context="priority"
              data={activity}
              dataField="priority"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">{activity.title}</TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
            <Button color="light" class="text-customGray hover:text-customGray p-2">
              See details...
            </Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  {/if}
</Table>
