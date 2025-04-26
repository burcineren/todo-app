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
      this.todoStore$.update((prev) => {
        return {
          ...prev,
          todos: response
        }
      });
      return response;
    }));
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(`${this.apiUrl}/todos`, todo).pipe(map((response) => {
      this.todoStore$.update((prev) => {
        return {
          ...prev,
          todos: [...prev.todos, response]
        }
      });
      return response;
    }));
  }
  updateTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.put<TodoModel>(`${this.apiUrl}/todos/${todo.id}`, todo).pipe(map((response) => {
      this.todoStore$.update((prev) => {
        return {
          ...prev,
          todos: prev.todos.map((item) => item.id == todo.id ? todo : item)
        }
      });
      return response;
    }));
  }
  deleteTodo(todo: TodoModel) {
    const endpoint = `${this.apiUrl}/todos/${todo.id}`;
    this.delete(endpoint).subscribe(() => {
      this.todoStore$.update((prev) => {
        return {
          ...prev,
          todos: prev.todos.filter((item) => item.id != todo.id)
        }
      });
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
}
