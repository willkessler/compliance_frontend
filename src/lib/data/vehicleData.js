import { ClockSolid, ExclamationCircleSolid, ThumbsUpSolid } from 'flowbite-svelte-icons';
import { drivers } from '$lib/data/driverData';

export function getVehicleById (id) {
  for (let vehicle of vehicles) {
    if(vehicle.id === parseInt(id)) {
      return vehicle;
    }
  }
  return null;
}

export function getVehicleDriver (vehicleId) {
  for (let driver of drivers) {
    if (driver.vehicleId === parseInt(vehicleId)) {
      return driver;
    }
  }
  return null;
}

export function getVehicleTrips (vehicleId) {
  let legs = [];
  for (let vehicle of vehicles) {
    if (vehicle.id === parseInt(vehicleId)) {
      if (vehicle.trips !== undefined) {
        for (let trip of vehicle.trips) {
          for (let leg of trip.legs) {
            legs.push({ tripId: trip.id, ...leg});
          }
        }
      }
    }
  }
  return legs;
}

export function getVehicleDvir (vehicleId, tripId, legId, whichInsp) {
  let legs = [];
  for (let vehicle of vehicles) {
    if (vehicle.id === parseInt(vehicleId)) {
      if (vehicle.trips !== undefined) {
        for (let trip of vehicle.trips) {
          if (trip.id === parseInt(tripId)) {
            for (let leg of trip.legs) {
              if (leg.id === parseInt(legId)) {
                if (leg.dvir !== undefined) {
                  return leg.dvir[whichInsp];
                }
              }
            }
          }
        }
      }
    }
  }
  return null;
}

