import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PasswordStrengthBarComponent } from './password/password-strength-bar/password-strength-bar.component';
import { ActivateComponent } from './activate/activate.component';
import { PasswordComponent } from './password/password.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { accountState } from './account.route';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [SharedModule,CommonModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
  ],
})
export class AccountModule {}
