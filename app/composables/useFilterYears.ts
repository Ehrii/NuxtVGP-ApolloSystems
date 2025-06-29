import { computed } from 'vue'

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
