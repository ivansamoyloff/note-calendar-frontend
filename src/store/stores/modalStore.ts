import { createStore } from 'zustand/vanilla';
import IModalState from '@/store/interfaces/IModalState';

export const createModalStore = () =>
  createStore<IModalState>((set) => ({
    isOpen: false,
    content: null,
    openModal: (content) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: true, content: null }),
  }));

