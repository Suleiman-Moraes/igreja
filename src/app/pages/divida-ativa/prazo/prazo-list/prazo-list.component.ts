import { Prazo } from './../../shared/models/prazo.model';
import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { PrazoService } from '../../shared/services/prazo.service';

@Component({
  selector: 'app-prazo-list',
  templateUrl: './prazo-list.component.html',
  styleUrls: ['./prazo-list.component.css']
})
export class PrazoListComponent extends BaseResourceListComponent<Prazo> {

  constructor(
    protected prazoService: PrazoService,
    protected injector: Injector
  ){
    super(prazoService, injector);
  }
}
