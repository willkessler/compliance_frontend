<script lang="ts">
  import "../app.postcss";
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<div class="flex h-screen bg-background">
  <Sidebar />
  <main class="flex-1 p-8 overflow-auto">
    <Breadcrumbs />
    <slot />
  </main>
</div>
