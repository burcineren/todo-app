import { Component, Input, Signal, computed, effect } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodosService } from '../../todos.service';
import { TodoModel } from '../../models/todo.model';
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [Dialog, ButtonModule, DatePickerModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  visible$: Signal<boolean> = computed(() => this.todosService.todoStore$().isTodoFormVisible);
  visible: boolean = false;
  editTodoItem: Signal<TodoModel | null> = computed(() => this.todosService.todoStore$().editTodoItem);
  constructor(private todosService: TodosService) {
    effect(() => {
      this.visible = this.visible$();
      if (this.editTodoItem()) {
        this.form.patchValue({
          ...this.editTodoItem(),
          endDate: new Date(this.editTodoItem()!.endDate)
        });
      } else {
        this.form.reset();
      }
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
    this.todosService.toogleDialog("Closed");
  }
  closeDialog() {
    this.visible = false;
  }
  save() {
    if (this.form.valid) {
      const todoItem: TodoModel = {
        ...this.form.value,
        id: this.editTodoItem() ? this.editTodoItem()!.id : Math.floor(Math.random() * 1000).toString(),
        status: this.editTodoItem() ? this.editTodoItem()!.status : 1,
        creationDate: this.editTodoItem() ? this.editTodoItem()!.creationDate : (new Date()).toISOString(),
        endDate: this.form.value.endDate.toISOString()
      }
      if (this.editTodoItem()) {
        this.todosService.updateTodo(todoItem).subscribe(() => {
          this.closeDialog();
        });
      } else {
        this.todosService.addTodo(todoItem).subscribe(() => {
          this.closeDialog();
        })
      }
    }
  }
}
