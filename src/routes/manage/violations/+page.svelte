<script lang="ts">
 import { Button } from "$lib/components/ui/button";
 import { Badge } from "$lib/components/ui/badge";
 import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-svelte";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";

let drivers = [
   { name: "Sid Sanger", status: "Active",  totalDriveTime: "89h 02m", totalMiles: "75,743", issues: "See details", flagged: false },
   { name: "Joe Jacob", status: "Active",  totalDriveTime: "8h 22m", totalMiles: "7,743", issues: "See details", flagged: false },
   { name: "Eric Tang", status: "Active",  totalDriveTime: "42h 32m", totalMiles: "57,743", issues: "See details", flagged: false },
   { name: "Mark Taylor", status: "Out of service",  totalDriveTime: "221h 32m", totalMiles: "77,453", issues: "See details", flagged: true },
   { name: "Joe Jasdeep", status: "Active",  totalDriveTime: "19h 12m", totalMiles: "95,437", issues: "See details", flagged: false },
   { name: "Derek Travis", status: "Active",  totalDriveTime: "85h 02m", totalMiles: "4,173", issues: "See details", flagged: false },
   { name: "Alex Seerman", status: "Active",  totalDriveTime: "66h 09m", totalMiles: "93,742", issues: "See details", flagged: false },
   { name: "Charlie Topanga", status: "Active",  totalDriveTime: "19h 11m", totalMiles: "83,743", issues: "See details", flagged: false },
   { name: "Cain Reed", status: "Active",  totalDriveTime: "121h 17m", totalMiles: "18,212", issues: "See details", flagged: false },
   { name: "Marcus Miller", status: "Active",  totalDriveTime: "209h 57m", totalMiles: "15,283", issues: "See details", flagged: false },
 ]
 
 let sortColumn = "";
 let sortDirection = "asc";

 function sortTable(column: string) {
   if (sortColumn === column) {
     sortDirection = sortDirection === "asc" ? "desc" : "asc";
   } else {
     sortColumn = column;
     sortDirection = "asc";
   }

   drivers.sort((a, b) => {
     let compareA = a[column];
     let compareB = b[column];

     if (column === "mileage") {
       compareA = parseInt(compareA);
       compareB = parseInt(compareB);
     }

     if (compareA < compareB) return sortDirection === "asc" ? -1 : 1;
     if (compareA > compareB) return sortDirection === "asc" ? 1 : -1;
     return 0;
   });

   drivers = drivers;
 }
</script>

<h1 class="text-3xl font-bold mb-6">Violations Manager</h1>
<Table>
  <TableHeader>
    <TableRow>
      <TableHead class="cursor-pointer" on:click={() => sortTable("name")}>
        Violation Info 
        {#if sortColumn === "name"}
          <ChevronDown class="inline ml-1" size={16} />
        {/if}
      </TableHead>
      <TableHead class="cursor-pointer" on:click={() => sortTable("driveTime")}>
        Violation Date
        {#if sortColumn === "driveTime"}
          <ChevronDown class="inline ml-1" size={16} />
        {/if}
      </TableHead>
      <TableHead class="cursor-pointer" on:click={() => sortTable("mileage")}>
        Due Date
        {#if sortColumn === "mileage"}
          <ChevronDown class="inline ml-1" size={16} />
        {/if}
      </TableHead>
      <TableHead class="cursor-pointer text-right" on:click={() => sortTable("status")}>
        Status 
        {#if sortColumn === "status"}
          <ChevronDown class="inline ml-1" size={16} />
        {/if}
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each drivers as driver}
      <TableRow>
        <TableCell>{driver.name}</TableCell>
        <TableCell>{driver.totalDriveTime}</TableCell>
        <TableCell>{driver.totalMiles}</TableCell>
        <TableCell class="text-right">
          <Button 
            variant={driver.flagged ? "destructive" : "secondary"} 
            size="sm"
            class="status-button"
          >
            {driver.issues}
          </Button>
        </TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
<div class="flex justify-end mt-4">
  <Button variant="outline" size="sm" class="mr-2"><ChevronLeft size={16} /> Previous</Button>
  <Button variant="outline" size="sm">Next <ChevronRight size={16} /></Button>
</div>
