/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      email
      createdAt
      updatedAt
      owner
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
export const onUpdateRoutine = /* GraphQL */ `
  subscription OnUpdateRoutine {
    onUpdateRoutine {
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
export const onDeleteRoutine = /* GraphQL */ `
  subscription OnDeleteRoutine {
    onDeleteRoutine {
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
export const onCreateDay = /* GraphQL */ `
  subscription OnCreateDay {
    onCreateDay {
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
export const onUpdateDay = /* GraphQL */ `
  subscription OnUpdateDay {
    onUpdateDay {
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
export const onDeleteDay = /* GraphQL */ `
  subscription OnDeleteDay {
    onDeleteDay {
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
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise {
    onCreateExercise {
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
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise {
    onUpdateExercise {
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
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise {
    onDeleteExercise {
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
