import { Component } from '@angular/core';
import { InProgressComponent } from './in-progress/in-progress.component';
import { DoneComponent } from './done/done.component';
import { TodoComponent } from "./todo/todo.component";
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { DragDropModule } from 'primeng/dragdrop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'todos',
  standalone: true,
  imports: [InProgressComponent, DoneComponent, TodoComponent, ButtonModule, Dialog, InputTextModule, AvatarModule, DragDropModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
