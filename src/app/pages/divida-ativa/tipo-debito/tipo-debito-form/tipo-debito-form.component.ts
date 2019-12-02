import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { TipoDebito } from '../../shared/models/tipo-debito.model';
import { TipoDebitoService } from '../../shared/services/tipo-debito.service';
import { Validators } from '@angular/forms';
import { SituacaoEnum } from '../../shared/enums/situacao.enum';

@Component({
  selector: 'app-tipo-debito-form',
  templateUrl: './tipo-debito-form.component.html',
  styleUrls: ['./tipo-debito-form.component.css']
})
export class TipoDebitoFormComponent extends BaseResourceFormComponent <TipoDebito>  {
  constructor(
    protected injector: Injector,
    protected tipoDebitoService: TipoDebitoService
  ) {
    super(injector, tipoDebitoService, TipoDebito.fromJson);
  }

  protected buildResourceForm(): void {
    this.urlList = '/dividaativa/tipodebito';

    this.resourceForm = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.maxLength(255)]],
      situacao: [SituacaoEnum.Ativo],
      dataCadastro: [new Date(), [Validators.required]]
    });
  }
  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Tipo do Crédito criado com sucesso!');
    }
    else {
      this.toast.success('Tipo do Crédito atualizado com sucesso!');
    }
    this.router.navigate([this.urlList]);
  }
}
