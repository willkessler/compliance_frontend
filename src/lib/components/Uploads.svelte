<script lang="ts">
 import {  Pagination, PaginationItem, 
        Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

 import { FileSolid } from 'flowbite-svelte-icons';
 import { page } from '$app/stores';
 import { modalStore } from '$lib/stores/modalStore.ts';
 import FilePreviewModal from '$lib/components/FilePreviewModal.svelte';

 export let previouslyUploadedFiles = [
   { name: "Document_name_incident_report",    date: 'Aug 31, 2024'},
   { name: "Picture_of_the_issue.jpg",         date: 'Aug 31, 2024'},
 ];

 function handleFilePreviewClick( filePath: string) {
   modalStore.open('filePreview', {
     isConfirm:false,
     filePath: filePath,
   });
 }
 
</script>

<h1 class="text-lg font-bold mb-0 mt-5">Uploaded Files</h1>

<Table class="relative overflow-x-auto sm:rounded-lg ml-0" hoverable>
  <TableHead class="bg-customGray/15 whitespace-nowrap">
    <TableHeadCell class="px-2 py-3 text-xs font-medium text-customGray uppercase">Name</TableHeadCell>
    <TableHeadCell class="px-6 py-3 text-xs font-medium text-customGray uppercase">Date added</TableHeadCell>
  </TableHead>
  <TableBody>
    {#if previouslyUploadedFiles.length === 0 }
      <div class="p-4 italic">No files uploaded yet.</div>      
    {:else}
      {#each previouslyUploadedFiles as uploadedFile}
        <TableBodyRow>
          <TableBodyCell class="px-2 py-4 whitespace-nowrap text-sm font-large text-customGray">
            <a href={$page.url.pathname} >
              <div class="flex items-top gap-1">
                <div><FileSolid /></div>
                {#if uploadedFile.path !== undefined}
                  <div on:click={() => {handleFilePreviewClick(uploadedFile.path)} }>{uploadedFile.name}</div>
                {:else}
                  <div>{uploadedFile.name}</div>
                {/if}
              </div>
            </a>
          </TableBodyCell>
          <TableBodyCell class="px-6 py-4 whitespace-nowrap text-sm font-large text-customGray">{uploadedFile.date}</TableBodyCell>
        </TableBodyRow>
      {/each}
    {/if}
  </TableBody>
</Table>

<FilePreviewModal 
/>
