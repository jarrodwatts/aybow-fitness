/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      createdAt
      completed
      todoList {
        id
        createdAt
        todos {
          nextToken
        }
        updatedAt
      }
      userId
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      createdAt
      completed
      todoList {
        id
        createdAt
        todos {
          nextToken
        }
        updatedAt
      }
      userId
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      createdAt
      completed
      todoList {
        id
        createdAt
        todos {
          nextToken
        }
        updatedAt
      }
      userId
      updatedAt
    }
  }
`;
export const createTodoList = /* GraphQL */ `
  mutation CreateTodoList(
    $input: CreateTodoListInput!
    $condition: ModelTodoListConditionInput
  ) {
    createTodoList(input: $input, condition: $condition) {
      id
      createdAt
      todos {
        items {
          id
          name
          createdAt
          completed
          userId
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const updateTodoList = /* GraphQL */ `
  mutation UpdateTodoList(
    $input: UpdateTodoListInput!
    $condition: ModelTodoListConditionInput
  ) {
    updateTodoList(input: $input, condition: $condition) {
      id
      createdAt
      todos {
        items {
          id
          name
          createdAt
          completed
          userId
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const deleteTodoList = /* GraphQL */ `
  mutation DeleteTodoList(
    $input: DeleteTodoListInput!
    $condition: ModelTodoListConditionInput
  ) {
    deleteTodoList(input: $input, condition: $condition) {
      id
      createdAt
      todos {
        items {
          id
          name
          createdAt
          completed
          userId
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
