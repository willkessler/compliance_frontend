<script>
 import { onMount } from 'svelte';

 let data = [
   ["Name", "Type", "Due Date", "Area", "Status"],
   ["Fender repair", "Maintenance", "10-01-2024", "Vehicle", "Open"],
   ["Insurance Call", "Record", "10-15-2024", "Company", "Completed"],
 ];

 const customColumnsSettings=[
    {"headerName": "Name", "availableDefaultColumnTypes": ["Text"]},
    {"headerName": "Type", "availableDefaultColumnTypes": ["Select"]},
    {"headerName": "Due Date", "defaultColumnTypeName": "Date m-d-y", "availableDefaultColumnTypes": ["Date m-d-y", "Date m-d-y"]},
    {"headerName": "Area", "availableDefaultColumnTypes": ["Select"]},
    {"headerName": "Status", "availableDefaultColumnTypes": ["Select"]},
  ];

 const customColumnTypes = 
   [
     {
       name: 'Type',
       select: {
         options: ['Maintenance', 'Record', 'Other/Insurance'],
         canAddMoreOptions: false
       },
       iconSettings: {
         reusableIconName: 'select',
       },
       label: {
         options: [
           {text: 'Maintenance', backgroundColor: '#f1fecd'},
           {text: 'Record', backgroundColor: '#e1ff8f'},
           {text: 'Other/Insurance', backgroundColor: '#cdfef7'},
         ],
       },
     },
   ];

 // Make sure to use onMount and render active-table on load
 onMount(async () => {
   await import("active-table");
   isLoaded = true;
 });

 let isLoaded = false;

 
</script>

<div class="mt-4 w-full">

  {#if isLoaded}
    <!-- This project is using Svelte 4.2.2 -->

    <!-- !!!!Svelte version 4.2.2 or higher!!!! -->
    <!-- data is an example of passing a state object into the property -->
    <!-- headerStyles is an example of directly passing an object -->
    <div class="mt-4 text-gray-800 text-sm">Add any actions you've already taken:</div>
    <active-table
      customColumnTypes={customColumnTypes}
      customColumnsSettings={customColumnsSettings}
      displayAddNewColumn={false}
      isHeaderTextEditable={false}
      data={data}
      headerStyles={{default:{backgroundColor: "#d6d6d630"}}}
    />
  {/if}

</div>

<style>
 main {
   font-family: sans-serif;
   text-align: center;
 }
</style>
