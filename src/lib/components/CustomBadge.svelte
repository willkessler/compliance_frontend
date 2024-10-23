<script lang="ts">
 import { Badge } from 'flowbite-svelte';
 import { 
        ClockSolid, 
        ExclamationCircleSolid, 
        ExclamationCircleOutline,
        ThumbsUpSolid, 
        CashOutline,
        CheckCircleOutline, 
        CheckCircleSolid,
        PhoneOutline, 
        MailBoxOutline,
        MapPinAltOutline,
        TruckOutline,
        ThumbsUpOutline,
        CirclePauseOutline,
        } from 'flowbite-svelte-icons';
 import { 
        CirclePause,
        Files, 
        PackageOpen,
        Truck, 
        User, 
        Wrench,
        Mail,
        CirclePlay,
        Pencil,
        Utensils,
        UserCheck
        } from 'lucide-svelte';

 export let context = null;
 export let secondaryContext = null;
 export let dataField = null;
 export let specialFieldOverride = null;
 export let data = {};

 const fbIconSize = 5;
 const luIconSize = 5;
 const textSaturation = 500;
 const bgSaturation = 100;
 const iconSaturation = 125;

 const colorIconMap = {
   status: {
     general: {
       'open':                    { color: 'gray',  icon: CheckCircleOutline, iconLibrary: 'lu' },
       'closed':                  { color: 'green',   icon: CheckCircleSolid, iconLibrary: 'fb' },
       'blocked':                 { color: 'red',    icon: ExclamationCircleSolid, iconLibrary: 'fb' },
       'hold':                    { color: 'blue',   icon: CirclePause, iconLibrary: 'lu' },
       'in progress':             { color: 'blue',   icon: ClockSolid, iconLibrary: 'fb' },
       'clear':                   { color: 'green',  icon: CheckCircleSolid, iconLibrary: 'fb' },
       'incomplete':              { color: 'red',    icon: ExclamationCircleSolid, iconLibrary: 'fb' },
       'review details':          { color: 'yellow', icon: ExclamationCircleSolid, iconLibrary: 'fb' },
       'complete':                { color: 'green',  icon: CheckCircleSolid, iconLibrary: 'fb' },
     },
     driving: {
       'driving':                 { color: 'green',  icon: CirclePlay, iconLibrary: 'fb' },
       'available':               { color: 'green',  icon: UserCheck, iconLibrary: 'fb' },
       'out of service':          { color: 'red',    icon: ExclamationCircleOutline, iconLibrary: 'fb' },
       'off duty':                { color: 'blue',   icon: CirclePauseOutline, iconLibrary: 'fb' },
       'on break':                { color: 'blue',   icon: CirclePauseOutline, iconLibrary: 'fb' },
       'other':                   { color: 'red',    icon: ExclamationCircleOutline, iconLibrary: 'fb' },
     },
   },
   priority: {
     'critical':                  { color: 'red',    icon: ExclamationCircleSolid, iconLibrary: 'fb' },
     'high':                      { color: 'orange', icon: ExclamationCircleSolid, iconLibrary: 'fb' },
     'medium':                    { color: 'yellow', icon: ExclamationCircleSolid, iconLibrary: 'fb' },
     'low':                       { color: 'blue',   icon: ExclamationCircleSolid, iconLibrary: 'fb' },
   },
   activityType: {
     'maintenance':               { color: 'blue',   icon: Wrench, iconLibrary: 'lu' },
     'accident':                  { color: 'red',    icon: Truck, iconLibrary: 'lu' },
     'driver issue':              { color: 'red',    icon: User, iconLibrary: 'lu' },
     'documents':                 { color: 'gray',   icon: Files, iconLibrary: 'lu' },
   },
   actionType: {
     'call':                       { color: 'gray',   icon: PhoneOutline, iconLibrary: 'fb' },
     'onsite':                     { color: 'gray',   icon: MapPinAltOutline, iconLibrary: 'fb' },
     'email':                      { color: 'gray',   icon: Mail, iconLibrary: 'fb' },
     'sms':                        { color: 'gray',   icon: PhoneOutline, iconLibrary: 'fb' },
     'payment':                    { color: 'gray',   icon: CashOutline, iconLibrary: 'fb' },
   },
   actionArea: {
     'vehicle':                    { color: 'gray',   icon: Truck, iconLibrary: 'lu' },
     'driver':                     { color: 'gray',   icon: User, iconLibrary: 'lu' },
     'document':                   { color: 'gray',   icon: Files, iconLibrary: 'lu' },
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

 $: badgeClasses = `px-2 py-1.5 rounded-[6px] min-w-32 min-h-9 text-${colorAndIcon.color}-${textSaturation} bg-${colorAndIcon.color}-${bgSaturation} cursor-pointer`;

 $: iconClasses = `text-${colorAndIcon.color}-${iconSaturation} mr-1 w-${colorAndIcon.iconLibrary === 'fb' ? fbIconSize : luIconSize} h-${colorAndIcon.iconLibrary === 'fb' ? fbIconSize : luIconSize}`;

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
