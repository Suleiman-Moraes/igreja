import { NgModule } from '@angular/core';

import { IgrejaRoutingModule } from './igreja-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    IgrejaRoutingModule
  ]
})
export class IgrejaModule { }
