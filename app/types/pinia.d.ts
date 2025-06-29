import 'pinia'
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'

// This file extends the Pinia store options to include a `persist` property.
declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean | PersistedStateOptions
  }
}
