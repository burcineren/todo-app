import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CardModule, PanelModule, AvatarModule, ButtonModule, MenuModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  task = {
    name: 'Örnek Görev',
    content: 'Bu bir örnek görev içeriğidir.',
    creationDate: '2025-03-20',
    endDate: '2025-03-25',
  };

  editTask(task: any) {
    console.log('Düzenle tıklandı:', task);
  }

  deleteTask(task: any) {
    console.log('Sil tıklandı:', task);
  }
}
