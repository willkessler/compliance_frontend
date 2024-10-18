<script lang="ts">
  import { Modal, Button } from 'flowbite-svelte';
  import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
  import { modalStore, type ModalOptions } from '$lib/stores/modalStore';

  let isOpen: boolean;
  let options: ModalOptions | null;

  modalStore.subscribe(state => {
    isOpen = state.isOpen;
    options = state.options;
  });

  function handleConfirm() {
    if (options?.onConfirm) {
      options.onConfirm();
    }
    modalStore.close();
  }

  function handleClose() {
    modalStore.close();
  }

 function handleModalClose(event: CustomEvent<boolean>) {
   if (!event.detail) {
     modalStore.close();
   }
 }

</script>

<Modal
  bind:open={isOpen} 
  size="xs" 
  outsideclose
  autoclose
  on:close={handleModalClose}
>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{options?.message || 'Are you sure?'}</h3>
    {#if options.isConfirm}
      <Button on:click={handleConfirm} color="blue" class="me-2">Confirm</Button>
      <Button on:click={handleClose} color="alternative">Cancel</Button>
    {:else}
      <Button on:click={handleClose} color="blue">OK</Button>
    {/if}
  </div>
</Modal>
