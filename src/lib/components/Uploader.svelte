<script lang="ts">
 import { Label } from 'flowbite-svelte';
 import { FileDrop } from 'svelte-droplet';

 export let uploadedFiles = [];
 
 function handleFiles(files: File[]) {
   uploadedFiles = [...uploadedFiles, ...files];
   for (const file of files) {
     console.log(file.name)
   }
 }

 function removeFile(index) {
   uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
 }

 function handleFileUpload(event) {
   const files = event.detail.files;
   uploadedFiles = [...uploadedFiles, ...files];
 }

</script>


<div>
  <Label class="mt-4">Upload any relevant files:</Label>
  <FileDrop {handleFiles} let:droppable>
    <div class="text-center border p-2 mt-2 mb-4 rounded">
      <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 48 48">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="mt-1 text-sm text-customGray">
        Click to upload or drag and drop
      </p>
      <p class="mt-1 text-xs text-customGray">
        Max. File Size: 30MB
      </p>
    </div>
  </FileDrop>
  {#if uploadedFiles.length > 0}
    <div class="mt-4">
      {#each uploadedFiles as file, index}
        <div class="flex items-center mt-2">
          <FileSolid class="text-customGray mr-2" />
          <span class="text-sm text-customGray">{file.name}</span>
          <button class="ml-auto text-red-500 hover:text-red-600" on:click={() => removeFile(index)}>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
