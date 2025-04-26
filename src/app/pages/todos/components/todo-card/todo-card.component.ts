import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { TodosService } from '../../todos.service';
import { TodoModel } from '../../models/todo.model';
import { TodoStatusEnum } from '../../../../core/enums/todo-status.enum';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [TooltipModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input() todoItem!: TodoModel;
  todoStatusEnum = TodoStatusEnum;

  constructor(private todosService: TodosService) { }
  addTodoHandle() {
    this.todosService.toogleDialog("Edit", this.todoItem);
  }
  deleteTodo() {
    this.todosService.deleteTodo(this.todoItem)
  }
  todoStatuUpdateHandler(action: "Down" | "Up") {
    const todo = {
      ...this.todoItem,
      status: action === "Down" ? --this.todoItem.status : ++this.todoItem.status
    }
    this.todosService.updateTodo(todo).subscribe();
  }

}
