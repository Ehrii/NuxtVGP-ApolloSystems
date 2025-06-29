<template>
     <!-- Vue component that shows timeline of mission history using Vuetify's timeline component. It displays each history item with a title, details, date, and an optional article link. -->
    <v-timeline align="start">
        <v-timeline-item v-for="(item, i) in missionHistoryData?.histories || []" :key="i" dot-color="primary"
            icon="mdi-rocket-launch" fill-dot :side="lgAndUp ? undefined : 'start'" v-bind="props">
            <v-card class="elevation-2" style="width: 100%; max-width: 350px;">
                <v-card-title class=" bg-primary text-white">
                    {{ item.title ?? 'Unavailble' }}
                </v-card-title>
                <v-card-text class="bg-white text--primary pa-md-4">
                    <medium class="text-grey-darken-2 d-block">
                        {{ item.details }}
                    </medium>
                    <medium class="text-grey d-block">
                        {{ formatDate(item.event_date_utc) }}
                    </medium>
                    <div class="mt-3" v-if="item.links?.article">
                        <v-btn :href="item.links.article" target="_blank" variant="outlined" color="primary">
                            Read Article
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-timeline-item>
    </v-timeline>
</template>

<script lang="ts" setup>
// Imports history types data to display mission history
import type { MissionHistoryData } from '~/types/rocket';
import { useDisplay } from 'vuetify'
const { lgAndUp } = useDisplay()

// Defines props to accept mission history data
const props = defineProps<{
    missionHistoryData: MissionHistoryData
}>();
</script>
