<template>
    <v-card class="mx-auto transition-all duration-300" max-width="100%" :elevation="isHovering ? 12 : 2"
        v-bind="props">
        <v-img height="200px" src="/images/bg.jpg" cover></v-img>
        <v-card-title>
            <span class="font-bold">{{ launch.mission_name }}</span>
        </v-card-title>
        <v-card-subtitle>
            <v-col cols="12 pl-0" md="12">
                <v-row class="ga-2" dense>
                    <v-col cols="12" sm="auto">
                        <v-chip color="blue-darken-4" variant="outlined" class="text-truncate"
                            prepend-icon="mdi-calendar" style="max-width: 100%;">
                            {{ formatDate(launch.launch_date_utc) }}
                        </v-chip>
                    </v-col>

                    <v-col cols="12" sm="auto">
                        <v-chip :color="launch.launch_site?.site_name ? 'teal-darken-4' : 'red-darken-4'" variant="flat"
                            class="text-truncate" prepend-icon="mdi-rocket" style="max-width: 100%;">
                            {{ launch.launch_site?.site_name ?? 'Site Unavailable' }}
                        </v-chip>
                    </v-col>
                </v-row>
            </v-col>
        </v-card-subtitle>
        <v-card-actions>
            <v-row class="w-100 pa-6 pl-2" align="center" justify="space-between" dense>
                <v-col cols="12" sm="auto">
                    <v-btn prepend-icon="mdi-rocket-launch" class="bg-light-blue-darken-3 text-white" size="large" block
                        :to="{ name: 'missions-details-id', params: { id: launch.rocket?.rocket?.id } }">
                        View Mission
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="auto" class="text-sm-end text-center">
                    <v-btn :icon="expandedCardId === launch.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                        color="blue-lighten-4" variant="flat" @click="toggleCard(launch.id)" />
                </v-col>
            </v-row>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="expandedCardId === launch.id">
                <v-divider></v-divider>
                <v-card-text>
                    <strong>Details:</strong> <span class="font-weight-regular">{{
                        launch.details }}</span>
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>


<script setup lang="ts">
import type { Launch } from '~/types/rocket';

const props = defineProps<{
    launch: Launch
    isHovering: boolean | null
    hoverProps: Record<string, any>
    expandedCardId: string | null
    toggleCard: (id: string) => void
}>()
</script>