import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OffresArchivesComponent } from './offres-archives/offres-archives.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';


const DashboardChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'offresarchived',
    component: OffresArchivesComponent
  },
  
  
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
export class OffresRoutingModule { }
