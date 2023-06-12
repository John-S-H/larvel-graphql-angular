import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoListService } from '../to-do-list.service';

interface Task {
  id: string;
  title: string;
  description: string;
}

interface ToDoList {
  id: string;
  title: string;
  tasks: Task[];
}


@Component({
  selector: 'app-to-do-list-details',
  templateUrl: './to-do-list-details.component.html',
  styleUrls: ['./to-do-list-details.component.scss']
})
export class ToDoListDetailsComponent {
  todoList: ToDoList | null = null;
  constructor(private route: ActivatedRoute, private todoListService: ToDoListService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const todoListId = params['id'];
      this.fetchTodoList(todoListId);
    });
  }

  fetchTodoList(todoListId: string) {
    this.todoListService.getTodoList(todoListId).subscribe(
      (result: any) => {
        this.todoList = result.data.todoList;
        console.log('Fetched todo list:', this.todoList);
      },
      (error: any) => {
        console.error('Error fetching todo list:', error);
      }
    );
  }

}
