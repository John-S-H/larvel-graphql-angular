import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { ToDoListService } from '../to-do-list.service';
import { CREATE_TODO_LIST, GET_ALL_TODO_LISTS } from '../graphql/graphql.todo-lists';

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

interface CreateToDoListMutationData {
  createToDoList: TodoList;
}

@Component({
             selector:    'app-todo-list',
             templateUrl: './to-do-list.component.html',
             styleUrls:   ['./to-do-list.component.scss']
           })
export class TodoListComponent implements OnInit {
  todoLists: TodoList[]             = [];
  selectedTodoList: TodoList | null = null;
  newTaskTitle                      = '';
  newTaskDescription                = '';
  newTodoListTitle                  = '';
  showCreateForm                    = false;

  constructor(private apollo: Apollo, private todoListService: ToDoListService) {
  }

  ngOnInit() {
    this.fetchTodoLists();
  }

  fetchTodoLists() {
    this.todoListService.getAllTodoLists().subscribe(
      (result: any) => {
        if (Array.isArray(result)) {
          this.todoLists = result.map((list: any) => {
            return {
              id:    list.id,
              title: list.title,
              tasks: list.tasks.map((task: any) => {
                return {
                  id:          task.id,
                  title:       task.title,
                  description: task.description
                };
              })
            };
          });
          console.log('Fetched todo lists:', this.todoLists);
        }
        else {
          console.error('Todo lists not found in response');
        }
      },
      (error: any) => {
        console.error('Error fetching todo lists:', error);
      }
    );
  }

  selectTodoList(todoList: TodoList) {
    this.selectedTodoList = todoList;
  }


  createTodoList(title: string, taskTitle: string, taskDescription: string) {
    if (!title) {
      console.error('Title is required');
      return;
    }

    this.apollo
    .mutate<CreateToDoListMutationData>({
                                          mutation:  CREATE_TODO_LIST,
                                          variables: {
                                            title,
                                            tasks: [
                                              {
                                                title:       taskTitle,
                                                description: taskDescription
                                              }
                                            ]
                                          },
                                          update:    (cache, {data}) => {
                                            console.log('Mutation response:', data); // Log the mutation response

                                            const newToDoList = data?.createToDoList;

                                            if (newToDoList) {
                                              cache.modify(
                                                {
                                                  fields: {
                                                    todoLists(existingToDoLists = []) {
                                                      const newToDoListRef = cache.writeFragment(
                                                        {
                                                          data:     newToDoList,
                                                          fragment: gql`
                                                              fragment NewToDoList on TodoList {
                                                                  id
                                                                  title
                                                                  tasks {
                                                                      id
                                                                      title
                                                                      description
                                                                  }
                                                              }
                                                          `,
                                                        });
                                                      return [...existingToDoLists, newToDoListRef];
                                                    },
                                                  },
                                                });
                                              console.log('New todo list:', newToDoList);
                                            }
                                            else {
                                              console.log('No new todo list');
                                            }
                                          },
                                        })
    .subscribe();

    this.showCreateForm = false;
  }


  createTask(todoListId: string, title: string, description: string) {
    if (!title) {
      console.error('Task title is required');
      return;
    }

    this.apollo
    .mutate<any>({
                   mutation:  gql`
                       mutation CreateTask($todoListId: ID!, $title: String!, $description: String!) {
                           createTask(todoListId: $todoListId, title: $title, description: $description) {
                               id
                               title
                               description
                           }
                       }
                   `,
                   variables: {
                     todoListId,
                     title,
                     description
                   }
                 })
    .subscribe((response) => {
      console.log('Task created:', response.data.createTask);
    });
  }


  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  addTask() {
    const task: Task = {
      id:          '', // Generate a unique ID for the task
      title:       this.newTaskTitle,
      description: this.newTaskDescription
    };
    if (this.selectedTodoList) {
      this.selectedTodoList.tasks.push(task);
    }
    this.newTaskTitle       = '';
    this.newTaskDescription = '';
  }
}