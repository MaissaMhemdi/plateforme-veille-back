import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/auth/account.service';

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.scss']
})
export class DashLayoutComponent implements OnInit {
  isLessThenLargeDevice;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {
      this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }
  onLogout(): void {
    this.router.navigate(['auth/login']);
  }
}
