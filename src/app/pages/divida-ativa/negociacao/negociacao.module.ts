import { NgModule } from '@angular/core';

import { NegociacaoRoutingModule } from './negociacao-routing.module';
import { NegociacaoListComponent } from './negociacao-list/negociacao-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NegociacaoFormComponent } from './negociacao-form/negociacao-form.component';
import { NegociacaoListPagamentoIntegralComponent } from './negociacao-list-pagamento-integral/negociacao-list-pagamento-integral.component';

@NgModule({
  declarations: [
    NegociacaoListComponent,
    NegociacaoFormComponent,
    NegociacaoListPagamentoIntegralComponent
  ],
  imports: [
    SharedModule,
    NegociacaoRoutingModule
  ]
})
export class NegociacaoModule { }
