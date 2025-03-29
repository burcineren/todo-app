import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { TodosService } from './todos.service';
import { TodoModel } from './models/todo.model';
import { CommonModule } from '@angular/common';
import { TodoDoneColumnComponent } from './components/todo-done-column/todo-done-column.component';
import { TodoStartColumnComponent } from './components/todo-start-column/todo-start-column.component';
import { TodoProgressColumnComponent } from './components/todo-progress-column/todo-progress-column.component';
import { TodoStatusEnum } from '../../core/enums/todo-status.enum';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CommonModule, TodoDoneColumnComponent, TodoStartColumnComponent, TodoProgressColumnComponent, TodoFormComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todos$ = signal<TodoModel[]>([]);
  todo: TodoModel[] = [];
  inProgress: TodoModel[] = [];
  done: TodoModel[] = [];
  constructor(private todoService: TodosService) { }

  ngOnInit() {

    this.todoService.getAllTodos().subscribe((todos: TodoModel[]) => {
      this.todo = todos.filter(todo => todo.status === TodoStatusEnum.TODO);
      this.inProgress = todos.filter(todo => todo.status === TodoStatusEnum.IN_PROGRESS);
      this.done = todos.filter(todo => todo.status === TodoStatusEnum.DONE);

      this.todos$.set(todos);
      console.log(todos);
    });
  }
  addTodoHandle() {
    this.todoService.toogleDialog();
  }
}
