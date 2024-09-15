<script lang="ts">
 import { Badge, Button, Card,  Modal, Label, Input, Textarea,  Select, Pagination, PaginationItem, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileDrop } from 'svelte-droplet';
 import { ClockSolid, FileSolid, FileImageSolid, CirclePlusSolid, 
        TruckSolid, BadgeCheckSolid, 
        UsersOutline,
        CalendarMonthOutline,
        ChevronLeftOutline, ChevronRightOutline, MapPinAltSolid } from 'flowbite-svelte-icons';
 import IncidentLayout from '$lib/components/IncidentLayout.svelte';

 import { page } from '$app/stores';
 import { onMount } from 'svelte';

 // Modal setup
 let defaultModal = false;
 let actionType = '';
 let actionName = '';
 let actionNotes = '';
 let uploadedFiles = [];

 const actionTypes = [
   { value: 'call', name: 'Call' },
   { value: 'email', name: 'Email' },
   { value: 'onsite', name: 'Onsite' },
 ];

 function handleFiles(files: File[]) {
   uploadedFiles = [...uploadedFiles, ...files];
   for (const file of files) {
     console.log(file.name)
   }
 }

 function removeFile(index) {
   uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
 }

 function handleFileUpload(event) {
   const files = event.detail.files;
   uploadedFiles = [...uploadedFiles, ...files];
 }

 function createAction() {
   // Handle action creation logic here
   console.log({ actionType, actionName, actionNotes, uploadedFiles });
   defaultModal = false;
 }

 //
 // Date handler
 //
 let dueDate = new Date('2024-08-31');
 function handleFocus(event) {
   event.target.showPicker();
 }
 let formattedDate;

 function formatDate(date) {
    const d = new Date(date);
   const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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

 let incident = {
   id: $page.params.id,
   title: `Payment refund to #00910`,
   date: 'Jul 31, 2024',
   level: 'State',
   driver: 'Thomas Pascal',
   vehicle: 'Truck #4396',
   dueDate: 'Aug 31, 2024',
   description: 'We are working with Tom\'s repair shop here.  Mark is the point of contact and expect to complete the repair on time. Location details below...'
 };

 const incidents = [
   { id: 1292, title: 'Tire rotation for Truck #2348 CAW' },
   { id: 292, title: 'Payment refund to #00910' },
   { id: 33828, title: 'Broken taillight for Truck #4396' },
   { id: 48482, title: 'Payment from Lana Byrd' },
   { id: 59382, title: 'Payment from Jese Leos' },
   { id: 68292, title: 'Payment from THEMSBERG LLC' },
   { id: 79182, title: 'Payment from THEMSBERG LLC' },
   { id: 81829, title: 'Payment from THEMSBERG LLC' },
   { id: 99928, title: 'Payment from THEMSBERG LLC' },
   { id: 10023, title: 'Payment from THEMSBERG LLC' },
 ];
 
 let actions = [
   { name: "Call Tom's repair shop",    description: 'Schedule ...', date: 'Aug 31, 2024', type: 'Call'},
   { name: "Payment from... ",        description: 'Payment from ...', date: 'Aug 31, 2024', type: 'Onsite'},
   { name: "Payment from... ",        description: 'Payment from ...', date: 'Sep 15, 2024', type: 'Email'},
   { name: "Payment from... ",        description: 'Payment from ...', date: 'Sep 17, 2024', type: 'Call'},
   { name: "Payment from... ",        description: 'Payment from ...', date: 'Sep 19, 2024', type: 'Call'},
 ];

 let previouslyUploadedFiles = [
   { filename: "Document_name_incident_report",    date: 'Aug 31, 2024'},
   { filename: "Picture_of_the_issue.jpg",         date: 'Aug 31, 2024'},
 ];
 
 function getIncidentById (id) {
   for (let incident of incidents) {
     if(incident.id === id) {
       return incident;
     }
   }
   return null;
 }
 
 function getTypeColor(type) {
   switch (type.toLowerCase()) {
     case 'call':
       return 'blue';
     case 'email':
       return 'red';
     case 'onsite':
       return 'green';
     default:
       return 'gray';
   }
 }


 // pagination boilerplate
 $: activeUrl = $page.url.searchParams.get('page');
 let pages = [
   { name: 1, href: '/components/pagination?page=1' },
   { name: 2, href: '/components/pagination?page=2' },
   { name: 3, href: '/components/pagination?page=3' },
 ];

 $: {
   pages.forEach((page) => {
     let splitUrl = page.href.split('?');
     let queryString = splitUrl.slice(1).join('?');
     const hrefParams = new URLSearchParams(queryString);
     let hrefValue = hrefParams.get('page');
     if (hrefValue === activeUrl) {
       page.active = true;
     } else {
       page.active = false;
     }
   });
   pages = pages;
 }

  let currentPage = 1; // Set this to your desired current page
  let totalPages = 10; // Set this to your total number of pages

  function previous() {
    if (currentPage > 1) currentPage--;
  }

  function next() {
    if (currentPage < totalPages) currentPage++;
  }

  function pageChange(event) {
    currentPage = event.detail;
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
    <h1 class="text-gray-500 text-sm">Incident #{id}</h1>
    <h1 class="text-3xl font-bold mb-2">{getIncidentById(id).title}</h1>
  </div>

  <div class="flex justify-between items-center mb-0 ml-2">
    <h1 class="text-xl font-bold">History of Action Items</h1>
    <Button on:click={() => (defaultModal = true)}
      class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5"><CirclePlusSolid />&nbsp;&nbsp;Action Item</Button>
  </div>
  
  <div>
    <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
      <TableHead class="bg-gray-50 whitespace-nowrap">
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total drive time</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total miles driven</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each actions as action}
          <TableBodyRow>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{action.name}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{action.description}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{action.date}</TableBodyCell>
            <TableBodyCell>
              <Badge large rounded color={getTypeColor(action.type)} class="px-2 py-1.5 rounded rounded-[6px]">
                {action.type}
              </Badge>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
      <div class="w-full flex justify-start pr-4 ml-4 mt-2">
        <Pagination 
          bind:currentPage
          {totalPages}
          {pages} 
          on:previous={previous} 
          on:next={next} 
          on:pageChange={pageChange}
          icon
          large 
        >
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

    </Table>

    <h1 class="text-lg font-bold mb-4 mt-5">Uploaded Files</h1>

    <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
      <TableHead class="bg-gray-50 whitespace-nowrap">
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date added</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each previouslyUploadedFiles as uploadedFile}
          <TableBodyRow>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">
              <a href="#" >
                <div class="flex items-top">
                  {uploadedFile.filename} &nbsp;
                  <FileSolid />
                </div>
              </a>
            </TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{uploadedFile.date}</TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div slot="right-panel" class="p-4 space-y-4 bg-white border h-full">
    <div class="flex justify-between items-center mb-0 ml-2">
      <h2 class="text-xl font-bold text-gray-500 uppercase">details</h2>
      <p class="font-semibold text-gray-500">{incident.date}</p>
    </div>
    <div class="space-x-2">
      <Badge class="py-1 cursor-pointer"  color="green">Maintenance</Badge>
      <Badge class="py-1 cursor-pointer" color="red">Critical</Badge>
      <Badge class="py-1 cursor-pointer" color="blue">Open</Badge>
    </div>
    <div>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Level:</span><Badge class="ml-2 bg-gray-100"> {incident.level}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Driver:</span><Badge class="ml-2 bg-gray-100"> <UsersOutline />{incident.driver}</Badge></p>
      <p class="mb-2 cursor-pointer"><span class="font-semibold">Vehicle:</span><Badge class="ml-2 bg-gray-100"><TruckSolid />{incident.vehicle}</Badge></p>
      <div class="flex justify-start items-middle mb-0">
        <div class="mt-4 font-semibold text-nowrap mr-2">Due date:</div>
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
    <div>
      <div class="mt-6">Description and notes</div>
      <Card class="p-2 m-0 mt-2 divide-y shadow-none">
          <p class="text-sm">{incident.description}</p>
          <div class="flex justify-end items-center mt-2 pt-2 ml-2">
            <div class="pr-3 cursor-pointer"><MapPinAltSolid /></div>
            <div class="cursor-pointer"><FileImageSolid /></div>
          </div>
      </Card>
    </div>
  </div>
  
  <Modal bind:open={defaultModal} autoclose outsideclose 
    backdropClass="fixed inset-0 z-40 bg-white/80">
    <h3 class="text-gray-700 font-bold" slot="header">Create New Action</h3>
    <form class="space-y-6">
      <div>
        <Label for="actionType" class="mb-2">Type of action</Label>
        <Select id="actionType" bind:value={actionType} items={actionTypes} placeholder="Select one" />
      </div>
      <div>
        <Label for="actionName" class="mb-2">Name of action</Label>
        <Input id="actionName" bind:value={actionName} placeholder="Descriptive name" />
      </div>
      <div>
        <Label for="actionNotes" class="mb-2">Add notes</Label>
        <Textarea id="actionNotes" bind:value={actionNotes} rows="4" placeholder="Write text here ..." />
      </div>

      <div>
        <Label class="mb-2">Upload relevant files</Label>
        <FileDrop {handleFiles} let:droppable>
          <div class="text-center border p-2 mt-2 mb-4 rounded">
            <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="mt-1 text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p class="mt-1 text-xs text-gray-500">
              Max. File Size: 30MB
            </p>
          </div>
        </FileDrop>
        {#if uploadedFiles.length > 0}
          <div class="mt-4">
            {#each uploadedFiles as file, index}
              <div class="flex items-center mt-2">
                <FileSolid class="text-gray-500 mr-2" />
                <span class="text-sm text-gray-600">{file.name}</span>
                <button class="ml-auto text-red-500 hover:text-red-700" on:click={() => removeFile(index)}>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </form>

    <svelte:fragment slot="footer">
      <div class="w-full flex justify-end">
        <Button class="bg-white-900 hover:bg-gray-100 text-gray-500 mr-2" on:click={() => defaultModal = false}>Cancel</Button>
        <Button class="bg-blue-500 hover:bg-blue-600" on:click={() => defaultModal = false}>Add action item</Button>
      </div>
    </svelte:fragment>
  </Modal>

</IncidentLayout>

