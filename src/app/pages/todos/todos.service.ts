import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000';
  getAllTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.apiUrl}/todos`);
  }
}
