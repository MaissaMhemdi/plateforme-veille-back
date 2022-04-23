import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';

import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OffresArchivesComponent } from './offres-archives/offres-archives.component';


const  DashboardChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
 
  },

  {
    path: 'offresarchived',
    component: OffresArchivesComponent
  },
  {
  path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)}
  
  
];

const routes: Routes = [
  {
    path: '',
    component:DashLayoutComponent,
    children: DashboardChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
