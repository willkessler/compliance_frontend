<script lang="ts">
 import { Badge, Button, Card,  Modal, Label, Input, Textarea,  Select, Pagination, PaginationItem, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tooltip } from 'flowbite-svelte';
 import { FileSolid, FileImageSolid, CirclePlusSolid, 
        TruckSolid, 
        UsersOutline,
        FileCopyOutline,
        FloppyDiskOutline,
        DownloadSolid,
        ExclamationCircleSolid,
        ClockSolid,
        PenOutline,
        ThumbsUpSolid,
        ChevronLeftOutline, ChevronRightOutline, MapPinAltSolid } from 'flowbite-svelte-icons';
 import styles from '$lib/css/rightPanel.module.css';

 import ActivityLayout from '$lib/components/ActivityLayout.svelte';
 import Uploads from '$lib/components/Uploads.svelte';
 import CustomBadge from '$lib/components/CustomBadge.svelte';
 import FilteredActivitiesList from '$lib/components/FilteredActivitiesList.svelte';

 import { drivers, getDriverById, injectDriverStatus } from '$lib/data/driverData';
 import { vehicles, getVehicleById } from '$lib/data/vehicleData';
 import { getOpenActivitiesForDriver } from '$lib/data/activityData';

 import { page } from '$app/stores';
 import { onMount } from 'svelte';

 let zoomedDriverLicense = false;
 let zoomTimeout;
 
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

 function handleDLMouseEnter() {
    clearTimeout(zoomTimeout);
    zoomedDriverLicense = true;
  }

  function handleDLMouseLeave() {
    zoomTimeout = setTimeout(() => {
      zoomedDriverLicense = false;
    }, 300); // 300ms delay before hiding the zoomed image
  }

  onMount(() => {
    return () => {
      formattedDate = formatDate(dueDate);
      clearTimeout(zoomTimeout);
    }
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

<ActivityLayout showRightPanel={false}>

  <!-- Driver "card -->
  <div class="rounded-md shadow-md overflow-hidden">
    <div class="border-b border-gray-200 p-4 bg-gray-100">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex gap-x-2 items-center">
	    <h2 class="text-2xl font-bold">Driver: {driver.name}</h2>
            <div class="text-gray-800">
              <CustomBadge
                context="status"
                secondaryContext="driving"
                data={injectDriverStatus(driver)}
                dataField="drivingStatus"
              />
            </div>
          </div>
	  <p class="text-sm text-muted-foreground">Last updated: {driver.startDate}</p>
        </div>
        <div>
          <Button outline class="text-sm bg-gray-200 text-black/60 hover:bg-gray-300"><PenOutline />&nbsp;Edit</Button>
        </div>
      </div>
    </div>


    <div>
      <div class="flex flex-col md:flex-row gap-x-5 items-stretch p-4">
        <div class="relative  mr-1 md:w-1/2 flex-shrink-0 w-full max-w-md max-w-[280px] max-h-[300px]">
          <div class="aspect-w-3 aspect-h-4 md:aspect-none md:h-full">
            <img 
              src="{driver.photo ? '/images/drivers/' + driver.photo : '/images/drivers/default.jpg'}" 
              alt="driver.name"
              class="w-full h-full object-cover object-top border"
            />
            <div
              on:mouseenter={handleDLMouseEnter}
              on:mouseleave={handleDLMouseLeave}
              class="absolute bottom-4 right-4 w-1/2 h-1/3"
            >
              <img
                src="/images/drivers/ca_drivers_license.png"
                alt="drivers_license"
                class="w-full h-full object-cover border-2 border-orange-300 rounded-lg cursor-pointer"
              />
              {#if zoomedDriverLicense}
                <div class="absolute bottom-0 right-0 w-[280px] h-[180px] z-10">
                  <img
                    src="/images/drivers/ca_drivers_license.png"
                    alt="drivers_license"
                    class="w-full h-full object-cover border-2 border-orange-300 rounded-lg cursor-pointer"
                  />
                  <div class="absolute right-2 top-2 rounded-xs bg-white/100 p-2 text-xs min-w-[130px]">

                    <div class="flex flex-wrap items-center">
                      <div class="w-1/2 font-semibold">Number:</div>
                      <div class="w-1/2 text-gray-800">{driver.license}</div>
                    </div>

                    <div class="flex flex-wrap items-center">
                      <div class="w-1/2 font-semibold">Issued:</div>
                      <div class="w-1/2 text-gray-800">{driver.issueDate}</div>
                    </div>

                    <div class="flex flex-wrap items-center">
                      <div class="w-1/2 font-semibold">Expires:</div>
                      <div class="w-1/2 text-gray-800">{driver.licenseExpiration}</div>
                    </div>
            
                    <div class="flex flex-wrap items-center justify-start mt-2">
                      <div title="copy" class="mr-2 cursor-pointer text-gray-600 hover:text-gray-900"><FileCopyOutline /></div>
                      <div title="download" class="cursor-pointer text-gray-600 hover:text-gray-900"><DownloadSolid /></div>
                    </div>

                  </div>
                  <button
                    on:click={() => { console.log('download cdl') }}
                    class="absolute right-2 bottom-2 text-gray-400 bg-gray-200 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >

                  </button>
                </div>
              {/if}
            </div>

            <div class="absolute top-2 right-2 p-3 bg-gray-200 rounded-full cursor-pointer">
              <PenOutline class="w-4 h-4 text-gray-700" />
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2 min-w-[340px] max-w-[340px]"> <!-- driver specific details -->
          <div class="space-y-2">
            <div class="flex flex-wrap items-center">
              <div class="w-1/2 font-semibold">Phone</div>
              <div class="w-1/2 text-gray-800">{driver.phone}</div>
            </div>

            <div class="flex flex-wrap items-center">
              <div class="w-1/2 font-semibold">Years of Experience</div>
              <div class="w-1/2 text-gray-800">{driver.yearsOfExperience} years</div>
            </div>

            <div class="flex flex-wrap items-center">
              <div class="w-1/2 font-semibold">SSN/EIN</div>
              <div class="w-1/2 text-gray-800">{driver.ssn}</div>
            </div>
            
            <div class="flex flex-wrap items-center">
              <div class="w-1/2 font-semibold">Total drive time</div>
              <div class="w-1/2 text-gray-800">{driver.totalDriveTime}</div>
            </div>
            
            <div class="flex flex-wrap items-center">
              <div class="w-1/2 font-semibold">Total miles driven</div>
              <div class="w-1/2 text-gray-800">{driver.totalMiles}</div>
            </div>
            
            <div class="flex flex-wrap items-center">
              <div class="w-1/2 font-semibold">Miles remaining</div>
              <div class="w-1/2 text-gray-800">{driver.milesRemaining}</div>
            </div>

            <div class="flex flex-wrap items-center">
              <div class="w-1/2 font-semibold">HOS remaining</div>
              <div class="w-1/2 text-gray-800">{driver.hosRemaining}</div>
            </div>
            
            <div class="flex flex-wrap items-center">
              <div class="w-1/2 font-semibold">Current Vehicle</div>
              <div class="w-1/2">
                <a href="/manage/fleet/vehicles/vehicle/{driver.vehicleId}">
                  <Badge class="text-gray-800 bg-gray-100 px-2 py-1"><TruckSolid class="mr-2" />Vehicle #{getVehicleById(driver.vehicleId).name}</Badge>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="font-semibold mt-1">Description/Notes:</div>
          <div class="italic mt-2 rounded-lg border p-2 min-h-[220px] max-w-[400px]">
	    {driver.notes}
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Credentials details -->
  <h1 class="text-lg font-bold mb-0 mt-6">Credentials</h1>

  <div>
    <Table class="relative overflow-x-auto sm:rounded-lg mt-5 ml-0 cursor-pointer" hoverable>
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
              <CustomBadge 
                context="status"
                secondaryContext="general"
                data={certification} 
                dataField="status"
              />
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

  <Uploads 
    previouslyUploadedFiles={[
                            { filename: 'Work application (pdf)', date: 'Feb 11, 2024' },
                            { filename: 'CDL (pdf)', date: 'Feb 12, 2024' },
                            { filename: 'Latest pull notice (pdf)', date: 'Sep 18, 2024' },
                            { filename: 'Driver Qualifications File (DQ) (pdf)', date: 'Jan 8, 2024' },
                            { filename: 'Driver Records File (zip)', date: 'Mar 23, 2024' },
                            ]}
  />

  <!-- Activity history -->
  <h1 class="text-lg font-bold mb-0 mt-6">Activity history</h1>
  <FilteredActivitiesList
    mode="driver"
    driverId={driver.id}
    onlyOpen={false}
    showMoreFields={true}
  />


  <div class="w-full mt-10 text-gray-100">
    <hr />
  </div>

  <div slot="right-panel" class="p-4 space-y-4 bg-white h-full min-w-80 overflow-hidden right-panel">
    <h2 class="text-xl font-bold text-customGray uppercase text-nowrap">Open Activities</h2>
    <FilteredActivitiesList
      mode="driver"
      driverId={driver.id}
      onlyOpen={true}
      showMoreFields={false}
    />
  </div>

</ActivityLayout>
