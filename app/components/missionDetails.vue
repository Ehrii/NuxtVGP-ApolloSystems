<template>
    <div v-bind="props">
        <h1 class="text-2xl font-bold mb-6">Rocket Name: {{ rocketData?.rocket.name }}</h1>
        <p><strong>Description:</strong></p>
        <p class="mb-2 text-grey-darken-2">{{ rocketData.rocket?.description }}</p>

        <v-divider class="my-4" />

        <div class="d-flex flex-wrap flex-sm-row ga-4">
            <v-chip variant="tonal" class="mb-2" color="blue-darken-1">
                <strong>First Flight:</strong>&nbsp;{{ formatDate(rocketData?.rocket.first_flight) }}
            </v-chip>

            <v-chip variant="tonal" class="mb-2" color="blue-darken-2">
                <strong>Height:</strong>&nbsp;{{ rocketData?.rocket.height.meters }} meters
            </v-chip>

            <v-chip variant="tonal" class="mb-2" color="blue-darken-2">
                <strong>Diameter:</strong>&nbsp;{{ rocketData?.rocket.diameter.meters }} meters
            </v-chip>

            <v-chip variant="tonal" class="mb-2" color="blue-darken-2">
                <strong>Mass:</strong>&nbsp;{{ rocketData?.rocket.mass.kg }} kg
            </v-chip>

            <v-chip variant="tonal" class="mb-2" color="blue-darken-2">
                <strong>Stages:</strong>&nbsp;{{ rocketData?.rocket.stages }}
            </v-chip>
        </div>
    </div>

</template>

<script lang="ts" setup>
import type { RocketData } from '~/types/rocket';
const props = defineProps<{
    rocketData: RocketData
}>()
</script>