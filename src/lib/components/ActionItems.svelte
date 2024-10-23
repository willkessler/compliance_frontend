<script lang="ts">
 import { Badge, Button, Card,  Modal, Label, Input, Textarea,  Select, Pagination, PaginationItem,
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Toast } from 'flowbite-svelte';
 import { slide } from 'svelte/transition';

 import { FileDrop } from 'svelte-droplet';
 import {
        ArrowRightOutline,
        CheckCircleOutline,
        CheckCircleSolid,
        CirclePlusSolid,
        ExclamationCircleOutline,
        PenOutline,
        ChevronLeftOutline,
        ChevronRightOutline,
        FileSolid,
        FileImageSolid,
        UsersOutline,
        FloppyDiskOutline,
        PhoneSolid,
        MailBoxOutline,
        MapPinAltOutline,
        } from 'flowbite-svelte-icons';
 import { page } from '$app/stores';
 import { onMount } from 'svelte';
 import { actions, getTypeIcon, getActionItems, getActionItemById, getTypeColor, getStatusColor } from '$lib/data/actionItemsData';
 import CustomBadge from '$lib/components/CustomBadge.svelte';
 import Map from '$lib/components/Map.svelte';

 //
 // Modal related
 //

 export let environment; // where the modal is being used, either 'activity' or 'vehicle'
 export let mode;        // one of: 'all', 'limited' or 'single' (all action items in a table, clickable, just a bulleted short list,
                         // or a single one whose id is passed in)
 export let activityId = null;  // which activity id was passed in
 export let vehicleId = null;   // which vehicle id was passed in
 export let actionItemId = null;    // which action item id
 export let setActionItemCb = () => { };  // stub for passed in callback
 export let hideRightPanelCb = () => { }; // stub for passed in callback
 export let showChrome = true; // whether to show all controls
 let showCourtModal = false;
 let zoomHoverTimer;

  onMount(() => {
    formattedDate = formatDate(dueDate);
  });

 let zoomedViolationPic = false;
 let zoomedCourtPic = false;
 let showModal = false; // whether the modal is visible
 let actionType = '';
 let actionName = '';
 let actionNotes = '';

 let selectedAction = null;
 let selectedActionType = null;

 let selectedStatus = null;
 let selectedStatusType = null;

 let uploadedFiles = [];

 let selectedActionTypeValue = '';
 let selectedStatusTypeValue = '';

 let toastStatus = false;
 let toastCounter = 5;


 $: if (selectedAction) {
   selectedActionTypeValue = selectedAction.type.toLowerCase();
 }

 const actionTypes = [
   { value: 'call', name: 'Call' },
   { value: 'email', name: 'Email' },
   { value: 'onsite', name: 'Onsite' },
 ];

 const statusTypes = [
   { value: 'open', name: 'Open' },
   { value: 'hold', name: 'Hold' },
   { value: 'closed', name: 'Closed' },
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
    showModal = true;
    uploadedFiles = [ { name: 'receipt_382.pdf'}, {name: 'bol_9_9_24.pdf'} ];
  }

 function handleTypeChange(event) {
    console.log('new value:', event.target.value);
   //selectedActionTypeValue = event.target.value;
    console.log('Selected action type:', selectedActionTypeValue);
  }

 function handleStatusChange(event) {
    console.log('new value:', event.target.value);
   //selectedActionTypeValue = event.target.value;
    console.log('Selected action type:', selectedStatusTypeValue);
  }

 function triggerActionToast() {
   toastStatus = true;
   toastCounter = 6;
   toastTimeout();
  }

  function toastTimeout() {
    if (--toastCounter > 0) return setTimeout(toastTimeout, 1000);
    toastStatus = false;
  }


  function updateAction() {
    // Handle action update logic here
    console.log('Updating action:', { actionType: selectedActionTypeValue, actionName, actionNotes, uploadedFiles });
    showModal = false;
    selectedAction = null;
    selectedActionTypeValue = '';
    uploadedFiles = [];
    triggerActionToast();
  }

  function createAction() {
    // Handle action creation logic here
    console.log('Creating action:', { actionType: selectedActionTypeValue, actionName, actionNotes, uploadedFiles });
    showModal = false;
    selectedActionTypeValue = '';
    uploadedFiles = [];
    triggerActionToast();
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

 // date picker stuff
 let dueDate = new Date('2024-08-31');
 let formattedDate;

 function formatDate(date) {
   const d = new Date(date);
   const options = { year: 'numeric', month: 'short', day: 'numeric' };
   return d.toLocaleDateString('en-US', options);
  }

  function handleDateInput(event) {
    dueDate = event.target.value;
    formattedDate = formatDate(dueDate);
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

ul {
  display: block;
  margin-left: -10px;
  text-align:left;
}

ul li {
  display: block;
  position: relative;
}

ul li:not(:last-child) {
  margin-bottom: 16px;
}

ul li:before {
  content: "";
  position: absolute;
  top: 1.2em;
  left: -30px;
  margin-top: -.9em;
  background: #ccc;
  height: 12px;
  width: 12px;
  border-radius: 50%;
}
 
</style>


<Toast class="mt-4 bg-orange-400 text-white-900" dismissable={false} transition={slide} bind:toastStatus>
  <CheckCircleSolid slot="icon" class="w-5 h-5" />
  Creating/editing activity data is not possible in the demo environment.
</Toast>

<div>
  {#if showChrome}
    <div class="flex justify-between items-end mb-0 ml-0 mt-8">
      <h1 class="text-lg font-bold">Actions Taken</h1>
      <Button on:click={() => { showModal = true; uploadedFiles = []; }}
        class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 mb-2">
        <CirclePlusSolid />
        &nbsp;&nbsp;New Action Item
      </Button>
    </div>
  {/if}

  {#if mode === 'limited' }
    {#if getActionItems(environment, (vehicleId !== null ? vehicleId: activityId)).length === 0}
      <div class="p-4 italic">No actions entered so far.</div>
    {:else}
      <ul>
        {#each getActionItems(environment, (vehicleId !== null ? vehicleId: activityId)) as action}
          <li>
            {action.name}
          </li>
        {/each}
      </ul>
    {/if}
  {:else if mode === 'all' }
    <Table class="mt-0 relative overflow-x-auto ml-0 cursor-pointer" hoverable>
      <TableHead class="bg-customGray/15 whitespace-nowrap">
        <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Action Taken</TableHeadCell>
        <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Action Date</TableHeadCell>
        <TableHeadCell class="px-1 py-3 text-xs font-medium text-customGray uppercase">Due Date</TableHeadCell>
        <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Status</TableHeadCell>
        <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase"></TableHeadCell>
      </TableHead>
      <TableBody>
        {#if getActionItems(environment, (vehicleId !== null ? vehicleId: activityId)).length === 0}
          <div class="p-4 italic">No actions recorded to date.</div>
        {:else}
          {#each getActionItems(environment, (vehicleId !== null ? vehicleId: activityId)) as action}
            <TableBodyRow on:click={() => setActionItemCb(action.id) }>
              <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">{action.name}</TableBodyCell>
              <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">{action.eventDate}</TableBodyCell>
              <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">{action.dueDate}</TableBodyCell>
              <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
                <CustomBadge
                  context="status"
                  secondaryContext="general"
                  data={action}
                  dataField="status"
                />
              </TableBodyCell>
              {#if showChrome}
                <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-medium">
                  <Button color="light" class="text-customGray hover:text-customGray min-w-32 p-2">Details&nbsp;<ArrowRightOutline /></Button>
                </TableBodyCell>
              {/if}
            </TableBodyRow>
          {/each}
        {/if}
      </TableBody>
    </Table>
  {:else} <!-- individual action item, shows in right panels -->
    <div class=" mb-1 flex justify-between items-center">
      <h2 class="text-xl font-bold text-customGray uppercase">Action Details</h2>
      <!-- Lifted from flowbite's drawer, verbatim -->
      <button  
        on:click={() => { hideRightPanelCb(); }}
        class="focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ms-auto dark:text-white" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    {#if (actionItemId !== null) }
      <div class="grid grid-cols-2 gap-y-2 gap-x-4 mt-4">
        <div class="font-semibold">Action:</div>
        <div class="text-customGray">{getActionItemById(actionItemId).name}</div>

        <div class="font-semibold">Taken:</div>
        <div class="text-customGray">{getActionItemById(actionItemId).eventDate}</div>

        <div class="font-semibold">Action type:</div>
        <CustomBadge
          context="actionType"
          data={getActionItemById(actionItemId)}
          dataField="type"
        />

        {#if getActionItemById(actionItemId).violationType !== undefined}
          <div class="font-semibold">Violation type:</div>
          <div class="text-customGray">{getActionItemById(actionItemId).violationType}</div>
        {/if}

      </div>

        {#if (getActionItemById(actionItemId).type.toLowerCase() === 'payment') }
          <div class="font-semibold pt-2 pb-2">
            Court Information:
          </div>
          <div class="flex justify-start ">
            <div class="cursor-pointer">
              <img 
                alt="violation"
                on:mouseenter={() => { 
                                     zoomHoverTimer = setTimeout(() => {
                                       zoomedViolationPic = true;
                                     }, 550);
                              }}
              on:mouseleave={() => {
              clearTimeout(zoomHoverTimer);
              }}
              class="max-w-[180px] min-w-[150px] p-2 border border-customGray" 
              src="/images/violations/{getActionItemById(actionItemId).violationImage}" 
              />
              {#if zoomedViolationPic}
                <div 
                  role="button"
                  tabindex="1"
                  on:mouseleave={() => { 
                                zoomedViolationPic = false;
                                clearTimeout(zoomHoverTimer);
                                }}
                  >
                  <img alt="violation" 
                    class="top-12 right-12 absolute max-w-[500px] border rounded border border-customGray"
                    src="/images/violations/{getActionItemById(actionItemId).violationImage}" />
                </div>
              {/if}
            </div>
            <div class="w-full text-sm pl-4 text-sm">
              <div class="pt-1">
                <div>
                  {getActionItemById(actionItemId).courtDetails.name}
                </div>
                <div>{getActionItemById(actionItemId).courtDetails.street1}</div>
                <div>{getActionItemById(actionItemId).courtDetails.street2}</div>
                <div>{getActionItemById(actionItemId).courtDetails.city},
                  {getActionItemById(actionItemId).courtDetails.state}
                  {getActionItemById(actionItemId).courtDetails.zip}
                </div>
                <div>
                  {getActionItemById(actionItemId).courtDetails.phone}
                </div>
                <div class="flex pt-2 cursor-pointer" on:click={() => {showCourtModal = true; }} >
                  <div class="mr-2" outline><MapPinAltOutline /></div>
                  <div class="hover:underline text-customGray">View on map</div>
                </div>
                <div class="flex ml-4 items-center flex">
                  <Button 
                    class="text-sm font-normal text-customGray hover:underline" 
                    size="xs" 
                    target="_blank" 
                    href={getActionItemById(actionItemId).courtDetails.site}>
                    Court website
                  </Button>
                </div>
              </div>
            </div>
          </div>
        {/if}

      <div>
        <div class="font-semibold mt-2">Notes:</div>
        <div class="text-customGray rounded-md border p-4 mt-2 italic w-full">{getActionItemById(actionItemId).description}</div>
      </div>
      <Button on:click={() => { openModalWithAction(getActionItemById(actionItemId))  }} class="text-sm bg-gray-200 text-black/60 hover:bg-gray-300 mt-2">
        <PenOutline class="mr-2" />Edit
      </Button>
    {:else}
      <div class="italic">Please select an action taken to see details here.</div>
    {/if}


  {/if}
</div>


<Modal bind:open={showModal} autoclose outsideclose
  backdropClass="fixed inset-0 z-40 bg-white/80"
  class="drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
>
  <h3 class="text-gray-700 font-bold" slot="header">
    {selectedAction ? 'Edit Action' : 'Create New Action'}
  </h3>
  <form class="space-y-6">
    {#if environment === 'activity'}
      <div>
        <Label for="actionType" class="mb-2">Type of action</Label>
        <Select
          id="actionType"
          bind:value={selectedActionTypeValue}
          items={actionTypes}
          on:change={handleTypeChange}
          placeholder="Select one"
        />
      </div>
    {/if}

    <div>
      <Label for="actionName" class="mb-2">Name of action</Label>
      <Input id="actionName" bind:value={actionName} placeholder="Descriptive name" />
    </div>

    {#if environment === 'vehicle'}
      <div class="w-full">
        <div class="flex gap-4 w-full mb-4">
          <div class="w-1/2">
            <Label for="actionType" class="mb-2">Type of Action</Label>
            <Select
              id="actionType"
              bind:value={selectedActionTypeValue}
              items={actionTypes}
              on:change={handleTypeChange}
              placeholder="Select one"
            />
          </div>
          <div class="w-1/2">
            <Label for="status" class="mb-2">Status</Label>
            <Select
              id="status"
              bind:value={selectedStatusTypeValue}
              items={statusTypes}
              on:change={handleStatusChange}
              placeholder="Select one"
            />
          </div>
        </div>

        <div class="w-full">
          <Label for="dueDate" class="mb-2">Due date</Label>
          <div class="relative w-full">
            <input
              id="dueDate"
              type="date"
              bind:value={dueDate}
              on:input={handleDateInput}
              class="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
            />
            <div class="flex items-center bg-gray-100 border border-gray-300 rounded px-3 py-2 w-full">
              <svg class="w-5 h-5 text-customGray mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-sm text-gray-700">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    {/if}

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
          <p class="mt-1 text-sm text-customGray">
            Click to upload or drag and drop
          </p>
          <p class="mt-1 text-xs text-customGray">
            Max. File Size: 30MB
          </p>
        </div>
      </FileDrop>
      {#if uploadedFiles.length > 0}
        <div class="mt-4">
          {#each uploadedFiles as file, index}
            <div class="flex items-center mt-2">
              <FileSolid class="text-customGray mr-2" />
              <span class="text-sm text-customGray">{file.name}</span>
              <button class="ml-auto text-red-500 hover:text-red-600" on:click={() => removeFile(index)}>
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
      <Button class="bg-white-900 hover:bg-gray-100 text-customGray mr-2"
        on:click={() => {
                 showModal = false;
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

<Modal 
  bind:open={showCourtModal} 
  outsideclose
  size="lg"
  class="w-[80vw] h-[80vh] max-w-none max-h-[80vh] drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
  backdropClass="fixed inset-0 z-40"
  bodyClass="p-4 md:p-5 space-y-4 flex-1 overflow:hidden overscroll-contain"
>
  <div class="w-full h-full p-6">
    {#if (actionItemId !== null) }
      <Map 
        zipcode={getActionItemById(actionItemId).courtDetails?.zip}
        preOpenLocation={getActionItemById(actionItemId).courtDetails?.name}
      />
    {/if}
  </div>
</Modal>
