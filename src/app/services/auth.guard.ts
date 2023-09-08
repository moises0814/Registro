import { Injectable, inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map, take} from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })

export const AuthGuard: CanActivateFn = (route, state, ) => {
  const token = localStorage.getItem('token');
  console.log(route);
  console.log(state);
  const router = inject(Router);
  console.log('Im in auth guard');
  console.log('token', token);
  if(token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }

};
