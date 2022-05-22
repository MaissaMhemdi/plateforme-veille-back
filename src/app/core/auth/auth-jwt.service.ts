import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { ApplicationConfigService } from '../config/application-config.service';
import { Login } from 'src/app/auth/login/login.model';
import { Account } from './account.model';
import { AccountService } from './account.service';


type JwtToken = {
  id_token: string;
  user:User;
};
type User ={
  
    id: number;
    login: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    activated: boolean;
    langKey: string;
    authorities: string[];
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
  };
const baseUrl = 'http://localhost:8080';
const API_URL = '/api';

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  tokenresp: any;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private applicationConfigService: ApplicationConfigService,
    private accountService: AccountService
  ) {}
  ACCESS_TOKEN = 'access_token';
  USER_CONNECT = 'user_connect';
  Authourities = 'authorities';

  getToken(): string {
    const tokenInLocalStorage= localStorage.getItem('access_token');
    const tokenInsessionStorage= sessionStorage.getItem('access_token');

    return tokenInLocalStorage ?? tokenInsessionStorage ?? '';
  }  
  getUser(): string {
    const userInLocalStorage= localStorage.getItem('user_connect');
    const userInsessionStorage= sessionStorage.getItem('user_connect');
    return userInLocalStorage ?? userInsessionStorage ?? '';

  }
  login(credentials: Login): Observable<void> {
   return this.http
     .post<JwtToken>(baseUrl + API_URL + "/authenticate", credentials)
    .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
   

  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.localStorageService.clear('access_token');
      this.sessionStorageService.clear('access_token');
      observer.complete();
    });
  }

  isUserLoggedIn() {
    let user = localStorage.getItem("user_connect");
    console.log(!(user === null));
    return !(user === null);
  }
 authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    const username = response.user;
    const authouritie = response.user.authorities;

    if (rememberMe) {
      localStorage.setItem(this.ACCESS_TOKEN, jwt)
      localStorage.setItem(this.USER_CONNECT, JSON.stringify(username))
      localStorage.setItem(this.Authourities, JSON.stringify(authouritie))

      sessionStorage.clear();

    } else {
      sessionStorage.setItem('access_token', jwt);
      sessionStorage.setItem('user_connect',JSON.stringify(username));

      localStorage.clear();
    }
  }

  GetRolebyToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    console.log("ttttttttt",this.tokenresp.sub)
    return this.tokenresp.sub;
  }
 
}
