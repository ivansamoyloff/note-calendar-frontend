import { createStore } from 'zustand/vanilla';
import type IEvent from '../interfaces/IEvent';
import type IEventState from '../interfaces/IEventState';

const LOCAL_STORAGE_KEY = 'note-calendar-events';

export const createEventStore = () =>
  createStore<IEventState>((set, get) => ({
    events: [],
    setEvents: (events) => set({ events }),

    addEventLocal: (event) => {
      set({ events: [...get().events, event] });
    },
    updateEventLocal: (id, data) => {
      set({
        events: get().events.map((e) => (e.id === id ? { ...e, ...data } : e)),
      });
      get().saveToLocal();
    },
    removeEventLocal: (id) => {
      set({ events: get().events.filter((e) => e.id !== id) });
      get().saveToLocal();
    },

    loadFromLocal: () => {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return;
      try {
        const parsed: IEvent[] = JSON.parse(raw);
        set({ events: parsed });
      } catch (err) {
        console.error('Failed to parse local events: ', err);
      }
    },
    saveToLocal: () => {
      try {
        const events = get().events;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
      } catch (err) {
        console.error('Failed to save events to localStorage : ', err);
      }
    },

    addEventToServer: async (eventData) => {
      try {
        const res = await fetch(`${process.env.API_GATEWAY}/api/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(eventData),
        });
        return { success: res.ok };
      } catch (err) {
        console.error('Create event failed: ', err);
        return { success: false };
      }
    },
    updateEventOnServer: async (id, data) => {
      try {
        const res = await fetch(`${process.env.API_GATEWAY}/api/events/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data),
        });
        return { success: res.ok };
      } catch (err) {
        console.error('Update event failed: ', err);
        return { success: false };
      }
    },
    removeEventFromServer: async (id) => {
      try {
        const res = await fetch(`${process.env.API_GATEWAY}/api/events/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        return { success: res.ok };
      } catch (err) {
        console.error('Delete event failed: ', err);
        return { success: false };
      }
    },

    syncToServer: async (userId) => {
      const events = get().events;
      try {
        if (events.length === 0) {
          console.warn('Events list is empty. Nothing to sync');
          return { success: true };
        }

        for (const event of events) {
          const payload = {
            title: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            meetLink: event.meetLink,
            location: event.location,
            user: { connect: { id: userId } },
          };

          const res = await fetch(`${process.env.API_GATEWAY}/api/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            console.error(`Failed to sync event: ${event.title}`);
            return { success: false };
          }
        }

        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return { success: true };
      } catch (err) {
        console.error('Sync events to server failed: ', err);
        return { success: false };
      }
    },
  }));