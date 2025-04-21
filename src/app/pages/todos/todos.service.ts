import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TodoModel } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  isTodoFormVisible$: WritableSignal<boolean> = signal(false);
  todos$: WritableSignal<TodoModel[]> = signal([]);
  editTodoItem$: WritableSignal<TodoModel | null> = signal(null);
  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000';
  getAllTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.apiUrl}/todos`).pipe(map((response) => {
      this.todos$.set(response);
      return response;
    }));
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(`${this.apiUrl}/todos`, todo).pipe(map((response) => {
      this.todos$.update((prev) => [...prev, response]);
      return response;
    }));
  }
  updateTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.put<TodoModel>(`${this.apiUrl}/todos/${todo.id}`, todo).pipe(map((response) => {
      this.todos$.update((prev) => {
        return prev.map((item) => item.id == todo.id ? todo : item);
      })
      return response;
    }));
  }
  deleteTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.delete<TodoModel>(`${this.apiUrl}/todos/${todo.id}`).pipe(map((response) => {
      this.todos$.update((prev) => prev.filter((item) => item.id != todo.id))
      return response;
    }));
  }
  toogleDialog(action: "Edit" | "Add" | "Closed", todoItem: TodoModel | null = null,) {
    this.isTodoFormVisible$.update((prev) => !this.isTodoFormVisible$());
    if (action == "Edit") {
      this.editTodoItem$.update(() => todoItem);
    }
    else if (action == "Closed" || action == "Add") {
      this.editTodoItem$.update(() => null);
    }
  }
}
