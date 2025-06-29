<template>
    <!-- Back button to return to the index page and a button to remove favorites -->
    <v-btn class="text-none my-5" color="#1E88E5" prepend-icon="mdi-arrow-left" size="large" variant="flat"
        :to="{ name: 'index' }">
        Go Back
    </v-btn>
    <!-- Favorite list page where users can view and manage their saved favorite missions. It displays a list of favorite missions with options to view details or delete them from favorites. -->
    <v-card class="mx-auto">
        <v-list lines="two">
            <v-list-item-title class="ml-4 font-weight-bold text-blue-darken-2" color=""
                style="font-size: 1.8rem;">Saved Favorites</v-list-item-title>
            <template v-if="favorites.favorites.length">
                <v-list-item v-for="(item) in favorites.favorites" :key="item.id" :title="`${item.name}`">
                    <template #prepend>
                        <v-avatar size="80" class="elevation-4 me-4">
                            <img src="public/images/bg.jpg" style="object-fit: cover;" width="100%" height="100%" />
                        </v-avatar>
                    </template>
                    <template v-slot:subtitle>
                        <div>
                            <div class="d-flex flex-column flex-md-row justify-space-between ga-4 align-start">
                                <div class="me-4">
                                    <span>{{ item.description }}</span><br>
                                </div>
                                <div class="d-flex flex-column ga-4 mb-4">
                                    <v-btn variant="flat" color="blue-darken-4 elevation-2" block
                                        :to="{ name: 'missions-details-id', params: { id: item?.id } }">
                                        View
                                    </v-btn>
                                    <v-btn variant="flat" color="red-darken-4" elevation="2"
                                        @click="removeFromFavorites(item.id)">
                                        Delete
                                    </v-btn>
                                </div>
                            </div>
                            <v-divider></v-divider>
                        </div>
                    </template>
                </v-list-item>
            </template>
            <!-- When there's no favorites, display a message indicating that there are no favorites saved. -->
            <template v-else>
                <v-list-item class="text-center">
                    <v-list-item-title class="font-weight-regular text-blue-darken-2" style="font-size: 1.2rem;">No
                        Favorites Found
                        <v-icon>
                            mdi-emoticon-sad-outline
                        </v-icon>
                    </v-list-item-title>
                </v-list-item>
            </template>
        </v-list>
    </v-card>
</template>

<script setup lang="ts">
// Import necessary modules and components
import { useFavoritesStore } from '~/stores/addFavorites'
const favorites = useFavoritesStore()
const removeFromFavorites = useFavoritesStore().removeFavorite


// Load favorites from IndexedDB when the component is mounted
onMounted(() => {
    favorites.loadFromIndexedDB()
})
</script>
