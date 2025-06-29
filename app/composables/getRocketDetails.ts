// composable functions to fetch rocket details, mission details, and mission history using GraphQL queries
export const getRocketDetails = () => {
    const getLaunchById = gql`
    query GetRocket($id: ID!) {
        rocket(id: $id) {
        name
        id
        description
        wikipedia
        first_flight
        height {
            meters
        }
        diameter {
            meters
        }
        mass {
            kg
        }
         stages
        }
    }`

    return {
        getLaunchById,
    }
}

export const getMissionDetails = () => {
    const getMissionById = gql`
    query Mission($missionId: ID!) {
    mission(id: $id) {
        website
        twitter
        wikipedia
    }
}`
    return {
        getMissionById,
    }
}

export const getMissionHistory = () => {
    const getMissionHistoryById = gql`
        query Histories($find: HistoryFind) {
        histories(find: $find) {
            details
            event_date_utc
            links {
            article
            }
            title
        }
        }`

    return {
        getMissionHistoryById,
    }
}

// composable function to format date strings into a more readable format

export const formatDate = (dateStr: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Date(dateStr).toLocaleDateString('en-PH', options)
}




