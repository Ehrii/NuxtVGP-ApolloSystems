export interface RocketData {
    rocket: Rocket
}

export interface MissionHistoryData {
    histories: MissionRocket[]
}

export interface GetLaunchesQuery {
    launches: Launch[]
}

export interface LaunchesUpcomingVars {
    limit?: number
}


export interface MissionRocket {
    details: string
    event_date_utc: string
    links: {
        article: string
    }
    title: string
}


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