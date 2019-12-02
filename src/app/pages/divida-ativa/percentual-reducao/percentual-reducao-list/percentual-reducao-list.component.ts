import { EdicaoRefis } from './../../shared/models/edicao-refis.model';
import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { EdicaoRefisService } from '../../shared/services/edicao-refis.service';

@Component({
  selector: 'app-percentual-reducao-list',
  templateUrl: './percentual-reducao-list.component.html',
  styleUrls: ['./percentual-reducao-list.component.css']
})
export class PercentualReducaoListComponent extends BaseResourceListComponent<EdicaoRefis> {

  constructor(
    protected edicaoRefisService: EdicaoRefisService,
    protected injector: Injector
  ){
    super(edicaoRefisService, injector);
  }
}
