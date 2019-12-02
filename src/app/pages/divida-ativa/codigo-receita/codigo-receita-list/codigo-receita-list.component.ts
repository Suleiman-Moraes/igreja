import { Component, OnInit, Injector } from '@angular/core';
import { CodigoReceita } from '../../shared/models/codigo-receita.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { CodigoReceitaService } from '../../shared/services/codigo-receita.service';

@Component({
  selector: 'app-codigo-receita-list',
  templateUrl: './codigo-receita-list.component.html',
  styleUrls: ['./codigo-receita-list.component.css']
})
export class CodigoReceitaListComponent extends BaseResourceListComponent<CodigoReceita> {

  constructor(
    protected tipoDebitoService: CodigoReceitaService,
    protected injector: Injector
  ){
    super(tipoDebitoService, injector);
  }
}
