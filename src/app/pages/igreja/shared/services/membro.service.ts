import { IGREJA_API_MEMBRO } from './../igreja.api';
import { Membro } from './../models/membro.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class MembroService extends BaseResourceService<Membro>{

  constructor(protected injector: Injector) {
    super(IGREJA_API_MEMBRO, injector, Membro.fromJson);
  }
}
