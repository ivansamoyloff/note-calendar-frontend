import { createStore } from 'zustand/vanilla';
import ISettingsState from '../interfaces/ISettingsState';

export const createSettingsStore = () => 
  createStore<ISettingsState>((set) => ({
    theme: 'system',
    setTheme: (theme) => set({ theme }),
  }));