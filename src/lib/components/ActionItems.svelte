<script lang="ts">
 import { Badge, Button, Card,  Modal, Label, Input, Textarea,  Select, Pagination, PaginationItem, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { FileDrop } from 'svelte-droplet';
 import { CirclePlusSolid, PenOutline, ChevronLeftOutline, ChevronRightOutline,  FileSolid, FileImageSolid } from 'flowbite-svelte-icons';
 import { page } from '$app/stores';
 import { onMount, tick } from 'svelte';

 //
 // Modal related
 //

 let defaultModal = false;
 let actionType = '';
 let actionName = '';
 let actionNotes = '';

 let selectedAction = null;
 let selectedActionType = null;
 let selectElement;
 let uploadedFiles = [];

 let selectedActionTypeValue = ''; // This will hold the string value of the selected action type

 $: if (selectedAction) {
   selectedActionTypeValue = selectedAction.type.toLowerCase();
 }

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

  function openModalWithAction(action) {
    console.log('openModalWithAction');
    selectedAction = action;
    selectedActionTypeValue = action.type.toLowerCase();
    actionName = action.name;
    actionNotes = action.description;
    defaultModal = true;
    uploadedFiles = [ { name: 'receipt_382.pdf'}, {name: 'bol_9_9_24.pdf'} ];
  }

 async function handleSelectChange(event) {
    await tick();
    console.log('new value:', event.target.value);
   //selectedActionTypeValue = event.target.value;
    console.log('Selected action type:', selectedActionTypeValue);
  }

  function updateAction() {
    // Handle action update logic here
    console.log('Updating action:', { actionType: selectedActionTypeValue, actionName, actionNotes, uploadedFiles });
    defaultModal = false;
    selectedAction = null;
    selectedActionTypeValue = '';
    uploadedFiles = [];
  }

  function createAction() {
    // Handle action creation logic here
    console.log('Creating action:', { actionType: selectedActionTypeValue, actionName, actionNotes, uploadedFiles });
    defaultModal = false;
    selectedActionTypeValue = '';
    uploadedFiles = [];
  }

 //
 // pagination boilerplate
 //
 let currentPage = 1; // Set this to your desired current page
 let totalPages = 10; // Set this to your total number of pages

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

  function previous() {
    if (currentPage > 1) currentPage--;
  }

  function next() {
    if (currentPage < totalPages) currentPage++;
  }

  function pageChange(event) {
    currentPage = event.detail;
  }

 let actions = [
   { id: 1, name: "Call Tom's repair shop",    description: 'Schedule a pickup time', date: 'Aug 31, 2024', type: 'Call'},
   { id: 2, name: "Payment from... ",          description: 'Payment from ...', date: 'Aug 31, 2024', type: 'Onsite'},
   { id: 3, name: "Payment from... ",          description: 'Payment from ...', date: 'Sep 15, 2024', type: 'Email'},
   { id: 4, name: "Payment from... ",          description: 'Payment from ...', date: 'Sep 17, 2024', type: 'Call'},
   { id: 5, name: "Payment from... ",          description: 'Payment from ...', date: 'Sep 19, 2024', type: 'Call'},
 ];

 
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

 
</script>

<div class="flex justify-between items-center mb-0 ml-2 mt-3">
  <h1 class="text-xl font-bold">Action Items History</h1>
  <Button on:click={() => { defaultModal = true; uploadedFiles = []; }}
    class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5"><CirclePlusSolid />&nbsp;&nbsp;Action Item</Button>
</div>

<div>
  <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
    <TableHead class="bg-gray-50 whitespace-nowrap">
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total drive time</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total miles driven</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHeadCell>
      <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each actions as action}
        <TableBodyRow>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{action.name}</TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{action.description}</TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{action.date}</TableBodyCell>
          <TableBodyCell>
              <Badge large rounded color={getTypeColor(action.type)} class="px-2 py-1.5 rounded rounded-[6px] cursor-pointer min-w-32" >
                {action.type}
              </Badge>
          </TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <Button on:click={() => openModalWithAction(action)} color="light" class="text-gray-500 hover:text-gray-900 min-w-32 p-2"><PenOutline/>&nbsp;Edit</Button>
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
</div>

<Modal bind:open={defaultModal} autoclose outsideclose 
  backdropClass="fixed inset-0 z-40 bg-white/80"
  class="drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
>
  <h3 class="text-gray-700 font-bold" slot="header">
    {selectedAction ? 'Edit Action' : 'Create New Action'}
  </h3>
  <form class="space-y-6">
    <div>
      <Label for="actionType" class="mb-2">Type of action</Label>
      <Select 
        id="actionType"
        bind:value={selectedActionTypeValue} 
        items={actionTypes} 
        on:change={handleSelectChange}
        placeholder="Select one"
      />
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
      <Button class="bg-white-900 hover:bg-gray-100 text-gray-500 mr-2" 
        on:click={() => {
                 defaultModal = false;
                 actionName = null;
                 actionNotes = null;
                 selectedAction = null;
                 selectedActionType = null;
                 selectedActionTypeValue = '';
                 uploadedFiles = [];
                 }}>Cancel</Button>
      <Button class="bg-blue-500 hover:bg-blue-600" on:click={selectedAction ? updateAction : createAction}>
        {selectedAction ? 'Update action item' : 'Add action item'}
      </Button>
    </div>
  </svelte:fragment>
</Modal>

