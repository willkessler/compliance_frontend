<script lang="ts">
 import { Button } from "$lib/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
 import { Separator } from "$lib/components/ui/separator";
 import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";
 import { Input } from "$lib/components/ui/input";
 import * as Select from "$lib/components/ui/select";
 import { Label } from "$lib/components/ui/label";
 import * as z from "zod";
 import { usStates } from "./usStates";

 interface StateOption {
   value: string;
   label: string;
   disabled: boolean;
 }

 let isEditing = false;
 let companyInfo = {
   name: "Trucking Co.",
   address: "123 Main St",
   city: "Oakland",
   state: "CA",
   zipcode: "94293",
   phone: "(555) 123-4567",
   email: "info@truckingco.com",
   dotNumber: "1234567",
 };

 let editingInfo: typeof companyInfo & { state: StateOption | string } = { ...companyInfo };

 let errors = {
   name: "",
   zipcode: "",
   phone: "",
 };

 const schema = z.object({
   name: z.string().min(5, "Company name is required"),
   address: z.string().min(5, "Address is required"),
   city: z.string().min(2, "City is required"),
   zipcode: z.string().regex(/^\d{5}$/, "Zipcode must be 5 digits"),
   phone: z.string().min(1, "Phone number is required"),
 });

 $: isFormValid = !errors.name && !errors.zipcode && !errors.phone && editingInfo.name && editingInfo.zipcode && editingInfo.phone;

 function validateField(field: string, value: string) {
   try {
     schema.shape[field].parse(value);
     errors[field] = "";
   } catch (error) {
     if (error instanceof z.ZodError) {
       errors[field] = error.errors[0].message;
     }
   }
 }

function handleEdit() {
   const stateOption = usStates.find(s => s.abbreviation === companyInfo.state);
   editingInfo = { 
     ...companyInfo, 
     state: stateOption ? { value: stateOption.abbreviation, label: stateOption.name, disabled: false } : companyInfo.state
   };
   isEditing = true;
 }

 function handleSave() {
   if (isFormValid) {
     companyInfo = { 
       ...editingInfo, 
     };
     if (typeof editingInfo.state === 'object') {
       companyInfo.state = editingInfo.state.value.value;
     } else {
       companyInfo.state = editingInfo.state;
     }
     isEditing = false;
   }
 }

 function handleCancel() {
   isEditing = false;
   editingInfo = { 
     ...companyInfo, 
     state: usStates.find(s => s.abbreviation === companyInfo.state) || companyInfo.state
   };
 }
</script>

<div class="flex h-screen bg-background">
  <main class="flex-1 p-8 pl-4 overflow-auto">

    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Your Organization</h1>
      {#if !isEditing}
	<Button on:click={handleEdit}>Edit</Button>
      {/if}
    </div>
    
    <div>
      <Card class="w-full">
	<CardHeader>
	  <CardTitle class="text-lg">Company Information</CardTitle>
	</CardHeader>
	<CardContent>
	  {#if isEditing}
	    <form class="space-y-4">
	      <div class="space-y-2">
		<Label for="name">Company Name *</Label>
		<Input id="name" bind:value={editingInfo.name} placeholder="Company Name" 
                  on:input={() => validateField("name", companyInfo.name)} class={errors.name ? "border-red-500" : ""} />
		{#if errors.name}
		  <p class="text-red-500 text-sm">{errors.name}</p>
		{/if}
	      </div>

	      <div class="space-y-2">
		<Label for="address">Address</Label>
		<Input id="address" bind:value={editingInfo.address} placeholder="Address" />
	      </div>

	      <div class="space-y-2">
		<Label for="city">City</Label>
		<Input id="city" bind:value={editingInfo.city} placeholder="City" />
	      </div>

	      <div class="space-y-2">
		<Label for="state">State</Label>
                <Select.Root bind:selected={editingInfo.state}>
                  <Select.Trigger class="w-full">
                    <Select.Value placeholder="Select a state" />
                  </Select.Trigger>
                  <Select.Content>
                    {#each usStates as state}
                      <Select.Item value={{value: state.abbreviation, label: state.name, disabled: false}}>
                        {state.name}
                      </Select.Item>
                    {/each}
                  </Select.Content>
                </Select.Root>
	      </div>

	      <div class="space-y-2">
		<Label for="zipcode">Zipcode *</Label>
		<Input id="zipcode" bind:value={editingInfo.zipcode} placeholder="Zipcode" maxlength="5" pattern="\d{5}" 
                  on:input={() => validateField("zipcode", companyInfo.zipcode)} class={errors.zipcode ? "border-red-500" : ""} />
		{#if errors.zipcode}
		  <p class="text-red-500 text-sm">{errors.zipcode}</p>
		{/if}
	      </div>

	      <div class="space-y-2">
		<Label for="phone">Phone Number *</Label>
		<Input id="phone" bind:value={editingInfo.phone} placeholder="Phone Number" 
                  on:input={() => validateField("phone", companyInfo.phone)} class={errors.phone ? "border-red-500" : ""} />
		{#if errors.phone}
		  <p class="text-red-500 text-sm">{errors.phone}</p>
		{/if}
	      </div>

	      <div class="space-y-2">
		<Label for="email">Email Address</Label>
		<Input id="email" bind:value={editingInfo.email} type="email" placeholder="Email Address" />
	      </div>

	      <div class="space-y-2">
		<Label for="dotNumber">DOT Number</Label>
		<Input id="dotNumber" bind:value={editingInfo.dotNumber} placeholder="DOT Number" />
	      </div>

	      <div class="flex justify-end space-x-2">
		<Button variant="outline" on:click={handleCancel}>Cancel</Button>
		<Button on:click={handleSave} disabled={!isFormValid}>Save</Button>
	      </div>
	    </form>
	  {:else}
	    <div class="space-y-2">
	      <p>
		<strong>Company Name:</strong>
		{companyInfo.name}
	      </p>
	      <p>
		<strong>Address:</strong>
		{companyInfo.address}, {companyInfo.city}, {companyInfo.state}
		{companyInfo.zipcode}
	      </p>
	      <p>
		<strong>Phone:</strong>
		{companyInfo.phone}
	      </p>
	      <p>
		<strong>Email:</strong>
		{companyInfo.email}
	      </p>
	      <p>
		<strong>DOT Number:</strong>
		{companyInfo.dotNumber}
	      </p>
	    </div>
	  {/if}
	</CardContent>
      </Card>
    </div>
  </main>
</div>
