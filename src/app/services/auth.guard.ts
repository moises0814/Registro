import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map, take, tap } from 'rxjs/operators';


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService) as AuthenticationService;
  const router = inject(Router) as Router;
  return authService.status().pipe(
    take(1),
    tap((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
        return false;
      }
      return true;
    })




    // tap((isLoggedIn: boolean) => {
    //   if (!isLoggedIn) {
    //     router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
    //     return false;
    //   }
    //   return true;
    // })
  );
};
