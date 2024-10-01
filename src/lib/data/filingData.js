export function getStatusColor(status) {
  return (status === "Complete" ? 
          "bg-green-100 text-green-800" : (status === "Review details" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800")
         );
}

export function displayDueDate(filing) {
  const dueDate = new Date(filing.dueDate);
  const now = new Date();
  const differenceInDays = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
  const formattedDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  //console.log(`Due date: ${formattedDate}, Difference in days: ${differenceInDays}`);

  if (differenceInDays < 0) {
    return {
      text: `${Math.abs(differenceInDays)} days overdue`,
      color: 'red',
      show: true,
    }
  } else if (differenceInDays <= 30) {
    if (filing.status.toLowerCase() === 'complete') {
      return {
        show: false,
      }
    }
    
    return {
      text: `${differenceInDays} days left`,
      color: 'yellow',
      show: true,
    }
  } else {
    return {
      show: false,
    }
  }
}

export function getReviewCounts(kind) {
  if (kind !== 'federal' && kind !== 'state') {
    return 0;
  }
  let count = 0;
  for (let filing of filings[kind].main) {
    if (filing.status.toLowerCase() !== 'complete') {
      count++;
    }
  }
  return count;
}

export function getSoonestDaysRemaining(item) {
  if (item.type !== 'federal' && item.type !== 'state') {
    return -1;
  }
  let minDiff = 1000000, differenceInDays;
  const now = new Date();
  for (let filing of filings[item.type].main) {
    const dueDate = new Date(filing.dueDate);
    differenceInDays = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
    minDiff = differenceInDays < minDiff ? differenceInDays : minDiff;
  }
  return minDiff;
}

export const filings = {
  federal: {
    main: [
      { name: "Unified Carrier Registration (UCR)", dueDate: "Oct 24, 2024", status: "Incomplete" },
      { name: "BOC-3", dueDate: "Oct 15, 2024", status: "Review details" },
      { name: "MCS-150", dueDate: "Sep 9, 2025", status: "Complete" },
      { name: "US DOT renewal", dueDate: "Oct 13, 2024", status: "Complete" },
      { name: "IRS Form 2290", dueDate: "Jun 30, 2025", status: "Complete" },
    ],
    historical: [
      { type: "BOC-3", date: "Aug 31, 2023", filename: 'BOC-3Form.pdf' },
      { type: "Unified Carrier Registration (UCR)", date: "May 22, 2023", filename: 'UCR-2Form.pdf' },
      { type: "MCS-150", date: "Jan 2, 2024", filename: 'MCS-150Form.pdf' },
      { type: "EIN registration", date: "Dec 13, 2023", filename: "MCS-150Form.pdf" },
    ],
  },
  state: {
    main: [
      { name: "International Fuel Tax Agreement (IFTA)", dueDate: "Oct 17, 2024", status: "Incomplete" },
      { name: "International Registration Plan (IRP)", dueDate: "Oct 1, 2024", status: "Incomplete" },
      { name: "Heavy Highway Vehicle Use Tax (HVUT)", dueDate: "Oct 31, 2024", status: "Review details" },
      { name: "CA MCP renewal", dueDate: "Jan 31, 2025", status: "Review details" },
      { name: "CA DOT renewal", dueDate: "Dec 31, 2024", status: "Complete" },
      { name: "TX DOT renewal", dueDate: "Dec 31, 2024", status: "Complete" },
      { name: "NV DOT renewal", dueDate: "Dec 31, 2024", status: "Complete" },
      { name: "AZ DOT renewal", dueDate: "Dec 31, 2024", status: "Complete" },
      { name: "CARB", dueDate: "Oct 15, 2024", status: "Complete" },
    ],
    historical: [
      { type: "CA MCP renewal", date: "Mar 23, 2024" },
      { type: "Heavy Highway Vehicle Use Tax (HVUT)", date: "Aug 31, 2023" },
      { type: "CA DOT renewal", date: "Sep 14, 2024" },
      { type: "TX DOT renewal", date: "Sep 12, 2024" },
      { type: "NV DOT renewal", date: "Sep 12, 2024" },
      { type: "AZ DOT renewal", date: "Sep 10, 2024" },
    ]
  }
}

export const reviewItems = [
  { type: 'federal', name: "Federal Filings", openItems: getReviewCounts('federal'), url: '/manage/filings/federal' },
  { type: 'state',   name: "State Filings", openItems: getReviewCounts('state') , url: '/manage/filings/state' },
  { type: 'vehicles', name: "Vehicles", openItems: getReviewCounts('vehicles'), url: '/manage/fleet/vehicles' },
  { type: 'drivers', name: "Drivers", openItems: getReviewCounts('drivers'), url: '/manage/fleet/drivers' },
  { type: 'integrations', name: "Integrations", openItems: getReviewCounts('integrations'), url: '/manage/integrations' },
];
