import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel',
  standalone: true
})
export class StatusLabelPipe implements PipeTransform {
  transform(label: string): string {
    return label.toLocaleUpperCase('tr-TR');
  }
}
