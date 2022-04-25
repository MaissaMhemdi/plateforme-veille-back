import { isPlatformBrowser } from '@angular/common';
import { isPlatformServer } from '@angular/common';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Account } from 'src/app/core/auth/account.model';
import { AccountService } from 'src/app/core/auth/account.service';
import { AuthServerProvider } from 'src/app/core/auth/auth-jwt.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authenticationError = false;
  checkErrors = false;


  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });

  constructor(private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private authServerProvider:AuthServerProvider,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      console.log("serverrrrr")
      // do server side stuff
  }

  if (isPlatformBrowser(this.platformId)) {
    console.log("browserrrr")

      // do client side stuff
  }
     // if already authenticated then navigate to home page
    //  this.accountService.identity().subscribe(() => {
    //   if (this.accountService.isAuthenticated()) {
    //     this.router.navigate(['']);
    //   }
    // });

    this.loginForm.valueChanges.subscribe(val => {
      this.checkErrors = true;
    })
  }

  login(): void {
    this.checkErrors = true;
    if(this.loginForm.invalid) {
      console.log("errooooorr " + this.loginForm.get('rememberMe').value);
      return;
    }

    this.authService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe((res) => {
        if(res){
          // let account = new Account(res.user.activated, res.user.authorities, res.user.email, res.user.firstName, res.user.lastName,
          //   res.user.login, null );

          // this.localStorageService.store('authorities', this.accountService.authenticate(account));

          // console.log("auuuth " + this.accountService.authenticate(account));
         
          console.log("Token::  " + this.authServerProvider.getToken())
          this.authenticationError = false;
          this.router.navigate(['/dashadmin']);
        } else {
          this.authenticationError = true
        }
      });
  }
}