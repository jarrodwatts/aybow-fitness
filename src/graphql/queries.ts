/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      savedRoutines
      createdAt
      updatedAt
      savedWeights {
        items {
          id
          ownerID
          exercise {
            name
            description
            reps
            sets
          }
          weight
          createdAt
          updatedAt
          username
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        savedRoutines
        createdAt
        updatedAt
        savedWeights {
          items {
            id
            ownerID
            exercise {
              name
              description
              reps
              sets
            }
            weight
            createdAt
            updatedAt
            username
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getRoutine = /* GraphQL */ `
  query GetRoutine($id: ID!) {
    getRoutine(id: $id) {
      id
      name
      description
      days {
        name
        description
        exercises {
          name
          description
          reps
          sets
        }
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listRoutines = /* GraphQL */ `
  query ListRoutines(
    $filter: ModelRoutineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoutines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        days {
          name
          description
          exercises {
            name
            description
            reps
            sets
          }
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRecordedExerciseWithWeight = /* GraphQL */ `
  query GetRecordedExerciseWithWeight($id: ID!) {
    getRecordedExerciseWithWeight(id: $id) {
      id
      ownerID
      exercise {
        name
        description
        reps
        sets
      }
      weight
      createdAt
      updatedAt
      username
    }
  }
`;
export const listRecordedExerciseWithWeights = /* GraphQL */ `
  query ListRecordedExerciseWithWeights(
    $filter: ModelRecordedExerciseWithWeightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordedExerciseWithWeights(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ownerID
        exercise {
          name
          description
          reps
          sets
        }
        weight
        createdAt
        updatedAt
        username
      }
      nextToken
    }
  }
`;
