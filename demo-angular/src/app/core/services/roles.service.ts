import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateRole, Role, UpdateRole } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private url = 'http://localhost:8080/roles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url);
  }

  post(payload: CreateRole): Observable<Role> {
    return this.http.post<Role>(`${this.url}`, payload);
  }

  patch(id: number, payload: UpdateRole): Observable<Role> {
    return this.http.put<Role>(`${this.url}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}