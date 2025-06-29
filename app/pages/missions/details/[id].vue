<template>
    <v-container class="pb-10 mt-10 bg-grey-lighten-5 rounded elevation-3">
        <v-row align="center" justify="space-between" class="pa-4">
            <v-btn class="text-none my-5" color="#1E88E5" prepend-icon="mdi-arrow-left" size="large" variant="flat"
                :to="{ name: 'index' }">
                Go Back
            </v-btn>
            <v-btn class="text-none my-5" :color="favorites.isFavorite(missionId) ? 'pink-darken-1' : '#FFCDD2'"
                prepend-icon="mdi-heart-circle-outline" size="large" variant="flat" @click="toggleFavorite">
                {{ favorites.isFavorite(missionId) ? 'Added to Favorites' : 'Favorite' }}
            </v-btn>
        </v-row>

        <div v-if="!rocketData">Loading rocket...</div>
        <div v-else-if="rocketError">Error: {{ rocketError?.message }}</div>
        <div v-else class="mt-5">
            <MissionDetails :rocketData="rocketData" />
        </div>
    </v-container>

    <v-container height="900"
        class="pa-0 mt-10 bg-grey-lighten-5 rounded elevation-3 d-flex flex-column flex-md-row ga-2 ga-md-2">
        <div class="w-100 h-100 w-h-50 w-md-50" style="height: 300px; height: 100%;">
            <iframe :src="rocketData?.rocket?.wikipedia" width="100%" height="100%" class="elevation-3"
                style="border: none;"></iframe>
        </div>
        <!-- Timeline wrapper -->
        <div class="w-100 h-100 w-md-50 pa-5" style="height: 100%; overflow-y: auto;">
            <v-alert type="info" class="bg-blue-darken-2" style="font-size: 1.2rem;">
                {{ rocketData?.rocket?.name }} Mission History
            </v-alert>
            <template v-if="missionHistoryData?.histories">
                <MissionTimeline :missionHistoryData="missionHistoryData" />
            </template>
            <template v-else>
                <v-alert type="error" class="mt-5">
                    No mission history available for this rocket.
                </v-alert>
            </template>
        </div>
    </v-container>

    <div class="justify-center text-center mt-5">
        <v-chip variant="tonal" class="my-5 elevation-4" color="blue-darken-2">
            <v-icon>
                mdi-rocket
            </v-icon><strong>Learn More About this Rocket:</strong>&nbsp;{{
                rocketData?.rocket?.wikipedia }}
        </v-chip>
    </div>
</template>


<script lang="ts" setup>
import { useAsyncQuery, gql } from '#imports'
import type { MissionHistoryData, MissionRocket, RocketData } from '~/types/rocket'


const route = useRoute()
const missionId = route.params.id as string
const { getLaunchById } = getRocketDetails()
const { getMissionHistoryById } = getMissionHistory()

const { data: rocketData, error: rocketError } = await useAsyncQuery<RocketData>(getLaunchById, {
    id: missionId,
})


const { data: missionHistoryData, error: missionHistoryDataError } = await useAsyncQuery<MissionHistoryData>(getMissionHistoryById, {
    find: { id: missionId },
})


watchEffect(() => {
    console.log('missionHistoryData:', missionHistoryData?.value)
})

import { useFavoritesStore } from '~/stores/addFavorites'
import MissionDetails from '~/components/missionDetails.vue'

const favorites = useFavoritesStore()

const toggleFavorite = () => {
    const rocket = rocketData.value?.rocket
    if (rocket) {
        favorites.toggleFavorite(rocket)
    }
}
</script>