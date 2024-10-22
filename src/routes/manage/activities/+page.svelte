<script>
 import { goto } from '$app/navigation';
 import { Button, Card, Dropdown, DropdownItem, Modal, Input,
          Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { CirclePlusSolid, ClockSolid, ChevronLeftOutline, ChevronRightOutline, ChevronDownOutline,
          ThumbsUpSolid, CheckCircleSolid, TruckSolid, UsersOutline, FileLinesOutline, FileDocOutline,
          UserAddSolid, InboxFullSolid, InfoCircleSolid, EditSolid, SearchOutline } from 'flowbite-svelte-icons';
 import { LayoutDashboard, Landmark, Building2, Truck, Users, Link, CircleAlert, Info, WandSparkles, Settings, Database } from "lucide-svelte";

 import { page } from '$app/stores';
 import { Pagination, PaginationItem } from 'flowbite-svelte';
 import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
 import CustomBadge from '$lib/components/CustomBadge.svelte';
 import AddActivityModal from '$lib/components/AddActivityModal.svelte';
 import Map from '$lib/components/Map.svelte';

 import { activities, getActivityById, getActivityByCategory, 
        getActivityTitle, getTypeColor, getStatusColor, getPriorityColor } from '$lib/data/activityData';
 import { drivers, getDriverById } from '$lib/data/driverData';
 import { vehicles, getVehicleById, getVehicleDriver } from '$lib/data/vehicleData';

 const categories = ['Incidents', 'Maintenance', 'Records', 'All Types' ];
 let activeCategory = 'All Types';

 //
 // Modal related
 //

 let showModal = false; // whether the modal is visible
 let modalMode = 'accident'; // one of: 'accident', 'maintenance', 'record', or 'other', see dropdown menu below

 // boilerplate from https://flowbite-svelte.com/docs/components/pagination
 $: activeUrl = $page.url.searchParams.get('page');
 const paginatorJumpPage = '/manage/activities';
 let pages = [
   { name: 1, href: paginatorJumpPage },
   { name: 2, href: paginatorJumpPage },
   { name: 3, href: paginatorJumpPage },
   { name: 4, href: paginatorJumpPage },
 ];

 $: {
   pages.forEach((page) => {
     let splitUrl = page.href.split('?');
     let queryString = splitUrl.slice(1).join('?');
     const hrefParams = new URLSearchParams(queryString);
     let hrefValue = hrefParams.get('page');
     if (hrefValue === activeUrl && false) { // defeated for demo
       page.active = true;
     } else {
       page.active = false;
     }
   });
   pages = pages;
 }

 const previous = () => {
   console.log('Previous btn clicked. Make a call to your server to fetch data.');
 };
 const next = () => {
   console.log('Next btn clicked. Make a call to your server to fetch data.');
 };

 function navigateToActivityDetails(activityId) {
   goto(`/manage/activities/activity/${activityId}`, { replaceState: false });
 }

 function openModal(mode) {
   modalMode = mode;
   showModal = !showModal;
 }
 
 function closeModal() {
   showModal = false;
 }
   
</script>


<header class="pt-6 pl-4">
  <Breadcrumbs />
</header>

<div class="pl-4 pt-4 mr-0">
  <h1 class="text-3xl font-bold mb-4">Activity Manager</h1>

  <div class="flex justify-between">
    <div class="flex items-center justify-start">
      <div class="inline-block bg-white border rounded-lg p-0 text-nowrap">
        {#each categories as category}
          <Button
            class="focus:outline-none focus:ring-2 focus:ring-gray-300 right-transparent text-gray-800 hover:bg-gray-200 min-width-xs mr-2 m-1 p-2 border-none {activeCategory.toLowerCase() === category.toLowerCase() ? 'bg-gray-300' : ''}"
            on:click={() => activeCategory = category.toLowerCase()}
            >
            {category}
          </Button>
        {/each}
      </div>

      <div class="ml-4">
        <Button
          class="bg-blue-500 hover:bg-blue-600 text-white text-sm text-nowrap">
          <CirclePlusSolid />
          &nbsp;&nbsp;Add Activity!
        </Button>
        <Dropdown class="min-w-48">
          <DropdownItem on:click={() => { openModal('accident') }}><div class="flex text-customGray"><UserAddSolid class="mr-2"/>Accident</div></DropdownItem>
          <DropdownItem on:click={() => { openModal('maintenance') }}><div class="flex text-customGray"><InboxFullSolid class="mr-2"/>Maintenance</div></DropdownItem>
          <DropdownItem on:click={() => { openModal('record') }}><div class="flex text-customGray"><InfoCircleSolid class="mr-2"/>Record/Doc</div></DropdownItem>
          <DropdownItem on:click={() => { openModal('other') }}><div class="flex text-customGray"><EditSolid class="mr-2"/>Other</div></DropdownItem>
        </Dropdown>
      </div>
    </div>

    <div class="ml-6 min-w-64 mr-4 ">
      <div class="flex gap-x-4">
        <Input id="search" placeholder="Search" disabled>
          <SearchOutline slot="left" class="w-5 h-5 text-customGray dark:text-customGray" />
        </Input>
        <Button
          disabled
          class="bg-gray-300 hover:bg-gray-500 text-white text-md mr-4 min-w-[200px]">
          &nbsp;&nbsp;Filter
          <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
        </Button>

        <Dropdown class="min-w-[200px]">
          <DropdownItem><div class="flex text-customGray"><UserAddSolid class="mr-2"/>Drivers</div></DropdownItem>
          <DropdownItem><div class="flex text-customGray"><TruckSolid class="mr-2"/>Vehicles</div></DropdownItem>
          <DropdownItem><div class="flex text-customGray"><FileDocOutline class="mr-2"/>Documents</div></DropdownItem>
          <DropdownItem><div class="flex text-customGray"><Landmark class="mr-2"/>Federal</div></DropdownItem>
          <DropdownItem><div class="flex text-customGray"><Building2 class="mr-2"/>State</div></DropdownItem>
        </Dropdown>
      </div>
    </div>

  </div>  

  <Table hoverable class="relative overflow-x-auto sm:rounded-lg mt-5 ml-0">
    <TableHead class="bg-gray-50 whitespace-nowrap bg-customGray/15">
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Name of event</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Event Type</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Occurred On</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Due On</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Priority</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Status</TableHeadCell>
      <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase"></TableHeadCell>
    </TableHead>
    <TableBody>
      {#each getActivityByCategory(activeCategory) as activity}
        <TableBodyRow class="cursor-pointer" on:click={() => navigateToActivityDetails(activity.id)}>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-gray-600">
            {getActivityTitle(activity)}
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm text-customGray">
            <CustomBadge
              context="activityType"
              data={activity}
              dataField="type"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm text-customGray">{activity.type.toLowerCase() === 'maintenance' ? '--' : activity.occurrenceDate}</TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm text-customGray">{activity.dueDate}</TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm ">
            <CustomBadge
              context="priority"
              data={activity}
              dataField="priority"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm ">
            <CustomBadge
              context="status"
              secondaryContext="general"
              data={activity}
              dataField="status"
            />
          </TableBodyCell>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-medium">
            <Button on:click={() => navigateToActivityDetails(activity.id)} color="light" class="text-customGray hover:text-customGray p-2 min-w-32">See details →</Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>

<div class="w-full flex justify-end pr-4 mb-4">
  <Pagination {pages} on:previous={previous} on:next={next} icon>
    <svelte:fragment slot="prev">
      <span class="sr-only">Previous</span>
      <ChevronLeftOutline class="w-6 h-6" />
    </svelte:fragment>
    <svelte:fragment slot="next">
      <span class="sr-only">Next</span>
      <ChevronRightOutline class="w-6 h-6" />
    </svelte:fragment>
  </Pagination>
</div>

<Modal bind:open={showModal} outsideclose
  backdropClass="fixed inset-0 z-40 bg-white/80"
  size="lg"
  class="drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]">
  <AddActivityModal
    mode={modalMode}
    closeCb={closeModal}
  />
</Modal>
