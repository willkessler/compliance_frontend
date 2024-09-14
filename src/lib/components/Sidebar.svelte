<script lang="ts">
 import { page } from '$app/stores';
 import { Separator } from "$lib/components/ui/separator";
 import { LayoutDashboard, ScrollText, Building2, Truck, Users, Link, CircleAlert, Info, WandSparkles, Settings } from "lucide-svelte";
 import { ChartPieSolid, GridSolid, MailBoxSolid, UserSolid, ShoppingBagSolid, ArrowRightToBracketOutline, 
        EditOutline, FireSolid, BookSolid, RestoreWindowOutline, LifeSaverSolid } from 'flowbite-svelte-icons';

 import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, SidebarDropdownWrapper, SidebarDropdownItem } from 'flowbite-svelte';
 let spanClass = 'flex-1 ms-3 whitespace-nowrap';

 $: activeUrl = $page.url.pathname;

 const menuItems = [
   { href: '/', label: 'Dashboard', icon: LayoutDashboard, color: 'text-inherit' },
   { href: '/manage/violations', label: 'Violations Manager', icon: CircleAlert, color: 'text-red-600', pillCount: 5 },
   { href: '/manage/filings', label: 'Company Compliance', icon: ScrollText , color: 'text-inherit', 
   subItems: [
     { href: '/manage/filings/federal', label: 'Federal' },
     { href: '/manage/filings/state', label: 'State' }
   ]
   },
   { href: '/manage/fleet', label: 'Fleet Compliance', icon: Truck, color: 'text-inherit',
   subItems: [
     { href: '/manage/fleet/vehicles', label: 'Vehicles' },
     { href: '/manage/fleet/drivers', label: 'Drivers' }
   ]
   },
 ];

 const adminItems = [
   { href: '/manage/ai', label: 'AI-Compliance Check', icon: WandSparkles, color: 'text-inherit', sideLabel: 'New!' },
   { href: '/manage/integrations', label: 'Connections', icon: Link, color: 'text-inherit' },
   { href: '/manage/organization', label: 'Admin', icon: Settings , color: 'text-inherit' },
   { href: '/help', label: 'Help', icon: Info, color: 'text-inherit' },
 ];
 
  let activeClass = 'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-dark-gray-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
  let nonActiveClass = 'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-green-700';

</script>

<Sidebar {activeUrl} {activeClass} {nonActiveClass}>
  <SidebarWrapper>
    <div class="ml-3 mt-4 mb-4 text-xl font-bold">Trucking Co.</div>
    <SidebarGroup>
      {#each menuItems as item}
        {#if item.subItems !== undefined }
          <SidebarDropdownWrapper label={item.label} isOpen={false}>
            <svelte:fragment slot="icon">
              <svelte:component this={item.icon} class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            {#each item.subItems as subItem}
              <SidebarDropdownItem class="pl-12" label={subItem.label} href={subItem.href} />
            {/each}
          </SidebarDropdownWrapper>
        {/if}
        {#if item.subItems == undefined }
          <SidebarItem label={item.label} href={item.href}>
            <svelte:fragment slot="icon">
              <svelte:component this={item.icon} class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
              {#if item.pillCount !== undefined}
                <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> {item.pillCount} </span>
              {/if}
            </svelte:fragment>
          </SidebarItem>
        {/if}
      {/each}
    </SidebarGroup>
    <SidebarGroup border>
      {#each adminItems as item}
        <SidebarItem label={item.label}>
          <svelte:fragment slot="icon">
            <svelte:component this={item.icon} class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
          <svelte:fragment slot="subtext">
            {#if item.sideLabel !== undefined}
              <span class="inline-flex items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-blue-600"> {item.sideLabel} </span>
            {/if}
          </svelte:fragment>
        </SidebarItem>
      {/each}
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
