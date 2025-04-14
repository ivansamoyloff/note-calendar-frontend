import { createStore } from 'zustand/vanilla';
import ITaskState from '../interfaces/ITaskState';
import ITask from '../interfaces/ITask';

const LOCAL_STORAGE_KEY = 'note-calendar-tasks';

export const createTaskStore = () => 
  createStore<ITaskState>((set, get) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),

    addTaskLocal: (task) => {
      set({ tasks: [...get().tasks, task] })
    },
    updateTaskLocal: (id, data) => {
      set({
        tasks: get().tasks.map((t) => (t.id === id ? { ...t, ...data } : t))
      });
      get().saveToLocal();
    },
    removeTaskLocal: (id) => {
      set({ tasks: get().tasks.filter((t) => t.id !== id) });
      get().saveToLocal();
    },

    loadFromLocal: () => {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return;
      try {
        const parsed: ITask[] = JSON.parse(raw);
        set({ tasks: parsed });
      } catch (err) {
        console.error('Failed to parse local tasks: ', err);
      }
    },
    saveToLocal: () => {
      try {
        const tasks = get().tasks;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
      } catch (err) {
        console.error('Failed to save tasks to localStorage : ', err);
      }
    },

    addTaskToServer: async (taskData) => {
      try {
        const res = await fetch(`${process.env.API_GATEWAY}/api/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(taskData),
        });
        return { success: res.ok };
      } catch (err) {
        console.error('Create task failed: ', err);
        return { success: false };
      }
    },
    updateTaskOnServer: async (id, data) => {
      try {
        const res = await fetch(`${process.env.API_GATEWAY}/api/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data),
        });
        return { success: res.ok };
      } catch (err) {
        console.error('Update task failed: ', err);
        return { success: false };
      }
    },
    removeTaskFromServer: async (id) => {
      try {
        const res = await fetch(`${process.env.API_GATEWAY}/api/tasks/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        return { success: res.ok };
      } catch (err) {
        console.error('Update task failed: ', err);
        return { success: false };
      }
    },

    syncToServer: async (userId) => {
      const tasks = get().tasks;
      try {
        if (tasks.length === 0) {
          console.warn('Tasks list is empty. Nothing to sync');
          return { success: true };
        }

        for (const task of tasks) {
          const payload = {
            title: task.title,
            description: task.description,
            status: task.status,
            startDate: task.startDate,
            endDate: task.endDate,
            user: { connect: { id: userId } }
          };

          const res = await fetch(`${process.env.API_GATEWAY}/api/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            console.error(`Failed to sync task: ${task.title}`);
            return { success: false };
          }
        }

        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return { success: true };
      } catch (err) {
        console.error('Sync tasks to server failed: ', err);
        return { success: false };
      }
    },
  }));