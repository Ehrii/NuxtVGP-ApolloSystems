// imports computed to create a reactive property for years
import { computed } from 'vue'

// This composable function provides a way to filter and sort launch years from a list of launches.
export const useFilterYears = (launches: () => { launch_date_utc: string }[]) => {
  const years = computed(() => {
    const yearSet = new Set(
      launches().map((launch) =>
        new Date(launch.launch_date_utc).getFullYear().toString()
      )
    )
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a))
  })

  return { years }
}