export const vehicles = [
  {
    id: 4396,
    name: "4396",
    acquisitionDate: 'Aug 29, 2024',
    operatingTime: "100h 52m",
    vin: '2345034948...',
    licensePlate: 'UDH3823',
    mileage: "75,743",
    milesLeftToEol: '100,823',
    timeLeftToEol: '2 years, 3 months',
    status: "Blocked",
    icon: ExclamationCircleSolid,
    city: 'San Anselmo',
    state: 'CA',
    description: 'This truck is a diesel vehicle that Eric puchased second-hand.',
    photo: '360_F_653378267_CEGxV4MvGGTTRpugGVgGzGJij2v0g0YF.jpg',
    trips: [
      {
        id: 193282,
        legs: [
          {
            id: 1,
            startDate: '9/11/24',
            endDate: '9/11/24',
            preTrip: 'XJ18YW_1',
            postTrip: 'XJ18YW_2',
            dvir: {
              pre: {
                authorName: 'Anthony Rolard',
                location: 'T-A truckstop, Santa Nella',
                duration: '1m 19s',
                trailerId: 'B341',
                odometer: '110,485',
                defects: [
                  'Dome light fail',
                  'Mill spec light on',
                ],
              },
              post: {
                authorName: 'Frank Novil',
                location: 'Pleasant Truckstop, Santa Rosa',
                duration: '2m 19s',
                trailerId: 'B341',
                odometer: '111,201',
                defects: [
                  'Rear brake light fail',
                  'Mill spec light on',
                ],
              },
            },
          },
          {
            id: 2,
            startDate: '9/12/24',
            endDate: '9/12/24',
            preTrip: 'XJ18YW_3',
            postTrip: 'XJ18YW_4',
          },
        ],
      },
      {
        id: 193283,
        legs: [
          {
            id: 1,
            startDate: '10/01/24',
            endDate: '10/01/24',
            preTrip: 'AUEHF_1',
            postTrip: 'AUEHF_2',
          },
          {
            id: 2,
            startDate: '10/01/24',
            endDate: '10/02/24',
            preTrip: 'AUEHF_3',
            postTrip: 'AUEHF_4',
          },
          {
            id: 3,
            startDate: '10/02/24',
            endDate: '10/03/24',
            preTrip: 'AUEHF_5',
            postTrip: 'AUEHF_6',
          },
        ],
      },
    ],
  },
  {
    id: 4385,
    name: "4385",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "97h 46m",
    vin: '8345034948...',
    licensePlate: 'AMR8233',
    mileage: "47,573", 
    milesLeftToEol: '80,283',
    timeLeftToEol: '1 years, 4 months',
    status: "In progress",
    icon: ClockSolid,
    city: 'San Leandro',
    state: 'CA',
    description: 'Truck bought new. Ready for rehaul in 2025.',
    photo: 'basic-white-modern-semi-trailer-truck-closeup-shot-135825237.webp',
    trips: [
      {
        id: 193288,
        legs: [
          {
            id: 1,
            startDate: '2/22/24',
            endDate: '2/23/24',
            preTrip: 'UWNDFU_1',
            postTrip: 'UWNDFU_2',
          },
        ],
      },
    ],
  },
  {
    id: 2348,
    name: "2348",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "89h 02m",
    vin: '9284434948...',
    licensePlate: 'XYE8211',
    mileage: "83,543",
    milesLeftToEol: '500,238',
    timeLeftToEol: '5 years, 9 months',
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Austin',
    state: 'TX',
    description: 'Daimler-Benz warranty issue.',
    photo: 'basic-white-modern-semi-trailer-truck-front-view-basic-white-modern-semi-trailer-truck-front-view-135825234.webp',
  },
  {
    id: 6354,
    name: "6354",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "110h 33m",
    vin: '1115034948...',
    licensePlate: '9FGH2022',
    mileage: "95,322",
    milesLeftToEol: '100,823',
    timeLeftToEol: '2 years, 3 months',
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Dallas',
    state: 'TX',
    description: 'Recently repainted and added tinted windows. Note, keep track of whether or not driver is penalized for the tint.',
    photo: 'new-red-semi-truck-ready-to-go-to-work-CPPEAA.jpg',
  },  
  {
    id: 5322,
    name: "5322",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "10h 02m",
    vin: '9985034948...',
    licensePlate: '2EU84822',
    mileage: "7,433",
    milesLeftToEol: '100,823',
    timeLeftToEol: '2 years, 3 months',
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Los Angeles',
    state: 'CA',
    description: 'Purchased pre-owned from Mike\s shop.',
    photo: 'red-truck-2986654.webp',
  },  
  {
    id: 5323,
    name: "5323",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "50h 55m",
    vin: '2348984948...',
    licensePlate: '3FG84822',
    mileage: "28,009",
    milesLeftToEol: '100,823',
    timeLeftToEol: '2 years, 3 months',
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'San Diego',
    state: 'CA',
    description: 'Purchased new from dealership. Pending rebate.',
    photo: 'semitrailer-truck-isolated-front-view-260nw-1490601317.webp',
  },  
  {
    id: 5331,
    name: "5331",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "10h 52m",
    vin: '2345039298...',
    licensePlate: '8YY29392',
    mileage: "1,431",
    milesLeftToEol: '100,823',
    timeLeftToEol: '2 years, 3 months',
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'San Bernadino',
    state: 'CA',
    description: 'Needs overhaul.',
  },  
  {
    id: 9822,
    name: "9822",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "70h 12m",
    vin: '1398034948...',
    licensePlate: '9AAFJ298',
    mileage: "7,743",
    milesLeftToEol: '100,823',
    timeLeftToEol: '2 years, 3 months',
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Santa Monica',
    state: 'CA',
    description: 'New tires, annual check completed, looking good as of July 31, 2024.',
  },  
  {
    id: 9282,
    name: "9282",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "1,040h 14m",
    vin: '2347778947...',
    licensePlate: '6TRARUE',
    mileage: "115,098",
    milesLeftToEol: '100,823',
    timeLeftToEol: '2 years, 3 months',
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Oxnard',
    state: 'CA',
    description: 'This truck is a diesel vehicle that Eric puchased second-hand.',
  },  
  {
    id: 9283,
    name: "9283",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "1,382h 49m",
    vin: '8982232323...',
    licensePlate: '7YRTY32',
    mileage: "153,887",
    milesLeftToEol: '100,823',
    timeLeftToEol: '2 years, 3 months',
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Houston',
    state: 'TX',
    description: 'This truck is a diesel vehicle that Eric puchased second-hand.',
  },
  {
    id: 9311,
    name: "9311",
    acquisitionDate: 'July 31, 2024',
    operatingTime: "1,929h 49m",
    vin: '9298032323...',
    licensePlate: '7YRTY98',
    mileage: "51,887",
    milesLeftToEol: '200,923',
    timeLeftToEol: '1 years, 4 months',
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Austin',
    state: 'TX',
    description: 'This truck is a sleek diesel vehicle.',
  },
];
