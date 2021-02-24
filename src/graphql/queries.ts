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
      savedWeights {
        exercise {
          name
          description
          reps
          sets
        }
        weight
      }
      createdAt
      updatedAt
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
        savedWeights {
          exercise {
            name
            description
            reps
            sets
          }
          weight
        }
        createdAt
        updatedAt
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
      createdAt
      updatedAt
      owner
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
