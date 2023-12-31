import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'http://localhost:8000/api';
  private isLoggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) { }

  // Toogle Loggedin
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

   // tslint:disable-next-line:typedef
   loggedIng(){
    return !!localStorage.getItem('token');
  }

  // tslint:disable-next-line:typedef
  getToken(){
    return localStorage.getItem('token');
  }

  // tslint:disable-next-line:typedef



   // Status
  //  status() {
  //   const localData: any = localStorage.getItem('user');
  //   // console.log("service Status: ", localData)
  //   if (!localData) {
  //     this.isLoggedIn.next(false);
  //      console.log('User not lgged in !!');
  //   } else {
  //     const userObj = JSON.parse(localData);
  //     const token_expires_at = new Date(userObj.token_expires_at);
  //     const current_date = new Date();
  //     if (token_expires_at > current_date) {
  //       this.isLoggedIn.next(true);
  //     } else {
  //       this.isLoggedIn.next(false);
  //        console.log('Token Expires!!');
  //     }
  //   }
  //   return this.isLoggedIn.asObservable();
  // }

  // Login
  login(email: string, password: string) {
    return this.http.post(this.url +  '/login', {
      email: email,
      password: password,
    });
  }

  // login(email: string, password: string): Observable<any>{
  //   return this.http.post(
  //     this.url + '/login',
  //     {
  //       email: email,
  //       password: password,
  //     }
  //   );
  // }

   // User Info
   user() {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    // console.log("userObj: ", userObj.token)

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.url +  '/user', {
      headers: headers,
    });
  }


  // Logout
  logout(allDevice: boolean){
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.url +  '/logout', {allDevice:allDevice}, {headers:headers});
  }

  // Register
  register(name:string, email:string, password:string, password_confirmation:string){
    const data={
      name:name,
      email:email,
      password:password,
      password_confirmation:password_confirmation,
    }
    return this.http.post(this.url +  '/register', data);
  }

  // Forgot Pass
  forgot(email:string){
    return this.http.post(this.url +  '/forgot', {email:email});
  }

  // Reset Pass
  reset(token:string, password:string,password_confirmation:string){

    const data={
      token:token,
      password:password,
      password_confirmation:password_confirmation
    }
    return this.http.post(this.url +  '/reset', data);
  }






}
