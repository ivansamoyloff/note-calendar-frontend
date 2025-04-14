'use client';

import { PropsWithChildren, createContext, useRef, useContext } from 'react';
import { TAppStore, createAppStore } from '@/store/utils/createAppStore';


export const StoreContext = createContext<TAppStore | null>(null);

export function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<TAppStore>(null);
  if (!storeRef.current) {
    storeRef.current = createAppStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

export function useAppStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useAppStore must be used inside <StoreProvider>');
  return ctx;
}
