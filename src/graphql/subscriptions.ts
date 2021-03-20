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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
      owner
      createdAt
      updatedAt
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
      owner
      createdAt
      updatedAt
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
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRecordedExerciseWithWeight = /* GraphQL */ `
  subscription OnCreateRecordedExerciseWithWeight {
    onCreateRecordedExerciseWithWeight {
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
export const onUpdateRecordedExerciseWithWeight = /* GraphQL */ `
  subscription OnUpdateRecordedExerciseWithWeight {
    onUpdateRecordedExerciseWithWeight {
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
export const onDeleteRecordedExerciseWithWeight = /* GraphQL */ `
  subscription OnDeleteRecordedExerciseWithWeight {
    onDeleteRecordedExerciseWithWeight {
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
