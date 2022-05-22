import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgParticlesModule } from 'ng-particles';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserManagementComponent } from './list/user-management.component';

import { userManagementRoute } from './user-management.route';
import { UpdateComponent } from './update/update.component';
import { AjoutComponent } from './ajout/ajout.component';

@NgModule({
  imports: [ RouterModule.forChild(userManagementRoute), SharedModule,
    MatMenuModule,
    CommonModule,
    MatPaginatorModule,
    MatExpansionModule,
    NgParticlesModule,
    NgxSkeletonLoaderModule, 
    MatIconModule],
  declarations: [
    UserManagementComponent,
    UpdateComponent,
    AjoutComponent,
  
  ],
 // entryComponents: [UserManagementDeleteDialogComponent],
})
export class UserManagementModule {}
