// imports ref, types for launches
import { ref } from 'vue'
import type { GetLaunchesQuery, Launch } from '~/types/rocket'


// composable function to fetch launches from the SpaceX API
const getLaunches = gql(`
  query GetLaunches {
    launches(sort: "launch_date_utc", order: "desc") {
      id
      mission_name
      launch_date_utc
      details
      launch_site {
        site_name
      }
      rocket {
        rocket_name
		rocket { id }
      }
    }
  }
`)

// composable function with Launch type to filter and sort launches based on year, search query, and sort order
export const useLaunchFilter = () => {
  const selectedYear = ref<string | null>(null)
  const sortOrder = ref<'asc' | 'desc'>('asc')
  const searchQuery = ref('')

  const filterBySearchQuery = (launches: Launch[]): Launch[] => {
    const query = searchQuery.value.trim().toLowerCase()
    if (!query) return launches
    return launches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(query)
    )
  }

  const filterByYear = (launches: Launch[]): Launch[] => {
    if (!selectedYear.value) return launches
    return launches.filter((launch) => {
      const launchYear = new Date(launch.launch_date_utc).getFullYear()
      return launchYear.toString() === selectedYear.value
    })
  }

  const sortLaunches = (launches: Launch[]): Launch[] => {
    return [...launches].sort((a, b) => {
      const dateA = new Date(a.launch_date_utc).getTime()
      const dateB = new Date(b.launch_date_utc).getTime()
      return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
    })
  }

  const filteredAndSortedLaunches = (launches: Launch[]) => {
    const byYear = filterByYear(launches)
    const bySearch = filterBySearchQuery(byYear)
    return sortLaunches(bySearch)
  }

  return {
    selectedYear,
    sortOrder,
    searchQuery,
    filteredAndSortedLaunches,
    getLaunchesQuery: (): GetLaunchesQuery => {
      return getLaunches
    },
    getLaunches
  }
}
