import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'currentUser';
  private readonly isBrowser: boolean;

  constructor() {
    // isPlatformBrowser evita que localStorage explote en SSR (Node.js)
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  getCurrentUser(): User | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.nombreRol?.toUpperCase() === 'ADMIN';
  }

  isViewer(): boolean {
    const user = this.getCurrentUser();
    return user?.nombreRol?.toUpperCase() === 'VIEWER';
  }

  isEditor(): boolean {
    const user = this.getCurrentUser();
    return user?.nombreRol?.toUpperCase() === 'EDITOR';
  }

  logout(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  saveUser(user: User): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }
}
