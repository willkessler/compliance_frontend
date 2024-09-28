<!-- /manage/+layout.svelte -->
<script lang="ts">
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { writable } from 'svelte/store';

  let rightPanelWidth = 300; // Default width
  let isDragging = false;

 // Create a writable store for the layout type
  const layoutType = writable($page.data.layout);

  afterNavigate(({ to }) => {
    if (to) {
      const path = to.url.pathname;
      const isDetailsPage = path.includes('/incident/') || path.includes('/driver/') || path.includes('/vehicle/');
      layoutType.set(isDetailsPage ? 'details' : 'list');
    }
  });

  $: console.log('Current layout type:', $layoutType); // Debug output

  function startResize(event: MouseEvent) {
    isDragging = true;
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  }

  function resize(event: MouseEvent) {
    if (isDragging) {
      const containerWidth = (event.target as HTMLElement).offsetWidth;
      rightPanelWidth = containerWidth - event.clientX;
    }
  }

  function stopResize() {
    isDragging = false;
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
  }
</script>


{#if $layoutType === 'list'}
  <div class="flex flex-col h-full">
    <header class="pt-4 pl-4">
      <Breadcrumbs />
    </header>
    <div class="flex-1 p-4 overflow-auto">
      <slot />
    </div>
  </div>
{:else if $layoutType === 'details'}
  <div class="flex h-full">
    <div class="flex-grow overflow-auto">
      <div class="p-4">
        <Breadcrumbs />
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
    
    <div 
      class="flex-shrink-0 bg-white shadow-lg"
      style="width: {rightPanelWidth}px;"
    >
      <div 
        class="w-1 h-full cursor-col-resize absolute left-0 top-0 bg-gray-300"
        on:mousedown={startResize}
      ></div>
      <div class="p-4">
        Debug: Right panel area
        <slot name="right-panel">
          Debug: No content in right-panel slot
        </slot>
      </div>
    </div>
  </div>
{/if}
