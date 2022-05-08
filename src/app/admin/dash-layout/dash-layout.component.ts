import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/auth/account.service';
import { AuthServerProvider } from 'src/app/core/auth/auth-jwt.service';

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.scss']
})
export class DashLayoutComponent implements OnInit {
  isLessThenLargeDevice;
  authorities ;
isauth =false;
isLoadingResults = true;
  data: string[];

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private accountService: AccountService,private authServerProvider:AuthServerProvider) {}

  ngOnInit(): void {
   this.getAuthorities();
      this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  
  }
  onLogout(): void {
    this.router.navigate(['auth/login']);
  }
  getAuthorities(): void {
    this.accountService.getAuthorities()
      .subscribe(res => {
        this.data = res;
        console.log("aaaaaaaaaa",this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
}
}
