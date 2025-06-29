// Represents data that includes a single rocket object
export interface RocketData {
    rocket: Rocket // The rocket data
}

// Represents data containing a list of mission history entries
export interface MissionHistoryData {
    histories: MissionRocket[] // Array of mission history records
}

// Represents the result of a GraphQL query that returns upcoming launches
export interface GetLaunchesQuery {
    launches: Launch[] // Array of launch objects
}

// Represents optional variables for a query to limit the number of upcoming launches
export interface LaunchesUpcomingVars {
    limit?: number // Optional limit for number of launches to fetch
}

// Interface that represents the data structure for a mission rocket
export interface MissionRocket {
    details: string
    event_date_utc: string
    links: {
        article: string
    }
    title: string
}

// Interface that represents the data structure for upcoming launches
export interface LaunchesUpcomingData {
    launchesUpcoming: {
        launch_date_local: string
        rocket: {
            rocket_name: string
            rocket: {
                description: string
            }
        }
        links: {
            video_link: string | null
        }
        mission_name: string
    }[]
}

// Interface that represents the data structure for a launch
export interface Launch {
    id: string
    mission_name: string
    launch_date_utc: string
    details: string | null
    launch_site: { site_name: string }
    rocket: {
        rocket_name: string
        rocket: {
            id: string
        }
    }
}

// Interface that represents the data structure for a rocket
export interface Rocket {
    id: string
    name: string
    description: string
    first_flight: string
    height: { meters: number }
    diameter: { meters: number }
    mass: { kg: number }
    stages: number
    wikipedia: string
}