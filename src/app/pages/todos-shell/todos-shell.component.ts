import { Component, OnInit } from '@angular/core';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodosService } from './todos.service';
import { TodoModel } from './models/todo.model';

@Component({
  selector: 'app-todos-shell',
  standalone: true,
  imports: [TodoCardComponent],
  templateUrl: './todos-shell.component.html',
  styleUrl: './todos-shell.component.scss'
})
export class TodosShellComponent implements OnInit {
  todos$: TodoModel[] = [];
  constructor(private todoService: TodosService) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe((todos: TodoModel[]) => {
      this.todos$ = [...todos];
      console.log(todos);
    });
  }
}
