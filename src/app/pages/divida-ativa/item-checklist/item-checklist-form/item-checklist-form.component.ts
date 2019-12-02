import { Component, Injector } from '@angular/core';
import { ItemChecklist } from '../../shared/models/item-checklist.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ItemChecklistService } from '../../shared/services/item-checklist.service';
import { Validators } from '@angular/forms';
import { SituacaoEnum } from '../../shared/enums/situacao.enum';

@Component({
  selector: 'app-item-checklist-form',
  templateUrl: './item-checklist-form.component.html',
  styleUrls: ['./item-checklist-form.component.css']
})
export class ItemChecklistFormComponent extends BaseResourceFormComponent<ItemChecklist>{

  constructor(
    protected injector: Injector,
    protected itemChecklistService: ItemChecklistService
  ) {
    super(injector, itemChecklistService, ItemChecklist.fromJson);
  }

  //METHODS PRIVATE
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required]],
      situacao: [SituacaoEnum.Ativo],
      dataCadastro: [null]
    });
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Item do Checklist criado com sucesso!');
    }
    else {
      this.toast.success('Item do Checklist atualizado com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }

  protected posNgOnInit(): void {
    this.urlList = '/dividaativa/itemchecklist';
  }

  protected createPageTitle(): string {
    return 'Novo Item do Checklist';
  }

  protected editionPageTitle(): string {
    return 'Edição de Item do Checklist';
  }
}
