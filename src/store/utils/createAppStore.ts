import { createModalStore } from '../stores/modalStore';
import { createUserStore } from '../stores/userStore';
import { createTaskStore } from '../stores/taskStore';
import { createEventStore } from '../stores/eventStore';

export function createAppStore() {
  return {
    modalStore: createModalStore(),
    userStore: createUserStore(),
    taskStore: createTaskStore(),
    eventStore: createEventStore(),
  };
};

export type TAppStore = ReturnType<typeof createAppStore>;