<template>
	<v-app>
		<v-layout>
			<!-- App Bar with Slide Transition -->
			<v-slide-y-transition>
				<v-app-bar v-if="showAppBar" color="primary" dark app>
					<v-app-bar-nav-icon @click="drawer = !drawer" />
					<v-app-bar-title>
						<!-- Customized title based on the current route name. -->
						<v-icon left> {{
							route.name === 'index'
								? 'mdi-rocket-launch'
								: route.name === 'missions-details-id'
									? 'mdi-information-variant'
									: route.name === 'favorites'
										? 'mdi-star-box'
										: 'mdi-help-circle'
						}}
						</v-icon>
						{{
							route.name === 'index'
								? 'SpaceX Missions'
								: route.name === 'missions-details-id'
									? 'Mission Information'
									: route.name === 'favorites'
										? 'Favorites'
										: ''
						}}
					</v-app-bar-title>
				</v-app-bar>
			</v-slide-y-transition>

			<!-- Navigation Drawer -->
			<v-navigation-drawer v-model="drawer" app temporary color="grey-darken-3" dark>
				<v-list>
					<v-list-item prepend-icon="mdi-rocket" title="List of Missions" :to="{ name: 'index' }">
					</v-list-item>
					<v-list-item prepend-icon="mdi-star-box" title="Favorites"
						:to="{ name: 'favorites' }"></v-list-item>
				</v-list>
			</v-navigation-drawer>

			<!-- Main content area to display the main content of the application. -->
			<template>
				<v-main class="position-relative overflow-hidden" style="min-height: 100vh;">
					<v-sheet class="position-absolute " style="
						inset: 0;
						z-index: -10;
						height: 100%;
						width: 100%;
						background-color: white;
						background-image:
						linear-gradient(to right, rgba(240, 240, 240, 0.3) 2px, transparent 12px),
						linear-gradient(to bottom, rgba(250, 250, 250, 0.3) 1px, transparent 1px);
						background-size: 4rem 4rem;
					"></v-sheet>

					<v-container fluid class="pa-4">
						<slot />
					</v-container>
				</v-main>

				<!-- Added footer to the layout to provide additional information and links. -->
				<v-footer class="text-center d-flex flex-column ga-2 py-4" color="blue-darken-3">
					<div class="d-flex ga-3">
						<v-btn v-for="icon in icons" :key="icon" :icon="icon" density="comfortable"
							variant="text"></v-btn>
					</div>
					<v-divider class="my-2" thickness="2" width="50"></v-divider>
					<div class=" font-weight-regular opacity-60">
						This Front End Developer Exam was coded by <strong>John Eriel C. Labadan</strong> for evaluation
						in modern front-end development. It focuses on real-world skills using
						Nuxt as the primary framework, leveraging its features for server-side rendering and routing.
						The exam includes tasks that require knowledge of ES2020 JavaScript standards, emphasizing clean
						syntax and efficient logic. This will also demonstrate my ability to build user interfaces
						using Vuetify and manage application state with Pinia. GraphQL is used to test your
						understanding of querying structured APIs and handling responses within a Vue 3 Composition API
						setup. TypeScript proficiency is assessed through typed components, interfaces, and type-safe
						logic throughout the project. This exam is designed to be both challenging and practical,
						reflecting real tasks faced by modern front-end developers.
					</div>
					<v-divider></v-divider>
					<div>
						{{ new Date().getFullYear() }} — <strong>ApolloSystems</strong>
					</div>
				</v-footer>
			</template>
		</v-layout>
	</v-app>
</template>

<script setup>
// Import necessary modules and components
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Define reactive variables for the drawer state and route
const drawer = ref(false)
const route = useRoute()
const showAppBar = ref(false)

// Define icons for the footer
const icons = [
	'mdi-github',
	'mdi-linkedin',
];

// Function to toggle the drawer state
onMounted(() => {
	setTimeout(() => {
		showAppBar.value = true
	}, 100)
})
</script>