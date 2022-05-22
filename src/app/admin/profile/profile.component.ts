import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'src/app/core/auth/account.model';
import { AccountService } from 'src/app/core/auth/account.service';
import { UserService } from 'src/app/dashboard/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  account: Account;
  currentUser: any;
  authoritie: any;
  data: string[];


  constructor(
    private accountService: AccountService,private userService:UserService
  
  ) {}


  ngOnInit(): void {
    this.currentUser = this.accountService.getuser();
    console.log("mmm",this.currentUser);
   this.authoritie=this.accountService.getauthorities();
   console.log("mmm",this.authoritie);


  }
 accounts(){
  this.accountService.identity().subscribe(account => {
    this.account = account;
    console.log("ppp",account)
  });

 }
 getAuthorities() {
  this.accountService.getAuthorities()
    .subscribe(res => {
      this.data = res;
      console.log("aaaaaaaaaa",this.data);
    }, err => {
      console.log(err);
    });
}
}