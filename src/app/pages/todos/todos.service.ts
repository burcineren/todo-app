import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TodoModel } from './models/todo.model';
import { DeleteHandlerService } from '../../core/services/delete-handler.service';

export type TodoStoreType = {
  todos: TodoModel[],
  isTodoFormVisible: boolean,
  editTodoItem: TodoModel | null
}
@Injectable({
  providedIn: 'root'
})
export class TodosService extends DeleteHandlerService {
  todoStore$: WritableSignal<TodoStoreType> = signal({} as TodoStoreType);
  constructor() {
    super();
  }
  apiUrl = 'http://localhost:3000';
  getAllTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.apiUrl}/todos`).pipe(map((response) => {
      this.todoListReducer("Add", response);
      return response;
    }));
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(`${this.apiUrl}/todos`, todo).pipe(map((response) => {
      this.todoListReducer("Add", [response]);
      return response;
    }));
  }
  updateTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.put<TodoModel>(`${this.apiUrl}/todos/${todo.id}`, todo).pipe(map((response) => {
      this.todoListReducer("Edit", [response]);

      return response;
    }));
  }
  deleteTodo(todo: TodoModel) {
    const endpoint = `${this.apiUrl}/todos/${todo.id}`;
    this.delete(endpoint).subscribe(() => {
      this.todoListReducer("Delete", [todo]);
    });

  }
  toogleDialog(action: "Edit" | "Add" | "Closed", todoItem: TodoModel | null = null,) {
    this.todoStore$.update((prev) => {
      return {
        ...prev,
        isTodoFormVisible: !prev.isTodoFormVisible,
        editTodoItem: action == "Edit" ? todoItem : null
      }
    })
  }
  // todoListReducer(action: "Edit" | "Add" | "Delete" | "Set", updatedTodo: TodoModel, todoList?: TodoModel[]) {
  //   let updatedTodos: TodoModel[] = [];
  //   const prev = this.todoStore$().todos;
  //   switch (action) {
  //     case "Edit":
  //       updatedTodos = prev.map((item) => item.id == updatedTodo.id ? updatedTodo : item)
  //       break;
  //     case "Add":
  //       updatedTodos = [updatedTodo, ...prev]
  //       break;
  //     case "Delete":
  //       updatedTodos = prev.filter((item) => item.id != updatedTodo.id);
  //       break;
  //     case "Set":
  //       if (todoList) {
  //         updatedTodos = [...todoList!]
  //       } else {
  //         console.error("todoList is required for Set action");
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   this.todoStore$.update((prev) => {
  //     return {
  //       ...prev,
  //       todos: updatedTodos
  //     }
  //   })
  // }
  todoListReducer(action: "Edit" | "Add" | "Delete", updatedTodoList: TodoModel[]) {
    let updatedTodos: TodoModel[] = [];
    const prev = this.todoStore$().todos;
    switch (action) {
      case "Edit":
        updatedTodos = prev.map((item) => updatedTodoList.some((x) => x.id == item.id) ? updatedTodoList.find((x) => x.id == item.id)! : item)
        break;
      case "Add":
        updatedTodos = [...updatedTodoList, ...prev]
        break;
      case "Delete":
        updatedTodos = prev.filter((item) => !updatedTodoList.some((x) => x.id == item.id));
        break;

      default:
        break;
    }
    this.todoStore$.update((prev) => {
      return {
        ...prev,
        todos: updatedTodos
      }
    })
  }
}
