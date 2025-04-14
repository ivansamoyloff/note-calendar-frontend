import { createStore } from 'zustand/vanilla';
import IUserState from '../interfaces/IUserState';

export const createUserStore = () => createStore<IUserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))