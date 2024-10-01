<script lang="ts">
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<!-- cf https://htmlcssfreebies.com/box-shadow-left/ -->
<style>
 .right-panel {
   margin-left:12px; 
   box-shadow: 0px 0 12px -5px rgba(0,0,0,.7);
  }
</style>

<div class="flex h-full">
  <div class="flex-1 flex flex-col">
    <div class="flex-1 overflow-y-auto p-4 mr-2">
      <header class="pt-2 pl-0">
        <Breadcrumbs />
      </header>
      <slot />
    </div>
  </div>
  <div class="w-100 bg-gray-100 overflow-y-auto right-panel"  style="min-width:455px">
    <slot name="right-panel" />
  </div>
</div>
