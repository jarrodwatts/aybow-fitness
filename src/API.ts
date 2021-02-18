/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
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

export type User = {
  __typename: "User",
  id?: string,
  username?: string,
  email?: string,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateRoutineInput = {
  id?: string | null,
  name: string,
  description?: string | null,
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
  days?: ModelDayConnection,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type ModelDayConnection = {
  __typename: "ModelDayConnection",
  items?:  Array<Day | null > | null,
  nextToken?: string | null,
};

export type Day = {
  __typename: "Day",
  id?: string,
  routineID?: string,
  name?: string | null,
  description?: string | null,
  exercises?: ModelExerciseConnection,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type ModelExerciseConnection = {
  __typename: "ModelExerciseConnection",
  items?:  Array<Exercise | null > | null,
  nextToken?: string | null,
};

export type Exercise = {
  __typename: "Exercise",
  id?: string,
  dayID?: string,
  name?: string,
  description?: string | null,
  reps?: string,
  sets?: string,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdateRoutineInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteRoutineInput = {
  id?: string | null,
};

export type CreateDayInput = {
  id?: string | null,
  routineID: string,
  name?: string | null,
  description?: string | null,
};

export type ModelDayConditionInput = {
  routineID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelDayConditionInput | null > | null,
  or?: Array< ModelDayConditionInput | null > | null,
  not?: ModelDayConditionInput | null,
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

export type UpdateDayInput = {
  id: string,
  routineID?: string | null,
  name?: string | null,
  description?: string | null,
};

export type DeleteDayInput = {
  id?: string | null,
};

export type CreateExerciseInput = {
  id?: string | null,
  dayID: string,
  name: string,
  description?: string | null,
  reps: string,
  sets: string,
};

export type ModelExerciseConditionInput = {
  dayID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  reps?: ModelStringInput | null,
  sets?: ModelStringInput | null,
  and?: Array< ModelExerciseConditionInput | null > | null,
  or?: Array< ModelExerciseConditionInput | null > | null,
  not?: ModelExerciseConditionInput | null,
};

export type UpdateExerciseInput = {
  id: string,
  dayID?: string | null,
  name?: string | null,
  description?: string | null,
  reps?: string | null,
  sets?: string | null,
};

export type DeleteExerciseInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
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

export type ModelDayFilterInput = {
  id?: ModelIDInput | null,
  routineID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelDayFilterInput | null > | null,
  or?: Array< ModelDayFilterInput | null > | null,
  not?: ModelDayFilterInput | null,
};

export type ModelExerciseFilterInput = {
  id?: ModelIDInput | null,
  dayID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  reps?: ModelStringInput | null,
  sets?: ModelStringInput | null,
  and?: Array< ModelExerciseFilterInput | null > | null,
  or?: Array< ModelExerciseFilterInput | null > | null,
  not?: ModelExerciseFilterInput | null,
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
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    days?:  {
      __typename: "ModelDayConnection",
      items?:  Array< {
        __typename: "Day",
        id: string,
        routineID: string,
        name?: string | null,
        description?: string | null,
        exercises?:  {
          __typename: "ModelExerciseConnection",
          items?:  Array< {
            __typename: "Exercise",
            id: string,
            dayID: string,
            name: string,
            description?: string | null,
            reps: string,
            sets: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
    days?:  {
      __typename: "ModelDayConnection",
      items?:  Array< {
        __typename: "Day",
        id: string,
        routineID: string,
        name?: string | null,
        description?: string | null,
        exercises?:  {
          __typename: "ModelExerciseConnection",
          items?:  Array< {
            __typename: "Exercise",
            id: string,
            dayID: string,
            name: string,
            description?: string | null,
            reps: string,
            sets: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
    days?:  {
      __typename: "ModelDayConnection",
      items?:  Array< {
        __typename: "Day",
        id: string,
        routineID: string,
        name?: string | null,
        description?: string | null,
        exercises?:  {
          __typename: "ModelExerciseConnection",
          items?:  Array< {
            __typename: "Exercise",
            id: string,
            dayID: string,
            name: string,
            description?: string | null,
            reps: string,
            sets: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateDayMutationVariables = {
  input?: CreateDayInput,
  condition?: ModelDayConditionInput | null,
};

export type CreateDayMutation = {
  createDay?:  {
    __typename: "Day",
    id: string,
    routineID: string,
    name?: string | null,
    description?: string | null,
    exercises?:  {
      __typename: "ModelExerciseConnection",
      items?:  Array< {
        __typename: "Exercise",
        id: string,
        dayID: string,
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateDayMutationVariables = {
  input?: UpdateDayInput,
  condition?: ModelDayConditionInput | null,
};

export type UpdateDayMutation = {
  updateDay?:  {
    __typename: "Day",
    id: string,
    routineID: string,
    name?: string | null,
    description?: string | null,
    exercises?:  {
      __typename: "ModelExerciseConnection",
      items?:  Array< {
        __typename: "Exercise",
        id: string,
        dayID: string,
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteDayMutationVariables = {
  input?: DeleteDayInput,
  condition?: ModelDayConditionInput | null,
};

export type DeleteDayMutation = {
  deleteDay?:  {
    __typename: "Day",
    id: string,
    routineID: string,
    name?: string | null,
    description?: string | null,
    exercises?:  {
      __typename: "ModelExerciseConnection",
      items?:  Array< {
        __typename: "Exercise",
        id: string,
        dayID: string,
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateExerciseMutationVariables = {
  input?: CreateExerciseInput,
  condition?: ModelExerciseConditionInput | null,
};

export type CreateExerciseMutation = {
  createExercise?:  {
    __typename: "Exercise",
    id: string,
    dayID: string,
    name: string,
    description?: string | null,
    reps: string,
    sets: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateExerciseMutationVariables = {
  input?: UpdateExerciseInput,
  condition?: ModelExerciseConditionInput | null,
};

export type UpdateExerciseMutation = {
  updateExercise?:  {
    __typename: "Exercise",
    id: string,
    dayID: string,
    name: string,
    description?: string | null,
    reps: string,
    sets: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteExerciseMutationVariables = {
  input?: DeleteExerciseInput,
  condition?: ModelExerciseConditionInput | null,
};

export type DeleteExerciseMutation = {
  deleteExercise?:  {
    __typename: "Exercise",
    id: string,
    dayID: string,
    name: string,
    description?: string | null,
    reps: string,
    sets: string,
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
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
    days?:  {
      __typename: "ModelDayConnection",
      items?:  Array< {
        __typename: "Day",
        id: string,
        routineID: string,
        name?: string | null,
        description?: string | null,
        exercises?:  {
          __typename: "ModelExerciseConnection",
          items?:  Array< {
            __typename: "Exercise",
            id: string,
            dayID: string,
            name: string,
            description?: string | null,
            reps: string,
            sets: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
      days?:  {
        __typename: "ModelDayConnection",
        items?:  Array< {
          __typename: "Day",
          id: string,
          routineID: string,
          name?: string | null,
          description?: string | null,
          exercises?:  {
            __typename: "ModelExerciseConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetDayQueryVariables = {
  id?: string,
};

export type GetDayQuery = {
  getDay?:  {
    __typename: "Day",
    id: string,
    routineID: string,
    name?: string | null,
    description?: string | null,
    exercises?:  {
      __typename: "ModelExerciseConnection",
      items?:  Array< {
        __typename: "Exercise",
        id: string,
        dayID: string,
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListDaysQueryVariables = {
  filter?: ModelDayFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDaysQuery = {
  listDays?:  {
    __typename: "ModelDayConnection",
    items?:  Array< {
      __typename: "Day",
      id: string,
      routineID: string,
      name?: string | null,
      description?: string | null,
      exercises?:  {
        __typename: "ModelExerciseConnection",
        items?:  Array< {
          __typename: "Exercise",
          id: string,
          dayID: string,
          name: string,
          description?: string | null,
          reps: string,
          sets: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetExerciseQueryVariables = {
  id?: string,
};

export type GetExerciseQuery = {
  getExercise?:  {
    __typename: "Exercise",
    id: string,
    dayID: string,
    name: string,
    description?: string | null,
    reps: string,
    sets: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListExercisesQueryVariables = {
  filter?: ModelExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExercisesQuery = {
  listExercises?:  {
    __typename: "ModelExerciseConnection",
    items?:  Array< {
      __typename: "Exercise",
      id: string,
      dayID: string,
      name: string,
      description?: string | null,
      reps: string,
      sets: string,
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
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateRoutineSubscription = {
  onCreateRoutine?:  {
    __typename: "Routine",
    id: string,
    name: string,
    description?: string | null,
    days?:  {
      __typename: "ModelDayConnection",
      items?:  Array< {
        __typename: "Day",
        id: string,
        routineID: string,
        name?: string | null,
        description?: string | null,
        exercises?:  {
          __typename: "ModelExerciseConnection",
          items?:  Array< {
            __typename: "Exercise",
            id: string,
            dayID: string,
            name: string,
            description?: string | null,
            reps: string,
            sets: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
    days?:  {
      __typename: "ModelDayConnection",
      items?:  Array< {
        __typename: "Day",
        id: string,
        routineID: string,
        name?: string | null,
        description?: string | null,
        exercises?:  {
          __typename: "ModelExerciseConnection",
          items?:  Array< {
            __typename: "Exercise",
            id: string,
            dayID: string,
            name: string,
            description?: string | null,
            reps: string,
            sets: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
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
    days?:  {
      __typename: "ModelDayConnection",
      items?:  Array< {
        __typename: "Day",
        id: string,
        routineID: string,
        name?: string | null,
        description?: string | null,
        exercises?:  {
          __typename: "ModelExerciseConnection",
          items?:  Array< {
            __typename: "Exercise",
            id: string,
            dayID: string,
            name: string,
            description?: string | null,
            reps: string,
            sets: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateDaySubscription = {
  onCreateDay?:  {
    __typename: "Day",
    id: string,
    routineID: string,
    name?: string | null,
    description?: string | null,
    exercises?:  {
      __typename: "ModelExerciseConnection",
      items?:  Array< {
        __typename: "Exercise",
        id: string,
        dayID: string,
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateDaySubscription = {
  onUpdateDay?:  {
    __typename: "Day",
    id: string,
    routineID: string,
    name?: string | null,
    description?: string | null,
    exercises?:  {
      __typename: "ModelExerciseConnection",
      items?:  Array< {
        __typename: "Exercise",
        id: string,
        dayID: string,
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteDaySubscription = {
  onDeleteDay?:  {
    __typename: "Day",
    id: string,
    routineID: string,
    name?: string | null,
    description?: string | null,
    exercises?:  {
      __typename: "ModelExerciseConnection",
      items?:  Array< {
        __typename: "Exercise",
        id: string,
        dayID: string,
        name: string,
        description?: string | null,
        reps: string,
        sets: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateExerciseSubscription = {
  onCreateExercise?:  {
    __typename: "Exercise",
    id: string,
    dayID: string,
    name: string,
    description?: string | null,
    reps: string,
    sets: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateExerciseSubscription = {
  onUpdateExercise?:  {
    __typename: "Exercise",
    id: string,
    dayID: string,
    name: string,
    description?: string | null,
    reps: string,
    sets: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteExerciseSubscription = {
  onDeleteExercise?:  {
    __typename: "Exercise",
    id: string,
    dayID: string,
    name: string,
    description?: string | null,
    reps: string,
    sets: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
