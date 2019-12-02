import { Component, Injector } from '@angular/core';
import { Prazo } from '../../shared/models/prazo.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { PrazoService } from '../../shared/services/prazo.service';
import { SituacaoEnum } from '../../shared/enums/situacao.enum';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-prazo-form',
  templateUrl: './prazo-form.component.html',
  styleUrls: ['./prazo-form.component.css']
})
export class PrazoFormComponent extends BaseResourceFormComponent<Prazo>{

  constructor(
    protected injector: Injector,
    protected prazoService: PrazoService
  ) {
    super(injector, prazoService, Prazo.fromJson);
  }

  //METHODS PRIVATE
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(255)]],
      descricao: [null, [Validators.required, Validators.maxLength(255)]],
      situacao: [SituacaoEnum.Ativo],
      prazo: [null, [Validators.required, Validators.maxLength(20)]]
    });
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Prazo criado com sucesso!');
    }
    else {
      this.toast.success('Prazo atualizado com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }

  protected posNgOnInit(): void {
    this.urlList = '/dividaativa/prazo';
  }

  protected createPageTitle(): string {
    return 'Novo Prazo';
  }

  protected editionPageTitle(): string {
    return 'Edição de Prazo';
  }
}
