<script lang="ts">
 import {  Pagination, PaginationItem, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

 import { FileSolid } from 'flowbite-svelte-icons';

 export let previouslyUploadedFiles = [
   { filename: "Document_name_incident_report",    date: 'Aug 31, 2024'},
   { filename: "Picture_of_the_issue.jpg",         date: 'Aug 31, 2024'},
 ];
</script>

<h1 class="text-lg font-bold mb-4 mt-5">Uploaded Files</h1>

<Table class="relative overflow-x-auto sm:rounded-lg mt-5 ml-0" hoverable>
  <TableHead class="bg-customGray/15 whitespace-nowrap">
    <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Name</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Date added</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each previouslyUploadedFiles as uploadedFile}
      <TableBodyRow>
        <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
          <a href="/" >
            <div class="flex items-top">
              {uploadedFile.filename} &nbsp;
              <FileSolid />
            </div>
          </a>
        </TableBodyCell>
        <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{uploadedFile.date}</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
