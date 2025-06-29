import { defineStore } from 'pinia'
import localforage from 'localforage'
import type { RocketData } from '~/types/rocket'



export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: [] as RocketData['rocket'][],
    }),

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
    persist: {
        storage: localforage,
        paths: ['favorites'],
    },
})
