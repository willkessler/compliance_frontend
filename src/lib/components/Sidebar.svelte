<script lang="ts">
 import { page } from '$app/stores';
 import { Separator } from "$lib/components/ui/separator";
 import { LayoutDashboard, Building2, Truck, Users, Link, CircleAlert, Info, Settings } from "lucide-svelte";

 const menuItems = [
   { href: '/', label: 'Dashboard', icon: LayoutDashboard ,
   subItems: [
     { href: '/', label: 'Home' },
     { href: '/manage/organization', label: 'Company setup' }
   ]
   },
   { href: '/manage/filings', label: 'Filings', icon: Building2,
   subItems: [
     { href: '/manage/filings/federal', label: 'Federal' },
     { href: '/manage/filings/state', label: 'State' }
   ]
   },
   { href: '/manage/fleet', label: 'Fleet management', icon: Truck,
   subItems: [
     { href: '/manage/fleet/vehicles', label: 'Vehicles' },
     { href: '/manage/fleet/drivers', label: 'Drivers' }
   ]
   }
 ];
</script>

<aside class="w-64 bg-card text-card-foreground border-r flex flex-col">
  <div class="p-5 text-xl font-bold">Trucking Co.</div>
  <nav class="flex-grow pl-2">
    {#each menuItems as item}
      <a 
        href={item.href} 
        class="flex items-center px-4 py-2 hover:bg-accent"
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
    <a href="#" class="flex items-center px-4 py-2 hover:bg-accent"><Link class="mr-2" size={20} /> Connections</a>
    <a href="#" class="flex items-center px-4 py-2 hover:bg-accent"><Info class="mr-2" size={20} /> Get help</a>
    <a href="#" class="flex items-center px-4 py-2 hover:bg-accent mb-4"><Settings class="mr-2" size={20} /> Settings</a>
  </div>
</aside>
