/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  savedRoutines?: Array< string | null > | null,
  savedWeights?: Array< RecordedExerciseWithWeightInput | null > | null,
};

export type RecordedExerciseWithWeightInput = {
  exercise: ExerciseInput,
  weight: string,
};

export type ExerciseInput = {
  name: string,
  description?: string | null,
  reps: string,
  sets: string,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  savedRoutines?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type User = {
  __typename: "User",
  id?: string,
  username?: string,
  email?: string,
  savedRoutines?: Array< string | null > | null,
  savedWeights?:  Array<RecordedExerciseWithWeight | null > | null,
  createdAt?: string,
  updatedAt?: string,
};

export type RecordedExerciseWithWeight = {
  __typename: "RecordedExerciseWithWeight",
  exercise?: Exercise,
  weight?: string,
};

export type Exercise = {
  __typename: "Exercise",
  name?: string,
  description?: string | null,
  reps?: string,
  sets?: string,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  savedRoutines?: Array< string | null > | null,
  savedWeights?: Array< RecordedExerciseWithWeightInput | null > | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateRoutineInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  days: Array< DayInput | null >,
};

export type DayInput = {
  name?: string | null,
  description?: string | null,
  exercises?: Array< ExerciseInput | null > | null,
};

export type ModelRoutineConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelRoutineConditionInput | null > | null,
  or?: Array< ModelRoutineConditionInput | null > | null,
  not?: ModelRoutineConditionInput | null,
};

export type Routine = {
  __typename: "Routine",
  id?: string,
  name?: string,
  description?: string | null,
  days?:  Array<Day | null >,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type Day = {
  __typename: "Day",
  name?: string | null,
  description?: string | null,
  exercises?:  Array<Exercise | null > | null,
};

export type UpdateRoutineInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  days?: Array< DayInput | null > | null,
};

export type DeleteRoutineInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  savedRoutines?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelRoutineFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelRoutineFilterInput | null > | null,
  or?: Array< ModelRoutineFilterInput | null > | null,
  not?: ModelRoutineFilterInput | null,
};

export type ModelRoutineConnection = {
  __typename: "ModelRoutineConnection",
  items?:  Array<Routine | null > | null,
  nextToken?: string | null,
};

export type CreateUserMutationVariables = {
  input?: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    savedRoutines?: Array< string | null > | null,
    savedWeights?:  Array< {
      __typename: "RecordedExerciseWithWeight",
      exercise:  {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      },
      weight: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    savedRoutines?: Array< string | null > | null,
    savedWeights?:  Array< {
      __typename: "RecordedExerciseWithWeight",
      exercise:  {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      },
      weight: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input?: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    savedRoutines?: Array< string | null > | null,
    savedWeights?:  Array< {
      __typename: "RecordedExerciseWithWeight",
      exercise:  {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      },
      weight: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRoutineMutationVariables = {
  input?: CreateRoutineInput,
  condition?: ModelRoutineConditionInput | null,
};

export type CreateRoutineMutation = {
  createRoutine?:  {
    __typename: "Routine",
    id: string,
    name: string,
    description?: string | null,
    days:  Array< {
      __typename: "Day",
      name?: string | null,
      description?: string | null,
      exercises?:  Array< {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      } | null > | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateRoutineMutationVariables = {
  input?: UpdateRoutineInput,
  condition?: ModelRoutineConditionInput | null,
};

export type UpdateRoutineMutation = {
  updateRoutine?:  {
    __typename: "Routine",
    id: string,
    name: string,
    description?: string | null,
    days:  Array< {
      __typename: "Day",
      name?: string | null,
      description?: string | null,
      exercises?:  Array< {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      } | null > | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteRoutineMutationVariables = {
  input?: DeleteRoutineInput,
  condition?: ModelRoutineConditionInput | null,
};

export type DeleteRoutineMutation = {
  deleteRoutine?:  {
    __typename: "Routine",
    id: string,
    name: string,
    description?: string | null,
    days:  Array< {
      __typename: "Day",
      name?: string | null,
      description?: string | null,
      exercises?:  Array< {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      } | null > | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id?: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    savedRoutines?: Array< string | null > | null,
    savedWeights?:  Array< {
      __typename: "RecordedExerciseWithWeight",
      exercise:  {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      },
      weight: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      savedRoutines?: Array< string | null > | null,
      savedWeights?:  Array< {
        __typename: "RecordedExerciseWithWeight",
        exercise:  {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        },
        weight: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetRoutineQueryVariables = {
  id?: string,
};

export type GetRoutineQuery = {
  getRoutine?:  {
    __typename: "Routine",
    id: string,
    name: string,
    description?: string | null,
    days:  Array< {
      __typename: "Day",
      name?: string | null,
      description?: string | null,
      exercises?:  Array< {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      } | null > | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListRoutinesQueryVariables = {
  filter?: ModelRoutineFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRoutinesQuery = {
  listRoutines?:  {
    __typename: "ModelRoutineConnection",
    items?:  Array< {
      __typename: "Routine",
      id: string,
      name: string,
      description?: string | null,
      days:  Array< {
        __typename: "Day",
        name?: string | null,
        description?: string | null,
        exercises?:  Array< {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        } | null > | null,
      } | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    savedRoutines?: Array< string | null > | null,
    savedWeights?:  Array< {
      __typename: "RecordedExerciseWithWeight",
      exercise:  {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      },
      weight: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    savedRoutines?: Array< string | null > | null,
    savedWeights?:  Array< {
      __typename: "RecordedExerciseWithWeight",
      exercise:  {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      },
      weight: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    savedRoutines?: Array< string | null > | null,
    savedWeights?:  Array< {
      __typename: "RecordedExerciseWithWeight",
      exercise:  {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      },
      weight: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRoutineSubscription = {
  onCreateRoutine?:  {
    __typename: "Routine",
    id: string,
    name: string,
    description?: string | null,
    days:  Array< {
      __typename: "Day",
      name?: string | null,
      description?: string | null,
      exercises?:  Array< {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      } | null > | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateRoutineSubscription = {
  onUpdateRoutine?:  {
    __typename: "Routine",
    id: string,
    name: string,
    description?: string | null,
    days:  Array< {
      __typename: "Day",
      name?: string | null,
      description?: string | null,
      exercises?:  Array< {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      } | null > | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteRoutineSubscription = {
  onDeleteRoutine?:  {
    __typename: "Routine",
    id: string,
    name: string,
    description?: string | null,
    days:  Array< {
      __typename: "Day",
      name?: string | null,
      description?: string | null,
      exercises?:  Array< {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      } | null > | null,
    } | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
