<script lang="ts">
  import { run } from 'svelte/legacy';

 import { fly } from 'svelte/transition';
 import { cubicOut } from 'svelte/easing';
 import { page } from '$app/stores';
 import { onMount, tick } from 'svelte';
 import { writable } from 'svelte/store';
 import Sidebar from '$lib/components/Sidebar.svelte';
 import 'flowbite/dist/flowbite.css';
 import "../app.postcss";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

 const contentVisible = writable(false);

 let previousPath: string | null = $state(null);
 let isTransitioning = false;
 let isDetailsPage = $state(false);
 let slideDirection: 1 | -1 | 0 = 0;  // 1 for right, -1 for left, 0 for no transition
 let shouldTransition = false;


 onMount(() => {
   previousPath = $page.url.pathname;
   contentVisible.set(true);
   //console.log('Initial path:', previousPath);
 });


 async function handleRouteChange() {
   isTransitioning = true;
   contentVisible.set(false);
   await tick();

   // Determine if we should transition
   shouldTransition = isDetailsPage || (
     previousPath !== null && (
       previousPath.includes('/activity/') ||
       previousPath.includes('/driver/') ||
       previousPath.includes('/vehicle/')
     )
   );

   if (shouldTransition && previousPath !== null) {
     // Determine slide direction only if we're transitioning
     if (!isDetailsPage && (
       previousPath.includes('/activity/') ||
       previousPath.includes('/driver/') ||
       previousPath.includes('/vehicle/')
     )) {
       slideDirection = -1;  // Default left slide for other transitions
     } else {
       slideDirection = 1;  // Slide to right for exiting details page
     }
   } else {
     slideDirection = 0;  // No transition for direct navigation to top-level pages or initial load
   }

   previousPath = $page.url.pathname;
   contentVisible.set(true);
 }

 function handleTransitionEnd() {
   //console.log('Transition ended');
   isTransitioning = false;
 }

 function transitionFn(node, { duration }) {
   if (slideDirection === 0) return {}; // No transition

   //console.log('Transition starting with direction:', slideDirection, 'and duration:', duration);
   return {
     duration,
     css: t => {
       const eased = cubicOut(t);
       return `
         opacity: ${eased};
         transform: translateX(${(1-eased) * slideDirection * window.innerWidth}px);
       `;
     }
   };
 }
 run(() => {
   isDetailsPage = $page.url.pathname.includes('/activities/activity/') ||
                   $page.url.pathname.includes('/fleet/drivers/driver/') ||
                   $page.url.pathname.includes('/fleet/vehicles/vehicle/');
   //console.log('Path updated:', $page.url.pathname, 'Is details page:', isDetailsPage);
 });
 run(() => {
    if ($page.url.pathname !== previousPath) {
     //console.log('Path changed. Previous:', previousPath, 'New:', $page.url.pathname);
     handleRouteChange();
   }
  });
</script>

<div class="flex h-screen bg-background overflow-hidden">
  <Sidebar />
  <div class="flex-1 flex flex-col">
    <div class="flex-1 relative overflow-hidden">
      {#if $contentVisible}
        <div 
          class="absolute inset-0 overflow-auto"
          in:transitionFn="{{ duration: 200 }}"
          out:transitionFn="{{ duration: 200 }}"
          onoutroend={handleTransitionEnd}
        >
          {@render children?.()}
        </div>
      {/if}
    </div>
  </div>
</div>
