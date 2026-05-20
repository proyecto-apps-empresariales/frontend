import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUser, UpdatePassword, UpdateUser, User } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  post(payload: CreateUser): Observable<User> {
    return this.http.post<User>(`${this.url}`, payload);
  }

  patch(id: number, payload: UpdateUser): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, payload);
  }

  updateContrasena(payload: UpdatePassword): Observable<void> {
    return this.http.put<void>(`${this.url}/contrasena`, payload);
  }

   login(correo: string, contrasena: string): Observable<User> {
    return this.http.get<User>(`${this.url}/login/${encodeURIComponent(correo)}/${encodeURIComponent(contrasena)}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}