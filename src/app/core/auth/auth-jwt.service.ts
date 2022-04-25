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

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private applicationConfigService: ApplicationConfigService,
    private accountService: AccountService
  ) {}

  getToken(): string {
    const tokenInLocalStorage: string | null = this.localStorageService.retrieve('authenticationToken');
    const tokenInSessionStorage: string | null = this.sessionStorageService.retrieve('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }
  login(credentials: Login): Observable<void> {
    // return this.http
    //   .post<JwtToken>(baseUrl + API_URL + "/authenticate", credentials)
    //   .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
     return this.http
      .post<JwtToken>(baseUrl + API_URL + "/authenticate", credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));

  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.localStorageService.clear('authenticationToken');
      this.sessionStorageService.clear('authenticationToken');
      observer.complete();
    });
  }

 authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    if (rememberMe) {
      this.localStorageService.store('authenticationToken', jwt);
      this.sessionStorageService.clear('authenticationToken');
      this.localStorageService.clear('authenticationUser');

    } else {
      this.sessionStorageService.store('authenticationToken', jwt);
      this.localStorageService.clear('authenticationToken');
      this.localStorageService.clear('authenticationUser');
    }
  }
}
