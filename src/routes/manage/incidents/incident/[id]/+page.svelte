<script lang="ts">
 import { Badge, Button, Card,  Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, FileSolid, FileImageSolid, CirclePlusSolid, 
        TruckSolid, BadgeCheckSolid, 
        UsersOutline,
        CalendarMonthOutline,
        ChevronLeftOutline, ChevronRightOutline, MapPinAltSolid } from 'flowbite-svelte-icons';

 import { DatePicker } from '@svelte-plugins/datepicker'
 import { format } from 'date-fns';

 import { page } from '$app/stores';
 import { Pagination, PaginationItem } from 'flowbite-svelte';
 import IncidentLayout from '$lib/components/IncidentLayout.svelte';

 let startDate = new Date('2024-08-31');
 let dateFormat = 'MM/dd/yy';
 let isOpen = false;
 const toggleDatePicker = () => (isOpen = !isOpen);

 const formatDate = (dateString) => {
   return dateString && format(new Date(dateString), dateFormat) || '';
 };

 let formattedStartDate = formatDate(startDate);

 const onChange = () => {
   startDate = new Date(formattedStartDate);
 };

 $: formattedStartDate = formatDate(startDate);

 $: id = parseInt($page.params.id); // get the page id from the url

 let incident = {
   id: $page.params.id,
   title: `Payment refund to #00910`,
   date: 'Jul 31, 2024',
   level: 'State',
   driver: 'Thomas Pascal',
   vehicle: 'Truck #4396',
   dueDate: 'Aug 31, 2024',
   description: 'We are working with Tom\'s repair shop here.  Mark is the point of contact and expect to complete the repair on time. Location details below...'
 };

 const incidents = [
   { id: 1292, title: 'Tire rotation for Truck #2348 CAW' },
   { id: 292, title: 'Payment refund to #00910' },
   { id: 33828, title: 'Broken taillight for Truck #4396' },
   { id: 48482, title: 'Payment from Lana Byrd' },
   { id: 59382, title: 'Payment from Jese Leos' },
   { id: 68292, title: 'Payment from THEMSBERG LLC' },
   { id: 79182, title: 'Payment from THEMSBERG LLC' },
   { id: 81829, title: 'Payment from THEMSBERG LLC' },
   { id: 99928, title: 'Payment from THEMSBERG LLC' },
   { id: 10023, title: 'Payment from THEMSBERG LLC' },
 ];
 
 let actions = [
   { name: "Call Tom's repair shop",    description: 'Schedule ...', date: 'Aug 31, 2024', type: 'Call'},
   { name: "Payment from... ",        description: 'Payment from ...', date: 'Aug 31, 2024', type: 'Onsite'},
   { name: "Payment from... ",        description: 'Payment from ...', date: 'Sep 15, 2024', type: 'Email'},
   { name: "Payment from... ",        description: 'Payment from ...', date: 'Sep 17, 2024', type: 'Call'},
   { name: "Payment from... ",        description: 'Payment from ...', date: 'Sep 19, 2024', type: 'Call'},
 ];

 let uploadedFiles = [
   { filename: "Document_name_incident_report",    date: 'Aug 31, 2024'},
   { filename: "Picture_of_the_issue.jpg",         date: 'Aug 31, 2024'},
 ];
 
 function getIncidentById (id) {
   for (let incident of incidents) {
     if(incident.id === id) {
       return incident;
     }
   }
   return null;
 }
 
 function getTypeColor(type) {
   switch (type.toLowerCase()) {
     case 'call':
       return 'blue';
     case 'email':
       return 'red';
     case 'onsite':
       return 'green';
     default:
       return 'gray';
   }
 }


 // boilerplate
 $: activeUrl = $page.url.searchParams.get('page');
 let pages = [
   { name: 1, href: '/components/pagination?page=1' },
   { name: 2, href: '/components/pagination?page=2' },
   { name: 3, href: '/components/pagination?page=3' },
 ];

 $: {
   pages.forEach((page) => {
     let splitUrl = page.href.split('?');
     let queryString = splitUrl.slice(1).join('?');
     const hrefParams = new URLSearchParams(queryString);
     let hrefValue = hrefParams.get('page');
     if (hrefValue === activeUrl) {
       page.active = true;
     } else {
       page.active = false;
     }
   });
   pages = pages;
 }

  let currentPage = 1; // Set this to your desired current page
  let totalPages = 10; // Set this to your total number of pages

  function previous() {
    if (currentPage > 1) currentPage--;
  }

  function next() {
    if (currentPage < totalPages) currentPage++;
  }

  function pageChange(event) {
    currentPage = event.detail;
  }
