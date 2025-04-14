import { useField } from '../useField';
import type { TAppStore } from '../createAppStore';

type TExtractState<T> = T extends { getState: () => infer S } ? S : never;

type StoreAccessorConfig<TStoreKey extends keyof TAppStore> = {
  storeKey: TStoreKey;
  fallback: {
    [K in keyof TExtractState<TAppStore[TStoreKey]>]: TExtractState<TAppStore[TStoreKey]>[K];
  };
};

type TConfigMap = {
  [alias: string]: StoreAccessorConfig<keyof TAppStore>;
};

type TAccessors<T extends TConfigMap> = {
  [K in keyof T]: <F extends keyof T[K]['fallback']>(
    key: F
  ) => T[K]['fallback'][F];
};

export function createStoreAccessors<T extends TConfigMap>(config: T): TAccessors<T> {
  const result = {} as TAccessors<T>;

  (Object.entries(config) as {
    [K in keyof T]: [K, T[K]];
  }[keyof T][]).forEach(([alias, { storeKey, fallback }]) => {
    result[alias] = (<F extends keyof typeof fallback>(
      key: F
    ): typeof fallback[F] => {
      return useField(storeKey, fallback)(key);
    }) as TAccessors<T>[typeof alias];
  });

  return result;
}

