import { ClockSolid, ExclamationCircleSolid, ThumbsUpSolid } from 'flowbite-svelte-icons';
// import { drivers } from '$lib/data/driverData';

export function getFileById (id) {
  for (let file of files) {
    if(file.id === parseInt(id)) {
      return file;
    }
  }
  return null;
}

// export function getFileeDriver (vehicleId) {
//   for (let driver of drivers) {
//     if (driver.vehicleId === parseInt(vehicleId)) {
//       return driver;
//     }
//   }
//   return null;
// }

export const userFiles = [
  {
    id: 4396,
    name: "Unified Carrier Registration (UCR)",
    acquisitionDate: 'Aug 29, 2024',
    category: "Federal",
    vin: '2345034948...',
    licensePlate: 'UDH3823',
    type: "pdf",
    status: "Blocked",
    icon: ExclamationCircleSolid,
    city: 'San Anselmo',
    state: 'CA',
    description: 'This truck is a diesel vehicle that Eric puchased second-hand.',
    photo: '360_F_653378267_CEGxV4MvGGTTRpugGVgGzGJij2v0g0YF.jpg',
  },
  {
    id: 4385,
    name: "BOC-3",
    category: "Federal",
    vin: '8345034948...',
    licensePlate: 'AMR8233',
    acquisitionDate: 'Aug 31, 2024',
    type: "pdf", 
    status: "In progress",
    icon: ClockSolid,
    city: 'San Leandro',
    state: 'CA',
    description: 'Truck bought new. Ready for rehaul in 2025.',
    photo: 'basic-white-modern-semi-trailer-truck-closeup-shot-135825237.webp',
  },
  {
    id: 2348,
    name: "MCS-150",
    acquisitionDate: 'Aug 31, 2024',
    category: "Federal",
    vin: '9284434948...',
    licensePlate: 'XYE8211',
    type: "pdf",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Austin',
    state: 'TX',
    description: 'Daimler-Benz warranty issue.',
    photo: 'basic-white-modern-semi-trailer-truck-front-view-basic-white-modern-semi-trailer-truck-front-view-135825234.webp',
  },
  {
    id: 6354,
    name: "US DOT renewal",
    acquisitionDate: 'Aug 31, 2024',
    category: "Federal",
    vin: '1115034948...',
    licensePlate: '9FGH2022',
    type: "pdf",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Dallas',
    state: 'TX',
    description: 'Cherry red paint, attracts CHP. Can we get this redone in white for crying out loud!',
    photo: 'new-red-semi-truck-ready-to-go-to-work-CPPEAA.jpg',
  },  
  {
    id: 5322,
    name: "Drug & Alcohol Test Results - Mark Antony",
    acquisitionDate: 'Aug 31, 2024',
    category: "Driver",
    vin: '9985034948...',
    licensePlate: '2EU84822',
    type: "pdf",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Los Angeles',
    state: 'CA',
    description: 'Built Ford tough. Dismal mpg.',
    photo: 'red-truck-2986654.webp',
  },  
  {
    id: 5323,
    name: "CDL Renewal - Steve Scharzmann",
    acquisitionDate: 'Aug 31, 2024',
    category: "Driver",
    vin: '2348984948...',
    licensePlate: '3FG84822',
    type: "image",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'San Diego',
    state: 'CA',
    description: 'Model A. My grandma drove this truck. Still chugging along, at 2mpg.',
    photo: 'semitrailer-truck-isolated-front-view-260nw-1490601317.webp',
  },  
  {
    id: 5331,
    name: "CA DOT Renewal",
    acquisitionDate: 'Aug 31, 2024',
    category: "State",
    vin: '2345039298...',
    licensePlate: '8YY29392',
    type: "pdf",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'San Bernadino',
    state: 'CA',
    description: 'Needs overhaul.',
  },  
  {
    id: 9822,
    name: "Driver License Renewal - Matt Lock",
    acquisitionDate: 'Aug 31, 2024',
    category: "Driver",
    vin: '1398034948...',
    licensePlate: '9AAFJ298',
    type: "image",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Santa Monica',
    state: 'CA',
    description: 'Fresh tires, fresh lube, looking good as of July 31, 2024.',
  },  
  {
    id: 9282,
    name: "International Registration Plan (IRP)",
    acquisitionDate: 'Aug 31, 2024',
    category: "State",
    vin: '2347778947...',
    licensePlate: '6TRARUE',
    type: "pdf",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Oxnard',
    state: 'CA',
    description: 'This truck is a diesel vehicle that Eric puchased second-hand.',
  },  
  {
    id: 9283,
    name: "International Fuel Tax Agreement (IFTA)",
    acquisitionDate: 'Aug 31, 2024',
    category: "State",
    vin: '8982232323...',
    licensePlate: '7YRTY32',
    type: "pdf",
    status: "Clear",
    icon: ThumbsUpSolid,
    city: 'Houston',
    state: 'TX',
    description: 'This truck is a diesel vehicle that Eric puchased second-hand.',
  },
];