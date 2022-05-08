import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Account } from '../core/auth/account.model';
import { AccountService } from '../core/auth/account.service';
import { AuthServerProvider } from '../core/auth/auth-jwt.service';
import { Login } from './login/login.model';

type JwtToken = {
  id_token: string;
  user: User;
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
@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;
redirectUrl: string;
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}

  login(credentials: Login): Observable<Account> {
     return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
     this.isLoggedIn=true;
    //return this.authServerProvider.login(credentials);
   
  }
  
  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
