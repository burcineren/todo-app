import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CardModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
