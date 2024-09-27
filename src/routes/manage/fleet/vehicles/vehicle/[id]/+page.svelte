<script lang="ts">
 import { Badge, Button, Card, Label, Input, Textarea,  Select, Pagination, PaginationItem,
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileSolid, FileImageSolid, CirclePlusSolid,
        TruckSolid,
        UsersOutline,
        FloppyDiskOutline,
        ExclamationCircleSolid,
        ClockSolid,
        PenOutline,
        ThumbsUpSolid,
        ChevronLeftOutline, ChevronRightOutline, MapPinAltSolid } from 'flowbite-svelte-icons';
 import styles from '$lib/css/rightPanel.module.css';
 import IncidentLayout from '$lib/components/IncidentLayout.svelte';
 import Uploads from '$lib/components/Uploads.svelte';
 import ActionItems from '$lib/components/ActionItems.svelte';

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
 let vehicleId, vehicle, driver;

 $: if ($page.params.id) {
   vehicleId = parseInt($page.params.id);
   vehicle = getVehicleById(vehicleId);
   driver =  getVehicleDriver(vehicleId);
   console.log(`got driver ${driver.id} for vehicle ${vehicle.id}` );
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

  <ActionItems
    environment="vehicle"
    vehicleId={vehicle.id}
  />

  <div class="w-full mt-10">
    <hr />
  </div>

  <!-- driver details -->
  <h1 class="text-lg font-bold mb-4 mt-6">Driver details</h1>

  <div>
    <Table class="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable>
      <TableHead class="bg-customGray/15 whitespace-nowrap">
        <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Name</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Start Date</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">End date</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each drivers.slice(0,3) as driver}
          <TableBodyRow>
            <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">{driver.name}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{driver.startDate}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{driver.endDate}</TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div class="w-full mt-10 text-gray-100">
    <hr />
  </div>

  <Uploads />

  <div slot="right-panel" class="p-4 space-y-4 bg-white h-full min-w-80 overflow-hidden">
    <div class="{styles.customOuterShadow} h-full overflow-auto">
      <div class={styles.contentWrapper}>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-xl font-bold text-customGray uppercase text-nowrap">Asset Info</h2>
          <p class="font-semibold text-customGray text-nowrap">{vehicle.acquisitionDate}</p>
        </div>

        <div class="p-2">
          <div class="relative pt-[95%] overflow-hidden">
            <img
              src="{vehicle.photo ? '/images/vehicles/' + vehicle.photo : '/images/vehicles/default.jpg'}"
              alt="vehicle.name"
              class="absolute inset-0 w-full h-full object-cover object-top border"
            />
            <div class="absolute top-2 right-2 p-3 bg-gray-200 rounded-full cursor-pointer">
              <PenOutline class="w-4 h-4 text-gray-700" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-y-2 gap-x-4 mt-2">
            <div class="font-semibold">Plate</div>
            <div>{vehicle.licensePlate}</div>

            <div class="font-semibold">VIN</div>
            <div title="Full VIN: 2345034948345890549">{vehicle.vin}</div>

            <div class="font-semibold">Driver</div>
            <a href="/manage/fleet/drivers/driver/{driver.id}">
              <Badge class="bg-gray-100 text-gray-800">
                <UsersOutline class="inline-block mr-1" />
                {driver.name}
              </Badge>
            </a>
            <div class="font-semibold">Vehicle</div>
            <a href="/manage/fleet/vehicles/vehicle/{vehicle.id}">
              <Badge class="bg-gray-100 text-gray-800">
                <TruckSolid class="inline-block mr-1" />
                Truck #{vehicle.id}
              </Badge>
            </a>
            <div class="font-semibold mt-2">Current Location</div>
            <div class="cursor-pointer mt-2 text-md text-nowrap">
              <div class="flex">{vehicle.city}, {vehicle.state}&nbsp;<MapPinAltSolid /></div>
            </div>
            <div class="flex justify-start items-middle mb-0">
              <div class="mt-4 font-semibold text-nowrap mr-2">Registration</div>
            </div>
            <div class="mt-3">
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
          <Card class="mt-2 divide-y shadow-none">
            <p class="text-md">{vehicle.description}</p>
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
      </div>
    </div>

</IncidentLayout>
