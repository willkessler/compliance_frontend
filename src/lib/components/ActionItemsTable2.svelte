<script lang="ts">
 import { Button } from "$lib/components/ui/button";
 import { Input } from "$lib/components/ui/input";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "$lib/components/ui/select";
 import { Plus, Trash2 } from "lucide-svelte";;
 import * as z from "zod";

 const personSchema = z.object({
   name: z.string().min(1, "Name is required"),
   gender: z.enum(["male", "female", "decline"]),
   zipcode: z.string().regex(/^\d{5}$/, "Zipcode must be 5 digits"),
 });

 type Person = z.infer<typeof personSchema>;

 let people = $state<Person[]>([
   { name: "", gender: "decline", zipcode: "" },
   { name: "", gender: "decline", zipcode: "" },
   { name: "", gender: "decline", zipcode: "" },
   { name: "", gender: "decline", zipcode: "" },
   { name: "", gender: "decline", zipcode: "" },
 ]);

 function addPerson() {
   people = [...people, { name: "", gender: "decline", zipcode: "" }];
 }

 function removePerson(index: number) {
   if (people.length > 1) {
     people = people.filter((_, i) => i !== index);
   }
 }

 function handleSubmit(event: Event) {
   event.preventDefault();
   const validPeople = people.filter((person) => personSchema.safeParse(person).success);
   console.log("Valid submissions:", validPeople);
 }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  {#each people as person, index}
    <div class="flex items-end space-x-4">
      <div class="flex-1 space-y-2">
	{#if index === 0}
	  <label for={`name-${index}`} class="block text-sm font-medium text-gray-700">Name</label>
	{/if}
	<Input type="text" id={`name-${index}`} bind:value={person.name} placeholder="Enter name" />
      </div>
      <div class="flex-1 space-y-2">
	{#if index === 0}
	  <label for={`gender-${index}`} class="block text-sm font-medium text-gray-700">Gender</label>
	{/if}
	<Select bind:value={person.gender}>
	  <SelectTrigger id={`gender-${index}`}>
	    <SelectValue placeholder="Select gender" />
	  </SelectTrigger>
	  <SelectContent>
	    <SelectItem value="male">Male</SelectItem>
	    <SelectItem value="female">Female</SelectItem>
	    <SelectItem value="decline">Decline to state</SelectItem>
	  </SelectContent>
	</Select>
      </div>
      <div class="flex-1 space-y-2">
	{#if index === 0}
	  <label for={`zipcode-${index}`} class="block text-sm font-medium text-gray-700">Zipcode</label>
	{/if}
	<Input type="text" id={`zipcode-${index}`} bind:value={person.zipcode} placeholder="Enter zipcode" pattern="\d{5}" title="Zipcode must be 5 digits" />
      </div>
      <Button type="button" variant="destructive" size="icon" onclick={() => removePerson(index)} disabled={people.length <= 1}>
	<Trash2 class="h-4 w-4" />
      </Button>
    </div>
  {/each}

  <div class="flex justify-between">
    <Button type="button" variant="outline" onclick={addPerson}>
      <Plus class="h-4 w-4 mr-2" />
      Add Person
    </Button>
    <Button type="submit">Submit</Button>
  </div>
</form>
