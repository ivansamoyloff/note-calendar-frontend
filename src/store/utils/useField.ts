import { useAppStore } from './contextProvider';
import { createSSRStoreHook } from './createSSRStoreHook';
import type { TAppStore } from './createAppStore';
import type { StoreApi } from 'zustand';

export function useField<TKey extends keyof TAppStore>(
  storeKey: TKey,
  fallbackMap: {
    [K in keyof ReturnType<TAppStore[TKey]['getState']>]: ReturnType<
      TAppStore[TKey]['getState']
    >[K];
  }
) {
  const store = useAppStore()[storeKey] as StoreApi<
    ReturnType<TAppStore[TKey]['getState']>
  >;

  return createSSRStoreHook(store, fallbackMap);
}