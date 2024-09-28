<!-- src/lib/components/IncidentLayout.svelte -->
<script lang="ts">
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<div class="flex h-full">
  <div class="flex-1 flex flex-col">
    <div class="flex-1 overflow-y-auto p-4">
      <header class="pt-4 pl-4">
        <Breadcrumbs />
      </header>
      <slot />
    </div>
  </div>
  <div class="w-100 bg-gray-100 overflow-y-auto"  style="min-width:455px">
    <slot name="right-panel" />
  </div>
</div>
