import { TruckSolid, FileLinesOutline } from 'flowbite-svelte-icons';

// needs refactor to use id's as keyss vs stupid loop lookups, dumb AI code
export function getActivityById (id) {
  for (let activity of activities) {
    if(activity.id === id) {
      return activity;
    }
  }
  return null;
}

export function getActivityByCategory(category) {
  let filteredActivities;
  if (category.toLowerCase() === 'all types') {
    filteredActivities = activities;
  } else {
    filteredActivities = activities.filter((activity) => 
      activity.category.toLowerCase() == category.toLowerCase());
  }
  //console.log(category, JSON.stringify(filteredActivities,null,2));
  return filteredActivities;
}

export function getActivityIdForVehicleId (vehicleId) {
  for (let activity of activities) {
    if(activity.vehicleId === parseInt(vehicleId)) {
      //console.log(`returning ${activity.id}`);
      return activity.id;
    }
  }
  return null;
}

export function getOpenActivitiesForDriver(driverId) {
  return activities.filter((activity) =>
    activity.driverId === driverId && 
      activity.status.toLowerCase() === 'open');
}

export function getOpenActivitiesForVehicle(vehicleId) {
  return activities.filter((activity) =>
    activity.vehicleId === vehicleId &&
      activity.status.toLowerCase() === 'open');
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
    return 'pink';
  case 'medium':
    return 'blue';
  case 'low':
    return 'yellow';
  default:
    return 'gray';
  }
}

export function getActivityIcon (activity) {
  switch (activity.type) {
  case 'Driver Issue':
  case 'Maintenance':
    return TruckSolid;
  case 'Documents':
    return FileLinesOutline;
  }
  return FileLinesOutline;
}

export function getActivityTitle (activity) {
  let title = activity.title;
  switch (activity.type) {
  case 'Maintenance':
    title += ' (Truck #' + activity.vehicleId + ')';
    break;
  case 'Driver issue':
  case 'Accident':
    title += ' (Driver #' + activity.driverId + ')';
    break;
  }
  return title;
}

export function getOpenActivityCount() {
  let count = 0;
  for (let activity of activities) {
    count += (activity.status.toLowerCase() !== 'closed' ? 1 : 0);
  }
  return count;
}


export const activities = [
  {
    id: 1292,
    priority: 'Critical',
    type: 'Maintenance',
    category: 'Maintenance',
    status: 'Open',
    occurrenceDate: 'Apr 23, 2024', 
    dueDate: 'Dec 23, 2024',
    title: 'Tire rotation needed',
    driverId: 1922,
    vehicleId: 4396,
    level: 'State',
    description:'Thom called this one in after feeling some rear wobble on Highway 64.',
  },
  {
    id: 292,
    priority: 'High',
    type: 'Accident',
    category: 'Incidents',
    status: 'Open',
    occurrenceDate: 'Apr 18, 2024', 
    dueDate: 'Apr 18, 2024',
    title: 'Broken taillight',
    driverId: 1923,
    vehicleId: 4385,
    level: 'State',
    description:'Mark caught this during a routine pre-trip insp.',
  },
  {
    id: 33828,
    priority: 'Medium',
    type: 'Driver issue',
    category: 'Incidents',
    status: 'Open',
    occurrenceDate: 'May 2, 2024', 
    dueDate: 'Apr 18, 2024',
    title: 'Moving violation',
    driverId: 1924,
    vehicleId: 2348,
    level: 'State',
    description:'Sid got this on return after freight transfer from shipper X828.',
  },
  {
    id: 48482,
    priority: 'Medium',
    type: 'Driver issue',
    category: 'Incidents',
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
    category: 'Records',
    status: 'Closed',
    occurrenceDate: 'Jan 24, 2024', 
    dueDate: '--',
    title: 'License Renewal (Driver #1625)',
    driverId: 5322,
    vehicleId: 4396,
    level: 'State',
    description:' ',
  },
  {
    id: 68292,
    priority: 'Low',
    type: 'Documents',
    category: 'Records',
    status: 'Closed',
    occurrenceDate: 'Jun 3, 2024', 
    dueDate: '--',
    title: 'Registration Renewal (Truck #325)',
    driverId: 1924,
    vehicleId: 5322,
    level: 'State',
    description:' ',
  },
  {
    id: 79182,
    priority: 'Low',
    type: 'Documents',
    category: 'Records',
    status: 'Closed',
    occurrenceDate: 'Jul 18, 2024', 
    dueDate: '--',
    title: 'Registration Renewal (Truck #1952)', 
    driverId: 1924,
    vehicleId: 5331,
    level: 'State',
    description:' ',
  },
  {
    id: 81829,
    priority: 'Low',
    type: 'Documents',
    category: 'Records',
    status: 'Closed',
    occurrenceDate: 'Sep 9, 2024', 
    dueDate: '--',
    title: 'Parking Permit Renewal NZ',
    driverId: 1924,
    vehicleId: 9822,
    level: 'State',
    description:' ',
  },
  {
    id: 99928,
    priority: 'Low',
    type: 'Documents',
    category: 'Records',
    status: 'Closed',
    occurrenceDate: 'Dec 11, 2023', 
    dueDate: '--',
    title: 'CA Franchise Tax Board',
    driverId: 1924,
    vehicleId: 9282,
    level: 'State',
    description:' ',
  },
  {
    id: 10023,
    priority: 'Low',
    type: 'Documents',
    category: 'Records',
    status: 'Closed',
    occurrenceDate: 'Dec 12, 2023', 
    dueDate: '--',
    title: 'Garage Renewal Tacoma',
    driverId: 1924,
    vehicleId: 9283,
    level: 'State',
    description:' ',
  },
];
