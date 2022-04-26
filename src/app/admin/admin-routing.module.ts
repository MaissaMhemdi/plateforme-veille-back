import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { OffreDetailsComponent } from './offre-details/offre-details.component';

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
  { path: 'detail/:id',
   component: OffreDetailsComponent },

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
