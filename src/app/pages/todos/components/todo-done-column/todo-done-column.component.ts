import { Component, signal } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoStatusLookup } from '../../../../core/enums/todo-status.enum';
import { StatusLabelPipe } from '../../../../core/pipes/status-label.pipe';

@Component({
  selector: 'app-todo-done-column',
  standalone: true,
  imports: [TodoCardComponent, StatusLabelPipe],
  templateUrl: './todo-done-column.component.html',
  styleUrl: './todo-done-column.component.scss'
})
export class TodoDoneColumnComponent {
  title = signal(TodoStatusLookup);

  trackById(index: number, item: any): number {
    return item.id;
  }
}
