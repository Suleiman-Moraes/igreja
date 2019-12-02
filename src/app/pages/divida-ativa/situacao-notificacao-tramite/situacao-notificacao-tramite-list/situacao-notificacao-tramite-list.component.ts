import { Component, OnInit, Injector } from '@angular/core';
import { SituacaoNotificacaoTramite } from '../../shared/models/situacao-notificacao-tramite.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { SituacaoNotificacaoTramiteService } from '../../shared/services/situacao-notificacao-tramite.service';

@Component({
  selector: 'app-situacao-notificacao-tramite-list',
  templateUrl: './situacao-notificacao-tramite-list.component.html',
  styleUrls: ['./situacao-notificacao-tramite-list.component.css']
})
export class SituacaoNotificacaoTramiteListComponent extends BaseResourceListComponent<SituacaoNotificacaoTramite> {

  constructor(
    protected situacaoNotificacaoTramiteService: SituacaoNotificacaoTramiteService,
    protected injector: Injector
  ){
    super(situacaoNotificacaoTramiteService, injector);
  }
}
