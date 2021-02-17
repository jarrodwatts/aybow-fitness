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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
export const createDay = /* GraphQL */ `
  mutation CreateDay(
    $input: CreateDayInput!
    $condition: ModelDayConditionInput
  ) {
    createDay(input: $input, condition: $condition) {
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
export const updateDay = /* GraphQL */ `
  mutation UpdateDay(
    $input: UpdateDayInput!
    $condition: ModelDayConditionInput
  ) {
    updateDay(input: $input, condition: $condition) {
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
export const deleteDay = /* GraphQL */ `
  mutation DeleteDay(
    $input: DeleteDayInput!
    $condition: ModelDayConditionInput
  ) {
    deleteDay(input: $input, condition: $condition) {
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
export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
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
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
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
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
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
