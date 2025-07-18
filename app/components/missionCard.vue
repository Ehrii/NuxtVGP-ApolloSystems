<template>
    <v-hover v-slot="{ isHovering, props }" open-delay="200">
        <!-- Mission card component that displays information about a SpaceX launch mission. -->
        <v-card class="mx-auto transition-all duration-300" :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 16 : 2" max-width="100%" v-bind="props">
            <v-img height="200px" src="/images/bg.webp" cover></v-img>
            <v-card-title>
                <span class="font-bold">{{ launch.mission_name }}</span>
            </v-card-title>
            <v-card-subtitle>
                <v-col cols="12 pl-0" md="12">
                    <v-row class="ga-2" dense>
                        <v-col cols="12" sm="auto">
                            <v-chip color="blue-darken-4" variant="outlined" class="text-truncate"
                                prepend-icon="mdi-calendar" style="max-width: 100%;">
                                {{ formatDate(launch.launch_date_utc) ?? 'Date Unavailable' }}
                            </v-chip>
                        </v-col>

                        <v-col cols="12" sm="auto">
                            <v-chip :color="launch.launch_site?.site_name ? 'teal-darken-4' : 'red-darken-4'"
                                variant="flat" class="text-truncate" prepend-icon="mdi-rocket" style="max-width: 100%;">
                                {{ launch.launch_site?.site_name ?? 'Site Unavailable' }}
                            </v-chip>
                        </v-col>
                    </v-row>
                </v-col>
            </v-card-subtitle>
            <v-card-actions>
                <v-row class="w-100 pa-6 pl-2" align="center" justify="space-between" dense>
                    <v-col cols="12" sm="auto">
                        <v-btn prepend-icon="mdi-rocket-launch" class="bg-light-blue-darken-3 text-white" size="large"
                            block :to="{ name: 'missions-details-id', params: { id: launch.rocket?.rocket?.id } }">
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
                        <span class="font-weight-bold">Details:</span> <span class="font-weight-regular">{{
                            launch.details ?? 'Details not Available' }}</span>
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </v-hover>

</template>


<script setup lang="ts">
// imports type launch 
import type { Launch } from '~/types/rocket';

// component define props to accept launch data, hover state, hover props, expanded card id, and toggle function
const props = defineProps<{
    launch: Launch
    expandedCardId: string | null
    toggleCard: (id: string) => void
}>()
</script>