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
    activityId: 1298,
    items: [
      {
        id: 5891,
        name: "Review fault code",
        totalMiles: '8,711',
        description: 'Called Tom and team to investigate.',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Closed',
        area: 'Truck',
      },
      {
        id: 7870,
        name: "Reset computer",
        totalMiles: '8,748',
        description: 'Have Tom reset truck computer and restart ELD',
        eventDate: 'Aug 15, 2024',
        dueDate: 'Sep 31, 2024',
        type: 'Email',
        status: 'Open',
        area: 'Truck',
      },
      // {
      //   id: 6051,
      //   name: "Mechanic review",
      //   totalMiles: '8,748',
      //   description: 'Call Tom for review',
      //   eventDate: 'Sep 19, 2024',
      //   dueDate: 'Dec 1, 2024',
      //   type: 'Call',
      //   status: 'Closed',
      //   area: 'Truck',
      // },
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
    activityId: 1299,
    items: [
      {
        id: 7339,
        name: "Brake review",
        totalMiles: '8,711',
        description: 'Have Tom review brake adjustments, components, and any potential leaks',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
      {
        id: 7340,
        name: "Steering & suspension systems",
        totalMiles: '8,711',
        description: 'Have Tom review steering and suspension systems',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
      {
        id: 7341,
        name: "Tires & wheels",
        totalMiles: '8,711',
        description: 'Tom and team need to inspect and sign off on the status of the tires',
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
        id: 7342,
        name: "Pay moving violation fee to Court",
        totalMiles: '8,711',
        description: 'Pay violation fee at AZ court, see details above.',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Payment',
        courtDetails: {
          name: 'Kingman Cerbat Justice Court',
          street1: '524 W Beale St.',
          street2: ' ',
          city: 'Kingman',
          state: 'AZ',
          zip: '86401',
          phone: '(928) 753-0710',
          site: 'https://www.mohavecourts.com/kingmancerbat-justice-court',
        },
        violationImage: 'ticket_raw.jpg',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },
  {
    activityId: 33829,
    items: [
      {
        id: 7343,
        name: "Pay moving violation fee to Court",
        totalMiles: '8,711',
        description: 'Pay violation fee at court, see details.',
        eventDate: 'Sep 23, 2024',
        dueDate: 'Dec 12, 2024',
        type: 'Payment',
        courtDetails: {
          name: 'Superior Court North County Division',
          street1: '325 S. Melrose Drive',
          street2: '#350 (Annex Building)',
          city: 'Vista',
          state: 'CA',
          zip: '92081',
          phone: '(619) 844-2700',
          site: 'https://www.sdcourt.ca.gov/',
        },
        violationImage: 'rosa_viol_only.png',
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
        name: "Pay fee",
        totalMiles: '8,711',
        description: "Send in parking violation fee",
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
    activityId: 1294,
    items: [
      {
        id: 2944,
        name: "Contact Driver",
        totalMiles: '8,711',
        description: 'Have Thomas renew his DOT medical card',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Call',
        status: 'Closed',
        area: 'Truck',
      },
      {
        id: 2945,
        name: "Upload new DOT card",
        totalMiles: '8,711',
        description: 'Update and upload his new DOT medical card',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Email',
        status: 'Open',
        area: 'Truck',
      },
      {
        id: 2946,
        name: "Send Certificate to DMV",
        totalMiles: '8,711',
        description: 'Send a copy of the new certificate to the DMV before the current one expires',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 14, 2024',
        type: 'Email',
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
  {
    activityId: 1295,
    items: [
      {
        id: 8937,
        name: "Take RTD test",
        totalMiles: '8,748',
        description: 'Notify Thomas he needs to take the RTD test',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 21, 2024',
        type: 'Call',
        status: 'Open',
        area: 'Truck',
      },
      {
        id: 8938,
        name: "Update Thomas' status",
        totalMiles: '8,748',
        description: 'After Thomas passes the RTD test, report his status to the Clearinghouse and deploy him to new route.',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 21, 2024',
        type: 'Email',
        status: 'Open',
        area: 'Truck',
      },
      {
        id: 8939,
        name: "ClearningHouse",
        totalMiles: '8,748',
        description: 'Check Clearinghouse status is updated to not-prohibited.',
        eventDate: 'Aug 31, 2024',
        dueDate: 'Sep 21, 2024',
        type: 'Email',
        status: 'Open',
        area: 'Truck',
      },
    ],
  },      
];
