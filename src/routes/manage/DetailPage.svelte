<!-- /manage/DetailPage.svelte -->
<script lang="ts">
  export let title: string;
</script>

<div>
  <h1 class="text-customGray text-sm">{title}</h1>
  Debug: Main content area
  <slot />
</div>


<slot name="right-panel">
  Debug: Right panel content from DetailPage
</slot>
