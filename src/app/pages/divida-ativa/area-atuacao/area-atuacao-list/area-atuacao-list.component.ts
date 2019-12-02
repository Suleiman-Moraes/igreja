import { Component, Injector } from '@angular/core';
import { AreaAtuacao } from '../../shared/models/area-atuacao.model';
import { AreaAtuacaoService } from '../../shared/services/area-atuacao.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-area-atuacao-list',
  templateUrl: './area-atuacao-list.component.html',
  styleUrls: ['./area-atuacao-list.component.css']
})
export class AreaAtuacaoListComponent extends BaseResourceListComponent<AreaAtuacao> {

  constructor(
    protected areaAtuacaoService: AreaAtuacaoService,
    protected injector: Injector
  ){
    super(areaAtuacaoService, injector);
  }
}
