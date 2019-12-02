import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDebitoRoutingModule } from './tipo-debito-routing.module';
import { TipoDebitoListComponent } from './tipo-debito-list/tipo-debito-list.component';
import { TipoDebitoFormComponent } from './tipo-debito-form/tipo-debito-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TipoDebitoListComponent, TipoDebitoFormComponent],
  imports: [
    SharedModule,
    TipoDebitoRoutingModule
  ]
})
export class TipoDebitoModule { }
