<script lang="ts">
 import { page } from '$app/stores';
 import { ChevronRight, House, LayoutDashboard } from 'lucide-svelte';

 // Add an array of segments to filter out
 const filteredSegments = ['manage', 'fleet', 'vehicle', 'driver', 'activity','filings'];

 // Add more mappings as needed
 // 'original': 'replacement',
 const labelMappings = {
   'activities': 'Activities',
 };

 const hrefMappings = {
   'activities' : '/manage/activities',
   'vehicles' :  '/manage/fleet/vehicles',
   'drivers' :   '/manage/fleet/drivers',
   'federal' :   '/manage/filings/federal',
   'state' :     '/manage/filings/state',
 };
 
 let pathSegments = $derived($page.url.pathname.split('/').filter(Boolean));
 let breadcrumbs = $derived(pathSegments
   .filter(segment => !filteredSegments.includes(segment.toLowerCase()))
   .map((segment, index, filteredArray) => {
     const lowercaseSegment = segment.toLowerCase();
     const customLabel = labelMappings[lowercaseSegment];
     const customHref = hrefMappings[lowercaseSegment];
     const isLastSegment = index === filteredArray.length - 1;
     const isIdSegment = /^\d+$/.test(segment); // Check if segment is numeric (likely an ID)
     return {
       label: customLabel 
         ? customLabel 
         : segment.charAt(0).toUpperCase() + segment.slice(1),
       href: isIdSegment || isLastSegment
         ? $page.url.pathname // Use full current path for IDs or last segment
         : customHref 
           ? customHref 
           : '/' + filteredArray.slice(0, index + 1).join('/')
     };
   }));

</script>

<nav class="flex mb-4" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 ">
    <li class="inline-flex items-center">
      <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
        <div class="flex">
          <div>
            <House class="mr-2" size={20} />
          </div>
          <div>
            Home
          </div>
        </div>
      </a>
    </li>
    {#each breadcrumbs as { label, href }, index}
      <li>
        <div class="flex items-center">
          <ChevronRight class="w-5 h-5 text-gray-400" />
          <a href={href} class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
            {label}
          </a>
        </div>
      </li>
    {/each}
  </ol>
</nav>
