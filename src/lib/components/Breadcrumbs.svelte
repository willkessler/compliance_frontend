<script lang="ts">
 import { page } from '$app/stores';
 import { ChevronRight } from 'lucide-svelte';

 $: pathSegments = $page.url.pathname.split('/').filter(Boolean);
 $: breadcrumbs = pathSegments.map((segment, index) => ({
   label: segment.charAt(0).toUpperCase() + segment.slice(1),
   href: '/' + pathSegments.slice(0, index + 1).join('/')
 }));
</script>

<nav class="flex mb-4" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
      <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
        Home
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
