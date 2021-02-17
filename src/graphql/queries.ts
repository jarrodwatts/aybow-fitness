/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
      owner
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
        createdAt
        updatedAt
        owner
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
        items {
          id
          name
          createdAt
          updatedAt
          owner
        }
        nextToken
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
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getDay = /* GraphQL */ `
  query GetDay($id: ID!) {
    getDay(id: $id) {
      id
      name
      routine {
        id
        name
        description
        days {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      exercises {
        items {
          id
          name
          description
          reps
          sets
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDays = /* GraphQL */ `
  query ListDays(
    $filter: ModelDayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        routine {
          id
          name
          description
          createdAt
          updatedAt
          owner
        }
        exercises {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
      id
      name
      description
      reps
      sets
      day {
        id
        name
        routine {
          id
          name
          description
          createdAt
          updatedAt
          owner
        }
        exercises {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        reps
        sets
        day {
          id
          name
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
