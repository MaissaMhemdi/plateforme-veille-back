import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from '../shared/shared.module';
import { OffresRoutingModule } from './offres-routing.module';
import { OffresArchivesComponent } from './offres-archives/offres-archives.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';


@NgModule({
  declarations: [
    OffresArchivesComponent,
    DashboardComponent,
    DashLayoutComponent,
  
  ],
  imports: [CommonModule, OffresRoutingModule, SharedModule, MatMenuModule]
})
export class OffresModule {}
