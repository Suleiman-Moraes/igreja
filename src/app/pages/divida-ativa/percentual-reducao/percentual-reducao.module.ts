import { NgModule } from '@angular/core';

import { PercentualReducaoRoutingModule } from './percentual-reducao-routing.module';
import { PercentualReducaoFormComponent } from './percentual-reducao-form/percentual-reducao-form.component';
import { PercentualReducaoListComponent } from './percentual-reducao-list/percentual-reducao-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PercentualReducaoFormComponent, 
    PercentualReducaoListComponent
  ],
  imports: [
    SharedModule,
    PercentualReducaoRoutingModule
  ]
})
export class PercentualReducaoModule { }
