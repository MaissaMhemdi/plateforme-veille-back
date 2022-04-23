import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserManagementComponent } from './list/user-management.component';

import { userManagementRoute } from './user-management.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(userManagementRoute)],
  declarations: [
    UserManagementComponent,
  
  ],
 // entryComponents: [UserManagementDeleteDialogComponent],
})
export class UserManagementModule {}
