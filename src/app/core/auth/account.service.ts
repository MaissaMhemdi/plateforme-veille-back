import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { TranslateService } from '@ngx-translate/core';
// import { SessionStorageService } from 'ngx-webstorage';
import { Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';

import { ApplicationConfigService } from '../config/application-config.service';
import { Account } from './account.model';
import { StateStorageService } from './state-storage.service';

const baseUrl = 'http://localhost:8080';
const API_URL = '/api';
@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account> | null;

  constructor(
    // private translateService: TranslateService,
    // private sessionStorageService: SessionStorageService,
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router,
    private applicationConfigService: ApplicationConfigService,
  ) {}

  save(account: Account): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor(baseUrl + API_URL + "/account"), account);
    //return this.http.post(baseUrl + API_URL + "/account", account);
  }

  authenticate(identity: Account | null): string[] {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
    if (!identity) {
      this.accountCache$ = null;
      return null;
    }
    return this.userIdentity.authorities;
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  // getAuthorities(): string[] {
  //   console.log("userrrrrrrr  ", this.userIdentity)
  //   if (!this.userIdentity) {
  //     return null;
  //   }
  //   return this.userIdentity.authorities;
  // }

  getAuthorities(): Observable<string[]> {
    return this.http.get<string[]>(this.applicationConfigService.getEndpointFor(baseUrl + API_URL + "/authorities"));
    
  }


  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force) {
      this.accountCache$ = this.fetch().pipe(
        tap((account: Account) => {
          this.authenticate(account);

          // After retrieve the account info, the language will be changed to
          // the user's preferred language configured in the account setting
          // unless user have choosed other language in the current session

          //Translation to add 
          // if (!this.sessionStorageService.retrieve('locale')) {
          //   this.translateService.use(account.langKey);
          // }

          this.navigateToStoredUrl();
        }),
        shareReplay()
      );
    }
    return this.accountCache$.pipe(catchError(() => of(null)));
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  private fetch(): Observable<Account>  {
  //return this.http.get<Account>(baseUrl + API_URL + "/account");
    return this.http.get<Account>(this.applicationConfigService.getEndpointFor(baseUrl + API_URL + "/account"));
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}
