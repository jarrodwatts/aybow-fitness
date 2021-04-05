/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  id?: string,
  username?: string,
  email?: string,
  savedRoutines?: Array< string | null > | null,
  createdAt?: string,
  updatedAt?: string,
  savedWeights?: ModelRecordedExerciseWithWeightConnection,
};

export type ModelRecordedExerciseWithWeightConnection = {
  __typename: "ModelRecordedExerciseWithWeightConnection",
  items?:  Array<RecordedExerciseWithWeight | null > | null,
  nextToken?: string | null,
};

export type RecordedExerciseWithWeight = {
  __typename: "RecordedExerciseWithWeight",
  id?: string,
  ownerID?: string,
  exercise?: Exercise,
  weight?: string,
  createdAt?: string | null,
  updatedAt?: string,
  username?: string | null,
};

export type Exercise = {
  __typename: "Exercise",
  name?: string,
  description?: string | null,
  reps?: string,
  sets?: string,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  savedRoutines?: Array< string | null > | null,
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

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  savedRoutines?: Array< string | null > | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateRoutineInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  days: Array< DayInput | null >,
  owner: string,
  userMade?: string | null,
  hasImage?: boolean | null,
};

export type DayInput = {
  name?: string | null,
  description?: string | null,
  exercises?: Array< ExerciseInput | null > | null,
};

export type ExerciseInput = {
  name: string,
  description?: string | null,
  reps: string,
  sets: string,
};

export type ModelRoutineConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  userMade?: ModelStringInput | null,
  hasImage?: ModelBooleanInput | null,
  and?: Array< ModelRoutineConditionInput | null > | null,
  or?: Array< ModelRoutineConditionInput | null > | null,
  not?: ModelRoutineConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Routine = {
  __typename: "Routine",
  id?: string,
  name?: string,
  description?: string | null,
  days?:  Array<Day | null >,
  owner?: string,
  userMade?: string | null,
  hasImage?: boolean | null,
  createdAt?: string,
  updatedAt?: string,
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
  owner?: string | null,
  userMade?: string | null,
  hasImage?: boolean | null,
};

export type DeleteRoutineInput = {
  id?: string | null,
};

export type CreateRecordedExerciseWithWeightInput = {
  id?: string | null,
  ownerID: string,
  exercise: ExerciseInput,
  weight: string,
  createdAt?: string | null,
};

export type ModelRecordedExerciseWithWeightConditionInput = {
  ownerID?: ModelIDInput | null,
  weight?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelRecordedExerciseWithWeightConditionInput | null > | null,
  or?: Array< ModelRecordedExerciseWithWeightConditionInput | null > | null,
  not?: ModelRecordedExerciseWithWeightConditionInput | null,
};

export type UpdateRecordedExerciseWithWeightInput = {
  id: string,
  ownerID?: string | null,
  exercise?: ExerciseInput | null,
  weight?: string | null,
  createdAt?: string | null,
};

export type DeleteRecordedExerciseWithWeightInput = {
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
  owner?: ModelStringInput | null,
  userMade?: ModelStringInput | null,
  hasImage?: ModelBooleanInput | null,
  and?: Array< ModelRoutineFilterInput | null > | null,
  or?: Array< ModelRoutineFilterInput | null > | null,
  not?: ModelRoutineFilterInput | null,
};

export type ModelRoutineConnection = {
  __typename: "ModelRoutineConnection",
  items?:  Array<Routine | null > | null,
  nextToken?: string | null,
};

export type ModelRecordedExerciseWithWeightFilterInput = {
  id?: ModelIDInput | null,
  ownerID?: ModelIDInput | null,
  weight?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelRecordedExerciseWithWeightFilterInput | null > | null,
  or?: Array< ModelRecordedExerciseWithWeightFilterInput | null > | null,
  not?: ModelRecordedExerciseWithWeightFilterInput | null,
};

export type GetUserSavedWeightsSortByDateQueryVariables = {
  id?: string,
};

