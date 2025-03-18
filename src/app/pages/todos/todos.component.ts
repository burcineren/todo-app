import { Component } from '@angular/core';
import { InProgressComponent } from './in-progress/in-progress.component';
import { DoneComponent } from './done/done.component';
import { TodoComponent } from "./todo/todo.component";

@Component({
  selector: 'todos',
  standalone: true,
  imports: [InProgressComponent, DoneComponent, TodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

}
