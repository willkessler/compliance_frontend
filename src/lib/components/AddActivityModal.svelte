<script>
 import { Button, Input, Label, Helper, Select, Textarea } from  'flowbite-svelte';
 import { onMount } from 'svelte';
 import { drivers } from '$lib/data/driverData';
 import { vehicles } from '$lib/data/vehicleData';
 import Uploader from '$lib/components/Uploader.svelte';
 import ActionItemsTable from '$lib/components/ActionItemsTable.svelte';

 const activityKinds = [ 'accident', 'maintenance', 'record', 'other' ];
  /**
   * @typedef {Object} Props
   * @property {string} [mode]
   * @property {any} [closeCb]
   * @property {any} [submitForm]
   */

  /** @type {Props} */
  let { mode = 'accident', closeCb = () => {}, submitForm = () => { console.log('form submitted'); } } = $props();

 const detailsProps = {
   accident: {
     id: 'description',
     name: 'description',
     label: 'Accident description',
     rows: 8,
     placeholder: 'Enter everything about the accident that you know. \n\nYou can edit this information later.'
   },
   maintenance: {
     id: 'description',
     name: 'description',
     label: 'Maintenance description',
     rows: 8,
     placeholder: 'Describe the maintenance work that was done.  \n\nYou can edit this information later.'
   },
   record: {
     id: 'description',
     name: 'description',
     label: 'Record/document description',
     rows: 8,
     placeholder: 'Describe the record or document to be processed.  \n\nYou can edit this information later.'
   },
   other: {
     id: 'description',
     name: 'description',
     label: 'Other activity',
     rows: 8,
     placeholder: 'Describe the activity you want to track.  \n\nYou can edit this information later.'
   }
 }

 let selectedDriver = $state();
 let selectedVehicle = $state();
 let driverSelections = drivers.map((driver) => ({ value: driver.id, name: driver.name }));
 let vehicleSelections = vehicles.map((vehicle) => ({ value: vehicle.id, name: vehicle.name }));
 
 // date picker stuff
 let eventDates = $state({
   accident: new Date('2024-08-31'),
   maintenance: new Date('2024-09-3'),
   record: new Date('2024-10-18'),
   other: new Date('2024-5-28'),
 })

 function formatDate(date) {
   const d = new Date(date);
   const options = { year: 'numeric', month: 'short', day: 'numeric' };
   return d.toLocaleDateString('en-US', options);
  }

  function handleDateInput(event, kind) {
    const theDate = event.target.value;
    formattedDates[kind] = formatDate(theDate);
  }

 let formattedDates = $state({});
  onMount(() => {
    activityKinds.map((kind) => {
      formattedDates[kind] = formatDate(eventDates[kind]);
    });
  });

</script>

<!-- this date drop down needs to become its own freakin component so i dont forget the dumb style every time -->
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

