import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {

  domain = 'http://localhost:8080/';
  authToken;
  user;

  constructor(
    private http: HttpClient
  ) { }


  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  registerUser(user){
    return this.http.post(this.domain + 'auth/register', user);
  }

  checkEmail(email){
    return this.http.get(this.domain + 'auth/checkEmail/' + email);
  }

  checkUsername(username){
    return this.http.get(this.domain + 'auth/checkUsername/' + username);
  }

  login(user) {
    return this.http.post(this.domain + 'auth/login', user);
  }


}
