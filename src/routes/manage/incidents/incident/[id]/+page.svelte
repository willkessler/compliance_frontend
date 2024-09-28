<script lang="ts">
 import { Badge, Button, Card,  Modal, Label, Input, Textarea,  Select, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileSolid, FileImageSolid, CirclePlusSolid,
        TruckSolid,
        FloppyDiskOutline,
        UsersOutline,
        ChevronLeftOutline, ChevronRightOutline, MapPinAltSolid } from 'flowbite-svelte-icons';
 import styles from '$lib/css/rightPanel.module.css';
 import IncidentLayout from '$lib/components/IncidentLayout.svelte';
 import Uploads from '$lib/components/Uploads.svelte';
 import ActionItems from '$lib/components/ActionItems.svelte';

 import { incidents, getIncidentTitle, getIncidentById, getStatusColor, getPriorityColor, getTypeColor } from '$lib/data/incidentData';
 import { drivers, getDriverById } from '$lib/data/driverData';
 import { vehicles, getVehicleById, getVehicleDriver } from '$lib/data/vehicleData';

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

 let incidentId, incident, vehicle, driver;

 $: if ($page.params.id) {
   incidentId = parseInt($page.params.id);
   //console.log(`incidentId: ${incidentId}`);
   incident = getIncidentById(incidentId);
   // console.log(`incident: ${JSON.stringify(incident)}`);
   vehicle = getVehicleById(incident.vehicleId);
   // console.log(`vehicle: ${JSON.stringify(vehicle)}`);
   driver =  getVehicleDriver(vehicle.id);
   //console.log(`got driver ${driver.id} for incident ${incident.id}` );
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
    <h1 class="text-3xl font-bold mt-2 mb-2">{getIncidentTitle(incident)}</h1>
  </div>


  <ActionItems 
    environment="incident"
    incidentId={incident.id}
  />

  <div class="w-full mt-24">
    <hr />
  </div>

  <Uploads />

  <div slot="right-panel" class="p-4 space-y-4 bg-white h-full min-w-80 overflow-hidden">
    <div class="{styles.customOuterShadow} h-full overflow-auto">
      <div class={styles.contentWrapper}>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-customGray uppercase">Details</h2>
          <p class="font-semibold text-customGray">{incident.occurrenceDate}</p>
        </div>
        <div class="space-x-2 mb-2">
          <Badge class="py-1 cursor-pointer bg-{getTypeColor(incident.type)}-200 text-gray-700">{incident.type}</Badge>
          <Badge class="py-1 cursor-pointer bg-{getPriorityColor(incident.priority)}-200 text-gray-700">{incident.priority}</Badge>
          <Badge class="py-1 cursor-pointer bg-{getStatusColor(incident.status)}-200 text-gray-700">{incident.status}</Badge>
        </div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-4 mt-4">
          <div class="font-semibold">Level</div>
          <div>{incident.level}</div>
        </div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-4 mt-1">
          <div class="font-semibold">Occurred on</div>
          <div>{incident.occurrenceDate}</div>
        </div>
        <div class="grid grid-cols-2 gap-y-2 mt-2">
          <div class="font-semibold">Driver</div>
          <div>
            <a href="/manage/fleet/drivers/driver/{driver.id}"><Badge class="ml-2 text-gray-800 bg-gray-100 text-md"><UsersOutline />{driver.name}</Badge></a>
          </div>
        </div>
        <div>
          <div class="grid grid-cols-2 gap-y-2 mt-2">
            <div class="font-semibold">Vehicle</div>
            <div>
              <a href="/manage/fleet/vehicles/vehicle/{vehicle.id}"><Badge class="ml-2 text-gray-800 bg-gray-100 text-md"><TruckSolid />Truck #{vehicle.name}</Badge></a>
            </div>
          </div>
          <div>
            <div class="grid grid-cols-2 gap-y-2 gap-x-4 mt-3">
              <div class="font-semibold">Due Date</div>
              <div class="flex items-center">
                <div class="relative inline-block">
                  <input
                    type="date"
                    bind:value={dueDate}
                    on:input={handleInput}
                    class="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                  />
                  <div class="flex items-center bg-gray-100 border border-gray-300 rounded px-2 py-1">
                    <svg class="w-4 h-4 text-customGray mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
            <div class="p-4 mt-2 divide-y shadow-none border rounded">
              <p class="text-md text-gray-600">{incident.description}</p>
              <div class="text-customGray flex justify-end items-center mt-2 pt-2 ml-2">
                <div class="pr-3 cursor-pointer"><MapPinAltSolid /></div>
                <div class="cursor-pointer"><FileImageSolid /></div>
              </div>
            </div>
            <Button class="bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-2 w-full mt-4">
              <FloppyDiskOutline class="mr-2" />Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</IncidentLayout>
