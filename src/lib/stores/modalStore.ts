// src/lib/stores/modalStore.ts
import { writable } from 'svelte/store';

export type ModalOptions = {
  title: string;
  message: string;
  onConfirm: () => void;
};

type ModalState = {
  isOpen: boolean;
  options: ModalOptions | null;
};

function createModalStore() {
  const { subscribe, set, update } = writable<ModalState>({
    isOpen: false,
    options: null,
  });

  return {
    subscribe,
    open: (options: ModalOptions) => update(store => ({ isOpen: true, options })),
    close: () => update(store => ({ ...store, isOpen: false })),
    reset: () => set({ isOpen: false, options: null }),
  };
}

export const modalStore = createModalStore();
