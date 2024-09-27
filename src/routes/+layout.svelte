<script lang="ts">
 import { fly } from 'svelte/transition';
 import { cubicOut } from 'svelte/easing';
 import { page } from '$app/stores';
 import { onMount, afterUpdate, tick } from 'svelte';
 import { writable } from 'svelte/store';
 import Sidebar from '$lib/components/Sidebar.svelte';
 import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
 import 'flowbite/dist/flowbite.css';
 import "../app.postcss";

 const contentVisible = writable(false);

 let previousPath: string;
 let isTransitioning = false;
 let isIncidentDetailsPage: boolean;

 $: {
   isIncidentDetailsPage = $page.url.pathname.includes('/incidents/incident/');
   console.log('Path updated:', $page.url.pathname, 'Is incident details:', isIncidentDetailsPage);
 }

 onMount(() => {
   previousPath = $page.url.pathname;
   contentVisible.set(true);
   console.log('Initial path:', previousPath);
 });

 $: if ($page.url.pathname !== previousPath) {
   console.log('Path changed. Previous:', previousPath, 'New:', $page.url.pathname);
   handleRouteChange();
 }

 async function handleRouteChange() {
   isTransitioning = true;
   contentVisible.set(false);
   await tick();
   previousPath = $page.url.pathname;
   contentVisible.set(true);
 }

 function handleTransitionEnd() {
   console.log('Transition ended');
   isTransitioning = false;
 }

 function transitionFn(node, { x, duration }) {
   console.log('Transition starting with x:', x, 'and duration:', duration);
   return {
     duration,
     css: t => {
       const eased = cubicOut(t);
       console.log('Transition progress:', t, 'Eased value:', eased);
       return `
         opacity: ${eased};
         transform: translateX(${(1-eased) * x}px);
       `;
     }
   };
 }
</script>

<div class="flex h-screen bg-background overflow-hidden">
  <Sidebar />
  <div class="flex-1 flex flex-col">
    <header class="pt-4 pl-4">
      <Breadcrumbs />
    </header>
    <div class="flex-1 relative overflow-hidden">
      {#if $contentVisible}
        <div 
          class="absolute inset-0 overflow-auto"
          in:transitionFn="{{ x: isIncidentDetailsPage ? window.innerWidth : -window.innerWidth, duration: 300 }}"
          out:transitionFn="{{ x: isIncidentDetailsPage ? -window.innerWidth : window.innerWidth, duration: 300 }}"
          on:introstart={() => console.log('Transition intro started')}
          on:outrostart={() => console.log('Transition outro started')}
          on:introend={() => console.log('Transition intro ended')}
          on:outroend={handleTransitionEnd}
        >
          <slot />
        </div>
      {/if}
    </div>
  </div>
</div>
