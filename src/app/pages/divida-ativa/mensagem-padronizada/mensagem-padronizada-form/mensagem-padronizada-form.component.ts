import { Component, OnInit, Injector } from '@angular/core';
import { MensagemPadronizada } from '../../shared/models/mensagem-padronizada.model';
import { MensagemPadronizadaService } from '../../shared/services/mensagem-padronizada.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Validators } from '@angular/forms';
import { SituacaoEnum } from '../../shared/enums/situacao.enum';

@Component({
  selector: 'app-mensagem-padronizada-form',
  templateUrl: './mensagem-padronizada-form.component.html',
  styleUrls: ['./mensagem-padronizada-form.component.css']
})
export class MensagemPadronizadaFormComponent extends BaseResourceFormComponent<MensagemPadronizada>{

  constructor(
    protected injector: Injector,
    protected mensagemPadronizadaService: MensagemPadronizadaService
  ) {
    super(injector, mensagemPadronizadaService, MensagemPadronizada.fromJson);
  }

  protected buildResourceForm(): void {
    this.urlList = '/dividaativa/mensagempadrao';

    this.resourceForm = this.formBuilder.group({
      id: [null],
      titulo: [null, [Validators.required, Validators.maxLength(255)]],
      descricao: [null, [Validators.required, Validators.maxLength(255)]],
      situacao: [SituacaoEnum.Ativo],
      dataCadastro: [new Date()]
    });
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Mensagem Padronizada criada com sucesso!');
    }
    else {
      this.toast.success('Mensagem Padronizada atualizada com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }
}
