import { Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

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
}
