import { Component, OnInit, signal } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoStatusEnum, TodoStatusLookup } from '../../../../core/enums/todo-status.enum';
import { StatusLabelPipe } from '../../../../core/pipes/status-label.pipe';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'app-todo-start-column',
  standalone: true,
  imports: [TodoCardComponent, StatusLabelPipe],
  templateUrl: './todo-start-column.component.html',
  styleUrl: './todo-start-column.component.scss'
})
export class TodoStartColumnComponent {
  todoStatusEnum = TodoStatusEnum;
  constructor(private todoService: TodosService) { }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
