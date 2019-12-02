import { NgModule } from '@angular/core';
import { MensagemPadronizadaRoutingModule } from './mensagem-padronizada-routing.module';
import { MensagemPadronizadaListComponent } from './mensagem-padronizada-list/mensagem-padronizada-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MensagemPadronizadaFormComponent } from './mensagem-padronizada-form/mensagem-padronizada-form.component';

@NgModule({
  declarations: [
    MensagemPadronizadaListComponent,
    MensagemPadronizadaFormComponent
  ],
  imports: [
    SharedModule,
    MensagemPadronizadaRoutingModule
  ]
})
export class MensagemPadronizadaModule { }
