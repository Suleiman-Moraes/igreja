import { Component, Injector } from '@angular/core';
import { TipoDebitoService } from '../../shared/services/tipo-debito.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { TipoDebito } from '../../shared/models/tipo-debito.model';

@Component({
  selector: 'app-tipo-debito-list',
  templateUrl: './tipo-debito-list.component.html',
  styleUrls: ['./tipo-debito-list.component.css']
})
export class TipoDebitoListComponent extends BaseResourceListComponent<TipoDebito> {

  constructor(
    protected tipoDebitoService: TipoDebitoService,
    protected injector: Injector
  ){
    super(tipoDebitoService, injector);
  }
}
