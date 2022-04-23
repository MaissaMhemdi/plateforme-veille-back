import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { GoogleRoutingModule } from './google-routing.module';
import { GoogleComponent } from './google.component';



@NgModule({
  declarations: [GoogleComponent],
  imports: [
    CommonModule, SharedModule, GoogleRoutingModule
  ]
})
export class GoogleModule { }
