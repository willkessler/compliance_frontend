import { ClockSolid, ExclamationCircleSolid, ThumbsUpSolid } from 'flowbite-svelte-icons';

export const drivers = [
  {
    id: 1922,
    name: "Thomas Payne",
    startDate: 'Jan 1, 2024',
    endDate: 'Ongoing',
    license: '6NDW861',
    licenseExpiration: '02/31/2025',
    ssn: '616-55-5555',
    vehicleId: 4396,
    notes: 'Thomas left on 7/29/22 and came back again 01/01/24.',
    totalDriveTime: '265d 15h 24m',
    totalDriveTime: "42h 32m",
    totalMiles: "57,743",
    status: "Blocked",
    icon: ExclamationCircleSolid,
    photo: 'istockphoto-180806801-612x612.jpg',
  },
  {
    id: 4010,
    name: "Charlie Topanga",
    totalDriveTime: "19h 11m",
    startDate: 'Jan 1, 2023',
    endDate: 'Dec 31, 2023',
    license: '882XW82',
    licenseExpiration: '4/3/2025',
    ssn: '616-33-3828',
    notes: ' ',
    vehicleId: 9822,
    totalMiles: "83,743",
    status: "Blocked",
    icon: ExclamationCircleSolid,
  },
  {
    id: 1923,
    name: "Mark Ingram",
    startDate: 'Feb 14, 2023',
    endDate: 'Dec 31, 2023',
    license: '882XW82',
    licenseExpiration: '4/3/2025',
    ssn: '616-33-3828',
    vehicleId: 4385,
    notes: 'Mark is a solid driver, never reports in sick.',
    totalDriveTime: "221h 32m",
    totalMiles: "77,453",
    status: "In progress",
    icon: ClockSolid,
    photo: 'istockphoto-663353978-612x612.jpg',
  },
  {
    id: 1924,
    name: "Sid Sanger",
    startDate: 'Jun 15, 2022',
    endDate: 'Feb 7, 2023',
    license: '882XW82',
    licenseExpiration: '4/3/2025',
    ssn: '616-33-3828',
    vehicleId: 2348,
    notes: 'Dependable.',
    totalDriveTime: "89h 02m",
    totalMiles: "75,743",
    status: "Clear",
    icon: ThumbsUpSolid,
    photo: 'gettyimages-1072438654-612x612.jpg',
  },
  {
    id: 1925,
    name: "Joanne Jacob",
    startDate: 'May 11, 2024',
    endDate: 'Dec 31, 2024',
    license: '882XW82',
    licenseExpiration: '4/3/2025',
    ssn: '616-33-3828',
    vehicleId: 6354,
    notes: 'Joanne is new on our team with 5 years drive time.',
    totalDriveTime: "8h 22m",
    totalMiles: "7,743",
    status: "Clear",
    icon: ThumbsUpSolid,
    photo: 'cardani-baseball-cap-with-hair-for-chemo-short-page-blonde-3.jpg',
  },
  {
    id: 1926,
    name: "Joe Jasdeep",
    startDate: 'Jan 1, 2023',
    endDate: 'Dec 31, 2023',
    license: '882XW82',
    licenseExpiration: '4/3/2025',
    ssn: '616-33-3828',
    vehicleId: 5322,
    notes: ' ',
    totalDriveTime: "19h 12m",
    totalMiles: "95,437",
    status: "Clear",
    icon: ThumbsUpSolid,
    photo: '05onclothing_ss-slide-SOOU-superJumbo.jpg',
  },
  {
    id: 1927,
    name: "Derek Travis",
    startDate: 'Jan 1, 2023',
    endDate: 'Dec 31, 2023',
    license: '882XW82',
    licenseExpiration: '4/3/2025',
    ssn: '616-33-3828',
    vehicleId: 5323,
    notes: ' ',
    totalDriveTime: "85h 02m",
    totalMiles: "4,173",
    status: "Clear",
    icon: ThumbsUpSolid,
    photo: 'puzzled-middle-aged-man-with-a-goatee-wearing-a-baseball-cap-pointing-GT8BHH.jpg',
  },
  {
    id: 1928,
    name: "Alexie Seerman",
    startDate: 'Jan 1, 2023',
    endDate: 'Dec 31, 2023',
    license: '882XW82',
    licenseExpiration: '4/3/2025',
    ssn: '616-33-3828',
    vehicleId: 5331,
    notes: ' ',
    totalDriveTime: "66h 09m",
    totalMiles: "93,742",
    status: "Clear",
    icon: ThumbsUpSolid,
    photo: 'portrait-of-a-teenage-girl-wearing-a-baseball-cap-2C44948.jpg',
  },
  {
    id: 1930,
    name: "Cain Reed",
    startDate: 'Jan 1, 2023',
    endDate: 'Dec 31, 2023',
    license: '882XW82',
    licenseExpiration: '4/3/2025',
    ssn: '616-33-3828',
    notes: ' ',
    vehicleId: 4385,
    totalDriveTime: "121h 17m",
    totalMiles: "18,212",
    status: "Clear",
    icon: ThumbsUpSolid,
  },
  {
    id: 1931,
    name: "Marcus Miller",
    startDate: 'Jan 1, 2023',
    endDate: 'Dec 31, 2023',
    license: '882XW82',
    licenseExpiration: '4/3/2025',
    ssn: '616-33-3828',
    notes: ' ',
    vehicleId: 9282,
    totalDriveTime: "209h 57m",
    totalMiles: "15,283",
    status: "Clear",
    icon: ThumbsUpSolid,
  },
];

export function getDriverById (id) {
  for (let driver of drivers) {
    //console.log(`id: ${id}, driver.id: ${driver.id}`);
    if(driver.id === parseInt(id)) {
      return driver;
    }
  }
  return null;
}

export function injectDriverStatus(driver) {
  const driverStatuses = [
    'Driving',
    'Available',
    'Out of service',
    'Off duty',
    'On Break',
    'Other',
  ];
  const now = new Date();
  // const minute = now.getMinutes();
  // const choice = parseInt(minute % driverStatuses.length);
  const choice = driver.id % driverStatuses.length;
  const statusedDriver = { ... driver, drivingStatus:driverStatuses[choice] };
  return statusedDriver;
}

export function injectDriverBlockers(driver) {
  const driverWithBlockers = { ... driver, upgradedStatus: driver.status };
  if (driver.status.toLowerCase() === 'blocked') {
    driverWithBlockers.upgradedStatus = '2 Blockers';
  }    
  return driverWithBlockers;
}
