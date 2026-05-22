import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CreateUser, UpdatePassword, UpdateUser, User } from '../models/admin.model';
import { AuthService } from './auth.service';

export interface AuthResponse {
  accessToken:        string;
  tokenType:          string;
  expiresInSeconds:   number;
  idUsuario:          number;
  nombre:             string;
  correo:             string;
  apellido:           string;
  celular:            string;
  nombreOrganizacion: string;
  roles:              string[];
  estaActivo:         boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080/usuarios';
  private authUrl = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

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

  login(correo: string, contrasena: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, { correo, contrasena }).pipe(
      tap((res) => {
        this.authService.saveToken(res.accessToken);

        const user: Partial<User> = {
          idUsuario: res.idUsuario,
          nombre: res.nombre,
          apellido: res.apellido,
          correo: res.correo,
          celular: res.celular,
          nombreOrganizacion: res.nombreOrganizacion,
          nombreRol: res.roles?.[0]?.replace('ROLE_', ''),
          estaActivo: res.estaActivo,
        };
        this.authService.saveUser(user as User);
      }),
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
