<script lang="ts">
 import { page } from '$app/stores';
 import { Separator } from "$lib/components/ui/separator";

 import { LayoutDashboard, ListCheck, Landmark, Building2, Truck, Users, Link, CircleAlert, Info, WandSparkles, Settings, Database } from "lucide-svelte";
 import { 
        HomeOutline, 
        QuestionCircleOutline,
        TableColumnOutline,
        ShareNodesOutline, 
        } from 'flowbite-svelte-icons';

 import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, SidebarDropdownWrapper, SidebarDropdownItem } from 'flowbite-svelte';
 import { getOpenActivityCount } from '$lib/data/activityData';

 let spanClass = 'flex-1 ms-3 whitespace-nowrap';

 $: activeUrl = $page.url.pathname;

 const menuItems = [
   { href: '/', label: 'Dashboard', icon: TableColumnOutline, color: 'text-inherit' },
   { href: '/manage/activities', label: 'Activity Manager', icon: ListCheck, color: 'text-red-600', pillCount: getOpenActivityCount() },
   { href: '/manage/fleet', label: 'Fleet Compliance', icon: Truck, color: 'text-inherit',
   subItems: [
     { href: '/manage/fleet/vehicles', label: 'Vehicles' },
     { href: '/manage/fleet/drivers', label: 'Drivers' }
   ]
   },
   { href: '/manage/filings', label: 'Gov\'t Compliance', icon: Landmark , color: 'text-inherit', 
   subItems: [
     { href: '/manage/filings/federal', label: 'Federal' },
     { href: '/manage/filings/state', label: 'State' }
   ]
   },
 ];

 const adminItems = [
   { href: '/manage/userFiles',  newTab: false, disabled: false, label: 'Your Files', icon: Database, color: 'text-inherit' },
   { href: 'https://chat.regulis.ai', newTab: true, disabled: false, label: 'AI-Compliance Check',
     icon: WandSparkles, color: 'text-inherit', sideLabel: 'New!' },
   { href: '/manage/integrations', newTab: false, disabled: false, label: 'Integrations', icon: ShareNodesOutline, color: 'text-inherit' },
   { href: '/help', newTab: false, label: 'Help', disabled: true, icon: QuestionCircleOutline, color: 'text-inherit' },
   { href: '/manage/organization', newTab: false, disabled: false, label: 'Admin', icon: Settings , color: 'text-inherit' },
 ];
 
 let activeClass = 'flex items-center p-2 text-base font-normal text-gray-900 bg-gray-200 dark:bg-gray-700  dark:text-white hover:bg-gray-300 dark:hover:bg-gray-300';
 let nonActiveClass = 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700';

 let openDropdowns = new Set();

 function isDropdownOpen(label: string): boolean {
   return openDropdowns.has(label);
 }

 let closeTimeout: number | null = null;

 function handleDropdownHover(label: string, isHovering: boolean) {
   if (isHovering) {
     if (closeTimeout) {
       clearTimeout(closeTimeout);
       closeTimeout = null;
     }
     openDropdowns.add(label);
   } else {
     closeTimeout = setTimeout(() => {
       openDropdowns.delete(label);
       openDropdowns = openDropdowns; // Trigger reactivity
     }, 1000);
   }
   openDropdowns = openDropdowns; // Trigger reactivity
 }
</script>

<Sidebar {activeUrl} {activeClass} {nonActiveClass} style="border-right:1px solid #e5e7eb;">
  <SidebarWrapper class="flex flex-col h-full text-nowrap">
    <div class="ml-3 mt-4 text-lg text-gray-600">Trucking Co.</div>
    <SidebarGroup class="flex-grow" border>
      {#each menuItems as item}
        {#if item.subItems !== undefined }
          <div>
            <SidebarDropdownWrapper 
              label={item.label} 
              isOpen={true}
              class="hover:bg-gray-300"
              >
              <svelte:fragment slot="icon">
                <svelte:component this={item.icon} class="w-6 h-6 text-customGray transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              </svelte:fragment>
              {#each item.subItems as subItem}
                <SidebarDropdownItem class="pl-10 text-sm hover:bg-gray-300" label={subItem.label} href={subItem.href} active={activeUrl.startsWith(subItem.href)} />
              {/each}
            </SidebarDropdownWrapper>
          </div>
        {/if}
        {#if item.subItems == undefined }
          <SidebarItem
            label={item.label} 
            href={item.href}
            class={item.label === 'Activity Manager' && activeUrl.startsWith('/manage/activities') ? 'bg-gray-300 hover:bg-gray-300' : ''}
          >
            <svelte:fragment slot="icon">
              <svelte:component this={item.icon} class="w-6 h-6 text-customGray transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
              {#if item.pillCount !== undefined}
                <span class="inline-flex justify-center items-center p-3 ms-4 w-3 h-3 text-sm font-medium text-primary-600 bg-red-300 rounded-full dark:bg-primary-900 dark:text-primary-200"> {item.pillCount} </span>
              {/if}
            </svelte:fragment>
          </SidebarItem>
        {/if}
      {/each}
    </SidebarGroup>
    <SidebarGroup border class="mt-auto mb-2">
      {#each adminItems as item}
        {#if item.disabled === true}
          <SidebarItem label={item.label} class="whitespace-nowrap text-sm text-gray-400"> <!-- disabled for WSTA -->
            <svelte:fragment slot="icon">
              <svelte:component this={item.icon} class="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
              {#if item.sideLabel !== undefined}
                <span class="pl-1 text-sm font-bold text-blue-600"> {item.sideLabel} </span>
              {/if}
            </svelte:fragment>
          </SidebarItem>
        {:else}
          {#if item.newTab === true}
            <SidebarItem label={item.label} class="whitespace-nowrap text-sm" href={item.href} target="_blank">
              <svelte:fragment slot="icon">
                <svelte:component this={item.icon} class="w-6 h-6 text-customGray transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              </svelte:fragment>
              <svelte:fragment slot="subtext">
                {#if item.sideLabel !== undefined}
                  <span class="pl-1 text-sm font-bold text-blue-600"> {item.sideLabel} </span>
                {/if}
              </svelte:fragment>
            </SidebarItem>
          {:else}
            <SidebarItem label={item.label} class="whitespace-nowrap text-sm" href={item.href}>
              <svelte:fragment slot="icon">
                <svelte:component this={item.icon} class="w-6 h-6 text-customGray transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              </svelte:fragment>
              <svelte:fragment slot="subtext">
                {#if item.sideLabel !== undefined}
                  <span class="pl-1 text-sm font-bold text-blue-600"> {item.sideLabel} </span>
                {/if}
              </svelte:fragment>
            </SidebarItem>
          {/if}
        {/if}
      {/each}
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>

