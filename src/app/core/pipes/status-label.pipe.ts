import { Pipe, PipeTransform } from '@angular/core';
import { TodoStatusEnum, TodoStatusLookup } from '../enums/todo-status.enum';
import { IdLabelPair } from '../models/id-label-pair';

@Pipe({
  name: 'statusLabel',
  standalone: true
})
export class StatusLabelPipe implements PipeTransform {
  todoStatus: IdLabelPair<TodoStatusEnum>[] = TodoStatusLookup;
  transform(enumValue: TodoStatusEnum): string {
    return this.todoStatus.find(x => x.id === enumValue)?.label || '';
  }
}
