<script lang="ts">
 import { Modal, Button } from 'flowbite-svelte';
 import { ExclamationCircleOutline, DownloadSolid, } from 'flowbite-svelte-icons';
 import { modalStore, type ModalOptions } from '$lib/stores/modalStore';

 let isOpen: boolean = $state();
 let filePath: string = $state();

 modalStore.subscribe(state => {
   isOpen = state.modals.filePreview.isOpen;
   filePath = state.modals.filePreview.options?.filePath || null;  // Access filePath from options
 });

 function handleClose() {
   modalStore.close('filePreview');
 }

</script>

<Modal
  bind:open={isOpen} 
  size="xs" 
  outsideclose
  autoclose
  on:close={handleClose}
  class="w-[80%] h-[80vh] max-h-[80vh] drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)] mx-auto my-auto fixed inset-0 flex items-center justify-center"
  backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 flex items-center justify-center"
  bodyClass="p-4 m-2 mt-4 md:p-5 flex-1 h-full w-full"
>
  <div class="h-full w-full p-6">
    <div class="file-preview-container">
      {#if filePath !== undefined }
        <iframe id="file-preview" src="/files/{filePath}#toolbar=0&navpanes=0&scrollbar=0" class="w-full h-full"></iframe>
      {:else}
        <div class="italic text-customGray">Currently unavailable</div>
      {/if}
    </div>
    <div class="mt-2 flex cursor-pointer">
      <div>
        <DownloadSolid />
      </div>
      <div> 
        Download this file
      </div>
    </div>
  </div>
</Modal>

<style>
  .file-preview-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  #file-preview {
    width: 100%;
    height: 100%;
    border: 2px solid black;
  }
</style>
