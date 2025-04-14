import type IEvent from './IEvent';

export default interface IEventState {
  events: IEvent[];
  setEvents: (events: IEvent[]) => void;

  //Local-first
  addEventLocal: (event: IEvent) => void;
  updateEventLocal: (id: number, data: Partial<IEvent>) => void;
  removeEventLocal: (id: number) => void;
  loadFromLocal: () => void;
  saveToLocal: () => void;

  //API-first
  addEventToServer: (eventData: Omit<IEvent, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<{ success: boolean }>;
  updateEventOnServer: (id: number, data: Partial<IEvent>) => Promise<{ success: boolean }>;
  removeEventFromServer: (id: number) => Promise<{ success: boolean }>;

  //Sync
  syncToServer: (userId: number) => Promise<{ success: boolean }>;
}