import { Injectable, inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map, take} from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })

export const AuthGuard: CanActivateFn = (route, state, ) => {
  const AutService = inject(AuthenticationService);

  return AutService.status().pipe(
    take(1),
    map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        const router = inject(Router);
        router.navigate(['login']);
        return false;
      }
      return true;
    })
  );


  // const token = localStorage.getItem('token');
  // console.log(route);
  // console.log(state);
  // const router = inject(Router);
  // console.log('Im in auth guard');
  // console.log('token', token);
  // if(token) {
  //   return true;
  // } else {
  //   router.navigate(['login']);
  //   return false;
  // }

};
