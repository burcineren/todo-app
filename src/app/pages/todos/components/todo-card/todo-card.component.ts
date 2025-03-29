import { Component, EventEmitter, Output } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [TooltipModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  task = {
    name: 'Örnek Görev',
    content: 'Bu bir örnek görev içeriğidir.',
    creationDate: '2025-03-20',
    endDate: '2025-03-25',
  };
  constructor(private todosService: TodosService) { }
  addTodoHandle() {
    this.todosService.toogleDialog();
  }
}
