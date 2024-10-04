<script lang="ts">
 import { Button } from "$lib/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
 import { Separator } from "$lib/components/ui/separator";
 import { CircleAlert, LayoutDashboard, FileText, Truck, Network, Settings } from "lucide-svelte";
 import { EyeSolid } from 'flowbite-svelte-icons';
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
   state: "WY",
   zipcode: "94293",
   phone: "(555) 123-4567",
   email: "info@truckingco.com",
   dotNumber: "1234567",
   dotPin: '****',
   mcNumber: '1234567',
   iftaNumber: '1234567',
 };

 let editingInfo: typeof companyInfo & { state: StateOption } = { ...companyInfo, state: { value: companyInfo.state, label: "", disabled: false } };

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
     state: stateOption ? { value: stateOption.abbreviation, label: stateOption.name, disabled: false } : { value: companyInfo.state, label: "", disabled: false }
   };
   isEditing = true;
 }

 function handleSave() {
   if (isFormValid) {
     companyInfo = { 
       ...editingInfo, 
     };

     if (typeof editingInfo.state === 'object') {
       // This is a weird hacky thing, when first submitted if there are no changes to state, we get back editingInfo.state.value, but if there are
       // changes to the user selection we get editingInfo.state.value.value. Not sure why???
       companyInfo.state = typeof editingInfo.state.value === 'object' ? editingInfo.state.value.value : editingInfo.state.value;
     } else {
       companyInfo.state = editingInfo.state;
     }

     console.log("Saving company info:", companyInfo, "typeof editingInfo.state : ", typeof editingInfo.state);
     isEditing = false;
   }
 }

 function handleCancel() {
   isEditing = false;
   const stateOption = usStates.find(s => s.abbreviation === companyInfo.state);
   editingInfo = { 
     ...companyInfo, 
     state: stateOption ? { value: stateOption.abbreviation, label: stateOption.name, disabled: false } : { value: companyInfo.state, label: "", disabled: false }
   };
 }
</script>

<div class="flex h-screen bg-gray-50">
  <main class="flex-1 p-6 overflow-auto">

    <!-- Main Card -->
    <Card class="w-full">
      <CardHeader>
          <div class="flex justify-between items-center">  
          <CardTitle class="text-2xl font-semibold text-gray-900">Company Information</CardTitle>
            {#if !isEditing}
            <Button class="bg-primary-600 hover:bg-primary-700 text-gray-700" on:click={handleEdit}>Edit</Button>
          {/if}
        </div>
      </CardHeader>
      <Separator />
      <CardContent class="p-6">
        {#if isEditing}
          <form class="space-y-6">
            <!-- Company Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label for="name">Company Name *</Label>
                <Input id="name" bind:value={editingInfo.name} placeholder="Company Name" 
                  on:input={() => validateField("name", companyInfo.name)} 
                  class={errors.name ? "border-red-500" : ""} />
                {#if errors.name}
                  <p class="text-red-500 text-sm">{errors.name}</p>
                {/if}
              </div>
              <!-- Address -->
              <div>
                <Label for="address">Address</Label>
                <Input id="address" bind:value={editingInfo.address} placeholder="Address" />
              </div>
            </div>

            <!-- City, State, Zipcode -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label for="city">City</Label>
                <Input id="city" bind:value={editingInfo.city} placeholder="City" />
              </div>
              <div>
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
              <div>
                <Label for="zipcode">Zipcode *</Label>
                <Input id="zipcode" bind:value={editingInfo.zipcode} placeholder="Zipcode" maxlength="5" pattern="\d{5}" 
                  on:input={() => validateField("zipcode", companyInfo.zipcode)} 
                  class={errors.zipcode ? "border-red-500" : ""} />
                {#if errors.zipcode}
                  <p class="text-red-500 text-sm">{errors.zipcode}</p>
                {/if}
              </div>
            </div>

            <!-- Phone, Email -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label for="phone">Phone Number *</Label>
                <Input id="phone" bind:value={editingInfo.phone} placeholder="Phone Number" 
                  on:input={() => validateField("phone", companyInfo.phone)} 
                  class={errors.phone ? "border-red-500" : ""} />
                {#if errors.phone}
                  <p class="text-red-500 text-sm">{errors.phone}</p>
                {/if}
              </div>
              <div>
                <Label for="email">Email Address</Label>
                <Input id="email" bind:value={editingInfo.email} type="email" placeholder="Email Address" />
              </div>
            </div>

            <!-- DOT Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label for="dotNumber">DOT Number</Label>
                <Input id="dotNumber" bind:value={editingInfo.dotNumber} placeholder="DOT Number" />
              </div>
              <div>
                <Label for="dotPin">DOT PIN</Label>
                <div class="relative">
                  <Input id="dotPin" bind:value={editingInfo.dotPin} placeholder="DOT PIN" />
                  <EyeSolid class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-4">
              <Button variant="outline" class="text-gray-500" on:click={handleCancel}>Cancel</Button>
              <Button class="bg-primary-600 hover:bg-primary-700 text-white" on:click={handleSave} disabled={!isFormValid}>Save</Button>
            </div>
          </form>
        {:else}
          <!-- Display Information Section: Two-column layout -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column: Company Name, Address, Phone, Email -->
            <div class="space-y-4">
              <p><strong>Company Name</strong> {companyInfo.name}</p>
              <p><strong>Address</strong> {companyInfo.address}, {companyInfo.city}, {companyInfo.state} {companyInfo.zipcode}</p>
              <p><strong>Phone</strong> {companyInfo.phone}</p>
              <p><strong>Email</strong> {companyInfo.email}</p>
            </div>

            <!-- Right Column: MC Number, IFTA Number, DOT Number, DOT PIN -->
            <div class="space-y-4">
              <p><strong>MC Number</strong> {companyInfo.mcNumber}</p>
              <p><strong>IFTA Number</strong> {companyInfo.iftaNumber}</p>
              <p><strong>DOT Number</strong> {companyInfo.dotNumber}</p>
              <div class="flex items-center">
                <strong>DOT PIN</strong>
                &nbsp;
                <span>{companyInfo.dotPin}</span>
                <EyeSolid class="ml-2 cursor-pointer" />
              </div>
            </div>
          </div>
        {/if}
      </CardContent>
    </Card>
  </main>
</div>
