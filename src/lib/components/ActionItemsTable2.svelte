<script lang="ts">
 import { Button } from "$lib/components/ui/button";
 import { Input } from "$lib/components/ui/input";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "$lib/components/ui/select";
 import { Plus, Trash2, X } from "lucide-svelte";
 import { TruckSolid, PenOutline, CheckOutline } from 'flowbite-svelte-icons';
 import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import CustomBadge from '$lib/components/CustomBadge.svelte';
 import * as z from "zod";


 const ActionItemSchema = z.object({
   name: z.string().min(1),
   type: z.enum(["call", "email", "onsite"]),
   area: z.enum(["vehicle", "driver", "document"]),
   totalMiles: z.number(),
 });

 type ActionItem = z.infer<typeof ActionItemSchema>;   
 let actionItems: ActionItem[] = [
   { name: "The first action item", type: "call", area: 'vehicle', totalMiles: 1203 },
   { name: "The second best action item", type: "onsite", area: 'driver', totalMiles: 23492 },
   { name: "The very last pre-existing action item ", type: "email", area: 'document', totalMiles: 98382 },
 ];

 let currentActionItem: ActionItem & { totalMiles: string } = { name: "", type: "call", area: 'vehicle', totalMiles: '' };
 let editingIndex: number | null = null;
 let originalActionItem: ActionItem | null = null;
 let isEditing = false;
 let hasChanges = false;

 function formatNumber(num: number): string {
   return num.toLocaleString('en-US');
 }

 function unformatNumber(str: string): number {
   const parsedNumber = parseFloat(str.replace(/,/g, ""));
   return isNaN(parsedNumber) ? 0 : parsedNumber;
 }

 function addOrUpdateActionItem() {
   const validatedItem = {
     name: currentActionItem.name,
     type: currentActionItem.type || "call",
     area: currentActionItem.area || "vehicle",
     totalMiles: unformatNumber(currentActionItem.totalMiles)
   };
   
   if (editingIndex !== null) {
     actionItems[editingIndex] = validatedItem;
     finishEditing();
   } else {
     actionItems = [...actionItems, validatedItem];
     resetCurrentActionItem();
   }
 }

 function editActionItem(index: number) {
   currentActionItem = { 
     ...actionItems[index], 
     totalMiles: formatNumber(actionItems[index].totalMiles)
   };
   originalActionItem = { ...actionItems[index] };
   editingIndex = index;
   isEditing = true;
   hasChanges = false;
 }

 function cancelEditing() {
   finishEditing();
 }

 function finishEditing() {
   resetCurrentActionItem();
   editingIndex = null;
   originalActionItem = null;
   isEditing = false;
   hasChanges = false;
 }

 function removeActionItem(index: number) {
   actionItems = actionItems.filter((_, i) => i !== index);
   if (editingIndex === index) {
     finishEditing();
   }
 }

 function resetCurrentActionItem() {
   currentActionItem = { name: "", type: "call", area: 'vehicle', totalMiles: '' };
 }

 function isFormValid() {
   return currentActionItem.name.trim() !== "";
 }

 function handleInputChange() {
   if (isEditing && originalActionItem) {
     const currentForComparison = {
       ...currentActionItem,
       totalMiles: currentActionItem.totalMiles === '' ? null : unformatNumber(currentActionItem.totalMiles)
     };
     hasChanges = JSON.stringify(currentForComparison) !== JSON.stringify(originalActionItem);
   }
   // Trigger reactivity for new items
   currentActionItem = { ...currentActionItem };
   isButtonDisabled = isEditing ? !hasChanges || !isFormValid() : !isFormValid();
 }


 function handleMileageInput(event: Event) {
   const input = event.target as HTMLInputElement;
   const cursorPosition = input.selectionStart;
   const unformattedValue = input.value.replace(/,/g, '');
   const numericValue = unformattedValue.replace(/[^0-9.]/g, '');
   const formattedValue = numericValue ? formatNumber(parseFloat(numericValue)) : '';
   
   currentActionItem.totalMiles = formattedValue;
   handleInputChange();

   // Restore cursor position
   setTimeout(() => {
     const newCursorPosition = cursorPosition + (formattedValue.length - input.value.length);
     input.setSelectionRange(newCursorPosition, newCursorPosition);
   }, 0);
 }

 function handleKeyDown(event: KeyboardEvent) {
   if (event.key === 'Enter' && isFormValid()) {
     addOrUpdateActionItem();
   }
 }

 $: visibleActionItems = actionItems.filter((_, index) => index !== editingIndex);
 $: isButtonDisabled = isEditing ? !hasChanges : !isFormValid();

</script>

<div class="flex items-end space-x-4">
  <div class="flex-1 space-y-2 min-w-80">
    <Input 
      type="text" 
      id="actionName" 
      placeholder="Enter details of an action item" 
      bind:value={currentActionItem.name} 
      on:input={handleInputChange}
      on:keydown={handleKeyDown}
    />
  </div>
  <div class="flex-1 space-y-2">
    <Select bind:value={currentActionItem.type} on:change={handleInputChange}>
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
    <Select bind:value={currentActionItem.area} on:change={handleInputChange}>
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
    <Input 
      type="text" 
      id="totalMiles" 
      placeholder="Mileage" 
      bind:value={currentActionItem.totalMiles} 
      on:input={handleMileageInput}
      on:keydown={handleKeyDown}
    />
  </div>

  {#if isEditing}
    <Button class="bg-red-400" size="icon" on:click={cancelEditing}>
      <X class="h-4 w-4" />
    </Button>
  {/if}

  <Button class="bg-green-400" size="icon" on:click={addOrUpdateActionItem} disabled={isButtonDisabled}>
    <CheckOutline class="h-4 w-4" />
  </Button>
</div>

<div class="ml-2 mr-2">
<Table class="relative overflow-x-auto sm:rounded-lg mt-3 ml-0">
  <TableBody>
    {#each visibleActionItems as actionItem, index}
      <TableBodyRow>
        <TableBodyCell class="pl-4 px-2 py-4 whitespace-nowrap text-sm font-large text-customGray w-full">
          {actionItem.name}
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
          <CustomBadge
            context="actionType"
            data={actionItem}
            dataField="type"
          />
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
          <CustomBadge
            context="actionArea"
            data={actionItem}
            dataField="area"
          />
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
          {formatNumber(actionItem.totalMiles)} miles
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 text-sm font-large text-customGray/50 cursor-pointer hover:text-customGray/80">
          <div on:click={() => editActionItem(index)}><PenOutline /></div>
        </TableBodyCell>
        <TableBodyCell class="px-2 py-4 text-sm font-large text-customGray/50 cursor-pointer hover:text-customGray/80">
          <div on:click={() => removeActionItem(index)}><Trash2 size={18} /></div>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
</div>
