<script lang="ts">
 import { page } from '$app/stores';
 import { Separator } from "$lib/components/ui/separator";
 import { LayoutDashboard, ScrollText, Building2, Truck, Users, Link, CircleAlert, Info, WandSparkles, Settings } from "lucide-svelte";

 const menuItems = [
   { href: '/', label: 'Dashboard', icon: LayoutDashboard, color: 'text-inherit' },
   { href: '/manage/violations', label: 'Violations Manager', icon: CircleAlert, color: 'text-orange-700' },
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
</script>

<aside class="w-64 bg-card text-card-foreground border-r flex flex-col">
  <div class="p-5 text-xl font-bold">Trucking Co.</div>
  <nav class="flex-grow pl-2">
    {#each menuItems as item}
      <a 
        href={item.href} 
        class="flex items-center px-4 py-2 hover:bg-accent {item.color}"
        class:bg-accent={$page.url.pathname === item.href}
        >
        <svelte:component this={item.icon} class="mr-2" size={20} />
        {item.label}
      </a>
      {#if item.subItems}
        {#each item.subItems as subItem}
          <a 
            href={subItem.href} 
            class="flex items-center px-4 py-2 pl-12 hover:bg-accent text-sm"
            class:bg-accent={$page.url.pathname.startsWith(subItem.href)}
          >
            {subItem.label}
          </a>
        {/each}
      {/if}
    {/each}
  </nav>
  <Separator class="w-[90%] mx-auto my-4" />
  <div class="mt-auto ml-3 mb-2 text-sm">
    <a href="/manage/ai" class="flex items-center px-4 py-2 hover:bg-accent text-blue-500"><WandSparkles class="mr-2" size={20} /> AI-Compliance Check</a>
    <a href="/manage/integrations" class="flex items-center px-4 py-2 hover:bg-accent"><Link class="mr-2" size={20} /> Setup Connections</a>
    <a href="/manage/organization" class="flex items-center px-4 py-2 hover:bg-accent"><Settings class="mr-2" size={20} /> Admin</a>
    <a href="#" class="flex items-center px-4 py-2 hover:bg-accent mb-4"><Info class="mr-2" size={20} /> Help</a>
  </div>
</aside>
