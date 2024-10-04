import { activities, getActivityIdForVehicleId } from '$lib/data/activityData';
import { PhoneSolid, MailBoxOutline, MapPinAltOutline } from 'flowbite-svelte-icons';


export function getActionItems (environment, id) {
  //console.log(`id ${id} environment ${environment}`);
  let activityId;

  if (environment === 'activity') {
    activityId = parseInt(id);
  } else {
    activityId = getActivityIdForVehicleId(id);
    //console.log(`got activityId ${activityId}`);
  }

  for (let action of actions) {
    if(action.activityId === activityId) {
      return action.items;
    }
  }

  return [];
}

export function getActionItemById (actionItemId) {
  for (let action of actions) {
    for (let item of action.items) {
      if (item.id === actionItemId) {
        return item;
      }
    }
  }
}

export function getStatusColor(status) {
   switch (status.toLowerCase()) {
     case 'clear':
     case 'completed':
       return 'green';
     case 'open':
     case 'in progress':
       return 'yellow';
     case 'closed':
       return 'green';
     case 'blocked':
       return 'red';
     default:
       return 'gray';
   }
 }

export function getTypeColor(type, context) {
  //console.log(`type ${type} context ${context}`);
   if (context == 'bg') {
     switch (type.toLowerCase()) {
       case 'call':
         return '300';
       case 'email':
         return '400';
       case 'onsite':
         return '500';
       default:
         return '600';
     }
   } else { // text
     switch (type.toLowerCase()) {
       case 'call':
         return '600';
       case 'email':
         return '100';
       case 'onsite':
         return '200';
       default:
         return '800';
     }
   }
 }

export function getTypeIcon(type) {
  switch (type.toLowerCase()) {
    case 'call':
      return PhoneSolid;
    case 'email':
      return MailBoxOutline;
    case 'onsite':
      return MapPinAltOutline;
    default:
      return null;
  }
}
export const actions = [
  {
    activityId: 1292,
    items: [
      {
        id: 5891,
        name: "Repair shop visit",
        totalMiles: '8,711',
        description: 'Schedule a pickup time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
      {
        id: 7870,
        name: "Email incident pictures",
        totalMiles: '8,748',
        description: 'Sent emailed pics to support@geicoinsurance.com, case #848228A',
        eventDate: 'Sep 15, 2024',
        dueDate: 'Sep 31, 2024',
        type: 'Email',
        status: 'Closed',
        area: 'Truck',
      },
      // {
      //   id: 4,
      //   name: "Insurance claim",
      //   totalMiles: '8,748',
      //   description: 'File insurance claim',
      //   eventDate: 'Sep 17, 2024',
      //   dueDate: 'Nov 1, 2024',
      //   type: 'Call',
      //   status: 'Closed'
      // },
      {
        id: 6051,
        name: "Mechanic review",
        totalMiles: '8,748',
        description: 'Call Tom for review',
        eventDate: 'Sep 19, 2024',
        dueDate: 'Dec 1, 2024',
        type: 'Call',
        status: 'Closed',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 292,
    items: [
      {
        id: 7338,
        name: "Call Fan's repair shop",
        totalMiles: '8,711',
        description: 'Schedule a dropoff time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 33828,
    items: [
      {
        id: 5117,
        name: "Call Mary's repair shop",
        totalMiles: '8,711',
        description: 'Schedule a pickup time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 48482,
    items: [
      {
        id: 6678,
        name: "Call Bob's repair shop",
        totalMiles: '8,711',
        description: 'Schedule a pickup time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 59382,
    items: [
      {
        id: 5758,
        name: "Call Murgatroyd's repair shop",
        totalMiles: '8,711',
        description: 'Schedule a pickup time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 68292,
    items: [
      {
        id: 5266,
        name: "Call Rough'n'ready repair shop",
        totalMiles: '8,711',
        description: 'Schedule a pickup time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 79182,
    items: [
      {
        id: 7848,
        name: "Call Trux and stuff",
        totalMiles: '8,711',
        description: 'Schedule a pickup time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 81829,
    items: [
      {
        id: 8579,
        name: "Call The Trux Shoppe ",
        totalMiles: '8,711',
        description: 'Schedule a pickup time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 99928,
    items: [
      {
        id: 5740,
        name: "Schedule with the insurance co",
        totalMiles: '8,711',
        description: 'Schedule a pickup time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 10023,
    items: [
      {
        id: 2943,
        name: "Schedule with the insurance co",
        totalMiles: '8,711',
        description: 'Schedule a pickup time',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 1299,
    items: [
      {
        id: 8936,
        name: "Replace ELD (Truck #325)",
        totalMiles: '8,748',
        description: 'Replace broken ELD',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 21, 2024',
        type: 'Onsite',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },      
];
