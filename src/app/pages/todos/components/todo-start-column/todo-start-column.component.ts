import { Component } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoStatusLookup } from '../../../../core/enums/todo-status.enum';
import { StatusLabelPipe } from '../../../../core/pipes/status-label.pipe';

@Component({
  selector: 'app-todo-start-column',
  standalone: true,
  imports: [TodoCardComponent, StatusLabelPipe],
  templateUrl: './todo-start-column.component.html',
  styleUrl: './todo-start-column.component.scss'
})
export class TodoStartColumnComponent {
  title = TodoStatusLookup;

  trackById(index: number, item: any): number {
    return item.id;
  }
}
