import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { DataFeriado } from '../../shared/models/data-feriado.model';
import { DataFeriadoService } from '../../shared/services/data-feriado.service';

@Component({
  selector: 'app-data-feriado-list',
  templateUrl: './data-feriado-list.component.html',
  styleUrls: ['./data-feriado-list.component.css']
})
export class DataFeriadoListComponent extends BaseResourceListComponent<DataFeriado> {

  constructor(
    protected dataFeriadoService: DataFeriadoService,
    protected injector: Injector
  ){
    super(dataFeriadoService, injector);
  }
}
