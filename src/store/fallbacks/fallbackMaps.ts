import type IModalState from '@/store/interfaces/IModalState';
import type IUserState  from '@/store/interfaces/IUserState';
import type ITaskState from '@/store/interfaces/ITaskState';
import type IEventState from '@/store/interfaces/IEventState';
import ISettingsState from '../interfaces/ISettingsState';

export const modalFallbacks:  { [K in keyof IModalState]: IModalState[K] } = {
  isOpen: false,
  content: null,
  openModal: () => {},
  closeModal: () => {},
};

export const userFallbacks: { [K in keyof IUserState]: IUserState[K] } = {
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  logout: () => {},
};

export const taskFallbacks: { [K in keyof ITaskState]: ITaskState[K] } = {
  tasks: [],
  setTasks: () => {},
  addTaskLocal: () => {},
  updateTaskLocal: () => {},
  removeTaskLocal: () => {},
  loadFromLocal: () => {},
  saveToLocal: () => {},
  addTaskToServer: async () => ({ success: false }),
  updateTaskOnServer: async () => ({ success: false }),
  removeTaskFromServer: async () => ({ success: false }),
  syncToServer: async () => ({ success: false }),
};

export const eventFallbacks: { [K in keyof IEventState]: IEventState[K] } = {
  events: [],
  setEvents: () => {},
  addEventLocal: () => {},
  updateEventLocal: () => {},
  removeEventLocal: () => {},
  loadFromLocal: () => {},
  saveToLocal: () => {},
  addEventToServer: async () => ({ success: false }),
  updateEventOnServer: async () => ({ success: false }),
  removeEventFromServer: async () => ({ success: false }),
  syncToServer: async () => ({ success: false }),
};

export const settingsFallbacks: { [K in keyof ISettingsState]: ISettingsState[K] } = {
  theme: 'system',
  setTheme: () => {},
}