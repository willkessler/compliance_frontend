<script lang="ts">
 import { Badge, Button, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
 import { ClockSolid, FileSolid, ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
 import { page } from '$app/stores';
 import { Pagination, PaginationItem } from 'flowbite-svelte';

 console.log('Page store:', $page);
  $: id = parseInt($page.params.id); // get the page id from the url

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

<div class="p-4">
  <div class="flex justify-between items-top mb-6">
    <div>
      <div class="text-gray-500 text-sm">Incident #{id}</div>
      <h1 class="text-3xl font-bold mb-4">{getIncidentById(id).title}</h1>
      <h1 class="text-lg font-bold mb-4">History of Action Items</h1>

      <Table divClass="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable={true}>
        <TableHead class="bg-gray-50 whitespace-nowrap">
          <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHeadCell>
          <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total drive time</TableHeadCell>
          <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total miles driven</TableHeadCell>
          <TableHeadCell class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHeadCell>
        </TableHead>
        <TableBody class="bg-white divide-y divide-gray-200">
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
      <div class="w-full flex justify-end pr-4 mt-2">
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
    <div>
      <Button class="bg-blue-500 hover:bg-blue-600 text-white text-md p-3">+ Action Item</Button>
    </div>

  </div>
</div>
