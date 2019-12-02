import { Component , Injector } from '@angular/core';
import { MensagemPadronizada } from '../../shared/models/mensagem-padronizada.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { MensagemPadronizadaService } from '../../shared/services/mensagem-padronizada.service';

@Component({
  selector: 'app-mensagem-padronizada-list',
  templateUrl: './mensagem-padronizada-list.component.html',
  styleUrls: ['./mensagem-padronizada-list.component.css']
})
export class MensagemPadronizadaListComponent extends BaseResourceListComponent<MensagemPadronizada> {

  constructor(
    protected mensagemPadronizada: MensagemPadronizadaService,
    protected injector: Injector
  ){
    super(mensagemPadronizada, injector);
  }
}