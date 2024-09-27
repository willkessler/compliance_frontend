<script lang="ts">
 import { Badge, Button, Card,  Modal, Label, Input, Textarea,  Select, Pagination, PaginationItem, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tooltip } from 'flowbite-svelte';
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
 import { drivers, getDriverById, getDriverStatus } from '$lib/data/driverData';
 import { vehicles, getVehicleById } from '$lib/data/vehicleData';

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

 let driverId, driver;
 $: if ($page.params.id) {
   driverId = parseInt($page.params.id);
   driver = getDriverById(driverId);
   //console.log(`got driver ${driver} for ${driverId}` );
 }

 let certifications = [
   { id: 1, item: 'DOT registration', expiry: 'Sep 15, 2024', status: 'Blocked', action: 'Notify driver', icon: ExclamationCircleSolid },
   { id: 2, item: 'DOT medical card', expiry: 'Aug 31, 2024', status: 'Blocked', action: 'Notify driver', icon: ExclamationCircleSolid },
   { id: 3, item: 'CDL', expiry: 'Sep 17, 2024', status: 'Clear', action: 'Auto-file', icon: ThumbsUpSolid },
   { id: 4, item: 'Drug and alcohol test', expiry: 'Sep 19, 2024', status: 'Clear', action: 'Auto-file', icon: ThumbsUpSolid },
   { id: 5, item: 'Clearinghouse registration', expiry: 'Jan 31, 2025', status: 'Clear', action: 'Auto-file', icon: ThumbsUpSolid },
 ];
 
 let historyItems = [
   { id: 1, item: 'Violation: tire wear', expiry: 'Jan 11, 2023', status: 'Open', action: 'See details', icon: ExclamationCircleSolid },
   { id: 2, item: 'CDL', expiry: 'Jun 3, 2024', status: 'Closed', action: 'See details', icon: ThumbsUpSolid },
   { id: 3, item: 'DOT medical card', expiry: 'May 14, 2024', status: 'Closed', action: 'See details', icon: ThumbsUpSolid },
   { id: 4, item: 'Drug and alcohol test', expiry: 'May 29, 2024', status: 'Closed', action: 'See details', icon: ThumbsUpSolid },
   { id: 5, item: 'Clearinghouse registration', expiry: 'August 7, 2024', status: 'Closed', action: 'See details', icon: ThumbsUpSolid },
 ];
 
 function getStatusColor(status) {
   switch (status.toLowerCase()) {
     case 'clear':
     case 'completed':
     case 'closed':
       return 'green';
     case 'open':
     case 'in progress':
       return 'blue';
     case 'blocked':
       return 'red';
     default:
       return 'gray';
   }
 }

 function getToolTipText(status) {
   switch (status.toLowerCase()) {
     case 'clear':
     case 'completed':
     case 'closed':
       return 'All good here!';
     case 'open':
     case 'in progress':
       return 'Check details to learn more';
     case 'blocked':
       return 'Pending signed paperwork to be turned into to the company by this driver.';
     default:
       return 'gray';
   }
 }
 
</script>

