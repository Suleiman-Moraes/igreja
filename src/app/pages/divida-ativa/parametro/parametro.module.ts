import { NgModule } from '@angular/core';

import { ParametroRoutingModule } from './parametro-routing.module';
import { ParametroFormComponent } from './parametro-form/parametro-form.component';
import { ParametroListComponent } from './parametro-list/parametro-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ParametroFormComponent, 
    ParametroListComponent
  ],
  imports: [
    SharedModule,
    ParametroRoutingModule
  ]
})
export class ParametroModule { }
