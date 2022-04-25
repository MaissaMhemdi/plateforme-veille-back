import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OffresArchivesComponent } from './offres-archives/offres-archives.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgParticlesModule } from 'ng-particles';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    OffresArchivesComponent,
    DashboardComponent,
    DashLayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatMenuModule,
    MatPaginatorModule,
    MatExpansionModule,
    NgParticlesModule,
    NgxSkeletonLoaderModule, 
    

    
  
  ]
})
export class AdminModule { }
