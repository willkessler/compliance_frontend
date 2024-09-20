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

export const vehicles = [
  {
    id: 4396,
    name: "4396",
    acquisitionDate: 'Aug 29, 2024',
    operatingTime: "100h 52m",
    vin: '2345034948...',
    licensePlate: 'UDH3823',
    mileage: "75,743",
    status: "Blocked",
    icon: ExclamationCircleSolid,
    city: 'San Anselmo',
    state: 'CA',
    description: 'This truck is a diesel vehicle that Eric puchased second-hand.',
  },
  {
    id: 4385,
    name: "4385",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "97h 46m",
    vin: '8345034948...',
    licensePlate: 'AMR8233',
    mileage: "47,573", 
    status: "In progress",
    icon: ClockSolid,
    city: 'San Leandro',
    state: 'CA',
    description: 'Truck bought new. Ready for rehaul in 2025.',
  },
  {
    id: 2348,
    name: "2348",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "89h 02m",
    vin: '9284434948...',
    licensePlate: 'XYE8211',
    mileage: "83,543",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Austin',
    state: 'TX',
    description: 'Daimler-Benz warranty issue.',
  },
  {
    id: 6354,
    name: "6354",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "110h 33m",
    vin: '1115034948...',
    licensePlate: '9FGH2022',
    mileage: "95,322",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Dallas',
    state: 'TX',
    description: 'Cherry red paint, attracts CHP. Can we get this redone in white for crying out loud!',
  },  
  {
    id: 5322,
    name: "5322",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "10h 02m",
    vin: '9985034948...',
    licensePlate: '2EU84822',
    mileage: "7,433",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Los Angeles',
    state: 'CA',
    description: 'Built Ford tough. Dismal mpg.',
  },  
  {
    id: 5323,
    name: "5323",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "50h 55m",
    vin: '2348984948...',
    licensePlate: '3FG84822',
    mileage: "28,009",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'San Diego',
    state: 'CA',
    description: 'Model A. My grandma drove this truck. Still chugging along, at 2mpg.',
  },  
  {
    id: 5331,
    name: "5331",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "10h 52m",
    vin: '2345039298...',
    licensePlate: '8YY29392',
    mileage: "1,431",
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
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Santa Monica',
    state: 'CA',
    description: 'Fresh tires, fresh lube, looking good as of July 31, 2024.',
  },  
  {
    id: 9282,
    name: "9282",
    acquisitionDate: 'Aug 31, 2024',
    operatingTime: "1,040h 14m",
    vin: '2347778947...',
    licensePlate: '6TRARUE',
    mileage: "115,098",
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
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Houston',
    state: 'TX',
    description: 'This truck is a diesel vehicle that Eric puchased second-hand.',
  },
];
