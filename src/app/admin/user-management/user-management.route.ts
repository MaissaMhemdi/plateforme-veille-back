import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';

import { User, IUser } from './user-management.model';

import { UserManagementComponent } from './list/user-management.component';
import { UserService } from 'src/app/dashboard/service/user.service';
import { UpdateComponent } from './update/update.component';
import { AjoutComponent } from './ajout/ajout.component';


@Injectable({ providedIn: 'root' })
export class UserManagementResolve implements Resolve<IUser> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    const id = route.params['login'];
    if (id) {
      return this.service.find(id);
    }
    return of(new User());
  }
}

export const userManagementRoute: Routes = [
  {
    path: '',
    component: UserManagementComponent,

  },
 
  {
    path: ':login/edit',
    component: UpdateComponent,

  },
  {
    path: 'new',
    component: UpdateComponent,
    resolve: {
      user: UserManagementResolve,
    },
  },
  
];
