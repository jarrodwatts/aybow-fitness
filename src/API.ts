/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  createdAt?: string | null,
  completed: boolean,
  userId: string,
  todoTodoListId: string,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  completed?: ModelBooleanInput | null,
  userId?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
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

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  createdAt?: string | null,
  completed?: boolean | null,
  userId?: string | null,
  todoTodoListId?: string | null,
};

export type DeleteTodoInput = {
  id?: string | null,
};

export type CreateTodoListInput = {
  id?: string | null,
  createdAt?: string | null,
};

export type ModelTodoListConditionInput = {
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTodoListConditionInput | null > | null,
  or?: Array< ModelTodoListConditionInput | null > | null,
  not?: ModelTodoListConditionInput | null,
};

export type UpdateTodoListInput = {
  id: string,
  createdAt?: string | null,
};

export type DeleteTodoListInput = {
  id?: string | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  completed?: ModelBooleanInput | null,
  userId?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
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

export type ModelTodoListFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTodoListFilterInput | null > | null,
  or?: Array< ModelTodoListFilterInput | null > | null,
  not?: ModelTodoListFilterInput | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    createdAt: string,
    completed: boolean,
    todoList:  {
      __typename: "TodoList",
      id: string,
      createdAt: string,
      todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
      updatedAt: string,
    },
    userId: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    createdAt: string,
    completed: boolean,
    todoList:  {
      __typename: "TodoList",
      id: string,
      createdAt: string,
      todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
      updatedAt: string,
    },
    userId: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    createdAt: string,
    completed: boolean,
    todoList:  {
      __typename: "TodoList",
      id: string,
      createdAt: string,
      todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
      updatedAt: string,
    },
    userId: string,
    updatedAt: string,
  } | null,
};

export type CreateTodoListMutationVariables = {
  input: CreateTodoListInput,
  condition?: ModelTodoListConditionInput | null,
};

export type CreateTodoListMutation = {
  createTodoList:  {
    __typename: "TodoList",
    id: string,
    createdAt: string,
    todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        name: string,
        createdAt: string,
        completed: boolean,
        userId: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateTodoListMutationVariables = {
  input: UpdateTodoListInput,
  condition?: ModelTodoListConditionInput | null,
};

export type UpdateTodoListMutation = {
  updateTodoList:  {
    __typename: "TodoList",
    id: string,
    createdAt: string,
    todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        name: string,
        createdAt: string,
        completed: boolean,
        userId: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteTodoListMutationVariables = {
  input: DeleteTodoListInput,
  condition?: ModelTodoListConditionInput | null,
};

export type DeleteTodoListMutation = {
  deleteTodoList:  {
    __typename: "TodoList",
    id: string,
    createdAt: string,
    todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        name: string,
        createdAt: string,
        completed: boolean,
        userId: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    createdAt: string,
    completed: boolean,
    todoList:  {
      __typename: "TodoList",
      id: string,
      createdAt: string,
      todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
      updatedAt: string,
    },
    userId: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      createdAt: string,
      completed: boolean,
      todoList:  {
        __typename: "TodoList",
        id: string,
        createdAt: string,
        updatedAt: string,
      },
      userId: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTodoListQueryVariables = {
  id: string,
};

export type GetTodoListQuery = {
  getTodoList:  {
    __typename: "TodoList",
    id: string,
    createdAt: string,
    todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        name: string,
        createdAt: string,
        completed: boolean,
        userId: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListTodoListsQueryVariables = {
  filter?: ModelTodoListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodoListsQuery = {
  listTodoLists:  {
    __typename: "ModelTodoListConnection",
    items:  Array< {
      __typename: "TodoList",
      id: string,
      createdAt: string,
      todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    createdAt: string,
    completed: boolean,
    todoList:  {
      __typename: "TodoList",
      id: string,
      createdAt: string,
      todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
      updatedAt: string,
    },
    userId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    createdAt: string,
    completed: boolean,
    todoList:  {
      __typename: "TodoList",
      id: string,
      createdAt: string,
      todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
      updatedAt: string,
    },
    userId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    createdAt: string,
    completed: boolean,
    todoList:  {
      __typename: "TodoList",
      id: string,
      createdAt: string,
      todos:  {
        __typename: "ModelTodoConnection",
        nextToken: string | null,
      } | null,
      updatedAt: string,
    },
    userId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTodoListSubscription = {
  onCreateTodoList:  {
    __typename: "TodoList",
    id: string,
    createdAt: string,
    todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        name: string,
        createdAt: string,
        completed: boolean,
        userId: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoListSubscription = {
  onUpdateTodoList:  {
    __typename: "TodoList",
    id: string,
    createdAt: string,
    todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        name: string,
        createdAt: string,
        completed: boolean,
        userId: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoListSubscription = {
  onDeleteTodoList:  {
    __typename: "TodoList",
    id: string,
    createdAt: string,
    todos:  {
      __typename: "ModelTodoConnection",
      items:  Array< {
        __typename: "Todo",
        id: string,
        name: string,
        createdAt: string,
        completed: boolean,
        userId: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};
