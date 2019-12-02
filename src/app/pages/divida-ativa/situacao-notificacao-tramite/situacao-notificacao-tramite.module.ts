import { NgModule } from '@angular/core';
import { SituacaoNotificacaoTramiteRoutingModule } from './situacao-notificacao-tramite-routing.module';
import { SituacaoNotificacaoTramiteListComponent } from './situacao-notificacao-tramite-list/situacao-notificacao-tramite-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SituacaoNotificacaoTramiteFormComponent } from './situacao-notificacao-tramite-form/situacao-notificacao-tramite-form.component';

@NgModule({
  declarations: [
    SituacaoNotificacaoTramiteListComponent,
    SituacaoNotificacaoTramiteFormComponent
  ],
  imports: [
    SharedModule,
    SituacaoNotificacaoTramiteRoutingModule
  ]
})
export class SituacaoNotificacaoTramiteModule { }
