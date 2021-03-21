/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRoutine = /* GraphQL */ `
  mutation CreateRoutine(
    $input: CreateRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    createRoutine(input: $input, condition: $condition) {
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
      userMade
      createdAt
      updatedAt
    }
  }
`;
export const updateRoutine = /* GraphQL */ `
  mutation UpdateRoutine(
    $input: UpdateRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    updateRoutine(input: $input, condition: $condition) {
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
      userMade
      createdAt
      updatedAt
    }
  }
`;
export const deleteRoutine = /* GraphQL */ `
  mutation DeleteRoutine(
    $input: DeleteRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    deleteRoutine(input: $input, condition: $condition) {
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
      userMade
      createdAt
      updatedAt
    }
  }
`;
export const createRecordedExerciseWithWeight = /* GraphQL */ `
  mutation CreateRecordedExerciseWithWeight(
    $input: CreateRecordedExerciseWithWeightInput!
    $condition: ModelRecordedExerciseWithWeightConditionInput
  ) {
    createRecordedExerciseWithWeight(input: $input, condition: $condition) {
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
export const updateRecordedExerciseWithWeight = /* GraphQL */ `
  mutation UpdateRecordedExerciseWithWeight(
    $input: UpdateRecordedExerciseWithWeightInput!
    $condition: ModelRecordedExerciseWithWeightConditionInput
  ) {
    updateRecordedExerciseWithWeight(input: $input, condition: $condition) {
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
export const deleteRecordedExerciseWithWeight = /* GraphQL */ `
  mutation DeleteRecordedExerciseWithWeight(
    $input: DeleteRecordedExerciseWithWeightInput!
    $condition: ModelRecordedExerciseWithWeightConditionInput
  ) {
    deleteRecordedExerciseWithWeight(input: $input, condition: $condition) {
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
