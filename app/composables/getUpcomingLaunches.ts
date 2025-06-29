

export const getUpcomingLaunches = () => {
  const getLaunchesUpcoming = gql`
  query LaunchesUpcoming($limit: Int) {
    launchesUpcoming(limit: $limit) {
      launch_date_local
      rocket {
        rocket_name
        rocket {
          description
        }
      }
      links {
        video_link
      }
      mission_name
    }
  }`

  return {
    getLaunchesUpcoming,
  }
}



