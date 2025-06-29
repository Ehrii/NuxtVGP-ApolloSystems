import vuetify from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	app: {
		head: {
			title: 'SpaceX Launches',
			htmlAttrs: { lang: 'en' },
			link: [
				{ rel: 'icon', type: 'image/png', href: '/images/favicon/spacexlogo.png' },
				{ rel: 'preload', as: 'image', href: '/images/bg.webp', type: 'image/webp' },
			]
		}
	},
	future: { compatibilityVersion: 4 },
	build: { transpile: ['vuetify'] },
	imports: { dirs: ['./stores'] },

	apollo: {
		autoImports: true,
		proxyCookies: true,
		clients: {
			default: { httpEndpoint: 'https://spacex-production.up.railway.app/' },
		},
	},

	alias: {
		assets: "/<rootDir>/assets"
	},
	css: ['@/assets/css/fonts.css'],
	vite: {
		optimizeDeps: {
			include: ['graphql-tag', 'pinia-plugin-persistedstate-2', 'localforage'],
		},
		plugins: [vuetify()],
	},

	modules: ['@nuxtjs/apollo', ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]],
	compatibilityDate: '2024-11-11',
})
