// ─── tipo-peticion.service.ts ─────────────────────────────────────
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class RequestTypeService {
  private url = 'http://localhost:8080/tipo-peticion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoPeticionFlujo[]> {
    return this.http.get<TipoPeticionFlujo[]>(this.url);
  }

  post(payload: CreateUpdateTipoPeticion): Observable<TipoPeticionFlujo> {
    return this.http.post<TipoPeticionFlujo>(`${this.url}`, payload);
  }

  patch(id: number, payload: CreateUpdateTipoPeticion): Observable<TipoPeticionFlujo> {
    return this.http.put<TipoPeticionFlujo>(`${this.url}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}


// ─── estado-peticion.service.ts ───────────────────────────────────


@Injectable({ providedIn: 'root' })
export class RequestStateService {
  private url = 'http://localhost:8080/estado-peticion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EstadoPeticionFlujo[]> {
    return this.http.get<EstadoPeticionFlujo[]>(this.url);
  }

  post(payload: CreateUpdateEstadoPeticion): Observable<EstadoPeticionFlujo> {
    return this.http.post<EstadoPeticionFlujo>(`${this.url}`, payload);
  }

  patch(id: number, payload: CreateUpdateEstadoPeticion): Observable<EstadoPeticionFlujo> {
    return this.http.put<EstadoPeticionFlujo>(`${this.url}/${id}`, payload);
  }
}


// ─── requerimiento-peticion.service.ts ───────────────────────────

import { CreateUpdateEstadoPeticion, CreateUpdateRequerimientoPeticion, CreateUpdateTipoPeticion, EstadoPeticionFlujo, RequerimientoPeticion, TipoPeticionFlujo } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class RequestRequirementService {
  private url = 'http://localhost:8080/requerimiento-peticion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RequerimientoPeticion[]> {
    return this.http.get<RequerimientoPeticion[]>(this.url);
  }

  post(payload: CreateUpdateRequerimientoPeticion): Observable<RequerimientoPeticion> {
    return this.http.post<RequerimientoPeticion>(`${this.url}/crear`, payload);
  }

  patch(id: number, payload: CreateUpdateRequerimientoPeticion): Observable<RequerimientoPeticion> {
    return this.http.patch<RequerimientoPeticion>(`${this.url}/update/${id}`, payload);
  }
}