</script>

<style>
  input[type="text"] {
    border: 1px solid #e8e9ea;
    border-radius: 4px;
    padding: 8px;
    font-size:12px;
  }
</style>

<IncidentLayout>
  <div>
    <h1 class="text-gray-500 text-sm">Incident #{id}</h1>
    <h1 class="text-3xl font-bold mb-2">{getIncidentById(id).title}</h1>
  </div>

  <div class="flex justify-between items-center mb-0 ml-2">
    <h1 class="text-xl font-bold">History of Action Items</h1>
    <Button class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5"><CirclePlusSolid />&nbsp;&nbsp;Action Item</Button>
  </div>
  
  <div>
    <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
      <TableHead class="bg-gray-50 whitespace-nowrap">
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total drive time</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total miles driven</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each actions as action}
          <TableBodyRow>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{action.name}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{action.description}</TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{action.date}</TableBodyCell>
            <TableBodyCell>
              <Badge large rounded color={getTypeColor(action.type)} class="px-2 py-1.5 rounded rounded-[6px]">
                {action.type}
              </Badge>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
      <div class="w-full flex justify-start pr-4 ml-4 mt-2">
        <Pagination 
          bind:currentPage
          {totalPages}
          {pages} 
          on:previous={previous} 
          on:next={next} 
          on:pageChange={pageChange}
          icon
          large 
        >
          <svelte:fragment slot="prev">
            <span class="sr-only">Previous</span>
            <ChevronLeftOutline class="w-6 h-6" />
          </svelte:fragment>
          <svelte:fragment slot="next">
            <span class="sr-only">Next</span>
            <ChevronRightOutline class="w-6 h-6" />
          </svelte:fragment>
        </Pagination>
      </div>

    </Table>

    <h1 class="text-lg font-bold mb-4 mt-5">Uploaded Files</h1>

    <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
      <TableHead class="bg-gray-50 whitespace-nowrap">
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHeadCell>
        <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date added</TableHeadCell>
      </TableHead>
      <TableBody class="bg-white divide-y divide-gray-200">
        {#each uploadedFiles as uploadedFile}
          <TableBodyRow>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">
              <a href="#" >
                <div class="flex items-top">
                  {uploadedFile.filename} &nbsp;
                  <FileSolid />
                </div>
              </a>
            </TableBodyCell>
            <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-gray-600">{uploadedFile.date}</TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div slot="right-panel" class="p-4 space-y-4 bg-white border h-full">
    <div class="flex justify-between items-center mb-0 ml-2">
      <h2 class="text-xl font-bold text-gray-500 uppercase">details</h2>
      <p class="font-semibold text-gray-500">{incident.date}</p>
    </div>
    <div class="space-x-2">
      <Badge class="py-1"  color="green">Maintenance</Badge>
      <Badge class="py-1" color="red">Critical</Badge>
      <Badge class="py-1" color="blue">Open</Badge>
    </div>
    <div>
      <p class="mb-2"><span class="font-semibold">Level:</span><Badge class="ml-2 bg-gray-100"> {incident.level}</Badge></p>
      <p class="mb-2"><span class="font-semibold">Driver:</span><Badge class="ml-2 bg-gray-100"> <UsersOutline />{incident.driver}</Badge></p>
      <p class="mb-2"><span class="font-semibold">Vehicle:</span><Badge class="ml-2 bg-gray-100"><TruckSolid />{incident.vehicle}</Badge></p>
      <div class="flex justify-start items-middle mb-0">
        <div class="mt-4 font-semibold text-nowrap mr-2">Due date:</div>
        <DatePicker bind:isOpen bind:startDate>
          <input type="text" placeholder="Select date" bind:value={formattedStartDate} on:click={toggleDatePicker} />
        </DatePicker>
      </div>
    </div>
    <div>
      <h3>Description and notes</h3>
      <Card class="p-2 m-0 mt-2 divide-y shadow-none">
          <p class="text-sm">{incident.description}</p>
          <div class="flex justify-end items-center mt-2 pt-2 ml-2">
            <div class="pr-3"><MapPinAltSolid /></div>
            <div><FileImageSolid /></div>
          </div>
      </Card>
    </div>
    <Button class="w-full">Save Change</Button>
  </div>
</IncidentLayout>
