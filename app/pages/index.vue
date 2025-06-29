<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

body {
	font-family: 'Poppins', sans-serif;
}
</style>

<template>
	<section class="p-6 ">
		<!-- This section displays the SpaceX logo and a loading indicator or error message if the data is still being fetched or if there was an error during the fetch. -->
		<v-col align="center" justify="center" class="mb-8 ml-6 ml-lg-10">
			<v-img :width="500" aspect-ratio="16/9" cover src="/images/spacexlogo.png"></v-img>
		</v-col>
		<v-progress-circular v-if="loading" indeterminate color="primary" size="40" class="my-4" />
		<v-alert v-else-if="upcomingRocketsError" type="error" variant="tonal" class="my-4" border="start" prominent>
			<v-icon start>mdi-alert-circle</v-icon>
			<strong>Error:</strong> {{ upcomingRocketsError.message }}
		</v-alert>
		<!-- This section displays a carousel of upcoming SpaceX launches if there are any upcoming launches available. If there are no upcoming launches, it will display a message indicating that there are no upcoming launches. -->
		<template v-else>
			<v-carousel height="400" class="rounded-lg" show-arrows="hover" cycle hide-delimiter-background>
				<v-carousel-item v-for="(slide, i) in launchesUpcoming" :key="i">
					<v-sheet :color="colors[i % colors.length]" height="100%">
						<div class="position-relative" style="height: 100%; width: 100%;">
							<v-img :src="`/images/space${i + 1}.jpg`" height="100%" width="100%" cover
								style="opacity: 0.5;" />
							<div class="position-absolute top-0  w-100 h-100"
								style="background-color: rgba(0, 0, 0, 0.1); z-index: 1;">
								<v-chip class="ma-4">
									<v-icon left>mdi-rocket</v-icon>
									Upcoming Launch - {{ slide.rocket.rocket_name }}
								</v-chip>
							</div>
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
		</template>

		<!-- This section displays the main content of the page, including a search bar, filter options, and a grid of SpaceX missions. It also includes pagination for navigating through the list of missions. -->
		<v-col cols="12" class="text-center">
			<v-col cols="12">
				<v-row align="center" justify="center" class="py-4">
					<v-divider class="w-full"></v-divider>
				</v-row>
			</v-col>
			<v-progress-circular v-if="loading" indeterminate color="primary" size="40" class="my-4" />
			<v-alert v-else-if="error" type="error" variant="tonal" class="my-4" border="start" prominent>
				<v-icon start>mdi-alert-circle</v-icon>
				<strong>Error:</strong> {{ error.message }}
			</v-alert>
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
												v-model="selectedYear" variant="outlined" density="compact"
												class="w-100" />
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
									<!-- The v-hover component is used to detect if the user is hovering over the card, allowing for dynamic styling or interactions based on hover state. -->
									<MissionCard :launch="launch" :expandedCardId="expandedCardId"
										:toggleCard="toggleCard" :isHovering="isHovering" :hoverProps="props" />
									<!-- The MissionCard component is used to display individual mission details, including the mission name, launch date, and other relevant information. It also includes a button to view more details about the mission. -->
								</v-hover>
							</v-col>
						</template>
						<!-- If there are no paginated launches, a message is displayed indicating that no SpaceX missions were found. -->
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
		</v-col>
	</section>
</template>

<script lang="ts" setup>
//imports packages
import { computed } from 'vue'
import { useLaunchFilter } from '~/composables/useLauncherFilter'
import { useFilterYears } from '~/composables/useFilterYears'
import type { GetLaunchesQuery, LaunchesUpcomingData } from '~/types/rocket'
import { useAsyncQuery, gql } from '#imports'


const colors = [
	'indigo',
	'warning',
	'pink darken-2',
	'red lighten-1',
	'deep-purple accent-4',
]
// colors array defines a set of colors that will be used for the carousel items, providing a visually appealing background for each slide.

const showCards = ref(false)
const expandedCardId = ref<string | null>(null)


// declaration of reactive variables using the `ref` function for the pagination functionality.
const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(9)


//object destructuring of the upcoming launches
const { getLaunchesUpcoming } = getUpcomingLaunches()
// object destructuring of the launch filter composable, which provides the necessary reactive properties and methods for filtering and sorting launches based on user input.


const { selectedYear, sortOrder, searchQuery, filteredAndSortedLaunches, getLaunches } = useLaunchFilter()


// destructuring assignment with aliasing (renaming) to fetch the launches data using the GraphQL query defined in the `getLaunches` function.
const { data, error, pending: loading } = await useAsyncQuery<GetLaunchesQuery>(getLaunches)


// destructuring assignment to fetch the upcoming launches data using the GraphQL query defined in the `getLaunchesUpcoming` function.
const { data: upcomingRockets, error: upcomingRocketsError } = await useAsyncQuery<LaunchesUpcomingData>(getLaunchesUpcoming, {
	limit: 5,
})


const launches = computed(() => data.value?.launches ?? [])
// this computed property retrieves the launches data from the `data` object, which is populated by the GraphQL query defined in the `getLaunches` function. If no launches are available, it defaults to an empty array.


const finalLaunches = computed(() => filteredAndSortedLaunches(launches.value))
// This computed property applies the filtering and sorting logic defined in the `useLaunchFilter` composable to the launches data, ensuring that the displayed launches match the user's search criteria and selected filters.


const { years } = useFilterYears(() => finalLaunches.value)
// This composable provides a list of unique years based on the filtered and sorted launches, allowing users to select a specific year for filtering.


const launchesUpcoming = computed(() => upcomingRockets.value?.launchesUpcoming ?? [])
// This computed property retrieves the upcoming launches data from the `upcomingRockets` object, which is populated by the GraphQL query defined in the `getLaunchesUpcoming` function. If no upcoming launches are available, it defaults to an empty array.


// Pagination logic
const pageCount = computed(() => {
	return Math.ceil(finalLaunches.value.length / itemsPerPage.value)
})


const paginatedLaunches = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value
	return finalLaunches.value.slice(start, start + itemsPerPage.value)
})
// the paginatged launches computed property calculates the current page of launches to be displayed based on the current page number and the number of items per page. It slices the final launches array to return only the launches for the current page.


// Add a delay to show the cards after the page loads, enhancing the user experience by preventing flickering or abrupt changes in the UI.
onMounted(() => {
	setTimeout(() => {
		showCards.value = true
	}), 400
})


// This function toggles the expansion of a card based on its ID.
const toggleCard = (id: string) => {
	expandedCardId.value = expandedCardId.value === id ? null : id
}

</script>