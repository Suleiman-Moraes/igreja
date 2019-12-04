import { Membro } from './../../../shared/models/membro.model';
import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { MembroService } from '../../../shared/services/membro.service';
import { Validators } from '@angular/forms';
import { SituacaoEnum } from '../../../shared/enums/situacao.enum';

@Component({
  selector: 'app-membro-form',
  templateUrl: './membro-form.component.html',
  styleUrls: ['./membro-form.component.css']
})
export class MembroFormComponent extends BaseResourceFormComponent<Membro>{

  constructor(
    protected injector: Injector,
    protected membroService: MembroService
  ) {
    super(injector, membroService, Membro.fromJson);
  }

  //METHODS PRIVATE
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(255)]],
      descricao: [null, [Validators.required, Validators.maxLength(255)]],
      situacao: [SituacaoEnum.Ativo],
      membro: [null, [Validators.required, Validators.maxLength(20)]]
    });
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Membro criado com sucesso!');
    }
    else {
      this.toast.success('Membro atualizado com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }

  protected posNgOnInit(): void {
    this.urlList = '/pages/cadastro/membro';
  }

  protected createPageTitle(): string {
    return 'Novo Membro';
  }

  protected editionPageTitle(): string {
    return 'Edição de Membro';
  }
}