export type GetUserSavedWeightsSortByDateQuery = {
  getUser?:  {
    __typename: "User",
    savedWeights?:  {
      __typename: "ModelRecordedExerciseWithWeightConnection",
      items?:  Array< {
        __typename: "RecordedExerciseWithWeight",
        id: string,
        createdAt?: string | null,
        exercise:  {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        },
        weight: string,
      } | null > | null,
    } | null,
  } | null,
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
    createdAt: string,
    updatedAt: string,
    savedWeights?:  {
      __typename: "ModelRecordedExerciseWithWeightConnection",
      items?:  Array< {
        __typename: "RecordedExerciseWithWeight",
        id: string,
        ownerID: string,
        exercise:  {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        },
        weight: string,
        createdAt?: string | null,
        updatedAt: string,
        username?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
    createdAt: string,
    updatedAt: string,
    savedWeights?:  {
      __typename: "ModelRecordedExerciseWithWeightConnection",
      items?:  Array< {
        __typename: "RecordedExerciseWithWeight",
        id: string,
        ownerID: string,
        exercise:  {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        },
        weight: string,
        createdAt?: string | null,
        updatedAt: string,
        username?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
    createdAt: string,
    updatedAt: string,
    savedWeights?:  {
      __typename: "ModelRecordedExerciseWithWeightConnection",
      items?:  Array< {
        __typename: "RecordedExerciseWithWeight",
        id: string,
        ownerID: string,
        exercise:  {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        },
        weight: string,
        createdAt?: string | null,
        updatedAt: string,
        username?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
    owner: string,
    userMade?: string | null,
    hasImage?: boolean | null,
    createdAt: string,
    updatedAt: string,
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
    owner: string,
    userMade?: string | null,
    hasImage?: boolean | null,
    createdAt: string,
    updatedAt: string,
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
    owner: string,
    userMade?: string | null,
    hasImage?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRecordedExerciseWithWeightMutationVariables = {
  input?: CreateRecordedExerciseWithWeightInput,
  condition?: ModelRecordedExerciseWithWeightConditionInput | null,
};

export type CreateRecordedExerciseWithWeightMutation = {
  createRecordedExerciseWithWeight?:  {
    __typename: "RecordedExerciseWithWeight",
    id: string,
    ownerID: string,
    exercise:  {
      __typename: "Exercise",
      name: string,
      description?: string | null,
      reps: string,
      sets: string,
    },
    weight: string,
    createdAt?: string | null,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type UpdateRecordedExerciseWithWeightMutationVariables = {
  input?: UpdateRecordedExerciseWithWeightInput,
  condition?: ModelRecordedExerciseWithWeightConditionInput | null,
};

export type UpdateRecordedExerciseWithWeightMutation = {
  updateRecordedExerciseWithWeight?:  {
    __typename: "RecordedExerciseWithWeight",
    id: string,
    ownerID: string,
    exercise:  {
      __typename: "Exercise",
      name: string,
      description?: string | null,
      reps: string,
      sets: string,
    },
    weight: string,
    createdAt?: string | null,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type DeleteRecordedExerciseWithWeightMutationVariables = {
  input?: DeleteRecordedExerciseWithWeightInput,
  condition?: ModelRecordedExerciseWithWeightConditionInput | null,
};

export type DeleteRecordedExerciseWithWeightMutation = {
  deleteRecordedExerciseWithWeight?:  {
    __typename: "RecordedExerciseWithWeight",
    id: string,
    ownerID: string,
    exercise:  {
      __typename: "Exercise",
      name: string,
      description?: string | null,
      reps: string,
      sets: string,
    },
    weight: string,
    createdAt?: string | null,
    updatedAt: string,
    username?: string | null,
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
    createdAt: string,
    updatedAt: string,
    savedWeights?:  {
      __typename: "ModelRecordedExerciseWithWeightConnection",
      items?:  Array< {
        __typename: "RecordedExerciseWithWeight",
        id: string,
        ownerID: string,
        exercise:  {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        },
        weight: string,
        createdAt?: string | null,
        updatedAt: string,
        username?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
      createdAt: string,
      updatedAt: string,
      savedWeights?:  {
        __typename: "ModelRecordedExerciseWithWeightConnection",
        items?:  Array< {
          __typename: "RecordedExerciseWithWeight",
          id: string,
          ownerID: string,
          exercise:  {
            __typename: "Exercise",
            name: string,
            description?: string | null,
            reps: string,
            sets: string,
          },
          weight: string,
          createdAt?: string | null,
          updatedAt: string,
          username?: string | null,
        } | null > | null,
        nextToken?: string | null,
      } | null,
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
    owner: string,
    userMade?: string | null,
    hasImage?: boolean | null,
    createdAt: string,
    updatedAt: string,
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
      owner: string,
      userMade?: string | null,
      hasImage?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetRecordedExerciseWithWeightQueryVariables = {
  id?: string,
};

export type GetRecordedExerciseWithWeightQuery = {
  getRecordedExerciseWithWeight?:  {
    __typename: "RecordedExerciseWithWeight",
    id: string,
    ownerID: string,
    exercise:  {
      __typename: "Exercise",
      name: string,
      description?: string | null,
      reps: string,
      sets: string,
    },
    weight: string,
    createdAt?: string | null,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type ListRecordedExerciseWithWeightsQueryVariables = {
  filter?: ModelRecordedExerciseWithWeightFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecordedExerciseWithWeightsQuery = {
  listRecordedExerciseWithWeights?:  {
    __typename: "ModelRecordedExerciseWithWeightConnection",
    items?:  Array< {
      __typename: "RecordedExerciseWithWeight",
      id: string,
      ownerID: string,
      exercise:  {
        __typename: "Exercise",
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
      },
      weight: string,
      createdAt?: string | null,
      updatedAt: string,
      username?: string | null,
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
    createdAt: string,
    updatedAt: string,
    savedWeights?:  {
      __typename: "ModelRecordedExerciseWithWeightConnection",
      items?:  Array< {
        __typename: "RecordedExerciseWithWeight",
        id: string,
        ownerID: string,
        exercise:  {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        },
        weight: string,
        createdAt?: string | null,
        updatedAt: string,
        username?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    savedRoutines?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    savedWeights?:  {
      __typename: "ModelRecordedExerciseWithWeightConnection",
      items?:  Array< {
        __typename: "RecordedExerciseWithWeight",
        id: string,
        ownerID: string,
        exercise:  {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        },
        weight: string,
        createdAt?: string | null,
        updatedAt: string,
        username?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    savedRoutines?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    savedWeights?:  {
      __typename: "ModelRecordedExerciseWithWeightConnection",
      items?:  Array< {
        __typename: "RecordedExerciseWithWeight",
        id: string,
        ownerID: string,
        exercise:  {
          __typename: "Exercise",
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
        },
        weight: string,
        createdAt?: string | null,
        updatedAt: string,
        username?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
    owner: string,
    userMade?: string | null,
    hasImage?: boolean | null,
    createdAt: string,
    updatedAt: string,
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
    owner: string,
    userMade?: string | null,
    hasImage?: boolean | null,
    createdAt: string,
    updatedAt: string,
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
    owner: string,
    userMade?: string | null,
    hasImage?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRecordedExerciseWithWeightSubscription = {
  onCreateRecordedExerciseWithWeight?:  {
    __typename: "RecordedExerciseWithWeight",
    id: string,
    ownerID: string,
    exercise:  {
      __typename: "Exercise",
      name: string,
      description?: string | null,
      reps: string,
      sets: string,
    },
    weight: string,
    createdAt?: string | null,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type OnUpdateRecordedExerciseWithWeightSubscription = {
  onUpdateRecordedExerciseWithWeight?:  {
    __typename: "RecordedExerciseWithWeight",
    id: string,
    ownerID: string,
    exercise:  {
      __typename: "Exercise",
      name: string,
      description?: string | null,
      reps: string,
      sets: string,
    },
    weight: string,
    createdAt?: string | null,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type OnDeleteRecordedExerciseWithWeightSubscription = {
  onDeleteRecordedExerciseWithWeight?:  {
    __typename: "RecordedExerciseWithWeight",
    id: string,
    ownerID: string,
    exercise:  {
      __typename: "Exercise",
      name: string,
      description?: string | null,
      reps: string,
      sets: string,
    },
    weight: string,
    createdAt?: string | null,
    updatedAt: string,
    username?: string | null,
  } | null,
};
