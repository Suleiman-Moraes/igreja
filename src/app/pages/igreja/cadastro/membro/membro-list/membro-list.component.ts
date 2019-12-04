import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Membro } from '../../../shared/models/membro.model';
import { MembroService } from '../../../shared/services/membro.service';

@Component({
  selector: 'app-membro-list',
  templateUrl: './membro-list.component.html',
  styleUrls: ['./membro-list.component.css']
})
export class MembroListComponent extends BaseResourceListComponent<Membro> {

  constructor(
    protected membroService: MembroService,
    protected injector: Injector
  ){
    super(membroService, injector);
  }
}
