// plugins/pinia-persisted.client.ts
import { defineNuxtPlugin } from '#app'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import type { Pinia } from 'pinia'
import localforage from './localforage'

export default defineNuxtPlugin(nuxtApp => {
    const pinia = nuxtApp.$pinia as Pinia

    const customStorage = {
        getItem: async (key: string) => await localforage.getItem(key),
        setItem: async (key: string, value: any) => await localforage.setItem(key, value),
        removeItem: async (key: string) => await localforage.removeItem(key),
    }

    pinia.use(
        createPersistedStatePlugin({
            storage: customStorage,
        })
    )
})
