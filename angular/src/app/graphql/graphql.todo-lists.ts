import { gql } from "apollo-angular";

export const GET_ALL_TODO_LISTS = gql`
    query GetAllTodoLists {
        allTodoLists {
            id
            title
            tasks {
                id
                title
                description
            }
        }
    }
`;

export const GET_TODO_LIST = gql`
    query GetTodoList($id: ID!) {
        todoList(id: $id) {
            id
            title
            tasks {
                id
                title
                description
            }
        }
    }
`;

export const CREATE_TODO_LIST = gql`
    mutation CreateTodoList($title: String!, $tasks: [TaskInput!]!) {
        createTodoList(input: { title: $title, tasks: $tasks }) {
            id
            title
        }
    }
`;

export const UPDATE_TODO_LIST = gql`
    mutation UpdateTodoList($id: ID!, $title: String!) {
        updateTodoList(id: $id, input: { title: $title }) {
            id
            title
        }
    }
`;

export const DELETE_TODO_LIST = gql`
    mutation DeleteTodoList($id: ID!) {
        deleteTodoList(id: $id) {
            id
            title
        }
    }
`;

export const CREATE_TASK = gql`
    mutation CreateTask($title: String!, $description: String!, $todoListId: ID!) {
        createTask(input: { title: $title, description: $description, todoListId: $todoListId }) {
            id
            title
            description
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $title: String!, $description: String!) {
        updateTask(id: $id, input: { title: $title, description: $description }) {
            id
            title
            description
        }
    }
`;

export const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
            id
            title
            description
        }
    }
`;