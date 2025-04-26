import { Component, OnInit, Signal, computed, effect, signal } from '@angular/core';
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
  todos$ = computed<TodoModel[]>(() => this.todoService.todoStore$().todos);
  todo: TodoModel[] = [];
  inProgress: TodoModel[] = [];
  done: TodoModel[] = [];
  constructor(private todoService: TodosService) {
    effect(() => {
      console.log(this.todos$());
      this.todo = this.todos$()?.filter(todo => todo.status === TodoStatusEnum.TODO);
      this.inProgress = this.todos$()?.filter(todo => todo.status === TodoStatusEnum.IN_PROGRESS);
      this.done = this.todos$()?.filter(todo => todo.status === TodoStatusEnum.DONE);
    });
  }

  ngOnInit() {
    if (!this.todos$() || this.todos$()?.length == 0) {
      this.todoService.getAllTodos().subscribe();
    }
  }
  addTodoHandle() {
    this.todoService.toogleDialog("Add");
  }
}
