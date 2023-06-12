import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_ALL_TODO_LISTS, GET_TODO_LIST } from './graphql/graphql.todo-lists';


interface TodoList {
  id: string;
  title: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
}

interface AllTodoListsQuery {
  allTodoLists: TodoList[];
}

interface TodoList {
  id: string;
  title: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
}


@Injectable({
              providedIn: 'root'
            })
export class ToDoListService {
  constructor(private apollo: Apollo) {
  }

  createTodoList(title: string) {
    return this.apollo.mutate(
      {
        mutation:  gql`
            mutation CreateTodoList($title: String!) {
                createTodoList(input: { title: $title }) {
                    id
                    title
                }
            }
        `,
        variables: {
          title: title
        }
      });
  }

  getAllTodoLists(): Observable<TodoList[]> {
    return this.apollo
      .watchQuery<AllTodoListsQuery>(
        {
          query: GET_ALL_TODO_LISTS
        })
      .valueChanges.pipe(
        map(({data}) => data.allTodoLists)
      );
  }

  getTodoList(id: string) {
    return this.apollo.watchQuery(
      {
        query:     gql`
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
        `,
        variables: {
          id: id
        }
      }).valueChanges;
  }

  updateTodoList(id: string, title: string) {
    return this.apollo.mutate(
      {
        mutation:  gql`
            mutation UpdateTodoList($id: ID!, $title: String!) {
                updateTodoList(id: $id, input: { title: $title }) {
                    id
                    title
                }
            }
        `,
        variables: {
          id:    id,
          title: title
        }
      });
  }

  deleteTodoList(id: string) {
    return this.apollo.mutate(
      {
        mutation:  gql`
            mutation DeleteTodoList($id: ID!) {
                deleteTodoList(id: $id) {
                    id
                }
            }
        `,
        variables: {
          id: id
        }
      });
  }


  createTask(todoListId: string, title: string, description: string) {
    return this.apollo.mutate(
      {
        mutation:  gql`
            mutation CreateTask($todoListId: ID!, $title: String!, $description: String!) {
                createTask(input: { todoListId: $todoListId, title: $title, description: $description }) {
                    id
                    title
                    description
                }
            }
        `,
        variables: {
          todoListId:  todoListId,
          title:       title,
          description: description
        }
      });
  }

  updateTask(taskId: string, title: string, description: string) {
    return this.apollo.mutate(
      {
        mutation:  gql`
            mutation UpdateTask($taskId: ID!, $title: String!, $description: String!) {
                updateTask(id: $taskId, input: { title: $title, description: $description }) {
                    id
                    title
                    description
                }
            }
        `,
        variables: {
          taskId:      taskId,
          title:       title,
          description: description
        }
      });
  }

  deleteTask(taskId: string) {
    return this.apollo.mutate(
      {
        mutation:  gql`
            mutation DeleteTask($taskId: ID!) {
                deleteTask(id: $taskId) {
                    id
                }
            }
        `,
        variables: {
          taskId: taskId
        }
      });
  }

}