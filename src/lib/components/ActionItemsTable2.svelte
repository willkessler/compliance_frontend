<script lang="ts">
 import { Button } from "$lib/components/ui/button";
 import { Input } from "$lib/components/ui/input";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "$lib/components/ui/select";
 import { Plus, Trash2 } from "lucide-svelte";
 import { PenOutline, CheckOutline } from 'flowbite-svelte-icons';
 import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import * as z from "zod";

 const ActionItemSchema = z.object({
   name: z.string(),
   type: z.enum(["call", "email", "onsite"]),
   dueDate: z.coerce.date(),
   area: z.enum(["vehicle", "driver", "document"]),
   status: z.enum(["to-do", "in-progress", "completed"]),
   totalMiles: z.number(),
 });

 type ActionItem = z.infer<typeof ActionItemSchema>;   
 let actionItems = <ActionItem>([
   { name: "The first action item", type: "Call", area: 'Vehicle', totalMiles: '1,203' },
   { name: "The second best action item", type: "Onsite", area: 'Driver', totalMiles: '23,492' },
   { name: "The very last pre-existing action item ", type: "Email", area: 'Document', totalMiles: '98,382' },
 ]);

 function addActionItem() {
   actionItems = [...actionItems, { name: "", type: "call", area: 'vehicle' }];
 }

 function removeActionItem(index: number) {
   console.log(`index: ${index}`);
   if (actionItems.length > 1) {
     actionItems = actionItems.filter((_, i) => i !== index);
   }
 }

 function handleSubmit(event: Event) {
   event.preventDefault();
   const validActionItems = actionItems.filter((actionItem) => actionItemSchema.safeParse(actionItem).success);
   console.log("Valid submissions:", validActionItems);
 }

</script>

<div class="flex items-end space-x-4">
  <div class="flex-1 space-y-2 min-w-80">
    <Input type="text" id="actionName" placeholder="Enter details of an action item" />
  </div>
  <div class="flex-1 space-y-2">
    <Select>
      <SelectTrigger>
	<SelectValue placeholder="Action type" />
      </SelectTrigger>
      <SelectContent>
	<SelectItem value="call">Call</SelectItem>
	<SelectItem value="email">Email</SelectItem>
	<SelectItem value="onsite">Onsite</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div class="flex-1 space-y-2">
    <Select>
      <SelectTrigger>
	<SelectValue placeholder="Action relates to.." />
      </SelectTrigger>
      <SelectContent>
	<SelectItem value="vehicle">Vehicle</SelectItem>
	<SelectItem value="driver">Driver</SelectItem>
	<SelectItem value="document">Document</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div class="flex-1 space-y-2">
    <Input type="text" id="totalMiles" placeholder="Mileage" />
  </div>

  <Button class="bg-green-400" size="icon" onclick={() => addActionItem(index)} disabled={actionItems.length <= 1}>
    <CheckOutline class="h-4 w-4" />
  </Button>
</div>

<div class="ml-2 mr-2">
<Table class="relative overflow-x-auto sm:rounded-lg mt-3 ml-0" >
  <TableBody>
    {#each actionItems as actionItem, index}
      <TableBodyRow>
        <TableBodyCell class="pl-4 px-2 py-4 whitespace-nowrap text-sm font-large text-customGray w-full">
          {actionItem.name}
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
          {actionItem.type}
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
          {actionItem.area}
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
          {actionItem.totalMiles} miles
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 text-sm font-large text-customGray/50 cursor-pointer hover:text-customGray/80">
          <PenOutline />
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 text-sm font-large text-customGray/50 cursor-pointer hover:text-customGray/80">
          <div on:click={() => removeActionItem(index) }><Trash2 size={18} /></div>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
</div>
