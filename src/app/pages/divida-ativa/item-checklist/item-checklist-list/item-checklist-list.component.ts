import { Component, Injector } from '@angular/core';
import { ItemChecklist } from '../../shared/models/item-checklist.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ItemChecklistService } from '../../shared/services/item-checklist.service';

@Component({
  selector: 'app-item-checklist-list',
  templateUrl: './item-checklist-list.component.html',
  styleUrls: ['./item-checklist-list.component.css']
})
export class ItemChecklistListComponent extends BaseResourceListComponent<ItemChecklist> {

  id: number;
  descricao: string;
  situacao: string = '';
  sumir: boolean = true;

  constructor(
    protected itemChecklistService: ItemChecklistService,
    protected injector: Injector
  ){
    super(itemChecklistService, injector);
  }

  paginateParamsRelatorio(event) {
    this.count = event.rows;
    this.page = event.page;
    this.findByParamsFilter();
  }

  pesquisar(): void {
    this.findByParamsFilter();
  }

  invertSumir(): void {
    this.sumir = !this.sumir;
  }

  //PRIVATE METHODS
  private findByParamsFilter(): void {
    this.itemChecklistService.findByParamsFilter(this.page, this.count, this.id, this.descricao,this.situacao)
    .subscribe(
      responseApi => {
        this.tratarResponseApi(responseApi);
      }, err => {
        this.tratarErro(err);
      }
    );
  }
}
