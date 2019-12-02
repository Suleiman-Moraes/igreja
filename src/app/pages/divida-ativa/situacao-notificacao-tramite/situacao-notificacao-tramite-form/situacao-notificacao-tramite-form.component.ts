import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { SituacaoNotificacaoTramite } from '../../shared/models/situacao-notificacao-tramite.model';
import { MensagemPadronizadaService } from '../../shared/services/mensagem-padronizada.service';
import { MensagemPadronizada } from '../../shared/models/mensagem-padronizada.model';
import { Validators } from '@angular/forms';
import { SituacaoEnum } from '../../shared/enums/situacao.enum';
import { SituacaoNotificacaoTramiteService } from '../../shared/services/situacao-notificacao-tramite.service';
import { UserLogado } from 'src/app/pages/security/shared/user-logado.model';

@Component({
  selector: 'app-situacao-notificacao-tramite-form',
  templateUrl: './situacao-notificacao-tramite-form.component.html',
  styleUrls: ['./situacao-notificacao-tramite-form.component.css']
})
export class SituacaoNotificacaoTramiteFormComponent extends BaseResourceFormComponent <SituacaoNotificacaoTramite> {

  constructor(
    protected injector: Injector,
    protected situacaoNotificacaoTramiteService: SituacaoNotificacaoTramiteService
  ) {
    super(injector, situacaoNotificacaoTramiteService, MensagemPadronizada.fromJson);
  }

  
  protected buildResourceForm(): void {
    this.urlList = '/dividaativa/situacaonotificacaotramite';

    this.resourceForm = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.maxLength(255)]],
      situacao: [SituacaoEnum.Ativo],
      visivelUsuarioExterno: [false, [Validators.required]]
    });
  }

  changeVisibility(visibility: boolean){
    this.resourceForm.get('visivelUsuarioExterno').setValue(visibility);
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Situação de Notificação de Trâmite criado com sucesso!');
    }
    else {
      this.toast.success('Situação de Notificação de Trâmite atualizado com sucesso!');
    }
    this.router.navigate([this.urlList]);
  }
}
