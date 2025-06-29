<!-- Vue component that displays detailed information about a rocket, including its name, description, first flight date, height, diameter, mass, and number of stages. It uses Vuetify components for styling and layout. -->
<template>
    <div v-bind="props">
        <h1 class="text-2xl font-bold mb-6">Rocket Name: {{ rocketData?.rocket.name }}</h1>
        <p><strong>Description:</strong></p>
        <p class="mb-2 text-grey-darken-2">{{ rocketData.rocket?.description }}</p>

        <v-divider class="my-4" />

        <div class="d-flex flex-wrap flex-sm-row ga-4">
            <v-chip variant="tonal" class="mb-2" color="blue-darken-1">
                <strong>First Flight:</strong>&nbsp;{{ formatDate(rocketData?.rocket.first_flight) ?? 'Date Unavailable'
                }}
            </v-chip>

            <v-chip variant="tonal" class="mb-2" color="blue-darken-2">
                <strong>Height:</strong>&nbsp;{{ rocketData?.rocket.height.meters ?? 'Height Unavailable' }} meters
            </v-chip>

            <v-chip variant="tonal" class="mb-2" color="blue-darken-2">
                <strong>Diameter:</strong>&nbsp;{{ rocketData?.rocket.diameter.meters ?? 'Diameter Unavailable' }}
                meters
            </v-chip>

            <v-chip variant="tonal" class="mb-2" color="blue-darken-2">
                <strong>Mass:</strong>&nbsp;{{ rocketData?.rocket.mass.kg ?? 'Mass Unavailable' }} kg
            </v-chip>

            <v-chip variant="tonal" class="mb-2" color="blue-darken-2">
                <strong>Stages:</strong>&nbsp;{{ rocketData?.rocket.stages ?? 'Stages Unavailable' }}
            </v-chip>
        </div>
    </div>

</template>

<script lang="ts" setup>
// imports RocketData from types/rocket
import type { RocketData } from '~/types/rocket';

// Defines props to accept rocket data
const props = defineProps<{
    rocketData: RocketData
}>()
</script>