<div>
  {#if (mode === 'accident')}
    <div class="text-gray-800 font-semibold text-lg mb-4">Add New Activity: Accident</div>
    <div class="w-1/3">
      <Label for="accidentDate">Date of accident:</Label>
      <div class="relative w-full">
        <input
          id="accidentDate"
          type="date"
          bind:value={eventDates.accident}
          oninput={() => handleDateInput(mode)}
          class="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
        />
        <div class="flex items-center bg-gray-100 border border-gray-300 rounded px-3 py-2 w-full">
          <svg class="w-5 h-5 text-customGray mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-sm text-gray-700">{formattedDates.accident}</span>
        </div>
      </div>
    </div>

    <Label class="block mt-4">Description of accident:</Label>
    <Textarea {...detailsProps.accident } />

    <div class="flex justify-between w-3/4">
      <div class="w-1/2">
        <Label for="vehicleSelection" class="mt-4">
          Vehicle involved:
        </Label>
        <Select id="vehicleSelection" class="mt-2" items={vehicleSelections} bind:value={selectedVehicle} />
      </div>
      <div class="w-1/2 ml-4">
        <Label for="driverSelection" class="mt-4">
          Driver at the time of the accident:
        </Label>
        <Select id="driverSelection" class="mt-2" items={driverSelections} bind:value={selectedDriver} />
      </div>
    </div>

    <Label class="block mt-4 mb-2">Actions taken:</Label>
    <ActionItemsTable />
    
    <Uploader />

    <div class="flex justify-end">
      <Button class="mr-2 hover:text-customGray" on:click={() => { 
                                                          submitForm(); 
                                                          closeCb();
                       }}
        outline>Cancel</Button>
      <Button on:click={() => { 
                       submitForm();
                       closeCb();
                       }}
        class="bg-blue-500 hover:bg-blue-600 text-white text-sm ">
        Save Activity
      </Button>      
    </div>

  {/if}
  {#if (mode === 'maintenance')}
    <div class="text-gray-800 font-semibold text-lg mb-4">Add New Activity: Maintenance</div>
    <div class="w-1/3">
      <Label for="accidentDate">Date of maintenance:</Label>
      <div class="relative w-full">
        <input
          id="maintenanceDate"
          type="date"
          bind:value={eventDates.maintenance}
          oninput={() => handleDateInput(mode)}
          class="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
        />
        <div class="flex items-center bg-gray-100 border border-gray-300 rounded px-3 py-2 w-full">
          <svg class="w-5 h-5 text-customGray mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-sm text-gray-700">{formattedDates.maintenance}</span>
        </div>
      </div>
    </div>

    <Label class="block mt-4">Description of maintenance:</Label>
    <Textarea {...detailsProps.maintenance } />

    <div class="flex justify-between w-3/4">
      <div class="w-1/2">
        <Label for="vehicleSelection" class="mt-4">
          ID of Vehicle undergoing maintenance:
        </Label>
        <Select id="vehicleSelection" class="mt-2" items={vehicleSelections} bind:value={selectedVehicle} />
      </div>
      <div class="w-1/2 ml-4">
        <Label for="driverSelection" class="mt-4">
          Driver at the time of maintenance:
        </Label>
        <Select id="driverSelection" class="mt-2" items={driverSelections} bind:value={selectedDriver} />
      </div>
    </div>

    <Label class="block mt-4 mb-2">Actions taken:</Label>
    <ActionItemsTable />
    
    <Uploader />

    <div class="flex justify-end">
      <Button class="mr-2 hover:text-customGray" on:click={() => { 
                                                          submitForm(); 
                                                          closeCb();
                       }}
        outline>Cancel</Button>
      <Button on:click={() => { 
                       submitForm();
                       closeCb();
                       }}
        class="bg-blue-500 hover:bg-blue-600 text-white text-sm ">
        Save Activity
      </Button>      
    </div>
  {/if}
  {#if (mode === 'record')}
    <div class="text-gray-800 font-semibold text-lg mb-4">Add New Activity: Document processing</div>
    <div class="w-1/3">
      <Label for="accidentDate">Date of document:</Label>
      <div class="relative w-full">
        <input
          id="recordDate"
          type="date"
          bind:value={eventDates.record}
          oninput={() => handleDateInput(mode)}
          class="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
        />
        <div class="flex items-center bg-gray-100 border border-gray-300 rounded px-3 py-2 w-full">
          <svg class="w-5 h-5 text-customGray mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-sm text-gray-700">{formattedDates.record}</span>
        </div>
      </div>
    </div>

    <Label class="block mt-4">Description of document/record:</Label>
    <Textarea {...detailsProps.record } />

    <div class="flex justify-between w-3/4">
      <div class="w-1/2">
        <Label for="vehicleSelection" class="mt-4">
          ID of vehicle associated with this (optional):
        </Label>
        <Select id="vehicleSelection" class="mt-2" items={vehicleSelections} bind:value={selectedVehicle} />
      </div>
      <div class="w-1/2 ml-4">
        <Label for="driverSelection" class="mt-4">
          Driver associated with this (optional):
        </Label>
        <Select id="driverSelection" class="mt-2" items={driverSelections} bind:value={selectedDriver} />
      </div>
    </div>

    <Label class="block mt-4 mb-2">Actions taken:</Label>
    <ActionItemsTable />
    
    <Uploader />

    <div class="flex justify-end">
      <Button class="mr-2 hover:text-customGray" on:click={() => { 
                                                          submitForm(); 
                                                          closeCb();
                       }}
        outline>Cancel</Button>
      <Button on:click={() => { 
                       submitForm();
                       closeCb();
                       }}
        class="bg-blue-500 hover:bg-blue-600 text-white text-sm ">
        Save Activity
      </Button>      
    </div>
  {/if}
  {#if (mode === 'other')}
    <div class="text-gray-800 font-semibold text-lg mb-4">Add New Activity: Other type</div>
    <div class="w-1/3">
      <Label for="accidentDate">Date of activity:</Label>
      <div class="relative w-full">
        <input
          id="otherDate"
          type="date"
          bind:value={eventDates.other}
          oninput={() => handleDateInput(mode)}
          class="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
        />
        <div class="flex items-center bg-gray-100 border border-gray-300 rounded px-3 py-2 w-full">
          <svg class="w-5 h-5 text-customGray mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-sm text-gray-700">{formattedDates.other}</span>
        </div>
      </div>
    </div>

    <Label class="block mt-4">Description of activity:</Label>
    <Textarea {...detailsProps.other } />

    <div class="flex justify-between w-3/4">
      <div class="w-1/2">
        <Label for="vehicleSelection" class="mt-4">
          Vehicle associated with this activity (optional):
        </Label>
        <Select id="vehicleSelection" class="mt-2" items={vehicleSelections} bind:value={selectedVehicle} />
      </div>
      <div class="w-1/2 ml-4">
        <Label for="driverSelection" class="mt-4">
          Driver associated with this activity (optional):
        </Label>
        <Select id="driverSelection" class="mt-2" items={driverSelections} bind:value={selectedDriver} />
      </div>
    </div>

    <Label class="block mt-4 mb-2">Actions taken:</Label>
    <ActionItemsTable />
    
    <Uploader />

    <div class="flex justify-end">
      <Button class="mr-2 hover:text-customGray" on:click={() => { 
                                                          submitForm(); 
                                                          closeCb();
                       }}
        outline>Cancel</Button>
      <Button on:click={() => { 
                       submitForm();
                       closeCb();
                       }}
        class="bg-blue-500 hover:bg-blue-600 text-white text-sm ">
        Save Activity
      </Button>      
    </div>
  {/if}
</div>
