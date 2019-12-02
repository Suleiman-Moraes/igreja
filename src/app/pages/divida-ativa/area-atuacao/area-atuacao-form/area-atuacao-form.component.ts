import { Component, OnInit, Injector } from '@angular/core';
import { AreaAtuacaoService } from '../../shared/services/area-atuacao.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { AreaAtuacao } from '../../shared/models/area-atuacao.model';
import { Validators } from '@angular/forms';
import { SituacaoEnum } from '../../shared/enums/situacao.enum';

@Component({
  selector: 'app-area-atuacao-form',
  templateUrl: './area-atuacao-form.component.html',
  styleUrls: ['./area-atuacao-form.component.css']
})
export class AreaAtuacaoFormComponent extends BaseResourceFormComponent<AreaAtuacao>  {
  constructor(
    protected injector: Injector,
    protected tipoDebitoService: AreaAtuacaoService
  ) {
    super(injector, tipoDebitoService, AreaAtuacao.fromJson);
  }

  protected buildResourceForm(): void {
    this.urlList = '/dividaativa/areaatuacao';

    this.resourceForm = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.maxLength(255)]],
      situacao: [SituacaoEnum.Ativo],
      dataCadastro: [new Date(), [Validators.required]]
    });
  }
  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Área de Atuação criada com sucesso!');
    }
    else {
      this.toast.success('Área de Atuação atualizada com sucesso!');
    }
    this.router.navigate([this.urlList]);
  }
}
