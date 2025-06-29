import { defineStore } from 'pinia'
import localforage from 'localforage'
import type { RocketData } from '~/types/rocket'


// Store to manage favorite rockets
// This store allows users to add/remove rockets from their favorites
// It uses localforage to persist favorites across sessions using IndexedDB
// The store provides actions to toggle favorites, check if a rocket is a favorite
export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: [] as RocketData['rocket'][],
    }),

    // actions to manage favorites 
    // - toggleFavorite: adds/removes a rocket from favorites
    // - isFavorite: checks if a rocket is in favorites
    // - loadFromIndexedDB: loads favorites from IndexedDB
    // - saveToIndexedDB: saves favorites to IndexedDB
    // - removeFavorite: removes a specific rocket from favorites and updates IndexedDB
    actions: {
        toggleFavorite(rocket: RocketData['rocket']) {
            const exists = this.favorites.find(fav => fav.id === rocket.id)
            if (exists) {
                this.favorites = this.favorites.filter(fav => fav.id !== rocket.id)
            } else {
                this.favorites.push(rocket)
            }
        },
        isFavorite(id: string): boolean {
            return this.favorites.some(fav => fav.id === id)
        },
        async loadFromIndexedDB() {
            const stored = await localforage.getItem<RocketData['rocket'][]>('favorites')
            if (Array.isArray(stored)) {
                this.favorites = stored
            }
        },
        
        async saveToIndexedDB() {
            await localforage.setItem('favorites', this.favorites)
        },

        async removeFavorite(id: string) {
            this.favorites = this.favorites.filter(fav => fav.id !== id)
            await this.saveToIndexedDB()
        }
    },
    // persist the favorites state to IndexedDB using localforage
    persist: {
        storage: localforage,
        paths: ['favorites'],
    },
})
