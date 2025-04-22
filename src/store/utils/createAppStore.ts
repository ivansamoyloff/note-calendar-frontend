import { createModalStore } from '../stores/modalStore';
import { createUserStore } from '../stores/userStore';
import { createTaskStore } from '../stores/taskStore';
import { createEventStore } from '../stores/eventStore';
import { createSettingsStore } from '../stores/settingsStore';

export function createAppStore() {
  return {
    settingsStore: createSettingsStore(),
    modalStore: createModalStore(),
    userStore: createUserStore(),
    taskStore: createTaskStore(),
    eventStore: createEventStore(),
  };
};

export type TAppStore = ReturnType<typeof createAppStore>;