import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../user-management.model';
import { UserService } from 'src/app/dashboard/service/user.service';
import { AccountService } from 'src/app/core/auth/account.service';
import { Account } from 'src/app/core/auth/account.model';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'src/app/config/pagination.constants';


@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  currentAccount: Account | null = null;
  users: User[] | null = null;
  isLoading = false;
  pageSize : number = 10;
  pageElement : number =0;
  totalElement : number;
  predicate!: string;
  ascending!: boolean;

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.loadAll();
  }

  setActive(user: User, isActivated: boolean): void {
    this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
  }

  trackIdentity(index: number, item: User): number {
    return item.id!;
  }

 // deleteUser(user: User): void {
   // const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    //modalRef.componentInstance.user = user;
    // unsubscribe not needed because closed completes on modal close
    //modalRef.closed.subscribe(reason => {
      //if (reason === 'deleted') {
        //this.loadAll();
   //   }
    //});
  //}

  loadAll(): void {
    this.isLoading = true;
    this.userService
      .usersall(this.pageSize,this.pageElement)
      .subscribe(data => {
        this.users = data['adminuser'];
        this.totalElement = data.totalElements;
        console.log("yyyyyyyyyyyyyyyyyyyy",this.users)
    }
    , error => {
        console.log(error.error.message);
    }
    );
  }

  nextPage(event) {
    this.pageSize=event.pageSize
    this.pageElement=event.pageIndex.toString();
   
     this.loadAll();
     console.log("hhhhhhhhhh",this.loadAll())
   }
   deleteuser(login: string) {
    this.userService.delete(login)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();

        },
        error => console.log(error));
  }
}