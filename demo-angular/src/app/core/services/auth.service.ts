import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USER_KEY  = 'currentUser';
  private readonly TOKEN_KEY = 'authToken';
  private readonly isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  //  Token 

  saveToken(token: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  //  Usuario 

  saveUser(user: User): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  // Status 

  isAuthenticated(): boolean {
    return this.getToken() !== null && this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.nombreRol?.toUpperCase() === 'ADMIN';
  }

  isViewer(): boolean {
    return this.getCurrentUser()?.nombreRol?.toUpperCase() === 'VIEWER';
  }

  isEditor(): boolean {
    return this.getCurrentUser()?.nombreRol?.toUpperCase() === 'EDITOR';
  }

  // Logout

  logout(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
}