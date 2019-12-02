import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Parametro } from '../../shared/models/parametro.model';
import { ParametroService } from '../../shared/services/parametro.service';

@Component({
  selector: 'app-parametro-list',
  templateUrl: './parametro-list.component.html',
  styleUrls: ['./parametro-list.component.css']
})
export class ParametroListComponent extends BaseResourceListComponent<Parametro> {

  constructor(
    protected parametroService: ParametroService,
    protected injector: Injector
  ){
    super(parametroService, injector);
  }
}
