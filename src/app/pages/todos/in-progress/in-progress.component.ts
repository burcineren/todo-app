import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'in-progress',
  standalone: true,
  imports: [CardModule],
  templateUrl: './in-progress.component.html',
  styleUrl: './in-progress.component.scss'
})
export class InProgressComponent {

}
