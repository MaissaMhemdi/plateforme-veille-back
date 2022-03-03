import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/auth/account.service';
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
    private fb: FormBuilder) { }

  ngOnInit(): void {
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
          console.log("Token::  " + res.id_token)
          this.authenticationError = false;
          this.router.navigate(['/']);
        } else {
          this.authenticationError = true
        }
      });
  }
}