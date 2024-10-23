// src/lib/stores/modalStore.ts
import { writable } from 'svelte/store';

// Define all possible modal IDs
export type ModalId = 'confirm' | 'filePreview';

// Base modal options
export type BaseModalOptions = {
  isConfirm: boolean;
};

// Specific modal options
export type ConfirmModalOptions = BaseModalOptions & {
  title: string;
  message: string;
  onConfirm: () => void;
};

export type FilePreviewModalOptions = BaseModalOptions & {
  filePath: string;
};

// Map modal IDs to their respective option types
export type ModalOptionsMap = {
  confirm: ConfirmModalOptions;
  filePreview: FilePreviewModalOptions;
};

// Type for a single modal's state
type ModalState = {
  isOpen: boolean;
  options: ModalOptionsMap[keyof ModalOptionsMap] | null;
};

// Type for the entire store state
type ModalStoreState = {
  modals: {
    [K in ModalId]: ModalState;
  };
};

function createModalStore() {
  // Initialize state with all possible modals
  const initialState: ModalStoreState = {
    modals: {
      confirm: { isOpen: false, options: null },
      filePreview: { isOpen: false, options: null }
    }
  };

  const { subscribe, set, update } = writable<ModalStoreState>(initialState);

  return {
    subscribe,
    // Ensure modalId and options match their respective types
    open: <K extends ModalId>(modalId: K, options: ModalOptionsMap[K]) => 
      update(store => ({
        ...store,
        modals: {
          ...store.modals,
          [modalId]: { isOpen: true, options }
        }
      })),
    close: (modalId: ModalId) => 
      update(store => ({
        ...store,
        modals: {
          ...store.modals,
          [modalId]: { ...store.modals[modalId], isOpen: false }
        }
      })),
    reset: () => set(initialState)
  };
}

export const modalStore = createModalStore();
