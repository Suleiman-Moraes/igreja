import { NgModule } from '@angular/core';

import { PrazoRoutingModule } from './prazo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrazoFormComponent } from './prazo-form/prazo-form.component';
import { PrazoListComponent } from './prazo-list/prazo-list.component';

@NgModule({
  declarations: [
    PrazoFormComponent,
    PrazoListComponent
  ],
  imports: [
    SharedModule,
    PrazoRoutingModule
  ]
})
export class PrazoModule { }
