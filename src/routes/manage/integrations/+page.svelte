<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-svelte";
  import { Search } from "lucide-svelte";

  interface App {
    name: string;
    logo: string;
    description: string;
    tags: string[];
    categories: string[];
  }

  const apps: App[] = [
    {
      name: "LogRock",
      logo: "logrock.webp",
      description: "Connect your Samsara and FMCSA data to find and resolve compliance risks before they occur.",
      tags: ["MAINTENANCE", "COMPLIANCE"],
      categories: ["Compliance"]
    },
    {
      name: "Vusion",
      logo: "Vusion-AppMarketplace.webp",
      description: "Bring GPS and core telematics data from Samsara into Vusion's full-service fuel tax solution, helping streamline IFTA compliance.",
      tags: ["FUEL MANAGEMENT", "COMPLIANCE"],
      categories: ["Compliance", "Fuel Management"]
    },
    {
      name: "RyderConnect eDVIR",
      logo: "RyderConnect.webp",
      description: "Sync defects and repairs with Ryder to stay compliant and maximize uptime.",
      tags: ["MAINTENANCE", "COMPLIANCE"],
      categories: ["Compliance", "Maintenance"]
    },
    {
      name: "InfoStream",
      logo: "InfoStream-AppMarketplace.webp",
      description: "Bring telematics data and video events from Samsara into InfoStream’s driver performance and safety solutions to improve compliance and mitigate risk.",
      tags: ["MAINTENANCE", "COMPLIANCE"],
      categories: ["Safety & Coaching", "Compliance"]
    },
    {
      name: "Per Diem Plus",
      logo: "PDP_logo.webp",
      description: "Seamless integration of Samsara ELD and Per Diem Plus Fleets software.",
      tags: ["MAINTENANCE", "COMPLIANCE"],
      categories: ["Maintenance"]
    },
    {
      name: "ProMiles",
      logo: "Frame-4.webp",
      description: "Simplify your fuel tax reporting with ProMiles.",
      tags: ["MAINTENANCE", "COMPLIANCE"],
      categories: ["Fuel Management", "Compliance"]
    },
    {
      name: "California BAR CTP Integration",
      logo: "bar.webp",
      description: "Streamline smog testing and reporting for government vehicles in California",
      tags: ["NEWLY ADDED", "COMPLIANCE"],
      categories: ["Compliance"]
    },
  ];

  const categories = [
    "View All", "Featured", "Newly Added", "Compliance", "Data Connectors", 
    "Fuel Management", "K12", "Installation Services", "Insurance", "Maintenance",
    "Navigation", "Routing & Dispatch", "Safety & Coaching"
  ];

  let selectedCategory = "Compliance";
  let searchQuery = "";

  $: filteredApps = apps.filter(app => 
    (selectedCategory === "View All" || app.categories.includes(selectedCategory)) &&
    (app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     app.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  function selectCategory(category: string) {
    selectedCategory = category;
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold mb-4">Clear and Compliant : Integrations</h1>
  <p class="text-lg mb-8">
    Our turnkey integrations connect to essential 3rd party applications and unlock the power real-time data for your physical operations.
  </p>

  <div class="flex mb-8">
    <div class="relative flex-grow mr-4">
      <Search class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <Input type="text" placeholder="Search" class="pl-10" bind:value={searchQuery} />
    </div>
    <Button variant="outline">{'Filtered by: ' + selectedCategory}</Button>
  </div>

  <div class="flex">
    <div class="w-1/4 pr-4">
      <ul>
        {#each categories as category}
          <li class="mb-2">
            <Button
              variant={category === selectedCategory ? "secondary" : "ghost"}
              class="w-full justify-start"
              on:click={() => selectCategory(category)}
            >
              {category}
            </Button>
          </li>
        {/each}
      </ul>
    </div>

    <div class="w-3/4 grid grid-cols-3 gap-4">
      {#each filteredApps as app}
        <Card>
          <CardHeader>
            <img style="height:120px" src={'/images/logos/' + app.logo} alt={app.name} class="h-30 mb-2" />
            <CardTitle>{app.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="mb-2">
              {#each app.tags as tag}
                <Badge variant="secondary" class="mr-1">{tag}</Badge>
              {/each}
            </div>
            <p>{app.description}</p>
          </CardContent>
        </Card>
      {/each}
    </div>
  </div>
<div class="flex justify-end mt-4">
  <Button variant="outline" size="sm" class="mr-2"><ChevronLeft size={16} /> Previous</Button>
  <Button variant="outline" size="sm">Next <ChevronRight size={16} /></Button>
</div>

</div>
