<script lang="ts">
 import { Button } from "$lib/components/ui/button";
 import { Badge } from "$lib/components/ui/badge";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
 import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-svelte";

 let vehicles = [
   { name: "Truck 1", driveTime: "100h 52m", mileage: 75743, status: "Active" },
   { name: "Truck 2", driveTime: "89h 02m", mileage: 83543, status: "Inactive" },
   { name: "Truck 3", driveTime: "110h 33m", mileage: 95322, status: "Active" },
   { name: "Truck 4", driveTime: "97h 46m", mileage: 75743, status: "Active" },
   { name: "Truck 5", driveTime: "10h 02m", mileage: 743, status: "Active" },
   { name: "Truck 6", driveTime: "50h 55m", mileage: 28009, status: "Active" },
   { name: "Truck 7", driveTime: "10h 52m", mileage: 1431, status: "Active" },
   { name: "Truck 8", driveTime: "70h 12m", mileage: 7743, status: "Active" },
   { name: "Truck 9", driveTime: "1,040h 14m", mileage: 115098, status: "Active" },
   { name: "Truck 10", driveTime: "1,382h 49m", mileage: 153887, status: "Active" },
 ];

 let sortColumn = "";
 let sortDirection = "asc";

 function sortTable(column: string) {
   if (sortColumn === column) {
     sortDirection = sortDirection === "asc" ? "desc" : "asc";
   } else {
     sortColumn = column;
     sortDirection = "asc";
   }

   vehicles.sort((a, b) => {
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

   vehicles = vehicles;
 }
</script>

<h1 class="text-3xl font-bold mb-6">Vehicles</h1>
<Table>
  <TableHeader>
    <TableRow>
      <TableHead class="cursor-pointer" on:click={() => sortTable("name")}>
        Asset name 
        {#if sortColumn === "name"}
          <ChevronDown class="inline" size={16} />
        {/if}
      </TableHead>
      <TableHead class="cursor-pointer" on:click={() => sortTable("driveTime")}>
        Drive time 
        {#if sortColumn === "driveTime"}
          <ChevronDown class="inline" size={16} />
        {/if}
      </TableHead>
      <TableHead class="cursor-pointer" on:click={() => sortTable("mileage")}>
        Total mileage 
        {#if sortColumn === "mileage"}
          <ChevronDown class="inline" size={16} />
        {/if}
      </TableHead>
      <TableHead class="cursor-pointer" on:click={() => sortTable("status")}>
        Status 
        {#if sortColumn === "status"}
          <ChevronDown class="inline" size={16} />
        {/if}
      </TableHead>
      <TableHead class="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each vehicles as vehicle}
      <TableRow>
        <TableCell>{vehicle.name}</TableCell>
        <TableCell>{vehicle.driveTime}</TableCell>
        <TableCell>{vehicle.mileage.toLocaleString()}</TableCell>
        <TableCell>
          <Badge variant={vehicle.status === "Active" ? "success" : "destructive"} class="px-6 py-1">
            {vehicle.status}
          </Badge>
        </TableCell>
        <TableCell class="text-right">
          <Button variant="outline" size="sm">See details</Button>
        </TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
<div class="flex justify-end mt-4">
  <Button variant="outline" size="sm" class="mr-2"><ChevronLeft size={16} /> Previous</Button>
  <Button variant="outline" size="sm">Next <ChevronRight size={16} /></Button>
</div>
