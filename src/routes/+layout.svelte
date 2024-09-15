<script lang="ts">
 import "../app.postcss";
 import Sidebar from '$lib/components/Sidebar.svelte';
 import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
 import 'flowbite/dist/flowbite.css';
 import { page } from '$app/stores';
 $: isIncidentPage = $page.url.pathname.startsWith('/manage/incidents/incident/');
</script>


<div class="flex h-screen bg-background">
  <Sidebar />
  {#if isIncidentPage}
    <div class="flex-1 overflow-hidden">
      <slot />
    </div>
  {:else}
    <div class="flex-1 flex flex-col">
      <header class="p-4">
        <Breadcrumbs />
      </header>
      <div class="flex-1 overflow-auto p-4">
        <slot />
      </div>
    </div>
  {/if}
</div>
