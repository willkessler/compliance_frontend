<script>
 import { onMount } from 'svelte';

 // Make sure to use onMount and render active-table on load
 onMount(async () => {
   await import("active-table");
   isLoaded = true;
 });

 let isLoaded = false;
 const data = [
   ["Planet", "Diameter", "Mass"],
   ["Earth", 12756, 5.97],
   ["Mars", 6792, 0.642]
 ];
</script>

<main>
  <h1>Active Table</h1>
  {#if isLoaded}
    <!-- This project is using Svelte 4.2.2 -->

    <!-- !!!!Svelte version 4.2.2 or higher!!!! -->
    <!-- data is an example of passing a state object into the property -->
    <!-- headerStyles is an example of directly passing an object -->
    <active-table
      data={data}
      headerStyles={{default:{backgroundColor: "#d6d6d630"}}}
    />
  {/if}
</main>

<style>
 main {
   font-family: sans-serif;
   text-align: center;
 }
</style>
