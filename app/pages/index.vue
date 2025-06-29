<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

body {
	font-family: 'Poppins', sans-serif;
}
</style>

<template>
	<section class="p-6 ">
		<v-col align="center" justify="center" class="mb-8 ml-6 ml-lg-10">
			<v-img :width="500" aspect-ratio="16/9" cover src="/images/spacexlogo.png"></v-img>
		</v-col>
		<v-carousel height="400" class="rounded-lg" show-arrows="hover" cycle hide-delimiter-background>
			<v-carousel-item v-for="(slide, i) in launchesUpcoming" :key="i">
				<v-sheet :color="colors[i % colors.length]" height="100%">
					<div class="position-relative" style="height: 100%; width: 100%;">
						<v-img :src="`/images/space${i + 1}.jpg`" height="100%" width="100%" cover
							style="opacity: 0.5;" />
						<div class="d-flex fill-height justify-center align-center position-absolute top-0 left-0 w-100 h-100"
							style="z-index: 1;">
							<div class="text-center text-white">
								<div class=" mb-4" style="font-size: 3rem; letter-spacing: 5px;">
									{{ slide.mission_name }}
								</div>
								<div class="mb-4" style="font-size:medium;">
									{{ formatDate(slide.launch_date_local) }}
								</div>
								<v-dialog max-width="500">
									<template v-slot:activator="{ props: activatorProps }">
										<v-btn target="_blank" color="blue-darken-4" class="text-white"
											v-bind="activatorProps">
											<v-icon left>mdi-rocket-launch</v-icon>&nbsp;
											View Mission Details
										</v-btn>
									</template>
									<template v-slot:default="{ isActive }">
										<v-card :title="`Mission Details - ${slide.mission_name}`" class="pa-4">
											<v-card-text>
												{{ slide.rocket.rocket.description }}
											</v-card-text>

											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
											</v-card-actions>
										</v-card>
									</template>
								</v-dialog>
							</div>
						</div>
					</div>
				</v-sheet>
			</v-carousel-item>
		</v-carousel>

		<v-col cols="12">
			<v-row align="center" justify="center" class="py-4">
				<v-divider class="w-full"></v-divider>
			</v-row>
		</v-col>

		<div v-if="loading">Loading...</div>
		<div v-else-if="error">Error: {{ error.message }}</div>
		<div v-else class="grid gap-4 bg-grey-lighten-4 pa-4 rounded-lg position-relative ">
			<v-row class="mb-4 px-md-6" align="center" justify="space-between" no-gutters>
				<v-col cols="12" md="4" class="pa-2">
					<v-text-field v-model="searchQuery" label="Search Missions" clearable
						prepend-inner-icon="mdi-magnify" variant="solo-filled" density="default"
						class="w-100  shadow-lg custom-text-field" />
				</v-col>
				<v-col cols="12" md="4" class="px-2 pb-6">
					<v-expansion-panels variant="accordion">
						<v-expansion-panel>
							<v-expansion-panel-title>
								<v-icon start>mdi-filter-variant</v-icon>
								Search Filters
							</v-expansion-panel-title>
							<v-expansion-panel-text>
								<v-row dense>
									<v-col cols="12" md="6">
										<v-select clearable chips label="Select a Year" :items="years"
											v-model="selectedYear" variant="outlined" density="compact" class="w-100" />
									</v-col>
									<v-col cols="12" md="6">
										<v-select v-model="sortOrder" :items="[
											{ title: 'Oldest First', value: 'asc' },
											{ title: 'Newest First', value: 'desc' }
										]" item-title="title" item-value="value" label="Sort Order" clearable chips variant="outlined"
											density="compact" class="w-100" />
									</v-col>
								</v-row>
							</v-expansion-panel-text>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-col>
			</v-row>

			<v-slide-y-transition>
				<v-row v-if="showCards" align="center" justify="center" dense>
					<template v-if="paginatedLaunches.length">
						<v-col v-for="launch in paginatedLaunches" :key="launch.id" cols="12" md="4"
							class="mb-4 pa-2 pa-md-10">
							<v-hover v-slot="{ isHovering, props }">
								<MissionCard :launch="launch" :expandedCardId="expandedCardId" :toggleCard="toggleCard"
									:isHovering="isHovering" :hoverProps="props" />
							</v-hover>
						</v-col>
					</template>
					<template v-else>
						<v-col cols="12">
							<v-card class="pa-6 text-center bg-grey-lighten-5 rounded-lg">
								<v-card-text class="text-grey-darken-1" style="font-size: 2.5rem;">
									🚀 No SpaceX missions found.
								</v-card-text>
							</v-card>
						</v-col>
					</template>
				</v-row>
			</v-slide-y-transition>
			<div class="text-center my-6">
				<v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right"
					prev-icon="mdi-menu-left" :total-visible="5" />
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
//imports packages
import { computed } from 'vue'
import { useLaunchFilter } from '~/composables/useLauncherFilter'
import { useFilterYears } from '~/composables/useFilterYears'
import type { GetLaunchesQuery, LaunchesUpcomingData } from '~/types/rocket'
import { useAsyncQuery, gql } from '#imports'

const showCards = ref(false)
const expandedCardId = ref<string | null>(null)


onMounted(() => {
	setTimeout(() => {
		showCards.value = true
	}), 400
}) // Add a delay to show the cards after the page loads, enhancing the user experience by preventing flickering or abrupt changes in the UI.


const toggleCard = (id: string) => {
	expandedCardId.value = expandedCardId.value === id ? null : id
}

const { selectedYear, sortOrder, searchQuery, filteredAndSortedLaunches, getLaunches } = useLaunchFilter()

const { data, error, pending: loading } = await useAsyncQuery<GetLaunchesQuery>(getLaunches)
// This imports the necessary composables for filtering and sorting launches, as well as the GraphQL query for fetching launches data.
// The GetLaunches query is a type/interface to retrieve the launches data from the SpaceX API.

const launches = computed(() => data.value?.launches ?? [])
// This retrieves the launches data from the GraphQL query and makes it reactive using Vue's computed property.

const finalLaunches = computed(() => filteredAndSortedLaunches(launches.value)) // This filters and sorts the launches based on the selected year and sort order.

const { years } = useFilterYears(() => finalLaunches.value) // used in v-for the option in the filters, where this populates the dropdown options dynamically from the available launch data.

// This is for pagination
const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(9)

const pageCount = computed(() => {
	return Math.ceil(finalLaunches.value.length / itemsPerPage.value)
})

const paginatedLaunches = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value
	return finalLaunches.value.slice(start, start + itemsPerPage.value)
})

const { getLaunchesUpcoming } = getUpcomingLaunches()


const { data: upcomingRockets, error: upcomingRocketsError } = await useAsyncQuery<LaunchesUpcomingData>(getLaunchesUpcoming, {
	limit: 5,
})

const launchesUpcoming = computed(() => upcomingRockets.value?.launchesUpcoming ?? [])


const colors = [
	'indigo',
	'warning',
	'pink darken-2',
	'red lighten-1',
	'deep-purple accent-4',
]
</script>
