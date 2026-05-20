import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


/**
 * adminGuard
 * Permite el acceso solo a usuarios con rol ADMIN.
 * Si el usuario es USER, lo redirige a /documents (acceso denegado).
 * Si no está autenticado, lo redirige a /login.
 */
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (auth.isAdmin()) {
    return true;
  }

  // Usuario autenticado pero sin permisos de admin
  return router.createUrlTree(['/documents']);
};