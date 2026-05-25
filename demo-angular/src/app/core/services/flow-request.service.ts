// ─── peticion-flujo.service.ts ────────────────────────────────────
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import {
  CreateFirmaPeticion,
  CreatePeticionFlujo,
  FirmaPeticionFlujo,
  HistorialPeticionFlujo,
  PeticionFlujo,
  UpdatePeticionFlujo,
} from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class FlowRequestService {
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PeticionFlujo[]> {
    return this.http.get<PeticionFlujo[]>(`${this.url}/peticion`);
  }

  getById(id: number): Observable<PeticionFlujo> {
    return this.http.get<PeticionFlujo>(`${this.url}/peticion/${id}`);
  }

  post(payload: CreatePeticionFlujo): Observable<PeticionFlujo> {
    return this.http.post<PeticionFlujo>(`${this.url}/peticion`, payload);
  }

  patch(id: number, payload: UpdatePeticionFlujo): Observable<PeticionFlujo> {
    return this.http.put<PeticionFlujo>(`${this.url}/peticion/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/peticion/${id}`);
  }

  getHistorial(id: number): Observable<HistorialPeticionFlujo[]> {
    return this.http.get<HistorialPeticionFlujo[]>(`${this.url}/historial/peticion/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) return of([]);
        throw error; // otros errores sí se propagan
      }),
    );
  }

  getFirmas(id: number): Observable<FirmaPeticionFlujo[]> {
    return this.http.get<FirmaPeticionFlujo[]>(`${this.url}/firma-peticion/peticion/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) return of([]);
        throw error;
      }),
    );
  }
  
  firmar(payload: CreateFirmaPeticion): Observable<FirmaPeticionFlujo> {
    return this.http.post<FirmaPeticionFlujo>(`${this.url}/firma-peticion`, payload);
  }

  enviarRevision(id: number): Observable<PeticionFlujo> {
    return this.http.patch<PeticionFlujo>(`${this.url}/peticion/${id}/revision`, {});
  }

  aprobar(id: number): Observable<PeticionFlujo> {
    return this.http.patch<PeticionFlujo>(`${this.url}/peticion/${id}/aprobar`, {});
  }

  rechazar(id: number): Observable<PeticionFlujo> {
    return this.http.patch<PeticionFlujo>(`${this.url}/peticion/${id}/rechazar`, {});
  }

  firmarEstado(id: number): Observable<PeticionFlujo> {
    return this.http.patch<PeticionFlujo>(`${this.url}/peticion/${id}/firmar`, {});
  }

  finalizar(id: number): Observable<PeticionFlujo> {
    return this.http.patch<PeticionFlujo>(`${this.url}/peticion/${id}/finalizar`, {});
  }
}