<IncidentLayout>
  <div>
    <h1 class="text-3xl font-bold mb-2">Driver: {driver.name}</h1>
  </div>


  <!-- Credentials details -->
  <h1 class="text-lg font-bold mb-4 mt-6">Credentials</h1>

  <div>
    <Table class="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable>
      <TableHead class="bg-customGray/15 whitespace-nowrap">
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">item</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">expiration date</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">status</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">action</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each certifications as certification}
          <TableBodyRow>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{certification.item}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{certification.expiry}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">
              <Badge 
                large
                rounded 
                id="status-{certification.id}"
                color={getStatusColor(certification.status)} class="px-2 py-1.5 rounded rounded-[6px] cursor-pointer min-w-32">
                {#if certification.icon !== undefined}
                  <svelte:component this={certification.icon} class=" text-{getStatusColor(certification.status)}-500 mr-2 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                {/if}
                {certification.status}
              </Badge>
              <Tooltip placement="bottom" triggeredBy="#status-{certification.id}">{getToolTipText(certification.status)}</Tooltip>
            </TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">
              <Button href="/manage/fleet/drivers/driver/{driver.id}" color="light" class="text-customGray hover:text-customGray p-2 min-w-32">
                {certification.action} →
              </Button>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>
  
  <div class="w-full mt-10 text-gray-100">
    <hr />
  </div>

  <!-- Activity history -->
  <h1 class="text-lg font-bold mb-4 mt-6">Activity history</h1>

  <div>
    <Table class="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable>
      <TableHead class="bg-customGray/15 whitespace-nowrap">
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">item</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">expiration date</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">status</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">action</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each historyItems as historyItem}
          <TableBodyRow>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{historyItem.item}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{historyItem.expiry}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">
              <Badge 
                large
                rounded
                id="history-{historyItem.id}"
                color={getStatusColor(historyItem.status)} class="px-2 py-1.5 rounded rounded-[6px] cursor-pointer min-w-32">
                {#if historyItem.icon !== undefined}
                  <svelte:component this={historyItem.icon} class=" text-{getStatusColor(historyItem.status)}-500 mr-2 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                {/if}
                {historyItem.status}
              </Badge>
              <Tooltip placement="bottom" triggeredBy="#history-{historyItem.id}">{getToolTipText(historyItem.status)}</Tooltip>
            </TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">
              <Button href="/manage/fleet/drivers/driver/{driver.id}" color="light" class="text-customGray hover:text-customGray p-2">
                {historyItem.action} →
              </Button>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div class="w-full mt-10 text-gray-100">
    <hr />
  </div>

  <Uploads 
    previouslyUploadedFiles={[
                            { filename: 'Work application (pdf)', date: 'Feb 11, 2024' },
                            { filename: 'CDL (pdf)', date: 'Feb 12, 2024' },
                            { filename: 'Latest pull notice (pdf)', date: 'Sep 18, 2024' }
                            ]}
  />

  <div slot="right-panel" class="p-4 space-y-4 bg-white h-full min-w-80 overflow-hidden">
    <div class="{styles.customOuterShadow} h-full overflow-auto">
      <div class={styles.contentWrapper}>
        <div class="flex justify-between items-center mb-0">
          <h2 class="text-xl font-bold text-customGray uppercase text-nowrap">Basic information</h2>
        </div>
        <Card class="shadow-none">
          <div class="relative pt-[95%] overflow-hidden">
            <img 
              src="{driver.photo ? '/images/drivers/' + driver.photo : '/images/drivers/default.jpg'}" 
              alt="driver.name"
              class="absolute inset-0 w-full h-full object-cover object-top border"
            />
            <div class="absolute top-2 right-2 p-3 bg-gray-200 rounded-full cursor-pointer">
              <PenOutline class="w-4 h-4 text-gray-700" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-y-2 gap-x-4 mt-4">
            <div class="font-semibold">Name</div>
            <div class="text-gray-800 font-bold">
              {driver.name}
            </div>
            <div class="font-semibold">License</div>
            <div class="text-gray-800">{driver.license}</div>

            <div class="font-semibold">Lic. Expiration</div>
            <div class="text-gray-800"> {driver.licenseExpiration}</div>
            
            <div class="font-semibold">SSN/EIN</div>
            <div class="text-gray-800 ">{driver.ssn}</div>
            
            <div class="font-semibold">Total Drive time</div>
            <div class="text-gray-800"> {driver.totalDriveTime}</div>
            
            <div class="font-semibold">Mileage</div>
            <div class="text-gray-800">{driver.totalMiles}</div>
            
            <div class="font-semibold">Vehicle</div>
            <div>
              <a href="/manage/fleet/vehicles/vehicle/{driver.vehicleId}">
                <Badge class="text-gray-800 bg-gray-100"><TruckSolid class="mr-2" />Truck #{getVehicleById(driver.vehicleId).name}</Badge>
              </a>
            </div>

            <div class="font-semibold">Driving status</div>
            <div class="text-gray-800">
              <Badge large rounded color={getStatusColor(driver.status)} class="px-2 py-1.5 rounded rounded-[6px] min-w-32">
                {getDriverStatus(driver)}
              </Badge>
            </div>

          </div>
        </Card>

        <div class="mt-6">Notes</div>
        <Card class="mt-0 divide-y shadow-none">
          <p class="text-md">{driver.notes}</p>
          <div class="flex justify-end items-center mt-2 pt-2 ml-2">
            <div class="pr-3 cursor-pointer"><MapPinAltSolid /></div>
            <div class="cursor-pointer"><FileImageSolid /></div>
          </div>
        </Card>
        <Button class="bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-2 w-11/12 mt-4 mr-8">
          <FloppyDiskOutline class="mr-2" />Save Changes
        </Button>
      </div>
    </div>
</IncidentLayout>
