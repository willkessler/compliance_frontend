<script lang="ts">
 import { goto } from '$app/navigation';
 import { Badge, Button, Label, Input, Textarea,  Select, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileSolid, FileImageSolid, CirclePlusSolid,
        TruckSolid,
        FloppyDiskOutline,
        PenOutline,
        UsersOutline,
        ChevronLeftOutline, ChevronRightOutline, MapPinAltSolid } from 'flowbite-svelte-icons';
 import styles from '$lib/css/rightPanel.module.css';
 import ActivityLayout from '$lib/components/ActivityLayout.svelte';
 import Uploads from '$lib/components/Uploads.svelte';
 import ActionItems from '$lib/components/ActionItems.svelte';

 import { activities, getActivityTitle, getActivityById, getStatusColor, getPriorityColor, getTypeColor } from '$lib/data/activityData';
 import { drivers, getDriverById } from '$lib/data/driverData';
 import { vehicles, getVehicleById, getVehicleDriver } from '$lib/data/vehicleData';

 import { page } from '$app/stores';
 import { onMount } from 'svelte';

 let zoomedDriverPic = false;

 //
 // Date handler
 //
 let dueDate = new Date('2024-08-31');
 let formattedDate;
 let showRightPanel = false;

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

 let activityId, activity, vehicle, driver;
 let selectedActionId = null;

 $: if ($page.params.id) {
   activityId = parseInt($page.params.id);
   //console.log(`activityId: ${activityId}`);
   activity = getActivityById(activityId);
   //console.log(`activity: ${JSON.stringify(activity)}`);
   vehicle = getVehicleById(activity.vehicleId);
   //console.log(`vehicle: ${JSON.stringify(vehicle)}`);
   driver =  getVehicleDriver(vehicle.id);
   //console.log(`got driver ${driver.id} for activity ${activity.id}` );
 }

 function setSelectedActionId (actionId) {
   selectedActionId = actionId;
   console.log(`set current action id to ${selectedActionId}`);
   showRightPanel = true;
 }
 
 function hideRightPanel () {
   console.log('inside hideRightPanel');
   showRightPanel = false;
 }

 function navigateToDriverDetails(driverId) {
   goto(`/manage/fleet/drivers/driver/${driverId}`, { replaceState: false });
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

<ActivityLayout showRightPanel={showRightPanel}>
  <div>
    <h1 class="text-2xl font-bold mt-2 mb-2">Activity Details</h1>
  </div>

  <!-- Activity "card" -->
  <div class="rounded-md shadow-md overflow-hidden">
    <div class="border-b border-gray-200 p-4 bg-gray-100">
      <div class="flex justify-between items-center">
        <div>
	  <h2 class="text-2xl font-bold">{getActivityTitle(activity)}</h2>
	  <p class="text-sm text-muted-foreground">Last updated: Jan 24, 2024</p>
        </div>
        <div>
          <Button outline class="text-sm bg-gray-200 text-black/60 hover:bg-gray-300"><PenOutline />&nbsp;Edit</Button>
        </div>
      </div>
    </div>

    <div class="p-4">
      <div class="flex gap-2 mt-2 mb-5">
        <Badge class="min-w-24 px-4 py-2 cursor-pointer bg-{getTypeColor(activity.type)}-200 text-gray-700">{activity.type}</Badge>
        <Badge class="min-w-24 px-4 py-2 cursor-pointer bg-{getPriorityColor(activity.priority)}-200 text-gray-700">{activity.priority}</Badge>
        <Badge class="min-w-24 px-4 py-2 cursor-pointer bg-{getStatusColor(activity.status)}-200 text-gray-700">{activity.status}</Badge>
      </div>


      <div class="mb-0 p-0">
        <div class="flex gap-4 mb-0 mt-4 mb-4">

          <!-- Activity photos -->
          <div class="relative md:w-1/2 flex-shrink-0 max-w-[280px] max-h-[280px]">
            <div class="aspect-w-3 aspect-h-4 md:aspect-none md:h-full">
              <img 
                src="{vehicle.photo ? '/images/vehicles/' + vehicle.photo : '/images/vehicles/default.jpg'}" 
                alt="vehicle.name"
                class="w-full h-full object-cover object-top border"
              />
              <img
                on:mouseenter={() => { zoomedDriverPic = true; }}
              src="{driver.photo ? '/images/drivers/' + driver.photo : '/images/drivers/default.jpg'}"
              alt="driver.name"
              class="absolute bottom-2 right-2 w-1/4 h-1/4 object-cover border-4 border-gray-300 rounded-lg"
              />
              {#if zoomedDriverPic}
                <button
                  on:mouseleave={() => { zoomedDriverPic = false; }}
                  on:click={() => { navigateToDriverDetails(driver.id) }}
                  aria-label="driver_photo_reveal"
                  tabindex=0
                  >
                  <img
                    src="{driver.photo ? '/images/drivers/' + driver.photo : '/images/drivers/default.jpg'}"
                  alt="driver.name"
                  class="absolute bottom-2 right-2 w-2/3 h-1/2 object-cover border-2 border-orange-300 rounded-lg cursor-pointer"
                  />
                </button>
              {/if}

              <div class="absolute top-2 right-2 p-3 bg-gray-200 rounded-full cursor-pointer">
                <PenOutline class="w-4 h-4 text-gray-700" />
              </div>
            </div>
          </div>

          <!-- Activity details -->
          <div class="">
            <div class="min-w-80 max-w-64">
              <div class="grid grid-cols-2">
                <div class="font-semibold">Occurred on:</div>
                <div>{activity.occurrenceDate}</div>
              </div>

              <div class="grid grid-cols-2 gap-y-2 mt-2">
                <div class="font-semibold">Driver:</div>
                <div>
                  <a href="/manage/fleet/drivers/driver/{driver.id}">
                    <Badge class="text-nowrap text-gray-800 bg-gray-100 text-md px-2 py-1"><UsersOutline />{driver.name}</Badge>
                  </a>
                </div>
              </div>

              <div>
                <div class="grid grid-cols-2 gap-y-2 mt-2">
                  <div class="font-semibold">Vehicle:</div>
                  <div>
                    <a href="/manage/fleet/vehicles/vehicle/{vehicle.id}">
                      <Badge class="text-nowrap text-gray-800 bg-gray-100 text-md px-2 py-1">
                        <TruckSolid />Vehicle #{vehicle.name}
                      </Badge>
                    </a>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-y-2 mt-2">
                <div class="font-semibold">Level:</div>
                <div>{activity.level} level</div>
              </div>

              <div class="grid grid-cols-2 mt-3 text-nowrap">
                <div class="font-semibold">Due Date:</div>
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
          </div>


          <div class="w-full min-w-[200px] max-w-[600px]">
            <div class="font-semibold mb-2">Description/Notes:</div>
            <div class="italic rounded-lg border p-2 min-h-[220px]">
	      {activity.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ActionItems 
    environment="activity"
    mode="all"
    showChrome={true}
    activityId={activity.id}
    hideRightPanelCb={hideRightPanel}
    setActionItemCb={setSelectedActionId}
  />

  <div class="w-full mt-10">
    <hr />
  </div>

  <div class="w-full mt-5">
    <Uploads />
  </div>

  <div slot="right-panel" class="p-4 space-y-4 bg-white h-full min-w-80 overflow-hidden rounded-none right-panel">
    <ActionItems
      environment="activity"
      showChrome={false}
      mode="single"
      actionItemId={selectedActionId}
      hideRightPanelCb={hideRightPanel}
    />
  </div>

</ActivityLayout>
