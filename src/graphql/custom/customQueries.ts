export const getUserSavedWeightsSortByDate = /* GraphQL */ `
    query GetUserSavedWeightsSortByDate($id: ID!) {
        getUser(id: $id) {
            savedWeights(sortDirection: DESC) {
                items {
                    id
                    createdAt
                    exercise {
                        name
                        description
                        reps
                        sets
                    }
                    weight
                }
            }
        }
    }
`;