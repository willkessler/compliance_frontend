<script lang="ts">
 import { Badge } from 'flowbite-svelte';
 import { ClockSolid, ExclamationCircleSolid, ThumbsUpSolid, CheckCircleSolid } from 'flowbite-svelte-icons';

 export let context = null;
 export let secondaryContext = null;
 export let dataField = null;
 export let data = {};

 const colorIconMap = {
   status: {
     general: {
       'blocked':                 { color: 'red',    icon: ExclamationCircleSolid },
       'in progress':             { color: 'blue',   icon: ClockSolid },
       'clear':                   { color: 'green',  icon: ThumbsUpSolid },
     },
     driving: {
       'driving':                 { color: 'green',  icon: CheckCircleSolid },
       'available':               { color: 'green',  icon: CheckCircleSolid },
       'out of service':          { color: 'red',    icon: ExclamationCircleSolid },
       'off duty':                { color: 'blue',   icon: ExclamationCircleSolid },
       'on break':                { color: 'blue',   icon: ExclamationCircleSolid },
       'other':                   { color: 'red',    icon: ExclamationCircleSolid },
     },
     activityHistory: {
     },
   },
   priority: {
     'critical':                  { color: 'red',    icon: ExclamationCircleSolid },
     'high':                      { color: 'red',    icon: ExclamationCircleSolid },
     'medium ':                   { color: 'blue',   icon: null },
     'low ':                      { color: 'yellow', icon: null },
   },
   incidentType: {
   },
   actionType: {
   },
 };

function getColorAndIcon(context, secondaryContext, value) {
  return secondaryContext !== null
    ? colorIconMap[context]?.[secondaryContext]?.[value] ?? null
    : colorIconMap[context]?.[value] ?? null;
}

 function ucfirst(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
 }

 $: colorAndIcon = getColorAndIcon(context, secondaryContext, data[dataField].toLowerCase());

 $: badgeClasses = `px-2 py-1.5 rounded-[6px] min-w-32 text-${colorAndIcon.color}-500 bg-${colorAndIcon.color}-200`;

 $: iconClasses = `
    text-badge-${colorAndIcon.color}-500
    mr-2 transition duration-75
 `;
</script>

<Badge rounded class={badgeClasses}>
  {#if colorAndIcon.icon}
    <svelte:component this={colorAndIcon.icon} class={iconClasses} />
  {/if}
  {data[dataField]}
</Badge>
