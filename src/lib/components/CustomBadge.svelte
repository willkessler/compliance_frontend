<script lang="ts">
 import { Badge } from 'flowbite-svelte';
 import { ClockSolid, ExclamationCircleSolid, ThumbsUpSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
 import { Files, Truck, User, Wrench } from 'lucide-svelte';

 export let context = null;
 export let secondaryContext = null;
 export let dataField = null;
 export let specialFieldOverride = null;
 export let data = {};

 const fbIconSize = 6;
 const luIconSize = 6;
 const textSaturation = 500;
 const bgSaturation = 100;
 const iconSaturation = 125;

 const colorIconMap = {
   status: {
     general: {
       'open':                    { color: 'green',  icon: null, },
       'closed':                  { color: 'gray',   icon: null, },
       'blocked':                 { color: 'red',    icon: ExclamationCircleSolid, iconLibrary: 'fb' },
       'in progress':             { color: 'blue',   icon: ClockSolid, iconLibrary: 'fb' },
       'clear':                   { color: 'green',  icon: ThumbsUpSolid, iconLibrary: 'fb' },
       'incomplete':              { color: 'red',    icon: ExclamationCircleSolid, iconLibrary: 'fb' },
       'review details':          { color: 'yellow', icon: ExclamationCircleSolid, iconLibrary: 'fb' },
       'complete':                { color: 'green',  icon: CheckCircleSolid, iconLibrary: 'fb' },
     },
     driving: {
       'driving':                 { color: 'green',  icon: CheckCircleSolid, iconLibrary: 'fb' },
       'available':               { color: 'green',  icon: CheckCircleSolid, iconLibrary: 'fb' },
       'out of service':          { color: 'red',    icon: ExclamationCircleSolid, iconLibrary: 'fb' },
       'off duty':                { color: 'blue',   icon: ClockSolid, iconLibrary: 'fb' },
       'on break':                { color: 'blue',   icon: ClockSolid, iconLibrary: 'fb' },
       'other':                   { color: 'red',    icon: ExclamationCircleSolid, iconLibrary: 'fb' },
     },
     activityHistory: {
     },
   },
   priority: {
     'critical':                  { color: 'red',    icon: ExclamationCircleSolid, iconLibrary: 'fb' },
     'high':                      { color: 'orange', icon: ExclamationCircleSolid, iconLibrary: 'fb' },
     'medium':                    { color: 'blue',   icon: null },
     'low':                       { color: 'yellow', icon: null },
   },
   incidentType: {
     'maintenance':               { color: 'blue',   icon: Wrench, iconLibrary: 'lu' },
     'accident':                  { color: 'red',    icon: Truck, iconLibrary: 'lu' },
     'driver issue':              { color: 'red',    icon: User, iconLibrary: 'lu' },
     'documents':                 { color: 'gray',   icon: Files, iconLibrary: 'lu' },
   },
   actionType: {
   },
 };

 function getColorAndIcon(context, secondaryContext, value) {
   if (context === 'status') {
     if (secondaryContext === 'general') {
       //debugger;
     }
   }
   
   if (secondaryContext !== null) {
     return colorIconMap[context]?.[secondaryContext]?.[value] || null;
   }
   let result = colorIconMap[context]?.[value] || null;
   return result;
 }

 // Hacky approach to replacing "Blocked" with "2 Blockers" in limited cases (Drivers, for now)
 function applyOverride(data, dataField) {
   let newData = { ... data };

   if (specialFieldOverride !== null) {
     if (newData[specialFieldOverride.field] === specialFieldOverride.check) {
       newData[specialFieldOverride.field] = specialFieldOverride.replaceWith;
     }
   }
   return newData[dataField];
 }
   
 $: colorAndIcon = getColorAndIcon(context, secondaryContext, data[dataField].toLowerCase());

 $: badgeClasses = `px-2 py-1.5 rounded-[6px] min-w-32 min-h-9 text-${colorAndIcon.color}-${textSaturation} bg-${colorAndIcon.color}-${bgSaturation}`;

 $: iconClasses = `text-${colorAndIcon.color}-${iconSaturation} mr-2 w-${colorAndIcon.iconLibrary === 'fb' ? fbIconSize : luIconSize} h-${colorAndIcon.iconLibrary === 'fb' ? fbIconSize : luIconSize}`;

</script>

<Badge rounded class={badgeClasses}>
  {#if colorAndIcon.icon}
    <svelte:component 
      this={colorAndIcon.icon} 
      class={iconClasses} 
    />
  {/if}
  {applyOverride(data, dataField)}
</Badge>
