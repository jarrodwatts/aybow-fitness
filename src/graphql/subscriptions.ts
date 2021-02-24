/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateRoutine = /* GraphQL */ `
  subscription OnCreateRoutine {
    onCreateRoutine {
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
export const onUpdateRoutine = /* GraphQL */ `
  subscription OnUpdateRoutine {
    onUpdateRoutine {
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
export const onDeleteRoutine = /* GraphQL */ `
  subscription OnDeleteRoutine {
    onDeleteRoutine {
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
