import { useStore } from 'zustand';
import type { StoreApi } from 'zustand';

export function createSSRStoreHook<TStore extends object>(
  store: StoreApi<TStore>,
  fallbackMap: { [K in keyof TStore]: TStore[K] }
) {
  return function useStoreField<K extends keyof TStore>(key: K): TStore[K] {
    const value = useStore(store, (s) => s[key]);
    const isClient = typeof window !== 'undefined';
    return isClient ? value : fallbackMap[key];
  }
}