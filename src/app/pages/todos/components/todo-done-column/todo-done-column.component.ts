import { Component, Input, signal } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoStatusEnum, TodoStatusLookup } from '../../../../core/enums/todo-status.enum';
import { StatusLabelPipe } from '../../../../core/pipes/status-label.pipe';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'app-todo-done-column',
  standalone: true,
  imports: [TodoCardComponent, StatusLabelPipe],
  templateUrl: './todo-done-column.component.html',
  styleUrl: './todo-done-column.component.scss'
})
export class TodoDoneColumnComponent {
  todoStatusEnum = TodoStatusEnum;
  @Input() todos: TodoModel[] = [];

  trackById(index: number, item: any): number {
    return item.id;
  }
}
