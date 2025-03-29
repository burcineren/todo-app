import { Component, Input, Signal, computed, effect } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodosService } from '../../todos.service';
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [Dialog, ButtonModule, DatePickerModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  visible$: Signal<boolean> = computed(() => this.todosService.isTodoFormVisible$());
  visible: boolean = false;
  constructor(private todosService: TodosService) {
    effect(() => {
      this.visible = this.visible$();
    })
  }
  form: FormGroup = new FormGroup(
    {
      title: new FormControl<String>(''),
      content: new FormControl<String>(''),
      endDate: new FormControl<Date>(new Date())
    }
  );
  onHideHandler() {
    this.todosService.toogleDialog();
  }
  closeDialog() {
    this.visible = false;
  }
}
