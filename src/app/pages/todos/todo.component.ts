import { Component, OnInit } from '@angular/core';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodosService } from './todos.service';
import { TodoModel } from './models/todo.model';
import { TodoStatusEnum, TodoStatusLookup } from '../../core/enums/todo-status.enum';
import { CommonModule } from '@angular/common';
import { TodoDoneColumnComponent } from './components/todo-done-column/todo-done-column.component';
import { TodoStartColumnComponent } from './components/todo-start-column/todo-start-column.component';
import { TodoProgressColumnComponent } from './components/todo-progress-column/todo-progress-column.component';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CommonModule, TodoDoneColumnComponent, TodoStartColumnComponent, TodoProgressColumnComponent, TodoCardComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todos$: TodoModel[] = [];

  title = TodoStatusLookup;
  constructor(private todoService: TodosService) {
  }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe((todos: TodoModel[]) => {
      this.todos$ = todos;
      console.log(todos);
    });
  }
}
