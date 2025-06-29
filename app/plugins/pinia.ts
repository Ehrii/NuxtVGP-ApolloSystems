// plugins/pinia-persisted.client.ts

import { defineNuxtPlugin } from '#app'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import type { Pinia } from 'pinia'
import localforage from '../plugins/localforage.client'

// Nuxt plugin to use pinia-plugin-persistedstate-2 with localforage for state persistence
export default defineNuxtPlugin(nuxtApp => {

    // Pinia instance is available in the nuxtApp context
    const pinia = nuxtApp.$pinia as Pinia

    // Define a custom storage object for localforage
    // This object implements the methods required by pinia-plugin-persistedstate-2
    const customStorage = {
        getItem: async (key: string) => await localforage.getItem(key),
        setItem: async (key: string, value: any) => await localforage.setItem(key, value),
        removeItem: async (key: string) => await localforage.removeItem(key),
    }

    // Register the persisted state plugin with the custom storage
    pinia.use(
        createPersistedStatePlugin({
            storage: customStorage,
        })
    )
})
