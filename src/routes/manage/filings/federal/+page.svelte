<!-- http://svelte0.dev/ui/66e1d2bbc8a8ce12e8276942 -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";;

  const federalFilings = [
  { name: "US DOT renewal", dueDate: "Oct 31, 2024", status: "Complete" },
  { name: "EIN registration", dueDate: "Oct 31, 2024", status: "Complete" },
  { name: "MCS-150", dueDate: "Oct 31, 2024", status: "Review details" },
  { name: "BOC-3", dueDate: "Oct 31, 2024", status: "Review details" },
  { name: "Unified Carrier Registration (UCR)", dueDate: "Oct 31, 2024", status: "Incomplete" },
  { name: "International Fuel Tax Agreement (IFTA)", dueDate: "Oct 31, 2024", status: "Incomplete" },
  { name: "International Registration Plan (IRP)", dueDate: "Oct 31, 2024", status: "Incomplete" },
  ];

  const historicalFilings = [
  { type: "BOC-3", date: "Aug 31, 2023" },
  { type: "Unified Carrier Registration (UCR)", date: "Aug 31, 2023" },
  { type: "MCS-150", date: "Aug 31, 2023" },
  ];
</script>

<div class="flex h-screen bg-background">

  <main class="flex-1 p-8 pl-4 overflow-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Federal filings</h1>
      <Button class="bg-blue-500 hover:bg-blue-600 text-white">Start Review</Button>
    </div>
    <p class="text-muted-foreground mb-6">Based on your business, these are all of the necessary filings. Historical filings are available for download.</p>

    <Table>
      <TableHeader>
	<TableRow>
	  <TableHead>Filing name</TableHead>
	  <TableHead>Due date</TableHead>
	  <TableHead class="text-right">Status</TableHead>
	</TableRow>
      </TableHeader>
      <TableBody>
	{#each federalFilings as filing}
	<TableRow>
	  <TableCell>{filing.name}</TableCell>
	  <TableCell>{filing.dueDate}</TableCell>
	  <TableCell class="text-right">
	    <span
	      class={`px-6 py-3 rounded-full text-xs inline-flex items-center justify-between cursor-pointer
	      ${filing.status === "Complete" ? "bg-green-100 text-green-800" : filing.status === "Review details" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}`}
	      >
	      {filing.status}
	      <CircleAlert class="h-4 w-4 ml-2" />
	    </span>
	  </TableCell>
	</TableRow>
	{/each}
      </TableBody>
    </Table>

    <Card class="mt-8">
      <CardHeader>
	<CardTitle>Historical filings</CardTitle>
      </CardHeader>
      <CardContent>
	<Table>
	  <TableHeader>
	    <TableRow>
	      <TableHead>Filing type</TableHead>
	      <TableHead>Date</TableHead>
	      <TableHead class="text-right">Action</TableHead>
	    </TableRow>
	  </TableHeader>
	  <TableBody>
	    {#each historicalFilings as filing}
	    <TableRow>
	      <TableCell>{filing.type}</TableCell>
	      <TableCell>{filing.date}</TableCell>
	      <TableCell class="text-right">
		<Button variant="secondary" size="sm">Download</Button>
	      </TableCell>
	    </TableRow>
	    {/each}
	  </TableBody>
	</Table>
      </CardContent>
    </Card>
  </main>
</div>
