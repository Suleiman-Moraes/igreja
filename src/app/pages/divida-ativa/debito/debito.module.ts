import { NgModule } from '@angular/core';

import { DebitoRoutingModule } from './debito-routing.module';
import { DebitoFormComponent } from './debito-form/debito-form.component';
import { DebitoListComponent } from './debito-list/debito-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DebitoValidarComponent } from './debito-validar/debito-validar.component';
import { DebitoAssumirAnaliseComponent } from './debito-assumir-analise/debito-assumir-analise.component';
import { DebitoTramiteComponent } from './debito-tramite/debito-tramite.component';
import { DebitoDetalheAuxComponent } from './debito-detalhe-aux/debito-detalhe-aux.component';
import { DebitoListExternoComponent } from './debito-list-externo/debito-list-externo.component';
import { DebitoDetalheComponent } from './debito-detalhe/debito-detalhe.component';
import { DebitoTramiteListComponent } from './debito-tramite-list/debito-tramite-list.component';
import { DebitoParaDividaListComponent } from './debito-para-divida-list/debito-para-divida-list.component';

@NgModule({
  declarations: [
    DebitoFormComponent, 
    DebitoListComponent, 
    DebitoValidarComponent, 
    DebitoAssumirAnaliseComponent, 
    DebitoTramiteComponent, 
    DebitoDetalheAuxComponent, DebitoListExternoComponent, DebitoDetalheComponent, DebitoTramiteListComponent, DebitoParaDividaListComponent
  ],
  imports: [
    SharedModule,
    DebitoRoutingModule
  ]
})
export class DebitoModule { }
