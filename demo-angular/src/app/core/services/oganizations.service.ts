import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrganization, Organization, UpdateOrganization } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private url = 'http://localhost:8080/organizaciones';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.url);
  }

  post(payload: CreateOrganization): Observable<Organization> {
    return this.http.post<Organization>(`${this.url}`, payload);
  }

  patch(id: number, payload: UpdateOrganization): Observable<Organization> {
    return this.http.put<Organization>(`${this.url}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}