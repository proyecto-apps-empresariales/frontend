import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


/**
 * authInterceptor
 * Adjunta las cabeceras X-User-Id y X-User-Role en cada petición HTTP
 * cuando hay un usuario autenticado.
 *
 * Esto permite que el backend (Spring Boot) identifique al solicitante
 * sin necesidad de JWT por ahora.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const user = auth.getCurrentUser();

  if (!user) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      'X-User-Id': String(user.idUsuario),
      'X-User-Role': user.nombreRol?.toUpperCase() ?? '',
    },
  });

  return next(cloned);
};