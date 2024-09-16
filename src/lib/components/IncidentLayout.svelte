<!-- src/lib/components/IncidentLayout.svelte -->
<script lang="ts">
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<div class="flex h-full">
  <div class="flex-1 flex flex-col">
    <header class="p-4">
      <Breadcrumbs />
    </header>
    <div class="flex-1 overflow-y-auto p-4">
      <slot />
    </div>
  </div>
  <div class="w-100 bg-gray-100 overflow-y-auto">
    <slot name="right-panel" />
  </div>
</div>
