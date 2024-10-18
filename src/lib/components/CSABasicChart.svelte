<script>
 import { CircleAlert } from "lucide-svelte";;
 import { CaretUpSolid, CaretDownSolid } from 'flowbite-svelte-icons';

 let csaBasics = [
   {
   name: "Unsafe",
   percentage: 57,
   percentileVsThreshold: -3.45,
   droppedOff: 0,
   newSinceLastMCMIS: 112,
   totalToday: 112,
   difference: -12, color: "bg-red-500",
   },
   {
   name: "HOS",
   percentage: 70,
   percentileVsThreshold: 0,
   droppedOff: 0,
   newSinceLastMCMIS: 0,
   totalToday: 0,
   difference: 10,
   color: "bg-blue-500",
   },
   {
   name: "Fitness",
   percentage: 61,
   percentileVsThreshold: -8.62,
   droppedOff: 0,
   newSinceLastMCMIS: 79,
   totalToday: 79,
   difference: 79,
   color: "bg-green-500",
   },
   {
   name: "D&A",
   percentage: 4,
   percentileVsThreshold: 0,
   droppedOff: 0,
   newSinceLastMCMIS: 0,
   totalToday: 0,
   difference: -10,
   color: "bg-purple-500",
   },
   {
   name: "Vehicle",
   percentage: 92,
   percentileVsThreshold: 17.18,
   droppedOff: 0,
   newSinceLastMCMIS: 3000,
   totalToday: 3000,
   difference: 3000,
   color: "bg-yellow-500",
   },
   {
   name: "Hazmat",
   percentage: 0,
   percentileVsThreshold: 0,
   droppedOff: 0,
   newSinceLastMCMIS: 16,
   totalToday: 16,
   difference: 16,
   color: "bg-indigo-500",
   },
   {
   name: "Crash",
   percentage: 0,
   percentileVsThreshold: 0,
   droppedOff: 0,
   newSinceLastMCMIS: 0,
   totalToday: 0,
   difference: 0,
   color: "bg-pink-500",
   },

 ];
</script>

<div class="p-6 space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-bold">BASIC score trends</h2>
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-500">Latest update: 11/15/2024</span>
    </div>
  </div>


    <div class="space-y-2">
      {#each csaBasics as basic}
	<div class="flex items-center space-x-2">
	  <span class="w-16">{basic.name}</span>
	  {#if basic.percentage > 0}
	    <div class="flex-grow h-4 rounded relative ">
	      <div class={`h-3 ${basic.color} rounded absolute top-1`} style="width: {basic.percentage + 5}%"></div>
	    </div>
	    <span class="w-8 text-right">{basic.percentage}%</span>
              {#if basic.difference > 0}
	        <span class="text-green-500">
                  <CaretUpSolid />
                </span>
              {:else}
	        <span class="text-red-500">
                  <CaretDownSolid />
                </span>
              {/if}

	  {:else}
	    <div class="flex-grow text-right">
	      <span class="text-gray-500 italic">N/A</span>
	    </div>
	  {/if}
	</div>
      {/each}
    </div>


</div>
