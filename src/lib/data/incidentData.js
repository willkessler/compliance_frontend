import { TruckSolid, FileLinesOutline } from 'flowbite-svelte-icons';

// needs refactor to use id's as keyss vs stupid loop lookups, dumb AI code
export function getIncidentById (id) {
  for (let incident of incidents) {
    if(incident.id === id) {
      return incident;
    }
  }
  return null;
}

export function getIncidentIdForVehicleId (vehicleId) {
  for (let incident of incidents) {
    if(incident.vehicleId === parseInt(vehicleId)) {
      console.log(`returning ${incident.id}`);
      return incident.id;
    }
  }
  return null;
}

export function getTypeColor(type) {
  switch (type.toLowerCase()) {
  case 'maintenance':
    return 'purple';
  case 'accident':
  case 'incident':
    return 'red';
  case 'in progress':
  case 'payment':
    return 'blue';
  case 'completed':
    return 'green';
  case 'driver issue':
    return 'yellow';
  case 'documents':
    return 'gray';
  default:
    return 'gray';
  }
}

export function getStatusColor(status) {
  switch (status.toLowerCase()) {
  case 'done':
  case 'completed':
    return 'green';
  case 'open':
    return 'gray';
  case 'in progress':
    return 'blue';
  case 'other status':
    return 'blue';
  default:
    return 'gray';
  }
}

export function getPriorityColor(priority) {
  switch (priority.toLowerCase()) {
  case 'critical':
    return 'red';
  case 'high':
    return 'yellow';
  case 'medium':
    return 'blue';
  case 'low':
    return 'green';
  default:
    return 'green';
  }
}

export function getIncidentIcon (incident) {
  switch (incident.type) {
  case 'Driver Issue':
  case 'Maintenance':
    return TruckSolid;
  case 'Documents':
    return FileLinesOutline;
  }
  return FileLinesOutline;
}

export function getIncidentTitle (incident) {
  let title = incident.title;
  switch (incident.type) {
  case 'Maintenance':
    title += ' (Truck #' + incident.vehicleId + ')';
    break;
  case 'Driver issue':
  case 'Accident':
    title += ' (Driver #' + incident.driverId + ')';
    break;
  }
  return title;
}


export const incidents = [
  {
    id: 1292,
    priority: 'Critical',
    type: 'Maintenance',
    status: 'Open',
    occurrenceDate: 'Apr 23, 2024', 
    dueDate: 'Apr 23, 2024',
    title: 'Tire rotation needed',
    driverId: 1922,
    vehicleId: 4396,
    level: 'State',
    description:'Tom called this one in.',
  },
  {
    id: 292,
    priority: 'High',
    type: 'Accident',
    status: 'Open',
    occurrenceDate: 'Apr 18, 2024', 
    dueDate: 'Apr 18, 2024',
    title: 'Broken taillight',
    driverId: 1923,
    vehicleId: 4385,
    level: 'State',
    description:'Mark called this one in.',
  },
  {
    id: 33828,
    priority: 'Medium',
    type: 'Driver issue',
    status: 'Open',
    occurrenceDate: 'May 2, 2024', 
    dueDate: 'Apr 18, 2024',
    title: 'Moving violation',
    driverId: 1924,
    vehicleId: 2348,
    level: 'State',
    description:'Sid called this one in.',
  },
  {
    id: 48482,
    priority: 'Medium',
    type: 'Driver issue',
    status: 'Open',
    occurrenceDate: 'Jan 14, 2024', 
    dueDate: 'Apr 18, 2024',
    title: 'Parking violation',
    driverId: 1925,
    vehicleId: 6354,
    level: 'State',
    description:'Joe reported this one.',
  },
  {
    id: 59382,
    priority: 'Low',
    type: 'Documents',
    status: 'Open',
    occurrenceDate: 'Jan 24, 2024', 
    dueDate: '--',
    title: 'Payment from Jese Leos',
    driverId: 5322,
    vehicleId: 4396,
    level: 'State',
    description:' ',
  },
  {
    id: 68292,
    priority: 'Low',
    type: 'Documents',
    status: 'Open',
    occurrenceDate: 'Jun 3, 2024', 
    dueDate: '--',
    title: 'Payment from Lana Bird',
    driverId: 1924,
    vehicleId: 5322,
    level: 'State',
    description:' ',
  },
  {
    id: 79182,
    priority: 'Low',
    type: 'Documents',
    status: 'Open',
    occurrenceDate: 'Jul 18, 2024', 
    dueDate: '--',
    title: 'Payment from THEMSBERG LLC', 
    driverId: 1924,
    vehicleId: 5331,
    level: 'State',
    description:' ',
  },
  {
    id: 81829,
    priority: 'Low',
    type: 'Documents',
    status: 'Open',
    occurrenceDate: 'Sep 9, 2024', 
    dueDate: '--',
    title: 'Payment from AB Trucking LLC',
    driverId: 1924,
    vehicleId: 9822,
    level: 'State',
    description:' ',
  },
  {
    id: 99928,
    priority: 'Low',
    type: 'Documents',
    status: 'Open',
    occurrenceDate: 'Dec 11, 2023', 
    dueDate: '--',
    title: 'Refund from CA Franchise Tax Board',
    driverId: 1924,
    vehicleId: 9282,
    level: 'State',
    description:' ',
  },
  {
    id: 10023,
    priority: 'Low',
    type: 'Documents',
    status: 'Open',
    occurrenceDate: 'Dec 12, 2023', 
    dueDate: '--',
    title: 'Payment from Fealty Realty Inc',
    driverId: 1924,
    vehicleId: 9283,
    level: 'State',
    description:' ',
  },
];

