import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'done',
  standalone: true,
  imports: [CardModule],
  templateUrl: './done.component.html',
  styleUrl: './done.component.scss'
})
export class DoneComponent {

}
